import React, { useState } from 'react';
import { ListRenderItem, Text, Dimensions } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import styled from 'styled-components/native';

import { useTheme } from '@hooks';

type KeyFeaturesProps = {};
type KeyFeature = {};

const KFImage = styled.ImageBackground`
    flex: 1;
    background-color: #F5D1D0;
    box-shadow: 1px 1px 3px #edadab;
`;

const Title = styled.Text`
    font-family: 'Montserrat';
`;

const CarouselContainer = styled.Text`
    background-color: #F5D1D0;
`;

const { width: screenWidth } = Dimensions.get('window');

const KeyFeatures: React.FC<KeyFeaturesProps> = () => {
    const {
        Images
    } = useTheme();


    const [features] = useState<KeyFeature[]>(Array.from(Array(6).keys()));

    const [activeFeature, setActiveFeature] = useState<number>(0);

    const renderFeatures: ListRenderItem<KeyFeature> = ({item, index}) => {
        return <KFImage source={Images.key_features[index]} />
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