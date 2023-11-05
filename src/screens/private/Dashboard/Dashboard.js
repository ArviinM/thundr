// React modules
import React from 'react';
import {View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';

// Components
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';

// Utils
import {isIosDevice, verticalScale} from '../../../utils/commons';
import {useDispatch} from 'react-redux';
import {START_LOGOUT} from '../../../ducks/Login/actionTypes';

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0D5176',
      }}>
      <Separator space={80} />
      <Text size={30} weight="700" color="#fff">
        Welcome to Dashboard
      </Text>
      <View style={{height: '70%'}}>
        <Onboarding
          imageContainerStyles={{padding: 0}}
          containerStyles={{
            height: 1,
            top: verticalScale(isIosDevice() ? -130 : -120),
          }}
          showPagination={false}
          bottomBarColor="transparent"
          bottomBarHighlight={false}
          pages={[
            {
              backgroundColor: '#0D5176',
              image: (
                <Image
                  source={require('../../../assets/Images/onboarding-1.png')}
                  height={180}
                  width={300}
                />
              ),
              title: 'PAGE 1',
              subtitle:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
              backgroundColor: '#0D5176',
              image: (
                <Image
                  source={require('../../../assets/Images/onboarding-2.png')}
                  height={180}
                  width={300}
                />
              ),
              title: 'PAGE 2',
              subtitle:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
              backgroundColor: '#0D5176',
              image: (
                <Image
                  source={require('../../../assets/Images/onboarding-3.png')}
                  height={180}
                  width={300}
                />
              ),
              title: 'PAGE 3',
              subtitle:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
          ]}
        />
      </View>

      <Button
        title="Logout"
        onPress={() => {
          // navigation.navigate('LoginScreen');
          dispatch({type: START_LOGOUT});
        }}
      />
    </View>
  );
};

export default Dashboard;
