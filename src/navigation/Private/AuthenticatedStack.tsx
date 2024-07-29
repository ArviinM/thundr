import React from 'react';

import {RootNavigationParams, Stack} from '../../constants/navigator.ts';

import CustomerName from '../../screens/Private/ProfileCreation/CustomerName.tsx';
import {COLORS} from '../../constants/commons.ts';
import {Platform, TouchableOpacity} from 'react-native';
import CustomerBirthday from '../../screens/Private/ProfileCreation/CustomerBirthday.tsx';
import CustomerGender from '../../screens/Private/ProfileCreation/CustomerGender.tsx';
import CustomerRequestAccess from '../../screens/Private/ProfileCreation/CustomerRequestAccess.tsx';
import CompatibilityQuestions from '../../screens/Private/ProfileCreation/CompatibilityQuestions.tsx';
import CustomerInterests from '../../screens/Private/ProfileCreation/CustomerInterests.tsx';
import CustomerAdditionalInfos from '../../screens/Private/ProfileCreation/CustomerAdditionalInfos.tsx';
import CustomerPersonalityType from '../../screens/Private/ProfileCreation/CustomerPersonalityType.tsx';
import CustomerPhotoBio from '../../screens/Private/ProfileCreation/CustomerPhotoBio.tsx';
import Onboarding from '../../screens/Private/ProfileCreation/Onboarding.tsx';
import {useAuth} from '../../providers/Auth.tsx';
import MatchFound from '../../screens/Private/MatchFound/MatchFound.tsx';
import {HomeDrawer} from './Home/Drawer/HomeDrawer.tsx';
import ThundrBolt from '../../screens/Private/ThundrBolt/ThundrBolt.tsx';
import {ChatMessages} from '../../screens/Private/Chat/ChatMessages.tsx';
import WorkingInProgress from '../../screens/shared/WorkingInProgress.tsx';
import {FaceVerificationStack} from './Home/Stack/FaceVerificationStack.tsx';
import {ChevronLeftSmall} from '../../assets/images/ChevronLeftSmall.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {scale} from '../../utils/utils.ts';
import {CommunityProvider} from '../../providers/Community.tsx';
import CreatePost from '../../screens/Private/Community/CreatePost.tsx';

export const AuthenticatedStack = () => {
  const auth = useAuth();
  let initialRouteName;

  if (auth.authData?.forProfileCreation) {
    initialRouteName = 'CustomerName';
  } else {
    initialRouteName = 'HomeDrawer';
  }

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  function HomeLeftHeader() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
        <ChevronLeftSmall />
      </TouchableOpacity>
    );
  }

  return (
    <CommunityProvider>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {/*  Stack for Profile Creation*/}
        <Stack.Group
          screenOptions={{
            headerShown: false,
            statusBarColor: 'white',
            statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
          }}>
          <Stack.Screen name="CustomerName" component={CustomerName} />
          <Stack.Screen name="CustomerBirthday" component={CustomerBirthday} />
          <Stack.Screen name="CustomerGender" component={CustomerGender} />
          <Stack.Screen
            name="CustomerRequestAccess"
            component={CustomerRequestAccess}
          />
          <Stack.Screen
            name="CompatibilityQuestions"
            component={CompatibilityQuestions}
          />
          <Stack.Screen
            name="CustomerInterests"
            component={CustomerInterests}
          />
          <Stack.Screen
            name="CustomerAdditionalInfos"
            component={CustomerAdditionalInfos}
          />
          <Stack.Screen
            name="CustomerPersonalityType"
            component={CustomerPersonalityType}
          />
          <Stack.Screen name="CustomerPhotoBio" component={CustomerPhotoBio} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </Stack.Group>
        {/*  Main Group for Home Swiping Page */}
        <Stack.Group
          screenOptions={{
            headerShown: false,
            statusBarColor: COLORS.white,
            statusBarStyle: Platform.OS === 'android' ? 'dark' : undefined,
            statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
          }}>
          <Stack.Screen
            name="HomeDrawer"
            component={HomeDrawer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MatchFound"
            component={MatchFound}
            options={{
              statusBarColor: COLORS.primary1,
              statusBarTranslucent: true,
              animation: 'slide_from_bottom',
              statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
              statusBarAnimation:
                Platform.OS === 'android' ? 'fade' : undefined,
            }}
          />
          <Stack.Screen
            name="ChatMessages"
            component={ChatMessages}
            options={{
              animation: 'slide_from_right',
              statusBarAnimation:
                Platform.OS === 'android' ? 'fade' : undefined,
            }}
          />
          <Stack.Screen
            name="ThundrBoltModal"
            component={ThundrBolt}
            options={{
              statusBarColor: COLORS.primary1,
              statusBarTranslucent: true,
              animation: 'slide_from_bottom',
              statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
              statusBarAnimation:
                Platform.OS === 'android' ? 'fade' : undefined,
            }}
          />

          {/*  Stack Screen for Face Verification  */}
          <Stack.Screen
            name="FaceVerificationStack"
            options={{headerShown: false}}
            component={FaceVerificationStack}
          />
        </Stack.Group>

        <Stack.Group>
          {/*  For Post Creation  */}
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{
              headerTitle: 'Create Post',
              headerLeft: () => <HomeLeftHeader />,
              headerStyle: {
                backgroundColor: COLORS.white,
              },
              headerTitleStyle: {
                fontFamily: 'Montserrat-Bold',
                fontSize: scale(14),
              },
              headerShown: true,
              headerTitleAlign: 'center',
              headerShadowVisible: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </CommunityProvider>
  );
};
