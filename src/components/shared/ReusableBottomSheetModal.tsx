import React, {forwardRef, useCallback, useMemo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';

export type Ref = BottomSheetModal;

interface ReusableBottomSheetModalProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  onDismiss?: () => void;
}

const ReusableBottomSheetModal = forwardRef<Ref, ReusableBottomSheetModalProps>(
  ({children, snapPoints = ['30%', '50%'], onDismiss}, ref) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose={true}
        onDismiss={onDismiss}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.container}>
          <View style={styles.childrenContainer}>{children}</View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  contentContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
  },
  containerHeadline: {
    fontSize: SIZES.h3,
    padding: scale(20),
    fontFamily: 'Montserrat-Bold',
    color: COLORS.black,
    letterSpacing: -0.4,
  },
  childrenContainer: {
    flex: 1,
    padding: scale(20),
  },
});

export default ReusableBottomSheetModal;
