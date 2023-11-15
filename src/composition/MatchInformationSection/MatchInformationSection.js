// React modules
import React from 'react';
import {ScrollView, View} from 'react-native';

// Third party libraries

// Components
import Text from '../../components/Text/Text';
import Separator from '../../components/Separator/Separator';

// Utils
import {scale, verticalScale} from '../../utils/commons';

const MatchInformationSection = () => {
  return (
    <View
      style={{
        backgroundColor: '#E33C59',
        height: verticalScale(250),
        width: verticalScale(280),
        borderRadius: 30,
        padding: scale(20),
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text color="#fff" weight="700">
          BIO
        </Text>
        <Text color="#fff">
          Lorem ipsum dolor sit amet adadad asdasfjf sjfsjfs jfsfj sfjfj
        </Text>
        <Separator space={20} />
        <Text color="#fff" weight="700">
          WORK
        </Text>
        <Text color="#fff">Lorem ipsum dolor sit amet</Text>
        <Separator space={20} />
        <Text color="#fff" weight="700">
          LOCATION
        </Text>
        <Text color="#fff">Lorem ipsum dolor sit amet</Text>
        <Separator space={20} />
        <Text color="#fff" weight="700">
          HOBBIES
        </Text>
        <Text color="#fff">Lorem ipsum dolor sit amet</Text>
        <Separator space={20} />
        <Text color="#fff" weight="700">
          Bio
        </Text>
        <Text color="#fff">Lorem ipsum dolor sit amet</Text>
        <Separator space={20} />
      </ScrollView>
    </View>
  );
};

export default MatchInformationSection;
