// React modules
import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';

// Third party libraries

// Components
import Text from '../../components/Text/Text';
import Separator from '../../components/Separator/Separator';

// Utils
import {isIosDevice, scale, verticalScale} from '../../utils/commons';
import {DASHBOARD_ASSET_URI} from '../../utils/images';
import Image from '../../components/Image/Image';

const data = [
  {
    category: 'BIO',
    content: 'Lorem ipsum dolor sit amet adadad asdasfjf sjfsjfs jfsfj sfjfj',
  },
  {category: 'WORK', content: 'Lorem ipsum dolor sit amet'},
  {category: 'LOCATION', content: 'Lorem ipsum dolor sit amet'},
  {category: 'HOBBIES', content: 'Lorem ipsum dolor sit amet'},
  {category: 'Bio', content: 'Lorem ipsum dolor sit amet'},
];

const getPersonalityTypeImage = personalityType => {
  switch (personalityType) {
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
  const {customerDetails} = props;

  console.log('customerDetails', customerDetails);

  const renderInformationSection = ({item}) => {
    return (
      <View>
        <Text color="#fff" weight="700" size={18}>
          BIO
        </Text>
        <Text color="#fff" size={16}>
          {item?.bio}
        </Text>
        <Separator space={10} />
        <Text color="#fff" weight="700" size={18}>
          WORK
        </Text>
        <Text color="#fff" size={16}>
          {item?.work}
        </Text>
        <Separator space={10} />
        <Text color="#fff" weight="700" size={18}>
          LOCATION
        </Text>
        <Text color="#fff" size={16}>
          {item?.location}
        </Text>
        <Separator space={10} />
        {/* <Text color="#fff" weight="700">
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
            <Text color="#fff" weight="700" size={18}>
              EDUCATION
            </Text>
            <Text color="#fff" size={16}>
              {item?.education}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700" size={18}>
              RELIGION
            </Text>
            <Text color="#fff" size={16}>
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
            <Text color="#fff" weight="700" size={18}>
              HEIGHT
            </Text>
            <Text color="#fff" size={16}>
              {item?.height}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700" size={18}>
              STAR SIGN
            </Text>
            <Text color="#fff" size={16}>
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
            <Text color="#fff" weight="700" size={18}>
              DRINKING
            </Text>
            <Text color="#fff" size={16}>
              {item?.drinking}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700" size={18}>
              SMOKING
            </Text>
            <Text color="#fff" size={16}>
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
            <Text color="#fff" weight="700" size={18}>
              PET
            </Text>
            <Text color="#fff" size={16}>
              {item?.pet}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700" size={18}>
              POLITICS
            </Text>
            <Text color="#fff" size={16}>
              {item?.politics}
            </Text>
          </View>
        </View>
        <Separator space={10} />
        <Text color="#fff" weight="700" size={18}>
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
        height: verticalScale(isIosDevice() ? 260 : 230),
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
