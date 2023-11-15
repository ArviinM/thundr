// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

// Components
import Image from '../../../components/Image/Image';

// Utils
import {ONBOARDING_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import {useDispatch} from 'react-redux';
import {UPDATE_PERSISTED_STATE} from '../../../ducks/PersistedState/actionTypes';

const OnboardingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const ONBOARDING_IMAGES = [
    ONBOARDING_URI.ONBOARDING_1,
    ONBOARDING_URI.ONBOARDING_2,
    ONBOARDING_URI.ONBOARDING_3,
    ONBOARDING_URI.ONBOARDING_4,
    ONBOARDING_URI.ONBOARDING_5,
    ONBOARDING_URI.ONBOARDING_6,
  ];

  return (
    <SwiperFlatList
      bounces={false}
      index={0}
      showPagination
      data={ONBOARDING_IMAGES}
      paginationActiveColor="#E53388"
      paginationDefaultColor="#FFC028"
      paginationStyleItem={{marginLeft: scale(1)}}
      paginationStyle={{bottom: verticalScale(45)}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4D1D0',
        }}>
        <Image source={ONBOARDING_URI.ONBOARDING_1} height={650} width={350} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4D1D0',
        }}>
        <Image source={ONBOARDING_URI.ONBOARDING_2} height={650} width={350} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4D1D0',
        }}>
        <Image source={ONBOARDING_URI.ONBOARDING_3} height={650} width={350} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4D1D0',
        }}>
        <Image source={ONBOARDING_URI.ONBOARDING_4} height={650} width={350} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4D1D0',
        }}>
        <Image source={ONBOARDING_URI.ONBOARDING_5} height={650} width={350} />
      </View>
      <LinearGradient
        colors={[
          '#febc29',
          '#fcb62e',
          '#fab032',
          '#f7aa35',
          '#f4a439',
          '#f49a3a',
          '#f38f3c',
          '#f1853f',
          '#f17443',
          '#ef6249',
          '#ea5051',
          '#e43d59',
        ]}
        start={{x: 0.5, y: 1}} // Start at the middle of the bottom (x: 0.5, y: 1)
        end={{x: 0.5, y: 0}} // End at the middle of the top (x: 0.5, y: 0)
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
          }}>
          <Image
            source={ONBOARDING_URI.ONBOARDING_6}
            height={650}
            width={350}
          />
        </View>
      </LinearGradient>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4D1D0',
        }}>
        <Image source={ONBOARDING_URI.ONBOARDING_7} height={650} width={350} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginOptionScreen');
            dispatch({
              type: UPDATE_PERSISTED_STATE,
              newState: {onboarded: true},
            });
          }}
          style={{
            position: 'absolute',
            top: verticalScale(260),
            alignSelf: 'center',
          }}>
          <View>
            <Image
              source={ONBOARDING_URI.ONBOARDING_THUNDR_BUTTON}
              height={210}
              width={230}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SwiperFlatList>
  );
};

export default OnboardingScreen;
