// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';

// Components
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';

// Utils
import {GLOBAL_ASSET_URI, PROFILE_ASSET_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import {BorderLinearGradient} from '../PersonalityType/Styled';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../components/Text/Text';
import MatchInformationSection from '../../../composition/MatchInformationSection/MatchInformationSection';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#f2653c', '#fa7d35', '#fe9630', '#ffae2f', '#ffc634']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <View>
        <Separator space={20} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: scale(220),
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('DashboardTab')}>
            <Image
              source={GLOBAL_ASSET_URI.PROFILE_BACK_ICON}
              height={25}
              width={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfileScreen')}>
            <Image
              source={PROFILE_ASSET_URI.GEAR_ICON}
              height={25}
              width={25}
            />
          </TouchableOpacity>
        </View>
        <Text
          customStyle={{textAlign: 'center'}}
          fontFamily="Montserrat-Bold"
          weight={700}
          size={30}
          color="#fff">
          Cholo, 39
        </Text>
        <View style={{flexDirection: 'row', flex: 1, padding: scale(25)}}>
          <BorderLinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E72454', '#FFC227']}
            style={{
              flex: 1,
              height: verticalScale(140),
              alignItems: 'center',
              marginHorizontal: scale(4),
              marginBottom: verticalScale(10),
            }}>
            <View
              style={{
                height: verticalScale(135),
                width: scale(145),
                backgroundColor: '#9B9DA0',
                borderRadius: 15,
                alignItems: 'center',
              }}>
              <Image
                height={200}
                width={150}
                resizeMode="cover"
                customStyle={{borderRadius: 15}}
              />
            </View>
          </BorderLinearGradient>
          <View style={{flex: 1, flexDirection: 'column'}}>
            {[...Array(2)].map((_, index) => (
              <View
                key={index}
                style={{flexDirection: 'row', top: index * verticalScale(75)}}>
                {[...Array(2)].map((_, subIndex) => (
                  <BorderLinearGradient
                    key={subIndex}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#E72454', '#FFC227']}
                    style={{
                      height: verticalScale(65),
                      alignItems: 'center',
                      flex: 1,
                      marginHorizontal: scale(4),
                      marginBottom: verticalScale(5),
                    }}>
                    <View
                      style={{
                        height: verticalScale(62),
                        width: scale(60),
                        backgroundColor: '#9B9DA0',
                        borderRadius: 15,
                        alignItems: 'center',
                      }}>
                      <Image
                        height={100}
                        width={75}
                        resizeMode="cover"
                        customStyle={{borderRadius: 15}}
                      />
                    </View>
                  </BorderLinearGradient>
                ))}
              </View>
            ))}
          </View>
        </View>
        <Separator space={140} />
        <View
          style={{
            backgroundColor: '#E43C59',
            width: scale(290),
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <MatchInformationSection />
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;
