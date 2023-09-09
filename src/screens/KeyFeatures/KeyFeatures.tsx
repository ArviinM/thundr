import React, { useState } from 'react';
import { ListRenderItem, Dimensions, Text, Pressable } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '@hooks';

const KFImage = styled.ImageBackground`
    flex: 1;
    background-color: #F5D1D0;
    box-shadow: 1px 1px 3px #edadab;
`;

const CarouselContainer = styled.View`
    background-color: #F5D1D0;
    flex: 1;
`;

const GradientButton = styled(LinearGradient).attrs({})`
    padding: 5px 30px;
    align-items: center;
    border-radius: 10px;
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

const LastKeyFeature: React.FC = () => {
    return (
        <LastKeyFeatureContainer>
            <Text>Bongga ‘di ba?</Text>
            <Text>Swipe swipe ka na diyan!</Text>
            <HorizontalDivider />
            <Pressable onPress={() => alert(1)}>
                <GradientBorder start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FFC227', '#E72454']}>
                    <GradientButton start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#E72454', '#F16542', '#FFC227']}>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold'}}>Enter</Text>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Thundr</Text>
                    </GradientButton>
                </GradientBorder>
            </Pressable>
        </LastKeyFeatureContainer>
    );
}

const KeyFeatures: React.FC = () => {
    const {
        Images
    } = useTheme();


    const [features] = useState<number[]>(Array.from(Array(7).keys()));

    const [activeFeature, setActiveFeature] = useState<number>(0);

    const renderFeatures: ListRenderItem<number> = ({index}) => {
        if(index !== 6) return <KFImage source={Images.key_features[index]} />;

        // if last page we need to render the custom view
        return <LastKeyFeature />
    }

    return (
        <>
            <CarouselContainer>
                <Carousel
                    data={features}
                    renderItem={renderFeatures}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth}
                    onSnapToItem={setActiveFeature}
                />
            </CarouselContainer>
            <Pagination
                dotsLength={features.length}
                activeDotIndex={activeFeature}
                containerStyle={{position: 'absolute', alignSelf: 'center', bottom: 10}}
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
    )
}

export default KeyFeatures;