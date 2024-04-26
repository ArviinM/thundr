import {View, StyleSheet, Text, ScrollView} from 'react-native';
import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {COLORS, SIZES, width} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';
import Slider, {RangeSlider} from '@react-native-assets/slider';
import LetterGradientButton from '../shared/LetterGradientButton.tsx';
import Button from '../shared/Button.tsx';

export type Ref = BottomSheetModal;
interface FiltersBottomSheetModalProps {
  sub: string;
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

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(45);
    const [proximityValue, setProximityValue] = useState(2);
    const letters = ['L', 'G', 'B', 'T', 'Q', 'I', 'A', '+'];
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]); // Correct

    const ageSliderChange = (range: [number, number]) => {
      setMinValue(Math.round(range[0]));
      setMaxValue(Math.round(range[1]));
    };

    const proximityValueChange = (value: number) => {
      setProximityValue(Math.round(value));
    };

    const handleLetterChange = (letter: string, isSelected: boolean) => {
      setSelectedLetters((prevLetters: string[]) => {
        // Array of strings
        if (isSelected) {
          return [...prevLetters, letter];
        } else {
          return prevLetters.filter(l => l !== letter);
        }
      });
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={false}
        backgroundStyle={{backgroundColor: COLORS.white}}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Button
              onPress={() => console.log('Pressed')}
              text="Save"
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonText}
            />
            <Text style={styles.containerHeadline}>Filters</Text>
            <Text style={styles.containerSubTitle}>
              There are plenty of fishes in the sea; make sure they are{'\n'}the
              right age and location, mars
            </Text>
          </View>
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.filterContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleFilterText}>Age Range</Text>
                <Text style={styles.subTitleFilterText}>
                  {minValue + 35}-{maxValue + 35}
                </Text>
              </View>
              <View style={{margin: scale(10)}}>
                {/* Slider Here */}
                <RangeSlider
                  range={[minValue, maxValue]} // Use minValue for the initial range
                  minimumRange={1}
                  maximumValue={45}
                  onValueChange={ageSliderChange}
                  minTrackStyle={{backgroundColor: COLORS.gray2}}
                  midTrackStyle={{backgroundColor: COLORS.primary1}}
                  maxTrackStyle={{backgroundColor: COLORS.gray2}}
                  trackHeight={12}
                  thumbTintColor={COLORS.white}
                  thumbStyle={{
                    width: 28,
                    height: 28,
                    borderRadius: 30,
                    borderColor: COLORS.primary1,
                    borderWidth: 5,
                  }}
                />
              </View>
            </View>
            <View style={styles.filterContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleFilterText}>Proximity</Text>
                <Text style={styles.subTitleFilterText}>
                  up to {proximityValue}km away
                </Text>
              </View>
              <View style={{margin: scale(10)}}>
                {/* Slider Here */}
                <Slider
                  value={proximityValue}
                  minimumValue={2}
                  maximumValue={250}
                  minTrackStyle={{backgroundColor: COLORS.primary1}}
                  maxTrackStyle={{backgroundColor: COLORS.gray2}}
                  trackHeight={12}
                  thumbTintColor={COLORS.white}
                  onValueChange={proximityValueChange}
                  thumbStyle={{
                    width: 28,
                    height: 28,
                    borderRadius: 30,
                    borderColor: COLORS.primary1,
                    borderWidth: 5,
                  }}
                />
              </View>
            </View>
            <View style={styles.filterContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleFilterText}>Gender</Text>
                <Text style={styles.subTitleFilterText}>Choose up to 4</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  marginVertical: 10,
                }}>
                {/* Selectable Genders Here */}
                {letters.map((letter, index) => (
                  <LetterGradientButton
                    key={index}
                    letter={letter}
                    selectedLetters={selectedLetters}
                    onChange={handleLetterChange}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: 'ClimateCrisis-Regular',
    color: COLORS.primary1,
  },
  containerSubTitle: {
    color: COLORS.gray4,
    fontSize: scale(12),
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  scrollViewContainer: {
    flex: 1,
    marginHorizontal: scale(24),
    marginVertical: scale(16),
  },
  filterContainer: {
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleFilterText: {
    fontSize: scale(18),
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: -0.4,
  },
  subTitleFilterText: {
    fontSize: scale(18),
    color: COLORS.black,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.4,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    position: 'absolute',
    right: scale(20),
  },
  buttonText: {fontFamily: 'Montserrat-Bold', color: COLORS.white},
});

export default FiltersBottomSheetModal;
