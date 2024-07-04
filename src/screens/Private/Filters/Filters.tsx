import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAuth} from '../../../providers/Auth.tsx';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';
import useSubscribeCheck from '../../../store/subscribeStore.ts';
import {useGetCustomerFilters} from '../../../hooks/filters/useGetCustomerFilters.ts';
import {useCustomerFilters} from '../../../hooks/filters/useCustomerFilters.ts';
import {
  convertAbbreviationsToFullWords,
  convertFullWordsToAbbreviations,
  scale,
} from '../../../utils/utils.ts';
import Toast from 'react-native-toast-message';
import {Loading} from '../../../components/shared/Loading.tsx';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LetterGradientButton from '../../../components/shared/LetterGradientButton.tsx';

import CircleButton from '../../../components/shared/CircleButton.tsx';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  interestOptions,
  starSignOptions,
} from '../../../components/CustomerInterest/options.ts';
import InterestButtonContainer from '../../../components/CustomerInterest/InterestButtonContainer.tsx';
import SelectableButton from '../../../components/CustomerPersonalityType/SelectableButton.tsx';
import {personalityData} from '../../../components/CustomerPersonalityType/personalityData.ts';
import {
  politics as politicsOptions,
  religion as religionOptions,
} from '../../../utils/dropdownOptions.ts';

const Filters = () => {
  const auth = useAuth();
  const query = useQueryClient(queryClient);
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const isCustomerSubscribed = useSubscribeCheck(
    state => state.isCustomerSubscribed,
  );

  const [loading, isLoading] = useState<boolean>(false);
  const getCustomerFilters = useGetCustomerFilters({
    sub: auth.authData?.sub || [],
  });
  const customerFilters = useCustomerFilters();

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

  const currentCustomerReligion = getCustomerFilters.data?.religion || '';
  const religionArray = currentCustomerReligion.split(',');
  const [selectedReligion, setSelectedReligion] = useState<string[]>([]);

  const currentCustomerPolitics = getCustomerFilters.data?.politics || '';
  const politicsArray = currentCustomerPolitics.split(',');
  const [selectedPolitics, setSelectedPolitics] = useState<string[]>([]);

  const currentFilteredPersonality =
    getCustomerFilters.data?.personalityType || '';
  const filteredPersonalityArray = currentFilteredPersonality.split(',');
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([]);

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
    const cleanedReligion = religionArray
      .map((religion: string) => religion.trim()) // Trim each element
      .filter((religion: string) => religion !== ''); // Filter empty elements
    setSelectedReligion(cleanedReligion);
  }, [currentCustomerReligion]);

  useEffect(() => {
    const cleanedPolitics = politicsArray
      .map((politics: string) => politics.trim()) // Trim each element
      .filter((politics: string) => politics !== ''); // Filter empty elements

    setSelectedPolitics(cleanedPolitics);
  }, [currentCustomerPolitics]);

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

  const handleSelectionChangeReligion = (newSelectedOptions: string[]) => {
    setSelectedReligion(newSelectedOptions);
  };

  const handleSelectionChangePolitics = (newSelectedOptions: string[]) => {
    setSelectedPolitics(newSelectedOptions);
  };

  const handleSelectedPersonality = (newSelectedOptions: string[]) => {
    setSelectedPersonality(newSelectedOptions);
  };

  const handleSubmit = async () => {
    try {
      isLoading(true);

      if (auth.authData) {
        await customerFilters.mutateAsync({
          sub: auth.authData.sub,
          updateDate: Date.now().toString(),
          proximity: proximityValue.toString(),
          ageMax: (maxValue + 35).toString(),
          ageMin: (minValue + 35).toString(),
          gender: convertAbbreviationsToFullWords(selectedLetters),
          hobbies: selectedInterests.toString() || '',
          starSign: selectedStarSign.toString() || '',
          religion: selectedReligion.toString() || '',
          politics: selectedPolitics.toString() || '',
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

        navigation.goBack();
      }
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
        convertFullWordsToAbbreviations(getCustomerFilters.data?.gender || ''),
      );
    }
  }, [getCustomerFilters.isSuccess, getCustomerFilters.data]);

  // Bottom Sheet Setup
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [bottomSheetType, setBottomSheetType] = useState<
    'interest' | 'starSign' | 'politics' | 'religion' | 'personalityType' | null
  >(null);

  const handleOpenBottomSheet = useCallback(
    (
      type:
        | 'interest'
        | 'starSign'
        | 'politics'
        | 'religion'
        | 'personalityType',
    ) => {
      setBottomSheetType(type);
      bottomSheetRef.current?.present();
    },
    [],
  );

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

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Bottom Sheet Modal */}

      <BottomSheetModal
        ref={bottomSheetRef}
        // index={0}
        snapPoints={['30%', '40%', '60%', '80%']}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={true}>
        <BottomSheetView style={styles.bottomSheetContentContainer}>
          <BottomSheetView style={{flex: 1, gap: 10}}>
            <BottomSheetView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.titleFilterText,
                  !isCustomerSubscribed && {color: COLORS.gray2},
                ]}>
                {bottomSheetType === 'interest' && 'Interest'}
                {bottomSheetType === 'starSign' && 'Star Sign'}
                {bottomSheetType === 'politics' && 'Politics'}
                {bottomSheetType === 'religion' && 'Religion'}
                {bottomSheetType === 'personalityType' && 'Personality Type'}
              </Text>
              <Text
                style={[
                  styles.subTitleFilterText,
                  !isCustomerSubscribed && {color: COLORS.gray2},
                ]}>
                Choose up to {bottomSheetType !== 'personalityType' ? '4' : '2'}
              </Text>
            </BottomSheetView>
            {bottomSheetType === 'interest' && (
              <InterestButtonContainer
                options={interestOptions}
                onSelectionChange={handleSelectionChange}
                selectedOptions={selectedInterests}
                isDisabled={!isCustomerSubscribed}
              />
            )}
            {bottomSheetType === 'starSign' && (
              <InterestButtonContainer
                options={starSignOptions}
                onSelectionChange={handleSelectionChangeStarSign}
                selectedOptions={selectedStarSign}
                isDisabled={!isCustomerSubscribed}
              />
            )}
            {bottomSheetType === 'politics' && (
              <InterestButtonContainer
                options={politicsOptions}
                onSelectionChange={handleSelectionChangePolitics}
                selectedOptions={selectedPolitics}
                isDisabled={!isCustomerSubscribed}
              />
            )}
            {bottomSheetType === 'religion' && (
              <InterestButtonContainer
                options={religionOptions}
                onSelectionChange={handleSelectionChangeReligion}
                selectedOptions={selectedReligion}
                isDisabled={!isCustomerSubscribed}
              />
            )}
            {bottomSheetType === 'personalityType' && (
              <SelectableButton
                buttonData={personalityData}
                onPress={handleSelectedPersonality}
                initialSelections={selectedPersonality}
                maxSelections={2}
                isDisabled={!isCustomerSubscribed}
              />
            )}
          </BottomSheetView>
          {/*<InterestButtonContainer*/}
          {/*  options={starSignOptions}*/}
          {/*  onSelectionChange={handleSelectionChangeStarSign}*/}
          {/*  selectedOptions={selectedStarSign}*/}
          {/*  isDisabled={!isCustomerSubscribed}*/}
          {/*/>*/}
          {/*<SelectableButton*/}
          {/*  buttonData={personalityData}*/}
          {/*  onPress={handleSelectedPersonality}*/}
          {/*  initialSelections={selectedPersonality}*/}
          {/*  maxSelections={2}*/}
          {/*  isDisabled={!isCustomerSubscribed}*/}
          {/*/>*/}
        </BottomSheetView>
      </BottomSheetModal>

      {getCustomerFilters.isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollView>
            <View style={styles.contentContainer}>
              <Text style={styles.containerSubTitle}>
                There are plenty of fishes in the sea; make sure they are
                {'\n'}
                the right age and location, mars
                {'\n\n'}
                Make sure to press the check button to save your filters!
              </Text>
            </View>
            <View style={styles.scrollViewContainer}>
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
            </View>
            <View>
              <View style={styles.contentContainerAdvanced}>
                <Text
                  style={[
                    styles.containerHeadline,
                    !isCustomerSubscribed && {color: COLORS.gray2},
                  ]}>
                  Advanced Filters
                </Text>
                <Text
                  style={[styles.containerSubTitle, {paddingBottom: scale(0)}]}>
                  {!isCustomerSubscribed
                    ? 'Available for Thunder Bolt users only.\n' +
                      'More filters, more fun! Sign up now for an even more flexible customization.'
                    : 'More filters, more fun. Gora na!'}
                </Text>
              </View>
            </View>
            <View style={styles.scrollViewContainer}>
              <View style={styles.filterContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    style={[
                      styles.titleFilterText,
                      !isCustomerSubscribed && {color: COLORS.gray2},
                    ]}>
                    Interest
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.selectContainer}
                  onPress={() => handleOpenBottomSheet('interest')}
                  disabled={!isCustomerSubscribed}>
                  <View>
                    <View>{/*Icon*/}</View>

                    <Text style={styles.selectText}>
                      {selectedInterests.length > 0
                        ? selectedInterests.join(', ') // Join with comma and space
                        : 'Select Interest'}
                    </Text>
                  </View>
                  <View>{/*Chevron Right*/}</View>
                </TouchableOpacity>
              </View>
              <View style={styles.filterContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    style={[
                      styles.titleFilterText,
                      !isCustomerSubscribed && {color: COLORS.gray2},
                    ]}>
                    Star Sign
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.selectContainer}
                  onPress={() => handleOpenBottomSheet('starSign')}
                  disabled={!isCustomerSubscribed}>
                  <View>
                    <View>{/*Icon*/}</View>
                    <Text style={styles.selectText}>
                      {selectedStarSign.length > 0
                        ? selectedStarSign.join(', ') // Join with comma and space
                        : 'Select Star Sign'}
                    </Text>
                  </View>
                  <View>{/*Chevron Right*/}</View>
                </TouchableOpacity>
              </View>
              <View style={styles.filterContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    style={[
                      styles.titleFilterText,
                      !isCustomerSubscribed && {color: COLORS.gray2},
                    ]}>
                    Religion
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.selectContainer}
                  onPress={() => handleOpenBottomSheet('religion')}
                  disabled={!isCustomerSubscribed}>
                  <View>
                    <View>{/*Icon*/}</View>
                    <Text style={styles.selectText}>
                      {selectedReligion.length > 0
                        ? selectedReligion.join(', ') // Join with comma and space
                        : 'Select Religion'}
                    </Text>
                  </View>
                  <View>{/*Chevron Right*/}</View>
                </TouchableOpacity>
              </View>
              <View style={styles.filterContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    style={[
                      styles.titleFilterText,
                      !isCustomerSubscribed && {color: COLORS.gray2},
                    ]}>
                    Politics
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.selectContainer}
                  onPress={() => handleOpenBottomSheet('politics')}
                  disabled={!isCustomerSubscribed}>
                  <View>
                    <View>{/*Icon*/}</View>
                    <Text style={styles.selectText}>
                      {selectedPolitics.length > 0
                        ? selectedPolitics.join(', ') // Join with comma and space
                        : 'Select Politics'}
                    </Text>
                  </View>
                  <View>{/*Chevron Right*/}</View>
                </TouchableOpacity>
              </View>
              <View style={styles.filterContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    style={[
                      styles.titleFilterText,
                      !isCustomerSubscribed && {color: COLORS.gray2},
                    ]}>
                    Personality Type
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.selectContainer}
                  onPress={() => handleOpenBottomSheet('personalityType')}
                  disabled={!isCustomerSubscribed}>
                  <View>
                    <View>{/*Icon*/}</View>
                    <Text style={styles.selectText}>
                      {selectedPersonality.length > 0
                        ? selectedPersonality.join(', ') // Join with comma and space
                        : 'Select Personality Type'}
                    </Text>
                  </View>
                  <View>{/*Chevron Right*/}</View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <View style={styles.fabContainer}>
            <CircleButton onPress={handleSubmit} isCheck loading={loading} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Filters;

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
    fontSize: scale(20),
    color: COLORS.primary1,
    fontFamily: 'Montserrat-SemiBold',
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
  fabContainer: {
    position: 'absolute',
    bottom: 16, // Adjust the distance from the bottom as needed
    right: 16, // Adjust the distance from the right as needed
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Add elevation for shadow (Android)
  },
  selectContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: scale(55),
    borderRadius: 30,
    marginVertical: scale(6),
    borderColor: '#9D8E90',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: scale(16),
  },
  selectText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scale(13),
  },
  bottomSheetBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  bottomSheetHandleIndicator: {
    backgroundColor: COLORS.gray3,
    width: 40,
    height: 5,
    borderRadius: 2.5,
    marginBottom: 10,
  },
  bottomSheetContentContainer: {
    flex: 1,
    padding: 20,
  },
  interestItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
  },
  interestItemText: {
    fontSize: 16,
  },
});
