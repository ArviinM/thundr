// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import PhotoCarousel from '../../../composition/PhotoCarousel/PhotoCarousel';
import MatchInformationSection from '../../../composition/MatchInformationSection/MatchInformationSection';
import PhotoModal from '../../../composition/PhotoModal/PhotoModal';

// Utils
import {calculateAge, isIosDevice, verticalScale} from '../../../utils/commons';

const Profile = props => {
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const {compatibilityScore, customerProfile} = props;
  const customerPhotoUrl = customerProfile?.customerPhoto?.[0]?.photoUrl;

  return (
    <LinearGradient
      colors={['#f2653c', '#fa7d35', '#fe9630', '#ffae2f', '#ffc634']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{
        flex: 1,
        borderBottomLeftRadius: 120,
        borderBottomRightRadius: 120,
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {/* <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: scale(310),
              top: verticalScale(10),
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={GLOBAL_ASSET_URI.BACK_ICON}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          </View> */}
          <Text size={25} color="#fff" weight="700">
            {customerProfile?.name}, {calculateAge(customerProfile?.birthday)}
          </Text>
          <Text size={15} color="#fff" customStyle={{textAlign: 'center'}}>
            {`Compatibility Score: ${compatibilityScore}`}
          </Text>
          <View
            style={{
              position: 'absolute',
              top: verticalScale(isIosDevice() ? 50 : 80),
            }}>
            <PhotoCarousel
              setOpenPhotoModal={setOpenPhotoModal}
              customerPhotoUrl={customerPhotoUrl}
            />
          </View>
          <PhotoModal
            setOpenPhotoModal={setOpenPhotoModal}
            openPhotoModal={openPhotoModal}
            customerPhotoUrl={customerPhotoUrl}
          />
          <Separator space={isIosDevice() ? 90 : 120} />
          <MatchInformationSection
            customerDetails={customerProfile?.customerDetails}
          />
        </View>
        <Separator space={20} />
        <View>
          <Image
            source={{uri: customerPhotoUrl}}
            height={isIosDevice() ? 300 : 340}
            width={isIosDevice() ? 360 : 355}
            resizeMode="cover"
            customStyle={{
              borderBottomLeftRadius: 120,
              borderBottomRightRadius: 120,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Profile;
