// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View, ImageBackground} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import PhotoCarousel from '../../../composition/PhotoCarousel/PhotoCarousel';
import MatchInformationSection from '../../../composition/MatchInformationSection/MatchInformationSection';

// Utils
import {
  calculateAge,
  isIosDevice,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../../utils/images';

const Profile = props => {
  const {
    compatibilityScore,
    customerProfile,
    isUserInformationShown,
    setUserInformationShown,
  } = props;
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const customerPhotoUrl = customerProfile?.customerPhoto;
  const firstName = customerProfile?.name.split(' ')[0];

  const renderBackButton = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          left: 200,
          top: verticalScale(isIosDevice() ? 8 : 10),
        }}>
        <TouchableOpacity onPress={() => setUserInformationShown(false)}>
          <Image
            source={GLOBAL_ASSET_URI.PROFILE_BACK_ICON}
            height={20}
            width={20}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (isUserInformationShown) {
    return (
      <LinearGradient
        colors={['#E72454', '#fa7d35', '#f5bd44']}
        start={{x: 0.1, y: 1}}
        end={{x: 0, y: 0.1}}
        style={{
          height: verticalScale(420),
          width: 730,
          borderBottomLeftRadius: 730,
          borderBottomRightRadius: 730,
          overflow: 'hidden',
          left: '50%',
          marginLeft: -365,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {renderBackButton()}
          <View style={{alignSelf: 'center'}}>
            <Text
              fontFamily="Montserrat-Bold"
              size={25}
              color="#fff"
              weight={700}
              numberOfLines={2}
              ellipsizeMode="tail"
              customStyle={{textAlign: 'center', width: scale(250)}}>
              {firstName},{' '}
              <Text
                size={25}
                weight={500}
                color="#fff"
                customStyle={{textAlign: 'center'}}
                fontFamily="Montserrat-Bold">
                {calculateAge(customerProfile?.birthday)}
              </Text>
            </Text>
            <Text
              size={10}
              weight={700}
              color="#fff"
              customStyle={{textAlign: 'center'}}
              fontFamily="Montserrat-Bold">
              {`Compatibility Score: ${compatibilityScore}`}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: verticalScale(isIosDevice() ? 60 : 90),
            }}>
            <PhotoCarousel
              setOpenPhotoModal={setOpenPhotoModal}
              customerPhotoUrl={customerPhotoUrl}
              openPhotoModal={openPhotoModal}
            />
          </View>
          <Separator space={isIosDevice() ? 90 : 120} />
          <MatchInformationSection
            customerDetails={customerProfile?.customerDetails}
          />
        </View>
      </LinearGradient>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setUserInformationShown(true)}>
      <ImageBackground // Use ImageBackground for the background image
        source={{uri: customerProfile?.customerPhoto?.[0]?.photoUrl}}
        style={{
          // flex: 1,
          height: verticalScale(350),
          width: 730,
          borderBottomLeftRadius: 730,
          borderBottomRightRadius: 730,
          overflow: 'hidden',
          left: '50%',
          marginLeft: -365,
        }}
        blurRadius={5} // Apply blur effect to the background image
      >
        <Image // Main image remains the same
          source={{uri: customerProfile?.customerPhoto?.[0]?.photoUrl}}
          height={verticalScale(400)}
          resizeMode="contain"
          customStyle={{
            width: 'auto',
          }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Profile;
