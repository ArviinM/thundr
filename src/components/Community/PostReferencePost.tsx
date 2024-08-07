import React from 'react';
import {scale} from '../../utils/utils.ts';
import {Text, View} from 'react-native';
import {Image} from 'expo-image';
import {COLORS} from '../../constants/commons.ts';
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow';
import {FeedResponse} from '../../types/generated.ts';

interface PostReferencePostProps {
  referencePost: FeedResponse;
}

const PostReferencePost = ({referencePost}: PostReferencePostProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: scale(6),
        paddingVertical: scale(8),
        borderWidth: 1,
        borderColor: '#CECECE',
        backgroundColor: '#f4f4f4',
        borderRadius: 12,
        flex: 1,
        gap: scale(6),
      }}>
      <View>
        {/*  Customer Photo  */}
        <Image
          source={{uri: referencePost.customerPhoto}}
          style={{
            height: scale(20),
            width: scale(20),
            borderRadius: 50,
          }}
          cachePolicy={'memory-disk'}
        />
      </View>
      <View style={{flex: 1, gap: scale(6)}}>
        {/* Name and Time Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(6),
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(13),
              color: COLORS.black,
            }}>
            {referencePost.customerName}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Light',
              fontSize: scale(9),
              color: COLORS.black2,
            }}>
            {formatDistanceToNow(new Date(referencePost.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
        {/*Content PostItem*/}
        <View>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(13),
              color: COLORS.black,
            }}>
            {referencePost.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostReferencePost;
