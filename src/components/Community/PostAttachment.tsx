import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {PostAttachmenType} from '../../types/generated.ts';
import {scale} from '../../utils/utils.ts';
import {Image} from 'expo-image';
import {width} from '../../constants/commons.ts';
import VideoPlayer from 'react-native-media-console';
import {PlayButton} from '../../assets/images/chat/PlayButton.tsx';
import {Loading} from '../shared/Loading.tsx'; // Import Image for attachment display

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
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Calculate image dimensions based on total attachments
    if (totalAttachments === 1) {
      // Single image, use full width, respect aspect ratio
      const aspectRatio = item.attachmentWidth / item.attachmentHeight;
      setImageWidth(width - 32); // Adjust for padding
      setImageHeight((width - 32) / aspectRatio);
    } else if (totalAttachments === 2 || totalAttachments === 3) {
      // Two or three images, equal width columns
      setImageWidth((width - 40) / totalAttachments); // Adjust for padding and spacing
      setImageHeight(width / 1.67); // Default 1.67 aspect ratio
    } else if (totalAttachments === 4) {
      // Four images, square grid (like Twitter)
      setImageWidth((width - 40) / 2); // Two columns
      setImageHeight((width - 40) / 2); // Square
    }
  }, [totalAttachments, width]);

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
            width: imageWidth,
            height: imageHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'red'}}>Loading failed</Text>
        </View>
      );
    }

    switch (item.attachmentType) {
      case 'PHOTO':
      case 'GIF':
        return (
          <Image
            source={{uri: item.attachmentThumbnail}}
            style={{width: imageWidth, height: imageHeight}} // Adjust image dimensions as needed
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
          <View
            style={[
              styles.videoThumbnailContainer,
              {width: imageWidth, height: imageHeight},
            ]}>
            <Image
              placeholder={item.attachmentBlurhash}
              source={{uri: item.attachmentThumbnail}}
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
              contentFit={'cover'}
              cachePolicy={'memory-disk'}
              transition={167}
              onError={handleImageLoadError}
              priority={'low'}
            />
            <View style={styles.playButtonOverlay}>
              <PlayButton />
            </View>
          </View>
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
      style={{
        margin: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
      }}>
      <Text style={{fontWeight: 'bold'}}>
        w: {item.attachmentWidth} x h: {item.attachmentHeight} |{' '}
        {item.attachmentDescription}
      </Text>
      {renderAttachment()}
    </View>
  );
};

export default PostAttachment;

const styles = StyleSheet.create({
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
