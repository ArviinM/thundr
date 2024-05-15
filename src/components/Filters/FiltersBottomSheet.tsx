import {View, StyleSheet, Text} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {COLORS, SIZES, width} from '../../constants/commons.ts';
import {
  convertAbbreviationsToFullWords,
  convertFullWordsToAbbreviations,
  scale,
} from '../../utils/utils.ts';

import {ScrollView} from 'react-native-gesture-handler';

import LetterGradientButton from '../shared/LetterGradientButton.tsx';
import Button from '../shared/Button.tsx';
import {useGetCustomerFilters} from '../../hooks/filters/useGetCustomerFilters.ts';
import {Loading} from '../shared/Loading.tsx';
import {useCustomerFilters} from '../../hooks/filters/useCustomerFilters.ts';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../utils/queryClient.ts';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import InterestButtonContainer from '../CustomerInterest/InterestButtonContainer.tsx';
import {interestOptions, starSignOptions} from '../CustomerInterest/options.ts';
import SelectableButton from '../CustomerPersonalityType/SelectableButton.tsx';
import {personalityData} from '../CustomerPersonalityType/personalityData.ts';

export type Ref = BottomSheetModal;
interface FiltersBottomSheetModalProps {
  sub: string;
}

const FiltersBottomSheetModal = forwardRef<Ref, FiltersBottomSheetModalProps>(
  (props, ref) => {
    const disabled = true;
    const [loading, isLoading] = useState<boolean>(false);
    const getCustomerFilters = useGetCustomerFilters({sub: props.sub});
    const customerFilters = useCustomerFilters();
    const query = useQueryClient(queryClient);
    const snapPoints = useMemo(() => ['78%'], []);
    const renderBackdrop = useCallback(
      (propsBottomSheet: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...propsBottomSheet}
        />
      ),
      [],
    );

    const [minValue, setMinValue] = useState<number>(
      (Number(getCustomerFilters.data?.ageMin) - 35) | 0,
    );
    const [maxValue, setMaxValue] = useState<number>(
      (Number(getCustomerFilters.data?.ageMax) - 35) | 45,
    );

    const [proximityValue, setProximityValue] = useState<number[]>([
      Number(getCustomerFilters.data?.proximity) || 2,
    ]);
    const letters = ['L', 'G', 'B', 'T', 'Q', 'I', 'A', '+'];
    const [selectedLetters, setSelectedLetters] = useState<string[]>(
      convertFullWordsToAbbreviations(getCustomerFilters.data?.gender || ''),
    );

    const currentFilteredStarSign = getCustomerFilters.data?.starSign || '';
    const starSignArray = currentFilteredStarSign.split(',');
    const [selectedStarSign, setSelectedStarSign] = useState<string[]>([]);

    const currentCustomerInterest = getCustomerFilters.data?.hobbies || '';
    const interestsArray = currentCustomerInterest.split(',');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const currentFilteredPersonality =
      getCustomerFilters.data?.personalityType || '';
    const filteredPersonalityArray = currentFilteredPersonality.split(',');
    const [selectedPersonality, setSelectedPersonality] = useState<string[]>(
      [],
    );

    useEffect(() => {
      const cleanedInterests = interestsArray
        .map((interest: string) => interest.trim()) // Trim each element
        .filter((interest: string) => interest !== ''); // Filter empty elements

      setSelectedInterests(cleanedInterests);
    }, [currentCustomerInterest]);

    useEffect(() => {
      const cleanedStarSign = starSignArray
        .map((starSign: string) => starSign.trim()) // Trim each element
        .filter((starSign: string) => starSign !== ''); // Filter empty elements

      setSelectedStarSign(cleanedStarSign);
    }, [currentFilteredStarSign]);

    useEffect(() => {
      const cleanedPersonality = filteredPersonalityArray
        .map((personality: string) => personality.trim()) // Trim each element
        .filter((personality: string) => personality !== ''); // Filter empty elements

      setSelectedPersonality(cleanedPersonality);
    }, [currentFilteredPersonality]);

    const ageSliderChange = (range: number[]) => {
      setMinValue(range[0]);
      setMaxValue(range[1]);
    };

    const proximityValueChange = (value: number[]) => {
      setProximityValue(value);
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

    const handleSelectionChangeStarSign = (newSelectedOptions: string[]) => {
      setSelectedStarSign(newSelectedOptions);
    };

    const handleSelectionChange = (newSelectedOptions: string[]) => {
      setSelectedInterests(newSelectedOptions);
    };

    const handleSelectedPersonality = (newSelectedOptions: string[]) => {
      setSelectedPersonality(newSelectedOptions);
    };

    const handleSubmit = async () => {
      try {
        isLoading(true);

        await customerFilters.mutateAsync({
          sub: props.sub,
          updateDate: Date.now().toString(),
          proximity: proximityValue.toString(),
          ageMax: (maxValue + 35).toString(),
          ageMin: (minValue + 35).toString(),
          gender: convertAbbreviationsToFullWords(selectedLetters),
          hobbies: selectedInterests.toString() || '',
          starSign: selectedStarSign.toString() || '',
          personalityType: selectedPersonality.toString() || '',
        });

        await query.invalidateQueries({
          queryKey: ['get-match-list'],
        });
        await query.invalidateQueries({
          queryKey: ['get-customer-filters'],
        });

        Toast.show({
          type: 'THNRSuccess',
          props: {
            title: 'Tumpak Mare! ',
            subtitle: 'Your filters are updated! ⚡️',
          },
          position: 'top',
          topOffset: 55,
        });
        isLoading(false);

        //@ts-ignore
        ref.current.close();
      } catch (error) {
        console.error('Error in filters bottom sheet!', error);
      }
    };

    useEffect(() => {
      if (getCustomerFilters.isSuccess) {
        setMinValue(Number(getCustomerFilters.data?.ageMin) - 35 || 0);
        setMaxValue(Number(getCustomerFilters.data?.ageMax) - 35 || 45);
        setProximityValue([Number(getCustomerFilters.data?.proximity || 250)]);
        setSelectedLetters(
          convertFullWordsToAbbreviations(
            getCustomerFilters.data?.gender || '',
          ),
        );
      }
    }, [getCustomerFilters.isSuccess, getCustomerFilters.data]);

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={false}
        backgroundStyle={{backgroundColor: COLORS.white}}>
        {getCustomerFilters.isLoading ? (
          <Loading />
        ) : (
          <>
            <View
              style={{
                backgroundColor: COLORS.white,
                flex: 1,
                zIndex: 1000,
                padding: 20,
              }}>
              <Button
                onPress={handleSubmit}
                text="Save"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.buttonText}
                loading={loading}
              />
            </View>
            <ScrollView>
              <BottomSheetView style={styles.contentContainer}>
                <Text style={styles.containerHeadline}>Filters</Text>
                <Text style={styles.containerSubTitle}>
                  There are plenty of fishes in the sea; make sure they are
                  {'\n'}
                  the right age and location, mars
                </Text>
              </BottomSheetView>
              <BottomSheetView style={styles.scrollViewContainer}>
                <View style={styles.filterContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleFilterText}>Age Range</Text>
                    <Text style={styles.subTitleFilterText}>
                      {minValue + 35}-{maxValue + 35}
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: scale(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* Slider Here */}
                    <MultiSlider
                      values={[minValue, maxValue]}
                      onValuesChange={ageSliderChange}
                      sliderLength={width / 1.27}
                      min={0}
                      max={45}
                      step={1}
                      snapped
                      containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderWidth: 1,
                        height: 40,
                      }}
                      selectedStyle={{
                        backgroundColor: COLORS.primary1,
                        // height: 10,
                        borderRadius: 20,
                      }}
                      unselectedStyle={{
                        backgroundColor: COLORS.gray2,
                        // height: 10,
                        borderRadius: 20,
                      }}
                      markerStyle={{
                        backgroundColor: COLORS.white,
                        width: 32,
                        height: 32,
                        borderRadius: 30,
                        borderColor: COLORS.primary1,
                        borderWidth: 5,
                      }}
                      touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40,
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
                    <MultiSlider
                      values={proximityValue}
                      onValuesChange={proximityValueChange}
                      sliderLength={width / 1.27}
                      min={2}
                      max={250}
                      step={1}
                      snapped
                      containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                      }}
                      selectedStyle={{
                        backgroundColor: COLORS.primary1,
                        borderRadius: 20,
                      }}
                      unselectedStyle={{
                        backgroundColor: COLORS.gray2,
                        // height: 10,
                        borderRadius: 20,
                      }}
                      markerStyle={{
                        backgroundColor: COLORS.white,
                        width: 32,
                        height: 32,
                        borderRadius: 30,
                        borderColor: COLORS.primary1,
                        borderWidth: 5,
                      }}
                      touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40,
                      }}
                    />
                  </View>
                </View>
                <View style={styles.filterContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleFilterText}>Gender</Text>
                    <Text style={styles.subTitleFilterText}>
                      Choose up to 4
                    </Text>
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
              </BottomSheetView>
              <BottomSheetView>
                <BottomSheetView style={styles.contentContainerAdvanced}>
                  <Text
                    style={[
                      styles.containerHeadline,
                      disabled && {color: COLORS.gray2},
                    ]}>
                    Advanced Filters
                  </Text>
                  <Text
                    style={[
                      styles.containerSubTitle,
                      {marginHorizontal: scale(16)},
                    ]}>
                    {disabled
                      ? 'Available for Thunder Bolt users only.\n' +
                        'More filters, more fun! Sign up now for an even more flexible customization.'
                      : 'More filters, more fun. Gora na!'}
                  </Text>
                </BottomSheetView>
                <BottomSheetView style={styles.scrollViewContainer}>
                  <View style={styles.filterContainer}>
                    <View style={styles.titleContainer}>
                      <Text
                        style={[
                          styles.titleFilterText,
                          disabled && {color: COLORS.gray2},
                        ]}>
                        Star Sign
                      </Text>
                      <Text
                        style={[
                          styles.subTitleFilterText,
                          disabled && {color: COLORS.gray2},
                        ]}>
                        Choose up to 4
                      </Text>
                    </View>
                    <View style={{marginVertical: scale(10)}}>
                      {/*  Star Sign Filter Options */}
                      <View>
                        <InterestButtonContainer
                          options={starSignOptions}
                          onSelectionChange={handleSelectionChangeStarSign}
                          selectedOptions={selectedStarSign}
                          isDisabled={disabled}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.filterContainer}>
                    <View style={styles.titleContainer}>
                      <Text
                        style={[
                          styles.titleFilterText,
                          disabled && {color: COLORS.gray2},
                        ]}>
                        Interest
                      </Text>
                      <Text
                        style={[
                          styles.subTitleFilterText,
                          disabled && {color: COLORS.gray2},
                        ]}>
                        Choose up to 4
                      </Text>
                    </View>
                    <View style={{marginVertical: scale(10)}}>
                      {/*  Interest Filter Options */}
                      <View>
                        <InterestButtonContainer
                          options={interestOptions}
                          onSelectionChange={handleSelectionChange}
                          selectedOptions={selectedInterests}
                          isDisabled={true}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.filterContainer}>
                    <View style={styles.titleContainer}>
                      <Text
                        style={[
                          styles.titleFilterText,
                          disabled && {color: COLORS.gray2},
                        ]}>
                        Personality Type
                      </Text>
                      <Text
                        style={[
                          styles.subTitleFilterText,
                          disabled && {color: COLORS.gray2},
                        ]}>
                        Choose up to 2
                      </Text>
                    </View>
                    <View style={{marginVertical: scale(10)}}>
                      <SelectableButton
                        buttonData={personalityData}
                        onPress={handleSelectedPersonality}
                        initialSelections={selectedPersonality}
                        maxSelections={2}
                        isDisabled={disabled}
                      />
                    </View>
                  </View>
                </BottomSheetView>
              </BottomSheetView>
            </ScrollView>
          </>
        )}
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
  contentContainerAdvanced: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray2,
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
