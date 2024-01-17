// React modules
import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';

// Components
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import {ADVOCACY_ASSET_URI, GLOBAL_ASSET_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native';

const AdvocacyInformationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {fromGoldenGays} = route?.params;

  const OpenURLButton = ({url}) => {
    const handlePress = async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.warn(`Don't know how to open this URL: ${url}`);
      }
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text color="#48B5C0">
          https://www.facebook.com/profile.php?id=61550648477700
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        backgroundColor: '#EDE8E5',
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: verticalScale(50),
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={GLOBAL_ASSET_URI.BACK_ICON}
          height={30}
          width={30}
          customStyle={{left: scale(-140), top: verticalScale(15)}}
        />
      </TouchableOpacity>
      <Separator space={20} />
      <Text
        fontFamily="ClimateCrisis-Regular"
        color="#E43C59"
        size={22}
        customStyle={{textAlign: 'center'}}>
        {fromGoldenGays ? 'Golden Gays' : 'Galang Philippines'}
      </Text>
      <Separator space={70} />
      <View style={{alignItems: 'center'}}>
        <Image
          source={
            fromGoldenGays
              ? ADVOCACY_ASSET_URI.GOLDEN_GAYS
              : ADVOCACY_ASSET_URI.GALANG
          }
          height={150}
          width={150}
        />
        <Text
          fontFamily="Montserrat-Regular"
          customStyle={{textAlign: 'center', paddingHorizontal: scale(30)}}>
          {fromGoldenGays
            ? 'The Golden Gays is a nonprofit organization that provides support and care for elderly LGBTQ people. The foundation is in need of assistance with charity works such as outreach programs to raise awareness of the current issues of the LGBTQ community and helping to feed and house elderly and impoverished gays.'
            : 'Galang Philippines is a lesbian initiated, lesbian run, feminist human rights non-profit organization. Their vision is to espouse and aspire for the feminist values of respect, economic justice, equality, diversity, fairness, and empowering processes at all levels of our work by developing and sustaining institutions, capacity building, networking and research. The foundation is in need of assistance with charity works to provide and help the impoverished filipinos including the LGBTQIA+ community.'}
        </Text>
        <Separator space={40} />
        <Text>Ano ba ang latest? Click here:</Text>
        <OpenURLButton
          url={
            'https://www.facebook.com/profile.php?id=61550648477700'
          }></OpenURLButton>
      </View>
      <Separator space={10} />
    </ScrollView>
  );
};

export default AdvocacyInformationScreen;
