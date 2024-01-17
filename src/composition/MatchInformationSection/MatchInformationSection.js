// React modules
import React from 'react';
import {FlatList, View} from 'react-native';

// Third party libraries

// Components
import Text from '../../components/Text/Text';
import Separator from '../../components/Separator/Separator';

// Utils
import {isIosDevice, scale, verticalScale} from '../../utils/commons';
import {DASHBOARD_ASSET_URI} from '../../utils/images';
import Image from '../../components/Image/Image';

const getPersonalityTypeImage = personalityType => {
  switch (personalityType?.toLowerCase()) {
    case 'dog':
      return DASHBOARD_ASSET_URI.DOG_INFO;
    case 'otter':
      return DASHBOARD_ASSET_URI.OTTER_INFO;
    case 'lion':
      return DASHBOARD_ASSET_URI.LION_INFO;
    case 'beaver':
      return DASHBOARD_ASSET_URI.BEAVER_INFO;
    default:
  }
};

const MatchInformationSection = props => {
  const {customerDetails, fromChatmateProfile = false} = props;

  const renderInformationSection = ({item}) => {
    return (
      <View>
        <Text
          color="#fff"
          size={17}
          fontFamily="Montserrat-ExtraBold"
          weight={isIosDevice() ? 700 : 400}>
          BIO
        </Text>
        <Text
          color="#fff"
          size={14}
          fontFamily="Montserrat-Medium"
          weight={isIosDevice() ? 500 : 400}>
          {item?.bio}
        </Text>
        <Separator space={10} />
        <Text
          color="#fff"
          size={17}
          fontFamily="Montserrat-ExtraBold"
          weight={isIosDevice() ? 700 : 400}>
          WORK
        </Text>
        <Text
          color="#fff"
          size={14}
          fontFamily="Montserrat-Medium"
          weight={isIosDevice() ? 500 : 400}>
          {item?.work}
        </Text>
        <Separator space={10} />
        <Text
          color="#fff"
          size={17}
          fontFamily="Montserrat-ExtraBold"
          weight={isIosDevice() ? 700 : 400}>
          LOCATION
        </Text>
        <Text
          color="#fff"
          size={14}
          fontFamily="Montserrat-Medium"
          weight={isIosDevice() ? 500 : 400}>
          {item?.location}
        </Text>
        <Separator space={10} />
        {/* <Text color="#fff" >
          HOBBIES
        </Text> */}
        {/* <Separator space={10} /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text
              color="#fff"
              size={17}
              fontFamily="Montserrat-ExtraBold"
              weight={isIosDevice() ? 700 : 400}>
              EDUCATION
            </Text>
            <Text
              color="#fff"
              size={14}
              fontFamily="Montserrat-Medium"
              weight={isIosDevice() ? 500 : 400}>
              {item?.education}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              color="#fff"
              size={17}
              fontFamily="Montserrat-ExtraBold"
              weight={isIosDevice() ? 700 : 400}>
              RELIGION
            </Text>
            <Text
              color="#fff"
              size={14}
              fontFamily="Montserrat-Medium"
              weight={isIosDevice() ? 500 : 400}>
              {item?.religion}
            </Text>
          </View>
        </View>
        <Separator space={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text
              color="#fff"
              size={17}
              fontFamily="Montserrat-ExtraBold"
              weight={isIosDevice() ? 700 : 400}>
              HEIGHT
            </Text>
            <Text
              color="#fff"
              size={14}
              fontFamily="Montserrat-Medium"
              weight={isIosDevice() ? 500 : 400}>
              {item?.height}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              color="#fff"
              size={17}
              fontFamily="Montserrat-ExtraBold"
              weight={isIosDevice() ? 700 : 400}>
              STAR SIGN
            </Text>
            <Text
              color="#fff"
              size={14}
              fontFamily="Montserrat-Medium"
              weight={isIosDevice() ? 500 : 400}>
              {item?.starSign}
            </Text>
          </View>
        </View>
        <Separator space={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text
              color="#fff"
              size={17}
              fontFamily="Montserrat-ExtraBold"
              weight={isIosDevice() ? 700 : 400}>
              DRINKING
            </Text>
            <Text
              color="#fff"
              size={14}
              fontFamily="Montserrat-Medium"
              weight={isIosDevice() ? 500 : 400}>
              {item?.drinking}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              color="#fff"
              size={17}
              fontFamily="Montserrat-ExtraBold"
              weight={isIosDevice() ? 700 : 400}>
              SMOKING
            </Text>
            <Text
              color="#fff"
              size={14}
              fontFamily="Montserrat-Medium"
              weight={isIosDevice() ? 500 : 400}>
              {item?.smoking}
            </Text>
          </View>
        </View>
        <Separator space={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text
              color="#fff"
              size={17}
              fontFamily="Montserrat-ExtraBold"
              weight={isIosDevice() ? 700 : 400}>
              PET
            </Text>
            <Text
              color="#fff"
              size={14}
              fontFamily="Montserrat-Medium"
              weight={isIosDevice() ? 500 : 400}>
              {item?.pet}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              color="#fff"
              size={17}
              fontFamily="Montserrat-ExtraBold"
              weight={isIosDevice() ? 700 : 400}>
              POLITICS
            </Text>
            <Text
              color="#fff"
              size={14}
              fontFamily="Montserrat-Medium"
              weight={isIosDevice() ? 500 : 400}>
              {item?.politics}
            </Text>
          </View>
        </View>
        <Separator space={10} />
        <Text
          color="#fff"
          size={17}
          fontFamily="Montserrat-ExtraBold"
          weight={isIosDevice() ? 700 : 400}>
          PERSONALITY TYPE
        </Text>
        <Image
          source={getPersonalityTypeImage(item?.personalityType)}
          height={160}
          width={160}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        width: verticalScale(280),
        height: verticalScale(
          isIosDevice()
            ? fromChatmateProfile
              ? 350
              : 260
            : fromChatmateProfile
            ? 320
            : 230,
        ),
        borderRadius: 30,
        padding: scale(20),
      }}>
      <FlatList
        nestedScrollEnabled
        data={[customerDetails]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderInformationSection}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MatchInformationSection;
