// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Components
import Text from '../../components/Text/Text';
import Image from '../../components/Image/Image';

// Utils
import {isIosDevice, scale, verticalScale} from '../../utils/commons';
import {PERSONALITY_TYPE_URI} from '../../utils/images';

const Personality = props => {
  const {selectedPersonality, togglePersonality} = props;

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text color="#e33051" size={18} weight={700}>
          Personality
        </Text>
        <Text
          size={14}
          color="#808080"
          customStyle={{marginLeft: scale(5), top: verticalScale(3)}}>
          (Choose up to 2)
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => togglePersonality('lion')}>
            <Image
              source={
                selectedPersonality.includes('lion')
                  ? PERSONALITY_TYPE_URI.LION_YELLOW
                  : PERSONALITY_TYPE_URI.LION_RED
              }
              height={140}
              width={140}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: scale(15),
                position: 'absolute',
                top: verticalScale(isIosDevice() ? 60 : 55),
              }}>
              <Text color="#fff" size={12}>
                Lion
              </Text>
              <Text color="#fff" customStyle={{textAlign: 'center'}} size={9}>
                Takes charge, Determined, Assertive, Competitive, Leader,
                Goal-driven, Self-reliant, Adventurous.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePersonality('otter')}>
            <Image
              source={
                selectedPersonality.includes('otter')
                  ? PERSONALITY_TYPE_URI.OTTER_YELLOW
                  : PERSONALITY_TYPE_URI.OTTER_RED
              }
              height={140}
              width={140}
              customStyle={{left: scale(10)}}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: scale(15),
                left: scale(isIosDevice() ? 13 : 10),
                position: 'absolute',
                top: verticalScale(isIosDevice() ? 60 : 55),
              }}>
              <Text color="#fff" size={12}>
                Otter
              </Text>
              <Text color="#fff" customStyle={{textAlign: 'center'}} size={9}>
                Takes risks, Visionary, Energetic, Promoter, Fun-loving, Enjoys
                change, Creative, Optimistic.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => togglePersonality('dog')}>
            <Image
              source={
                selectedPersonality.includes('dog')
                  ? PERSONALITY_TYPE_URI.DOG_YELLOW
                  : PERSONALITY_TYPE_URI.DOG_RED
              }
              height={140}
              width={140}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: scale(15),
                position: 'absolute',
                top: verticalScale(isIosDevice() ? 60 : 55),
              }}>
              <Text color="#fff" size={12}>
                Dog
              </Text>
              <Text color="#fff" customStyle={{textAlign: 'center'}} size={9}>
                Loyal, Deep relationships, Adaptable, Sympathetic, Thoughtful,
                Nurturing, Tolerant, Good listener.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePersonality('beaver')}>
            <Image
              source={
                selectedPersonality.includes('beaver')
                  ? PERSONALITY_TYPE_URI.BEAVER_YELLOW
                  : PERSONALITY_TYPE_URI.BEAVER_RED
              }
              height={140}
              width={140}
              customStyle={{left: scale(10)}}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: scale(15),
                left: scale(18),
                position: 'absolute',
                top: verticalScale(isIosDevice() ? 60 : 55),
              }}>
              <Text color="#fff" size={12}>
                Beaver
              </Text>
              <Text color="#fff" customStyle={{textAlign: 'center'}} size={9}>
                Deliberate, Controlled, Reserved, Practical, Factual,
                Analytical, Inquisitive, Persistent.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Personality;
