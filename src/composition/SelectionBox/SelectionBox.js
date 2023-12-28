// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Components
import Text from '../../components/Text/Text';
import Separator from '../../components/Separator/Separator';
import Image from '../../components/Image/Image';

// Utils
import {scale, verticalScale} from '../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../utils/images';

const SelectionBox = props => {
  const {
    data,
    isHobby,
    selectedHobby,
    selectedStarSign,
    toggleCheckboxSelector,
  } = props;

  return (
    <>
      <View style={{flexDirection: 'row', paddingHorizontal: scale(40)}}>
        <Text color="#e33051" size={18} weight={700}>
          {isHobby ? 'Hobbies' : 'Star Sign'}
        </Text>
        <Text
          size={14}
          color="#808080"
          customStyle={{marginLeft: scale(5), top: verticalScale(3)}}>
          (Choose up to 4)
        </Text>
      </View>
      <Separator space={10} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingHorizontal: scale(40),
        }}>
        {data.map((selectedKey, index) => {
          const selectedData = isHobby ? selectedHobby : selectedStarSign;
          const isSelected = selectedData.includes(index);
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <TouchableOpacity
                key={index}
                onPress={() => toggleCheckboxSelector(index, isHobby)}>
                {isSelected ? (
                  <Image
                    source={GLOBAL_ASSET_URI.CHECKED_SELECTION_BOX}
                    height={20}
                    width={20}
                  />
                ) : (
                  <Image
                    source={GLOBAL_ASSET_URI.SELECTION_BOX}
                    height={20}
                    width={20}
                  />
                )}
              </TouchableOpacity>
              <Text
                color="#808080"
                size={15}
                customStyle={{
                  left: scale(5),
                  top: verticalScale(-1),
                }}>
                {selectedKey}
              </Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default SelectionBox;
