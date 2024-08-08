import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {COLORS} from '../../constants/commons.ts';
import {processDomain} from './communityUtils.ts';
import {scale} from '../../utils/utils.ts';
import {PlayButton} from '../../assets/images/chat/PlayButton.tsx';
import {PostAttachment as PostAttachmentType} from '../../types/generated.ts';

interface PostAttachmentProps {
  // Use an interface to define props
  item: PostAttachmentType;
  index: number;
  totalAttachments: number;
  isAddComment?: boolean;
}

const PostAttachment: React.FC<PostAttachmentProps> = ({
  item,
  index,
  totalAttachments,
  isAddComment = false,
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
              imageAspectRatio !== undefined && {
                aspectRatio: isAddComment ? 1 : imageAspectRatio,
              },
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
          <View
            style={[
              styles.videoThumbnailContainer,
              {width: 'auto', height: 'auto'},
            ]}>
            <Image
              source={{uri: item.attachmentThumbnail}}
              style={[
                styles.image,
                {width: 'auto', height: 'auto'},
                imageAspectRatio !== undefined && {
                  aspectRatio: isAddComment ? 1 : imageAspectRatio,
                },
              ]}
              contentFit={'cover'}
              cachePolicy={'memory-disk'}
              placeholder={item.attachmentBlurhash}
              transition={167}
              onError={handleImageLoadError}
              priority={'high'}
            />
            <View style={styles.playButtonOverlay}>
              <PlayButton />
            </View>
          </View>
        );
      case 'WEB_EMBED':
        return (
          <View
            style={[
              {backgroundColor: COLORS.white3},
              !item.attachmentEmbedHasImage && {
                flexDirection: 'row',
                alignItems: 'center',
              },
              isAddComment && {
                width: scale(250),
              },
            ]}>
            <View
              style={[
                !item.attachmentEmbedHasImage && {
                  alignItems: 'center',
                  margin: scale(6),
                },
              ]}>
              <Image
                source={{uri: item.attachmentThumbnail}}
                style={[
                  {aspectRatio: 16 / 9},
                  !item.attachmentEmbedHasImage && {
                    aspectRatio: 4 / 3,
                    height: scale(50),
                    borderRadius: 5,
                  },
                ]}
                contentFit={'cover'}
                cachePolicy={'memory-disk'}
                placeholder={item.attachmentBlurhash}
                transition={167}
                onError={handleImageLoadError}
                priority={'high'}
              />
            </View>
            <View style={[{padding: scale(8), flex: 1}]}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: scale(9),
                  color: COLORS.black4,
                }}>
                {processDomain(item.attachmentDomain)?.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: scale(11),
                  color: COLORS.black,
                }}>
                {item.attachmentTitle}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: scale(9),
                  color: COLORS.black,
                }}>
                {item.attachmentDescription}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={[styles.attachmentContainer]}>{renderAttachment()}</View>;
};

export default PostAttachment;

const styles = StyleSheet.create({
  attachmentContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 4,
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
