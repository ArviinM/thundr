import React, {useRef} from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import WebView from 'react-native-webview';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/commons.ts';

type TermsScreenRouteProp = RouteProp<RootNavigationParams, 'Terms'>;

type TermsProps = {
  route?: TermsScreenRouteProp;
};

const Terms = ({route}: TermsProps) => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const uri = route?.params?.uri;
  const webViewRef = useRef<WebView>(null);

  const goBack = () => {
    // if (webViewRef.current) {
    //   webViewRef.current.goBack();
    // }
    navigation.navigate('Login');
  };

  // const goForward = () => {
  //   if (webViewRef.current) {
  //     webViewRef.current.goForward();
  //   }
  // };
  //
  // const openInBrowser = () => {
  //   if (typeof uri === 'string') {
  //     Linking.openURL(uri);
  //   }
  // };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={
        [
          'left',
          'right',
          'bottom',
          Platform.OS === 'ios' ? '' : 'top',
        ] as Edge[]
      }>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 10,
          backgroundColor: COLORS.primary1,
        }}>
        <TouchableOpacity onPress={goBack}>
          <Text
            style={{color: COLORS.white, fontFamily: 'Montserrat-SemiBold'}}>
            Go Back to App
          </Text>
        </TouchableOpacity>
        {/*<TouchableOpacity onPress={goForward}>*/}
        {/*  <Text*/}
        {/*    style={{color: COLORS.white, fontFamily: 'Montserrat-SemiBold'}}>*/}
        {/*    Forward*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity onPress={openInBrowser}>*/}
        {/*  <Text*/}
        {/*    style={{color: COLORS.white, fontFamily: 'Montserrat-SemiBold'}}>*/}
        {/*    Open in Browser*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
      <WebView
        ref={webViewRef}
        style={{flex: 1}}
        source={{uri: uri}}
        onError={(syntheticEvent: {nativeEvent: any}) => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </SafeAreaView>
  );
};

export default Terms;
