import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {COLORS, SIZES, width} from '../../constants/commons.ts';

export type Ref = BottomSheetModal;
interface FiltersBottomSheetModalProps {
  sub: string;
  category: string;
  name: string;
}

const FiltersBottomSheetModal = forwardRef<Ref, FiltersBottomSheetModalProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ['78%'], []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.containerHeadline}>Filters</Text>
          </View>
        </View>
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
    padding: 20,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.black,
    letterSpacing: -0.4,
  },
});

export default FiltersBottomSheetModal;
