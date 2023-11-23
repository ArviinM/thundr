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
    case 'Dog':
      return DASHBOARD_ASSET_URI.DOG_INFO;
    case 'Otter':
      return DASHBOARD_ASSET_URI.OTTER_INFO;
    case 'Lion':
      return DASHBOARD_ASSET_URI.LION_INFO;
    case 'Beaver':
      return DASHBOARD_ASSET_URI.BEAVER_INFO;
    default:
  }
};

const MatchInformationSection = props => {
  const {customerDetails} = props;

  const renderInformationSection = ({item}) => {
    return (
      <View>
        <Text color="#fff" weight="700">
          BIO
        </Text>
        <Text color="#fff">{item?.bio}</Text>
        <Separator space={10} />
        <Text color="#fff" weight="700">
          WORK
        </Text>
        <Text color="#fff">{item?.work}</Text>
        <Separator space={10} />
        <Text color="#fff" weight="700">
          LOCATION
        </Text>
        <Text color="#fff">{item?.location}</Text>
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
            <Text color="#fff" weight="700">
              EDUCATION
            </Text>
            <Text color="#fff">{item?.education}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700">
              RELIGION
            </Text>
            <Text color="#fff">{item?.religion}</Text>
          </View>
        </View>
        <Separator space={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700">
              HEIGHT
            </Text>
            <Text color="#fff">{item?.height}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700">
              STAR SIGN
            </Text>
            <Text color="#fff">{item?.starSign}</Text>
          </View>
        </View>
        <Separator space={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700">
              DRINKING
            </Text>
            <Text color="#fff">{item?.drinking}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700">
              SMOKING
            </Text>
            <Text color="#fff">{item?.smoking}</Text>
          </View>
        </View>
        <Separator space={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700">
              PET
            </Text>
            <Text color="#fff">{item?.pet}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text color="#fff" weight="700">
              POLITICS
            </Text>
            <Text color="#fff">{item?.politics}</Text>
          </View>
        </View>
        <Separator space={10} />
        <Text color="#fff" weight="700">
          PERSONALITY TYPE
        </Text>
        <Image
          source={getPersonalityTypeImage(item?.personalityType)}
          height={125}
          width={125}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#E33C59',
        width: verticalScale(280),
        height: verticalScale(isIosDevice() ? 215 : 180),
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
