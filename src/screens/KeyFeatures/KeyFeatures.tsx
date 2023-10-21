import React, { useState } from 'react';
import { ListRenderItem, Dimensions, Text, Pressable } from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from 'types/navigation';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '@hooks';

const KFImage = styled.ImageBackground`
   flex: 1;
   background-color: #f5d1d0;
`;

const CarouselContainer = styled.View`
   background-color: #f5d1d0;
   flex: 1;
`;

const GradientButton = styled(LinearGradient).attrs({})`
   padding: 5px 30px;
   align-items: center;
   border-radius: 10px;
`;

const Sample = styled.View<{ backgroundColor: string }>`
   background-color: ${props => props.backgroundColor};
`;

const GradientBorder = styled(LinearGradient).attrs({})`
   padding: 3px;
   border-radius: 10px;
`;

const { width: screenWidth } = Dimensions.get('window');

const LastKeyFeatureContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

const HorizontalDivider = styled.View`
   height: 10px;
`;

type LastKeyFeatureProps = {
   onLastPageClick?: () => void;
};

const LastKeyFeature: React.FC<LastKeyFeatureProps> = ({ onLastPageClick }) => {
   return (
      <LastKeyFeatureContainer>
         <Sample backgroundColor="test" />
         <Text>Bongga ‘di ba?</Text>
         <Text>Swipe swipe ka na diyan!</Text>
         <HorizontalDivider />
         <Pressable onPress={onLastPageClick}>
            <GradientBorder
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 0 }}
               colors={['#FFC227', '#E72454']}
            >
               <GradientButton
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#E72454', '#F16542', '#FFC227']}
               >
                  <Text
                     style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                     }}
                  >
                     Enter
                  </Text>
                  <Text
                     style={{
                        color: 'white',
                        fontSize: 22,
                        fontWeight: 'bold',
                     }}
                  >
                     Thundr
                  </Text>
               </GradientButton>
            </GradientBorder>
         </Pressable>
      </LastKeyFeatureContainer>
   );
};

interface KeyFeaturesProps
   extends StackScreenProps<RootStackParamList, 'KeyFeatures'> {}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ navigation }) => {
   const { Images } = useTheme();

   const [features] = useState<number[]>(Array.from(Array(7).keys()));

   const [activeFeature, setActiveFeature] = useState<number>(0);

   const onLastPageClick = () => {
      navigation.navigate('StartUpFlow', {
         screen: 'StartUp',
         params: { payload: undefined },
      });
   };

   const renderFeatures: ListRenderItem<number> = ({ index }) => {
      if (index !== 6) return <KFImage source={Images.key_features[index]} />;

      // if last page we need to render the custom view
      return <LastKeyFeature onLastPageClick={onLastPageClick} />;
   };

   return (
      <>
         <CarouselContainer>
            <Carousel
               data={features}
               renderItem={renderFeatures}
               sliderWidth={screenWidth}
               itemWidth={screenWidth}
               slideStyle={{ width: screenWidth }}
               inactiveSlideOpacity={1}
               inactiveSlideScale={1}
               onSnapToItem={setActiveFeature}
            />
         </CarouselContainer>
         <Pagination
            dotsLength={features.length}
            activeDotIndex={activeFeature}
            containerStyle={{
               position: 'absolute',
               alignSelf: 'center',
               bottom: 10,
            }}
            dotStyle={{
               width: 10,
               height: 10,
               borderRadius: 5,
               backgroundColor: '#E53388',
            }}
            inactiveDotStyle={{
               backgroundColor: activeFeature === 5 ? 'white' : '#FFC028',
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
         />
      </>
   );
};

export default KeyFeatures;
