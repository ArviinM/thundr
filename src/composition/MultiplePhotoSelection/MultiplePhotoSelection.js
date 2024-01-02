// React modules
import React from 'react';
import {View} from 'react-native';

// Third party libraries
import {TouchableOpacity} from 'react-native-gesture-handler';

// Components
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';
import Image from '../../components/Image/Image';

// Utils
import {GLOBAL_ASSET_URI} from '../../utils/images';
import {scale, verticalScale} from '../../utils/commons';

const MultiplePhotoSelection = props => {
  const {imageSource, openImageLibrary} = props;
  return (
    <View style={{flexDirection: 'row', left: scale(-10), flex: 1}}>
      <TouchableOpacity onPress={openImageLibrary}>
        <BorderLinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#E72454', '#FFC227']}
          style={{
            flex: 1,
            height: verticalScale(135),
            alignItems: 'center',
            marginBottom: verticalScale(10),
          }}>
          <View
            style={{
              height: verticalScale(130),
              width: scale(130),
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={GLOBAL_ASSET_URI.ADD_ICON}
              height={30}
              width={30}
              resizeMode="cover"
              customStyle={{borderRadius: 15}}
            />
          </View>
        </BorderLinearGradient>
      </TouchableOpacity>
      <View style={{flex: 1, flexDirection: 'column'}}>
        {[...Array(2)].map((_, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            {[...Array(2)].map((_, subIndex) => (
              <TouchableOpacity onPress={openImageLibrary}>
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
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      height: verticalScale(62),
                      width: scale(65),
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={GLOBAL_ASSET_URI.ADD_ICON}
                      height={20}
                      width={10}
                      resizeMode="cover"
                      customStyle={{borderRadius: 15}}
                    />
                  </View>
                </BorderLinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MultiplePhotoSelection;
