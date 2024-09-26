import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {LightningIcon} from '../../assets/images/tab_icons/LightningIcon.tsx';
import {Like} from '../../assets/images/community/Like.tsx';
import {Comment} from '../../assets/images/community/Comment.tsx';
import {Repost} from '../../assets/images/community/Repost.tsx';
import {Report} from '../../assets/images/community/ReportIcon.tsx';
import {useCommunity} from '../../providers/Community.tsx';

interface PostActionsProps {
  likes?: number;
  comments?: number;
  repost?: number;
  isLiked?: boolean;
  isReposted?: boolean;
  postId: string;
  handleMoreOptions?: () => void;
  handleRepostOptions?: () => void;
  handleComment?: () => void;
  disabled?: boolean;
}

const PostActionsBar = ({
  likes = 0,
  comments = 0,
  repost = 0,
  isLiked = false,
  isReposted = false,
  postId,
  handleMoreOptions,
  handleRepostOptions,
  handleComment,
  disabled = false,
}: PostActionsProps) => {
  const {likeThePost, isUserVerified, showModal} = useCommunity();

  return (
    <View
      style={{
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', gap: scale(13), marginTop: scale(3)}}>
        <TouchableOpacity
          disabled={disabled}
          style={styles.elemActions}
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={async () => {
            if (!isUserVerified) {
              showModal();
            }

            if (postId !== undefined && isUserVerified) {
              await likeThePost(postId, !isLiked);
            }
          }}>
          <Like focused={isLiked} />
          <Text style={styles.text}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={styles.elemActions}
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={handleComment}>
          <View>
            <Comment />
          </View>
          <Text style={styles.text}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={styles.elemActions}
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={handleRepostOptions}>
          <View>
            <Repost focused={isReposted} />
          </View>
          <Text style={styles.text}> {repost}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
        onPress={handleMoreOptions}>
        <Report />
        {/*<Text style={styles.text}></Text>*/}
      </TouchableOpacity>
    </View>
  );
};

export default PostActionsBar;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(9),
    color: COLORS.black4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
  },
  elemActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(4),
  },
});
