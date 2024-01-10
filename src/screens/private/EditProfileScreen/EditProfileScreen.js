// React modules
import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation, useRoute} from '@react-navigation/native';

// Components
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import PrimaryDetails from '../../public/ProfileCreationScreen/ProfileCreationScreen';
import PersonalityType from '../PersonalityType/PersonalityType';
import Button from '../../../components/Button/Button';
import Image from '../../../components/Image/Image';

// Utils
import {scale, verticalScale} from '../../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../../utils/images';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_USER_PROFILE} from '../../../ducks/UserProfile/actionTypes';
import {GET_CURRENT_USER_PROFILE} from '../../../ducks/Dashboard/actionTypes';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {personalityDetailsState, primaryDetailsState} = useSelector(
    state => state.dashboard,
  );
  const route = useRoute();
  const {currentUserProfile} = route?.params;

  useEffect(() => {
    dispatch({type: GET_CURRENT_USER_PROFILE});
  }, [dispatch]);

  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={{
        paddingBottom: verticalScale(40),
        backgroundColor: '#EDE8E5',
      }}>
      <Separator space={20} />
      <TouchableOpacity
        style={{left: scale(20)}}
        onPress={() => navigation.goBack()}>
        <Image source={GLOBAL_ASSET_URI.BACK_ICON} height={25} width={25} />
      </TouchableOpacity>
      <View style={{alignItems: 'center', paddingHorizontal: scale(25)}}>
        <Text
          fontFamily="ClimateCrisis-Regular"
          color="#E43C59"
          weight={700}
          size={25}>
          Profile
        </Text>
        <Text fontFamily="Montserrat-Regular" color="#E43C59" weight={700}>
          Dito, ikaw ang bida. Set your profile now, mars!
        </Text>
      </View>
      <View>
        <PrimaryDetails
          fromEditProfileScreen={true}
          currentUserProfile={currentUserProfile}
        />
        <Separator space={-40} />
        <PersonalityType
          fromEditProfileScreen={true}
          currentUserProfile={currentUserProfile}
        />
        <Separator space={-70} />
        <Button
          title="Save"
          style={{width: scale(160)}}
          onPress={() => {
            navigation.reset({index: 0, routes: [{name: 'DashboardTabs'}]});
            dispatch({
              type: UPDATE_USER_PROFILE,
              payload: {...personalityDetailsState, ...primaryDetailsState},
            });
            dispatch({type: GET_CURRENT_USER_PROFILE});
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;
