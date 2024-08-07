import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/commons.ts';
import {RouteProp} from '@react-navigation/native';
import {FeedResponse} from '../../../types/generated.ts';
import ErrorView from '../../../components/shared/ErrorView.tsx';
import PostItem from '../../../components/Community/PostItem.tsx';
import {scale} from '../../../utils/utils.ts';
import CreatePostBar from '../../../components/Community/CreatePostBar.tsx';
import {RootNavigationParams} from '../../../constants/navigator.ts';

export type PostParams = {
  snowflakeId?: string;
  postDetails?: FeedResponse;
};

type PostProps = {
  route?: RouteProp<RootNavigationParams, 'Post'>;
};

const Post: React.FC<PostProps> = ({route}) => {
  if (!route?.params?.snowflakeId || !route?.params?.postDetails) {
    return <ErrorView message="Unable to load post. Missing required data." />;
  }

  const {postDetails, snowflakeId} = route.params;

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['left', 'right']}>
      <ScrollView>
        <View style={{flex: 1}}>
          <PostItem post={postDetails} isFromPost />
        </View>
        <View
          style={{paddingHorizontal: scale(16), paddingVertical: scale(10)}}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: scale(10),
              color: COLORS.black4,
            }}>
            Replies
          </Text>
        </View>
      </ScrollView>
      <View style={{paddingBottom: scale(36)}}>
        <CreatePostBar
          actionTitle={'Write a reply...'}
          isComment
          referenceId={snowflakeId}
          postDetails={postDetails}
        />
      </View>
    </SafeAreaView>
  );
};

export default Post;
