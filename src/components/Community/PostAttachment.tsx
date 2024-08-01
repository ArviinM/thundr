import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {PostAttachmenType} from '../../types/generated.ts';
import {Image} from 'expo-image';

interface PostAttachmentProps {
  // Use an interface to define props
  item: PostAttachmenType;
  index: number;
  totalAttachments: number;
}

const PostAttachment: React.FC<PostAttachmentProps> = ({
  item,
  index,
  totalAttachments,
}) => {
  const [hasError, setHasError] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const aspectRatio = item.attachmentWidth / item.attachmentHeight;
    const isPortrait = aspectRatio < 1;
    const isLandscape = aspectRatio > 1;

    if (totalAttachments === 1) {
      if (isPortrait) {
        setImageAspectRatio(4 / 5); // or any desired aspect ratio for single images
      } else if (isLandscape) {
        setImageAspectRatio(16 / 9);
      } else {
        setImageAspectRatio(1);
      }
    }

    if (totalAttachments === 2) {
      setImageAspectRatio(7 / 8); // Square aspect ratio for 2 images
    }

    if (totalAttachments === 3) {
      if (index === 0) {
        setImageAspectRatio(1.67); // First image is wide
      } else {
        setImageAspectRatio(1.67); // Other two are square
      }
    }

    if (totalAttachments === 4) {
      setImageAspectRatio(1.67); // All images are square in a 2x2 grid
    }
  }, [totalAttachments, item.attachmentWidth, item.attachmentHeight, index]);

  const handleImageLoadError = (error: any) => {
    console.error('Image loading failed:', error);
    setHasError(true);
  };

  // Define switch cases based on attachmentType
  const renderAttachment = () => {
    if (hasError) {
      return (
        <View
          style={{
            width: 'auto',
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: 1,
          }}>
          <Text style={{color: 'red', fontFamily: 'Montserrat-Regular'}}>
            Loading failed
          </Text>
        </View>
      );
    }

    switch (item.attachmentType) {
      case 'PHOTO':
      case 'GIF':
        return (
          <Image
            source={{uri: item.attachmentThumbnail}}
            style={[
              styles.image,
              {width: 'auto', height: 'auto'},
              imageAspectRatio !== undefined && {aspectRatio: imageAspectRatio},
              // index === 0 && totalAttachments === 2 && styles.leftImage, // Conditional style
              // index === 1 && totalAttachments === 2 && styles.rightImage, // Conditional style
            ]}
            contentFit={'cover'}
            cachePolicy={'memory-disk'}
            placeholder={item.attachmentBlurhash}
            transition={167}
            onError={handleImageLoadError}
            priority={'high'}
          />
        );
      case 'VIDEO':
        return (
          <Text>Video Player (Not implemented)</Text>
          // <View
          //   style={[
          //     styles.videoThumbnailContainer,
          //     {width: 'auto', height: imageHeight},
          //   ]}>
          //   <Image
          //     placeholder={item.attachmentBlurhash}
          //     source={{uri: item.attachmentThumbnail}}
          //     style={[
          //       styles.image,
          //       {width: 'auto', height: imageHeight},
          //       index === 0 && totalAttachments === 2 && styles.leftImage, // Conditional style
          //       index === 1 && totalAttachments === 2 && styles.rightImage, // Conditional style
          //     ]}
          //     contentFit={'cover'}
          //     cachePolicy={'memory-disk'}
          //     transition={167}
          //     onError={handleImageLoadError}
          //     priority={'low'}
          //   />
          //   <View style={styles.playButtonOverlay}>
          //     <PlayButton />
          //   </View>
          // </View>
        );
      case 'WEB_EMBED':
        // Render a webview component (e.g., react-native-webview)
        return <Text>Web Embed (Not implemented)</Text>;
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.attachmentContainer,
        totalAttachments === 1 && {width: '100%'},
        totalAttachments === 2 && {width: '49%'},
        totalAttachments === 3 && index === 0 && {width: '100%'},
        totalAttachments === 3 && index > 0 && {width: '49%'},
        totalAttachments === 4 && {width: '49%'},
      ]}>
      {renderAttachment()}
    </View>
    // <View
    //   style={
    //     {
    //       // margin: 10,
    //       // borderWidth: 1,
    //       // borderColor: 'lightgray',
    //       // padding: 10,
    //     }
    //   }>
    //   {/*<Text style={{fontWeight: 'bold', color: COLORS.black}}>*/}
    //   {/*  w: {item.attachmentWidth} x h: {item.attachmentHeight} |{' '}*/}
    //   {/*  {item.attachmentDescription}*/}
    //   {/*</Text>*/}
    //   {renderAttachment()}
    // </View>
  );
};

export default PostAttachment;

const styles = StyleSheet.create({
  attachmentContainer: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  leftImage: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
  },
  rightImage: {
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
  },
  videoThumbnailContainer: {
    position: 'relative', // Enable absolute positioning for child elements
    borderRadius: 10,
    backgroundColor: '#563b3b',
  },
  playButtonOverlay: {
    position: 'absolute', // Position absolutely within the container
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
