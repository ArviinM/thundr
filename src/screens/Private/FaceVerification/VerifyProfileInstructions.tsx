import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import Button from '../../../components/shared/Button.tsx';
import {scale} from '../../../utils/utils.ts';
import {ChevronLeftSmall} from '../../../assets/images/ChevronLeftSmall.tsx';
import {ChevronRightSmall} from '../../../assets/images/ChevronRightSmall.tsx';
import {Image} from 'expo-image';

const VerifyProfileInstructions = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <ScrollView style={{marginHorizontal: scale(36)}}>
        <View style={{marginTop: scale(20), alignItems: 'center'}}>
          <Image
            source={
              'https://thundr-assets-dev.s3.ap-southeast-1.amazonaws.com/images/FaceVerificationReference.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkgwRgIhAJHoEi9R%2B8Va9FTyqM6H%2F6QtHxcjLuY%2BAyvO146kOISkAiEA%2Fn5UYbXMtLOTsfStKgHXRBK%2FJOF2yo7QYFivHoxrdSkq%2FwIIcxAAGgwzMTIzMzc0NzE5NjYiDBHJCE7XqyW5YtZEGSrcArzduND49wxVz7PidkKJxu%2FgeVEFdC%2FuGcm9owWaUzeIlOX2KDs0Yrv8D%2F0BZDA1nxiwFCPOUy8BbFMHqqTeuEiqlGHV8thT7%2FQnIbewsD%2Fos2FNqrhwRxe%2BQFFGTnDY77Wm6RPJvtsqtco%2FvHTdf%2FP9dDI%2BYeE%2BTxQ%2BJj5%2FSbsFQshV%2FrBcNcTMaPa6dnKP4WJlswRrZXeidAvlty3iI4eNuhVuAk4he992ovA64%2F02uYovM%2BE5T%2Fns3wl96OdrCZTkFON69K%2Bshj2pEp%2FL2D5ECL6QcVgEgpZXM29jwc%2BivrhygmjpiFsCp8D2wIKyyt%2BaWvoJtJOTCQ5VWUFKy86xqjeYPkA0ctyU3INis3m0TbS1OAfD14925alWm39YBo9wOSPKp6cIqlUEXRmVXn4Q9tabapg%2FAoHGmIlGhwGvSxS5D%2B063q9u9zhmYKdeFaSKI9QVWJpSwBbESTDx1va0BjqyApnh3l1EYzTho%2BKhoIGIsbY%2FpoNi8cqKwjc149KrjBzTOBpxGDBplqwcJlGK1uAPXMQcKwE%2BwpUuC%2FWGIZyBm9I7yu%2FQNpdU2NAnrlVrF5ZS0h412aOHgkdhDUhSR3g%2FMAteIujJpp%2Fgm6aoooIcBfD%2FzeLjkjnthtXLTrKZSV9YQ%2FlWOMNPUtEdpYbIdjjvo8NlK9Infigq8NjPujXCOOAuIrQcVGBCJN8LEf27U6LoWsmk%2Bk3Nxt8dYKtB5%2FpT%2BtwYMNSOAF368bnYTLS0hoz8g7%2BrRQIplySVVB2YMFq8H8hajPN3QvaJvBBZmZ%2FagNmgN9faz23HV%2BIMwSEDeac6LeVYYwIuhyiJCTGBR%2FAnpg5zhHkUlf93igvL7R5j11g3f3taoXt2T3ObzInwpY0KLA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240722T101604Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAUROGDTHPFJTZJFOO%2F20240722%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=c4ea9b6c917ffdb3c5048c3cf8bc5f88585b1cf01293a0f24d0a5d4169b6a8cc'
            }
            style={styles.mainImage}
          />
        </View>
        <View style={{flexDirection: 'column', gap: 4, marginTop: scale(10)}}>
          <Text
            style={{
              fontFamily: 'Montserrat-ExtraBold',
              fontSize: scale(17),
              color: COLORS.black3,
              textAlign: 'center',
            }}>
            Say cheese!
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(12),
              color: COLORS.black2,
              textAlign: 'center',
            }}>
            This photo is for verification only{'\n'}
            and will not be uploaded in your profile.
          </Text>
        </View>
        <View style={{marginVertical: scale(26), gap: scale(2)}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(12),
              color: COLORS.black3,
            }}>
            To verify:
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(12),
              color: COLORS.black3,
            }}>
            • Make sure that your entire face is visible. Take your photo in a
            well-lit area.
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(12),
              color: COLORS.black3,
            }}>
            • Remove any eyewear (sunglasses or eyeglasses).
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(12),
              color: COLORS.black3,
            }}>
            • Your face must be visible in at least the first three photos in
            your profile.
          </Text>
        </View>
        <View style={{alignItems: 'center', gap: scale(10)}}>
          <Button
            onPress={() => navigation.navigate('TakeAPhoto')}
            text={'TAKE MY PHOTO'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
          <Button
            onPress={() => navigation.navigate('ProfileStack')}
            text={'CHANGE MY PROFILE PICTURES'}
            buttonStyle={[styles.buttonStyle, {backgroundColor: COLORS.white2}]}
            textStyle={[styles.buttonTextStyle, {color: COLORS.black2}]}
          />
        </View>
        <View
          style={{
            marginVertical: scale(20),
            marginHorizontal: scale(10),
            gap: scale(6),
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(9),
              color: COLORS.black3,
              textAlign: 'center',
            }}>
            Learn more about how we use, and protect your personal data.
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.black3,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(11),
                color: COLORS.black3,
              }}>
              Privacy Policy
            </Text>
            <ChevronRightSmall />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.black3,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(11),
                color: COLORS.black3,
              }}>
              Contact Customer Support
            </Text>
            <ChevronRightSmall />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyProfileInstructions;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: COLORS.primary1,
  },
  buttonTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
  mainImage: {
    width: scale(157),
    height: scale(194),
    borderRadius: 20,
  },
});
