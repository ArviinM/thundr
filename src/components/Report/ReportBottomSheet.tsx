import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {COLORS, SIZES} from '../../constants/commons.ts';
import {scale, verticalScale} from '../../utils/utils.ts';
import {problemArray} from './reportUtilts.ts';
export type Ref = BottomSheetModal;

const ReportBottomSheetModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['55%'], []);
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

  const [expandedDetails, setExpandedDetails] = useState('');
  const [remarks, setRemarks] = useState('');

  const selectAProblem = () => {
    return (
      <View>
        <View>
          {problemArray.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setExpandedDetails(item);
                }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Report</Text>
        </View>
        <View style={styles.containerBody}>
          <Text style={styles.containerBodyTitle}>Please select a problem</Text>
          <Text style={styles.containerBodyText}>
            You can report this person to Thundr PH if you think it goes against
            our Community Guidelines.
          </Text>
        </View>
        <View style={styles.containerProblem}>{selectAProblem()}</View>
      </View>
    </BottomSheetModal>
  );
});

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
  containerBody: {
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    padding: 20,
  },
  containerBodyTitle: {
    fontSize: SIZES.h4,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.black,
    letterSpacing: -0.4,
    textAlign: 'left',
  },
  containerBodyText: {
    fontSize: SIZES.h5,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.gray4,
    letterSpacing: -0.4,
    textAlign: 'left',
  },
  containerProblem: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
});

export default ReportBottomSheetModal;
