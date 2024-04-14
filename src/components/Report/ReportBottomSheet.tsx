import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {COLORS, SIZES, width} from '../../constants/commons.ts';
import {moderateScale, scale, verticalScale} from '../../utils/utils.ts';
import {
  harrasment,
  involvesChild,
  nudity,
  problemArray,
  somethingElse,
} from './reportUtilts.ts';
import {IMAGES} from '../../constants/images.ts';
import Button from '../shared/Button.tsx';
export type Ref = BottomSheetModal;
interface ReportBottomSheetModalProps {
  sub: string;
  category: string;
  name: string;
}

const ReportBottomSheetModal = forwardRef<Ref, ReportBottomSheetModalProps>(
  (props, ref) => {
    const snapPoints = useMemo(() => ['65%'], []);
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
    const isExpandedDetailsVisible = expandedDetails !== '';

    const submitReport = () => {
      console.log(props);
    };

    const selectAProblem = () => {
      return (
        <View>
          <View style={styles.containerBody}>
            <Text style={styles.containerBodyTitle}>
              Please select a problem
            </Text>
            <Text style={styles.containerBodyText}>
              You can report this person to Thundr PH if you think it goes
              against our Community Guidelines.
            </Text>
          </View>
          {problemArray.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setExpandedDetails(item);
                }}
                style={styles.containerProblemContent}>
                <Text style={styles.containerProblemContentText}>{item}</Text>
                <Image
                  source={IMAGES.forwardIcon}
                  style={styles.forwardIcon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };
    const moreDetails = () => {
      const renderTitle = () => {
        if (expandedDetails === 'Nudity/Obscenity') {
          return expandedDetails;
        }
        if (expandedDetails === 'Involves a child') {
          return expandedDetails;
        }
        if (expandedDetails === 'Harassment') {
          return expandedDetails;
        }
        if (expandedDetails === 'Something else') {
          return expandedDetails;
        }
      };

      const renderData = () => {
        if (expandedDetails === 'Nudity/Obscenity') {
          return nudity;
        }
        if (expandedDetails === 'Involves a child') {
          return involvesChild;
        }
        if (expandedDetails === 'Harassment') {
          return harrasment;
        }
        if (expandedDetails === 'Something else') {
          return somethingElse;
        }
      };

      return (
        <View>
          <View style={styles.containerBody}>
            <Text style={styles.containerBodyTitle}>{renderTitle()}</Text>
            <View style={styles.containerDetails}>
              {renderData()?.map((item, index) => {
                return (
                  <View key={index} style={styles.containerEachDetails}>
                    <Text style={styles.containerBodyText}>•{'  '}</Text>
                    <Text style={styles.containerBodyText}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.containerRemarks}>
            <Text style={styles.containerRemarksText}>Tell us more...</Text>
            <BottomSheetTextInput
              selectionColor={COLORS.primary1}
              inputMode={'text'}
              maxLength={255}
              textAlignVertical={'top'}
              autoCapitalize="none"
              multiline={true}
              style={styles.input}
            />
            <Text style={styles.containerRemarksText}>
              We won't tell {props.name} you reported them.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={submitReport}
              text="Submit Report"
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      );
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onDismiss={() => setExpandedDetails('')}
        backdropComponent={renderBackdrop}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.containerHeadline}>Report</Text>
          </View>
          <View style={styles.containerProblem}>
            {isExpandedDetailsVisible ? moreDetails() : selectAProblem()}
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
    alignItems: 'stretch',
  },
  containerProblemContent: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerProblemContentText: {
    fontSize: moderateScale(15),
    color: COLORS.gray4,
    letterSpacing: -0.4,
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
  },
  forwardIcon: {
    height: 12,
    width: 6,
  },
  containerDetails: {
    marginTop: 8,
  },
  containerEachDetails: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  containerRemarks: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  containerRemarksText: {
    fontSize: SIZES.h5,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.gray4,
    letterSpacing: -0.4,
    textAlign: 'center',
    paddingVertical: 16,
  },
  input: {
    marginTop: 8,
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    borderColor: '#C7C7C7',
    borderWidth: 1,
    color: COLORS.black,
    minHeight: 70,
    maxHeight: 70,
    fontFamily: 'Montserrat-Regular',
  },
  buttonContainer: {alignItems: 'center', marginTop: 20},
  button: {
    backgroundColor: COLORS.primary1,
    alignItems: 'center',
    maxWidth: width,
    width: width - 64,
    height: 44,
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonText: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-ExtraBold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
});

export default ReportBottomSheetModal;
