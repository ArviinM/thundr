import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Image from '../../components/Image/Image';
import {DASHBOARD_ASSET_URI} from '../../utils/images';
import {verticalScale} from '../../utils/commons';

const JowaMareSection = props => {
  const {setMare, setJowa, isMare, isJowa} = props;
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onLongPress={() => {
          setMare(true);
          setJowa(false);
        }}>
        <Image
          source={
            isMare ? DASHBOARD_ASSET_URI.GLOWING_MARE : DASHBOARD_ASSET_URI.MARE
          }
          height={130}
          width={60}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: verticalScale(40)}}>
        <Image
          source={
            isMare || isJowa
              ? DASHBOARD_ASSET_URI.GLOWING_THUNDR
              : DASHBOARD_ASSET_URI.THUNDR
          }
          height={65}
          width={235}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onLongPress={() => {
          setJowa(true);
          setMare(false);
        }}>
        <Image
          source={
            isJowa ? DASHBOARD_ASSET_URI.GLOWING_JOWA : DASHBOARD_ASSET_URI.JOWA
          }
          height={130}
          width={60}
        />
      </TouchableOpacity>
    </View>
  );
};

export default JowaMareSection;
