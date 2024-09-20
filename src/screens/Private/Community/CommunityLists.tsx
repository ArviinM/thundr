import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/commons.ts';

const CommunityLists = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      {/*Will add a loop for every community received here*/}
      {/*  Will create a new component CommunityItem   */}
    </SafeAreaView>
  );
};

export default CommunityLists;
