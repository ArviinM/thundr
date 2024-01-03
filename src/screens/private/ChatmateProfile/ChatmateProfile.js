// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// Components
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import MatchInformationSection from '../../../composition/MatchInformationSection/MatchInformationSection';
import Separator from '../../../components/Separator/Separator';
import PhotoCarousel from '../../../composition/PhotoCarousel/PhotoCarousel';

// Utils
import {GLOBAL_ASSET_URI} from '../../../utils/images';
import {calculateAge, scale, verticalScale} from '../../../utils/commons';

const ChatmateProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {chatCustomerDetails, compatibilityScore} = route?.params;
  const customerPhotoUrl = chatCustomerDetails?.customerPhoto;
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  return (
    <LinearGradient
      colors={['#f2653c', '#fa7d35', '#fe9630', '#ffae2f', '#ffc634']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <View style={{top: verticalScale(20), left: scale(20), zIndex: 1}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={GLOBAL_ASSET_URI.PROFILE_BACK_ICON}
            height={25}
            width={25}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text color="#fff" weight={700} size={25} fontFamily="Montserrat-Bold">
          {chatCustomerDetails?.name},{' '}
          {calculateAge(chatCustomerDetails?.birthday)}
        </Text>
        <Text color="#fff" size={15} fontFamily="Montserrat-Medium">
          {`Compatibility Score: ${compatibilityScore || 0}%`}
        </Text>
      </View>
      <Separator space={10} />
      <View>
        <PhotoCarousel
          setOpenPhotoModal={setOpenPhotoModal}
          openPhotoModal={openPhotoModal}
          customerPhotoUrl={customerPhotoUrl}
        />
      </View>
      <Separator space={20} />
      <View
        style={{
          backgroundColor: '#E43C59',
          width: scale(290),
          alignSelf: 'center',
          borderRadius: 20,
        }}>
        <MatchInformationSection
          fromChatmateProfile={true}
          customerDetails={chatCustomerDetails?.customerDetails}
        />
      </View>
    </LinearGradient>
  );
};

export default ChatmateProfile;
