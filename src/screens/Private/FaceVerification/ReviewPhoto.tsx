import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {Image} from 'expo-image';
import {Text, View} from 'react-native';

type ReviewPhotoScreenRouteProp = RouteProp<
  RootNavigationParams,
  'ReviewPhoto'
>;

type ReviewPhotoProps = {
  route?: ReviewPhotoScreenRouteProp;
};

const ReviewPhoto = ({route}: ReviewPhotoProps) => {
  const {photoPath} = route?.params || {};
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  if (!photoPath) {
    return (
      <View>
        <Text>There should be a photo passed here.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'transparent'}}
      edges={['right', 'left']}>
      {/* Add image here*/}
      <Image
        source={{uri: 'file://' + photoPath}}
        style={{width: 100, height: 100}}
      />
      <Text>{photoPath}</Text>
    </SafeAreaView>
  );
};

export default ReviewPhoto;
