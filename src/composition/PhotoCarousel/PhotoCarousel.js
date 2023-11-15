import React, {version} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';
import {scale, verticalScale} from '../../utils/commons';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';

const PhotoCarousel = props => {
  const data = ['1', '2', '3', '4', '5'];

  const {width: screenWidth} = Dimensions.get('window');

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <BorderLinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#E72454', '#FFC227']}>
        <TouchableOpacity>
          <View
            style={{
              height: verticalScale(75),
              width: scale(85),
              backgroundColor: '#D8DCDD',
              borderRadius: 15,
              padding: scale(22),
              alignItems: 'center',
              flex: 1,
            }}>
            <ParallaxImage
              // source={{uri: item.illustration}}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.4}
              {...parallaxProps}
            />
          </View>
        </TouchableOpacity>
      </BorderLinearGradient>
    );
  };

  return (
    <View>
      <Carousel
        layout={'default'}
        firstItem={2}
        data={data}
        renderItem={renderItem}
        // sliderWidth={500}
        // itemWidth={100}
        sliderWidth={500}
        itemWidth={100}
        hasParallaxImages={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

export default PhotoCarousel;
