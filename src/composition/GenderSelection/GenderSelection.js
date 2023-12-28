// React modules
import React from 'react';
import {View} from 'react-native';

// Third party libraries
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

// Components
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';

// Utils
import {LGBTQ_ASSET_URI} from '../../utils/images';
import {scale, verticalScale} from '../../utils/commons';

// Styles
import {
  LabelContainer,
  LabeledInputContainer,
} from '../../screens/private/PersonalityType/Styled';

const GenderSelection = props => {
  const {genderIcons, activeGenderIcon, toggleGenderSelection, gender} = props;

  const renderIcons = () => {
    return genderIcons.map((item, index) => {
      const iconWidth = () => {
        if (item.name === 'L_ICON') {
          return 22;
        } else if (item.name === 'T_ICON') {
          return 23;
        } else if (item.name === 'I_ICON') {
          return 12;
        } else if (item.name === 'PLUS_ICON') {
          return 22;
        } else {
          return 26;
        }
      };

      const iconRightMargin = () => {
        if (item.name === 'T_ICON') {
          return -7;
        } else if (item.name === 'I_ICON') {
          return -11;
        } else if (item.name === 'PLUS_ICON') {
          return -7;
        } else {
          return -6;
        }
      };

      return (
        <TouchableWithoutFeedback
          activeOpacity={1}
          key={index}
          onPress={() => {
            toggleGenderSelection(index, gender);
          }}>
          {activeGenderIcon.includes(index) && (
            <View
              style={{
                position: 'absolute',
                bottom: verticalScale(-5),
                right: scale(iconRightMargin()),
              }}>
              <Image
                source={LGBTQ_ASSET_URI.SELECTED_GENDER}
                height={35}
                width={item.name === 'I_ICON' ? 35 : 38}
              />
            </View>
          )}

          <Image
            source={LGBTQ_ASSET_URI[item.name]}
            height={26}
            width={iconWidth()}
            tintColor={activeGenderIcon.includes(index) ? '#fff' : '#E43C59'}
            changeTintColor
          />
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <LabeledInputContainer>
      <LabelContainer>
        <Text color="#e33051" size={18} weight={700}>
          Gender
        </Text>
        <Text
          size={14}
          color="#808080"
          customStyle={{marginLeft: scale(5), top: verticalScale(-1)}}>
          (Choose up to 4)
        </Text>
      </LabelContainer>
      <View
        style={{
          flexDirection: 'row',
          gap: scale(12),
          alignContent: 'center',
        }}>
        {renderIcons()}
      </View>
    </LabeledInputContainer>
  );
};

export default GenderSelection;
