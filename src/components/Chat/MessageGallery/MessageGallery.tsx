import React, {useCallback, useMemo, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {Attachment, Chat} from '../../../types/generated.ts';
import {
  Edge,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {AnimatedFlashList} from '@shopify/flash-list';
import ImageItem from './components/ImageItem.tsx';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {format} from 'date-fns';
import {scale} from '../../../utils/utils.ts';
import {ChatCloseIcon} from '../../../assets/images/ChatCloseIcon.tsx';
import {MoreIcon} from '../../../assets/images/MoreIcon.tsx';

interface MessageGalleryProps {
  attachments: Attachment[];
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  isMare: boolean;
  messageType?: string;
  createdAt?: number | Date;
  user: Chat;
  onLongPress: () => void;
}

const MessageGallery: React.FC<MessageGalleryProps> = ({
  attachments,
  isMare,
  messageType,
  setVisible,
  isVisible,
  createdAt,
  user,
  onLongPress,
}) => {
  const [showControls, setShowControls] = useState(true);
  const [isScaled, setIsScaled] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    pointerEvents: showControls ? 'auto' : 'none',
    opacity: withClampedSpring(showControls ? 1 : 0),
    transform: [
      {
        translateY: withClampedSpring(showControls ? 0 : -30),
      },
    ],
  }));

  const animatedFooterStyle = useAnimatedStyle(() => ({
    pointerEvents: showControls ? 'auto' : 'none',
    opacity: withClampedSpring(showControls ? 1 : 0),
    transform: [
      {
        translateY: withClampedSpring(showControls ? 0 : 30),
      },
    ],
  }));

  const edges = useMemo(() => {
    if (Platform.OS === 'android') {
      return ['top', 'bottom', 'left', 'right'] satisfies Edge[];
    }
    return ['left', 'right'] satisfies Edge[]; // iOS, so no top/bottom safe area
  }, []);

  const onTap = useCallback(() => {
    setShowControls(show => !show);
  }, []);

  const onZoom = useCallback((nextIsScaled: boolean) => {
    setIsScaled(nextIsScaled);
    if (nextIsScaled) {
      setShowControls(false);
    }
  }, []);

  const renderItem = (message: {
    item: Attachment;
    index: any | null | undefined;
  }) => {
    return (
      <ImageItem
        imageSrc={{uri: message.item.fileUrl}}
        onRequestClose={() => {
          setVisible(false);
          setCurrentPage(0);
        }}
        blurHash={message.item.blurHash}
        onTap={onTap}
        onZoom={onZoom}
      />
    );
  };

  const keyExtractor = (item: Attachment) =>
    `${item.blurHash}-${item.mimeType}`;

  const onScroll = (e: {
    nativeEvent: {layoutMeasurement: {width: any}; contentOffset: {x: any}};
  }) => {
    const totalWidth = e.nativeEvent.layoutMeasurement.width;
    const xPosition = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(xPosition / totalWidth);
    if (newIndex !== currentPage) {
      setCurrentPage(newIndex);
    }
  };

  const insets = useSafeAreaInsets();
  return (
    <Modal
      visible={isVisible}
      animationType={'slide'}
      hardwareAccelerated
      transparent>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.94)',
        }}
        edges={edges}>
        <Animated.View
          style={[
            styles.header,
            animatedHeaderStyle,
            {paddingTop: insets.top},
          ]}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: scale(20),
            }}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <ChatCloseIcon isMare={isMare} />
            </TouchableOpacity>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{textAlign: 'center', fontFamily: 'Montserrat-Bold'}}>
                {user.profile.name.split(' ')[0] || '⚡️'}
              </Text>
              <Text
                style={{textAlign: 'center', fontFamily: 'Montserrat-Medium'}}>
                {format(createdAt as Date, 'MMMM dd, cccc')}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: scale(11),
                }}>
                {currentPage + 1} of {attachments.length.toString()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onLongPress}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MoreIcon isMare={isMare} />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <AnimatedFlashList
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={attachments}
          estimatedItemSize={35}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        />
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
            setCurrentPage(0);
          }}>
          <Text style={{fontSize: 20, padding: 20}}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const MemoizedMessageGallery = React.memo(MessageGallery);

export default MemoizedMessageGallery;

function withClampedSpring(value: any) {
  'worklet';
  return withSpring(value, {overshootClamping: true, stiffness: 300});
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    pointerEvents: 'box-none',
    backgroundColor: '#fff',
    paddingBottom: scale(8),
  },
});
