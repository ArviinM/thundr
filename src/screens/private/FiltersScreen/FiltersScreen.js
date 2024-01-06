// React modules
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useNavigation} from '@react-navigation/native';

// Components
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import AdvancedFilters from '../AdvancedFilters/AdvancedFilters';

// Utils
import {FILTERS_ASSET_URI, GLOBAL_ASSET_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import {useDispatch, useSelector} from 'react-redux';
import {GET_FILTERS, UPDATE_FILTERS} from '../../../ducks/Filters/actionTypes';
import Spinner from '../../../components/Spinner/Spinner';

const FiltersScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {subscriptionDetails} = useSelector(state => state.subscription);
  const {updatedFilters, loading} = useSelector(state => state.filters);
  const {ageMin, ageMax, proximity: apiProximity} = updatedFilters;
  const [age, setAge] = useState([Number(ageMin || 35), Number(ageMax || 80)]);
  const [proximity, setProximity] = useState(Number(apiProximity || 2));
  const [isAdvanceFilterVisible, setAdvanceFilterVisible] = useState(false);
  const withSubscription = subscriptionDetails?.withSubscription;

  const renderCustomMarker = () => (
    <Image source={FILTERS_ASSET_URI.SLIDER_MARKER} height={50} width={50} />
  );

  if (loading && !updatedFilters.length) {
    return <Spinner />;
  }

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{backgroundColor: '#EDE8E5', flexGrow: 1}}>
      <View
        style={{
          flexDirection: 'row',
          gap: scale(240),
          alignItems: 'center',
          justifyContent: 'center',
          top: verticalScale(20),
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'DashboardTabs'}],
            })
          }>
          <Image source={GLOBAL_ASSET_URI.BACK_ICON} width={25} height={25} />
        </TouchableOpacity>
        <Button
          title="Save"
          style={{width: scale(50), height: verticalScale(30)}}
          onPress={() => {
            dispatch({
              type: UPDATE_FILTERS,
              payload: {
                ageMax: age[1],
                ageMin: age[0],
                proximity: proximity[0],
              },
            });
            navigation.reset({
              index: 0,
              routes: [{name: 'DashboardTabs'}],
            });
          }}
        />
      </View>
      <Separator space={20} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          size={30}
          weight={700}
          fontFamily="ClimateCrisis-Regular"
          color="#E43D59">
          Filters
        </Text>
        <Text
          fontFamily="Montserrat-Regular"
          color="#808080"
          customStyle={{textAlign: 'center', paddingHorizontal: scale(35)}}>
          There are plenty of fishes in the sea; make sure they are the right
          age and location, mars.
        </Text>
      </View>
      <Separator space={20} />
      <View style={{left: scale(28)}}>
        <Text size={25} color="#E43D59" weight={700}>
          Age
        </Text>
        <Separator space={5} />
        <Text
          weight={700}
          size={20}
          color="#808080">{`Between ${age[0]} to ${age[1]}`}</Text>
      </View>
      <Separator space={10} />
      <View style={{alignSelf: 'center'}}>
        <LinearGradient
          colors={['#FEBC29', '#E43D59']}
          style={{
            height: verticalScale(10),
            width: scale(250),
            borderRadius: 10,
            top: 7,
          }}
        />
        <MultiSlider
          values={age}
          sliderLength={300}
          onValuesChange={newValues => setAge(newValues)}
          customMarker={renderCustomMarker}
          min={35}
          max={80}
          step={1}
          allowOverlap
          snapped
          selectedStyle={{backgroundColor: 'transparent'}}
          unselectedStyle={{backgroundColor: 'transparent'}}
          containerStyle={{
            height: verticalScale(-30),
            marginBottom: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </View>
      <Separator space={30} />
      <View style={{left: scale(28)}}>
        <Text size={25} color="#E43D59" weight={700}>
          Proximity
        </Text>
        <Separator space={5} />
        <Text
          weight={700}
          size={20}
          color="#808080">{`Up to ${proximity}km away`}</Text>
      </View>
      <Separator space={10} />
      <View style={{alignSelf: 'center'}}>
        <LinearGradient
          colors={['#FEBC29', '#E43D59']}
          style={{
            height: verticalScale(10),
            width: scale(250),
            borderRadius: 10,
            top: 7,
          }}
        />
        <MultiSlider
          values={[proximity]}
          sliderLength={300}
          onValuesChange={newValue => setProximity(newValue)}
          customMarker={renderCustomMarker}
          min={2}
          max={250}
          step={2}
          allowOverlap
          snapped
          selectedStyle={{backgroundColor: 'transparent'}}
          unselectedStyle={{backgroundColor: 'transparent'}}
          containerStyle={{
            height: verticalScale(-30),
            marginBottom: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </View>
      <View style={{top: verticalScale(20)}}>
        <TouchableOpacity
          disabled={!withSubscription}
          style={{alignItems: 'center'}}
          onPress={() => setAdvanceFilterVisible(!isAdvanceFilterVisible)}>
          <Image
            source={
              withSubscription
                ? FILTERS_ASSET_URI.ADVANCED_FILTERS
                : FILTERS_ASSET_URI.DISABLED_ADVANCED_FILTERS
            }
            width={300}
            height={100}
          />
        </TouchableOpacity>
        <Separator space={25} />
        <Text
          size={15}
          color="#808080"
          customStyle={{
            textAlign: 'center',
            bottom: verticalScale(50),
            paddingHorizontal: scale(20),
          }}>
          {withSubscription
            ? 'More filters, more fun. Gora na!'
            : 'More filters, more fun! Sign up now for an even more flexible customization.'}
        </Text>
      </View>
      {!withSubscription && (
        <TouchableOpacity onPress={() => navigation.navigate('ThunderBolt')}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={FILTERS_ASSET_URI.SUBSCRIBE_BUTTON}
              width={220}
              height={130}
            />
          </View>
        </TouchableOpacity>
      )}
      {isAdvanceFilterVisible && <AdvancedFilters />}
    </ScrollView>
  );
};

export default FiltersScreen;
