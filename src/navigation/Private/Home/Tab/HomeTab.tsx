import React from 'react';
import {RootNavigationParams, Tab} from '../../../../constants/navigator.ts';
import {COLORS} from '../../../../constants/commons.ts';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../../../constants/images.ts';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {ChatTop} from '../Top/ChatTop.tsx';
import Possibles from '../../../../screens/Private/Possibles/Possibles.tsx';
import {LightningIcon} from '../../../../assets/images/tab_icons/LightningIcon.tsx';
import {useAuth} from '../../../../providers/Auth.tsx';
import {AdvocacyIcon} from '../../../../assets/images/tab_icons/AdvocacyIcon.tsx';
import useUnreadStore from '../../../../store/unreadStore.ts';
import {HomeStack} from '../Stack/HomeStack.tsx';
import {useGetChatList} from '../../../../hooks/chat/useGetChatList.ts';
import {AdvocacyStack} from '../Stack/AdvocacyStack.tsx';
import {FeedIcon} from '../../../../assets/images/tab_icons/FeedIcon.tsx';
import {ChatIcon} from '../../../../assets/images/tab_icons/ChatIcon.tsx';
import {PossiblesIcon} from '../../../../assets/images/tab_icons/PossiblesIcon.tsx';
import {CommunityTop} from '../Top/CommunityTop.tsx';
import {BlurView} from 'expo-blur';

export const HomeTab = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const auth = useAuth();
  const isUnread = useUnreadStore(state => state.isUnreads);

  const getChatList = useGetChatList({sub: auth.authData?.sub || ''});

  function Header() {
    return (
      <Image
        source={IMAGES.headerLogo}
        resizeMode={'contain'}
        style={{width: scale(130), height: scale(20)}}
      />
    );
  }

  function HomeRightHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 12,
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Image
            source={IMAGES.bell}
            style={{height: scale(36), width: scale(36)}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function HomeLeftHeader({isTint}: {isTint?: boolean}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 12,
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
          <Image
            source={IMAGES.menu}
            style={{
              height: scale(24),
              width: scale(24),
              tintColor: isTint ? COLORS.white2 : undefined,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName={'CommunityTop'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.primary1,
        headerTitleStyle: {
          fontFamily: 'ClimateCrisis-Regular',
          fontWeight: '500',
          fontSize: moderateScale(20),
        },
        tabBarStyle: {
          height: insets.bottom + 70,
          backgroundColor: COLORS.white,
        },
      }}>
      <Tab.Screen
        name="CommunityTop"
        component={CommunityTop}
        options={{
          headerLeft: () => <HomeLeftHeader />,
          headerTitle: () => <Header />,
          headerRight: () => <HomeRightHeader />,
          headerShown: true,
          tabBarShowLabel: true,
          tabBarLabel: 'Community',
          tabBarActiveTintColor: COLORS.primary1,
          tabBarIcon: ({focused}) => <FeedIcon focused={focused} />,
          tabBarStyle: {
            height: insets.bottom + 70,
            // backgroundColor: COLORS.white,
            position: 'absolute',
          },
          tabBarBackground: () => (
            <BlurView
              // intensity={80}
              style={[StyleSheet.absoluteFill, {overflow: 'hidden'}]}
              experimentalBlurMethod="dimezisBlurView"
              intensity={75}
              tint="extraLight"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Possibles"
        component={Possibles}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: COLORS.white2,
          headerTransparent: true,
          headerLeft: () => <HomeLeftHeader isTint />,
          tabBarShowLabel: true,
          tabBarLabel: 'Possibles',
          tabBarActiveTintColor: COLORS.primary1,
          tabBarIcon: ({focused}) => <PossiblesIcon focused={focused} />,
        }}
      />

      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabel: 'Dating',
          tabBarActiveTintColor: COLORS.primary1,
          tabBarIcon: ({focused}) => <LightningIcon focused={focused} />,
        }}
      />

      <Tab.Screen
        name="AdvocacyStack"
        component={AdvocacyStack}
        options={{
          headerLeft: () => <HomeLeftHeader />,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabel: 'Advocacy',
          tabBarActiveTintColor: COLORS.primary1,
          tabBarIcon: ({focused}) => <AdvocacyIcon focused={focused} />,
        }}
      />

      <Tab.Screen
        name="Messages"
        component={ChatTop}
        options={{
          headerLeft: () => <HomeLeftHeader />,
          tabBarShowLabel: true,
          tabBarLabel: 'Chat',
          tabBarActiveTintColor: COLORS.primary1,
          tabBarIcon: ({focused}) => (
            <>
              <ChatIcon focused={focused} />
              {isUnread && (
                <View style={styles.indicator}>
                  <Text style={styles.indicatorText}>
                    {getChatList.isSuccess && getChatList.data.unreads}
                  </Text>
                </View>
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: COLORS.primary1,
    width: 16,
    height: 16,
    borderRadius: 8, // Updated from 10 for a softer circle
    position: 'absolute',
    top: scale(10),
    right: scale(18),
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'center', // Center the text vertically
  },
  indicatorText: {
    color: 'white', // Ensure good contrast
    fontSize: scale(10), // Adjust font size for readability
    fontWeight: 'bold', // Consider bold for emphasis
  },
});
