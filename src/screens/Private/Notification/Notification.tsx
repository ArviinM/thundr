import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetNotifications} from '../../../hooks/notification/useGetNotifications.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {COLORS} from '../../../constants/commons.ts';
import {Loading} from '../../../components/shared/Loading.tsx';
import {NotificationResponse} from '../../../types/generated.ts';
import {scale} from '../../../utils/utils.ts';
import moment from 'moment';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useGestureHandler} from '@gorhom/bottom-sheet/lib/typescript/hooks';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {useReadNotification} from '../../../hooks/notification/useReadNotification.ts';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';
import {TrashIcon} from '../../../assets/images/TrashIcon.tsx';
import {useDeleteNotification} from '../../../hooks/notification/useDeleteNotification.ts';

const Notification = () => {
  const auth = useAuth();
  const notification = useGetNotifications({sub: auth.authData?.sub || ''});
  const readNotification = useReadNotification();
  const deleteNotification = useDeleteNotification();

  const query = useQueryClient(queryClient);

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [beforeId, setBeforeId] = useState(0);

  const deleteItem = async ({
    sub,
    notificationId,
  }: {
    sub: string;
    notificationId: number;
  }) => {
    await deleteNotification.mutateAsync({
      sub: sub,
      notificationId: notificationId,
    });
    await query.invalidateQueries({
      queryKey: ['get-customer-notifications'],
    });
  };

  const renderItem = ({item}: {item: NotificationResponse}) => {
    const translateX = useSharedValue(0);

    const panGesture = Gesture.Pan()
      .onChange(e => {
        translateX.value = e.translationX;
      })
      .onEnd(async e => {
        try {
          if (e.translationX < -75) {
            if (auth.authData) {
              runOnJS(deleteItem)({
                sub: auth.authData.sub,
                notificationId: item.id,
              });
              translateX.value = withSpring(e.translationX * 6);
            }
          } else {
            translateX.value = withSpring(0);
          }
        } catch (error) {
          translateX.value = withSpring(0);
        }
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{translateX: translateX.value}],
    }));

    return (
      <>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              animatedStyle,
              item.isRead
                ? [styles.item, {backgroundColor: '#F7F5F5'}]
                : styles.item,
            ]}>
            <TouchableOpacity
              onPress={async () => {
                if (!item.isRead && auth.authData) {
                  await readNotification.mutateAsync({
                    sub: auth.authData.sub,
                    notificationId: item.id,
                  });
                  await query.invalidateQueries({
                    queryKey: ['get-customer-notifications'],
                  });
                }
                //TODO: Will fix this later on
                navigation.navigate('Messages');
              }}>
              <Text
                style={[
                  styles.title,
                  item.isRead ? {color: '#D9D6D6'} : {color: COLORS.primary1},
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.body,
                  item.isRead ? {color: '#bdbaba'} : {color: COLORS.black},
                ]}>
                {item.body}
              </Text>
              <View
                style={{position: 'absolute', right: scale(3), top: scale(3)}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: scale(10),
                    color: COLORS.gray3,
                  }}>
                  {moment(item.sentTime).format('h:mm A')}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
        <View style={styles.deleteButton}>
          <TrashIcon />
          {/*<Text style={styles.deleteText}>Delete</Text>*/}
        </View>
      </>
    );
  };

  const renderSectionHeader = ({section}: {section: {title: string}}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}>
        {notification.isLoading ? (
          <Loading />
        ) : notification.isRefetching ? (
          <Loading />
        ) : (
          notification.data && (
            <SectionList
              sections={notification.data.pages.flatMap(page => page) || []}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              stickySectionHeadersEnabled={false}
              style={{backgroundColor: COLORS.white}}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  item: {
    padding: scale(12),
    borderWidth: 1,
    borderRadius: 15,
    margin: scale(2),
    borderColor: COLORS.gray2,
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  title: {
    fontFamily: 'Montserrat-Black',
    fontSize: scale(16),
    color: COLORS.primary1,
  },
  body: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scale(12),
    paddingTop: scale(4),
  },
  sectionHeader: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    color: COLORS.black,
    fontSize: scale(15),
  },
  deleteButton: {
    position: 'absolute',
    top: scale(2),
    bottom: scale(2),
    right: scale(2),
    backgroundColor: COLORS.primary1,
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(100), // Adjust as needed
    // height: scale(60),
    zIndex: -10,
    borderRadius: 15,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
