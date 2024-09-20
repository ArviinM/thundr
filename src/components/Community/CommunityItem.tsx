import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/commons.ts';

interface CommunityItemProps {
  title: string;
  profileImage: string;
  communityId: string;
  isJoined: boolean;
  onPress: (communityId: string) => void; // Add onPress prop
}

const CommunityItem: React.FC<CommunityItemProps> = ({
  title,
  profileImage,
  communityId,
  isJoined,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(communityId)}>
      <View style={styles.container}>
        <Image source={{uri: profileImage}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>
            {isJoined ? 'Joined' : 'Join'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: COLORS.primary1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommunityItem;
