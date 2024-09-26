import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';

interface CommunityItemProps {
  title: string;
  profileImage: string;
  communityId: string;
  isJoined: boolean;
  onPress: (communityId: string) => void; // Add onPress prop
  onPressJoin: (communityId: string) => void; // Add onPress prop
}

const CommunityItem: React.FC<CommunityItemProps> = ({
  title,
  profileImage,
  communityId,
  isJoined,
  onPress,
  onPressJoin,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(communityId)}>
      <View style={styles.container}>
        <Image source={{uri: profileImage}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {!isJoined && (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => onPressJoin(communityId)}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(3),
    paddingHorizontal: scale(22),
  },
  image: {
    width: scale(22),
    height: scale(22),
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: scale(13),
    fontFamily: 'Montserrat-Medium',
  },
  joinButton: {
    // backgroundColor: COLORS.primary1,
    // paddingHorizontal: 15,
    // paddingVertical: 8,
    // borderRadius: 5,
  },
  joinButtonText: {
    color: COLORS.primary1,
    fontSize: scale(11),
    fontFamily: 'Montserrat-Medium',
  },
});

export default CommunityItem;
