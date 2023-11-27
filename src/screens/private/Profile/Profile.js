// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

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

  const renderBackButton = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          right: scale(310),
          top: verticalScale(isIosDevice() ? 5 : 10),
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
        colors={['#f2653c', '#fa7d35', '#fe9630', '#ffae2f', '#ffc634']}
        start={{x: 0.5, y: 1}}
        end={{x: 0.5, y: 0}}
        style={{
          height: verticalScale(isIosDevice() ? 420 : 450),
          borderBottomLeftRadius: 120,
          borderBottomRightRadius: 120,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {renderBackButton()}
          <View style={{left: scale(15), alignSelf: 'center'}}>
            <Text size={25} color="#fff" weight="700">
              {customerProfile?.name}, {calculateAge(customerProfile?.birthday)}
            </Text>
            <Text size={15} color="#fff" customStyle={{textAlign: 'center'}}>
              {`Compatibility Score: ${compatibilityScore}`}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: verticalScale(isIosDevice() ? 50 : 80),
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
      <Image
        source={{uri: customerProfile?.customerPhoto?.[0]?.photoUrl}}
        height={isIosDevice() ? 320 : 340}
        width={isIosDevice() ? 360 : 355}
        resizeMode="cover"
        customStyle={{
          borderBottomLeftRadius: 120,
          borderBottomRightRadius: 120,
        }}
      />
    </TouchableOpacity>
  );
};

export default Profile;
