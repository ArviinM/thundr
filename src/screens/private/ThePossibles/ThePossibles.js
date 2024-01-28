// React modules
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';

// Components
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';
import PossiblesSelection from '../../../composition/PossiblesSelection/PossiblesSelection';

// Utils
import {
  calculateAge,
  isIosDevice,
  scale,
  verticalScale,
} from '../../../utils/commons';

// Styles
import {BorderLinearGradient} from '../PersonalityType/Styled';
import {useDispatch, useSelector} from 'react-redux';
import {GET_POSSIBLES} from '../../../ducks/Dashboard/actionTypes';
import Spinner from '../../../components/Spinner/Spinner';
import FeatureNotAvailableModal from '../../../composition/FeatureNotAvailableModal/FeatureNotAvailableModal';

const Jowables = props => {
  const {handleRefresh, jowaPossibles, setDisplayModal} = props;
  const navigation = useNavigation();

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
      numColumns={2}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
      data={jowaPossibles}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (!item?.visible) {
                setDisplayModal(true);
              } else {
                navigation.navigate('DashboardTab', {
                  fromPossibles: true,
                  sub: item?.targetSub,
                });
              }
            }}
            style={{alignItems: 'center', marginTop: verticalScale(20)}}>
            <BorderLinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFBD28', '#FFBD28']}
              style={{
                marginHorizontal: scale(8),
                height: verticalScale(150),
                alignItems: 'center',
                marginBottom: verticalScale(10),
              }}>
              <View
                style={{
                  height: verticalScale(145),
                  backgroundColor: '#9B9DA0',
                  borderRadius: 15,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: item?.picture,
                  }}
                  height={145}
                  width={150}
                  resizeMode="cover"
                  customStyle={{
                    borderRadius: 15,
                  }}
                />
              </View>
            </BorderLinearGradient>
            <View style={{alignItems: 'center'}}>
              <Text
                color="#FFBD28"
                size={22}
                weight={700}
                fontFamily="Montserrat-Bold">
                {item?.name?.split(' ')[0]}, {calculateAge(item?.birthday)}
              </Text>
              <Text fontFamily="Montserrat-Medium" color="#808080" size={13}>
                Compatibility Score:{' '}
                <Text
                  color="#FFBD28"
                  size={13}
                  weight={700}
                  fontFamily="Montserrat-Bold">
                  {item?.compatibilityScore}%
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text size={20}>No data available</Text>
          </View>
        );
      }}
    />
  );
};

const Marebles = props => {
  const {handleRefresh, marePossibles, setDisplayModal} = props;
  const navigation = useNavigation();

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={marePossibles}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (!item?.visible) {
                setDisplayModal(true);
              } else {
                navigation.navigate('DashboardTab', {
                  fromPossibles: true,
                  sub: item?.targetSub,
                });
              }
            }}
            style={{alignItems: 'center', marginTop: verticalScale(20)}}>
            <BorderLinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFBD28', '#FFBD28']}
              style={{
                marginHorizontal: scale(8),
                height: verticalScale(150),
                alignItems: 'center',
                marginBottom: verticalScale(10),
              }}>
              <View
                style={{
                  height: verticalScale(145),
                  backgroundColor: '#9B9DA0',
                  borderRadius: 15,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: item?.picture,
                  }}
                  height={145}
                  width={150}
                  resizeMode="cover"
                  customStyle={{
                    borderRadius: 15,
                  }}
                />
              </View>
            </BorderLinearGradient>
            <View style={{alignItems: 'center'}}>
              <Text
                color="#FFBD28"
                size={22}
                weight={700}
                fontFamily="Montserrat-Bold">
                {item?.name?.split(' ')[0]}, {calculateAge(item?.birthday)}
              </Text>
              <Text fontFamily="Montserrat-Medium" color="#808080" size={13}>
                Compatibility Score:{' '}
                <Text
                  color="#FFBD28"
                  size={13}
                  weight={700}
                  fontFamily="Montserrat-Bold">
                  {item?.compatibilityScore}%
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text size={20}>No data available</Text>
          </View>
        );
      }}
    />
  );
};

const ThePossibles = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [displayModal, setDisplayModal] = useState(false);
  const {jowaPossibles, marePossibles, loading} = useSelector(
    state => state.dashboard,
  );
  const [isJowableTabActive, setJowableTabActive] = useState(true);
  const handleRefresh = () => {
    if (isJowableTabActive) {
      dispatch({type: GET_POSSIBLES, payload: {tag: 'JOWA'}});
    } else {
      dispatch({type: GET_POSSIBLES, payload: {tag: 'MARE'}});
    }
  };

  useEffect(() => {
    if (isJowableTabActive) {
      dispatch({type: GET_POSSIBLES, payload: {tag: 'JOWA'}});
    } else {
      dispatch({type: GET_POSSIBLES, payload: {tag: 'MARE'}});
    }
  }, [dispatch, isJowableTabActive]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View
      style={{
        backgroundColor: '#ECE7E4',
        flex: 1,
        paddingBottom: verticalScale(20),
      }}>
      <PossiblesSelection
        setJowableTabActive={setJowableTabActive}
        isJowableTabActive={isJowableTabActive}
      />
      <Separator space={10} />
      <FeatureNotAvailableModal
        displayCloseIcon={true}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        fromThunderBolt={true}
      />
      <View style={{alignItems: 'center'}}>
        <Text
          color={isJowableTabActive ? '#E43C59' : '#FFBD28'}
          fontFamily="ClimateCrisis-Regular"
          size={22}>
          The Possibles
        </Text>
        <Text
          fontFamily="Montserrat-Regular"
          color="#808080"
          size={13}
          customStyle={{textAlign: 'center', paddingHorizontal: scale(50)}}>
          When we say “Walang tapon!”, we are serious about it.
        </Text>
      </View>
      <Separator space={25} />
      <View style={{alignItems: 'center'}}>
        <Text
          color={isJowableTabActive ? '#E43C59' : '#FFBD28'}
          fontFamily="Montserrat-Regular"
          size={22}
          weight={700}>
          {`See who ${isJowableTabActive ? 'JOWA' : 'MARE'} you!`}
        </Text>
        <Text
          fontFamily="Montserrat-Regular"
          color="#808080"
          size={13}
          customStyle={{textAlign: 'center'}}>
          Subscribe to see them all
        </Text>
      </View>
      <Separator space={10} />
      <View style={{justifyContent: 'center', flex: 1}}>
        {isJowableTabActive ? (
          <Jowables
            handleRefresh={handleRefresh}
            jowaPossibles={jowaPossibles}
            setDisplayModal={setDisplayModal}
          />
        ) : (
          <Marebles
            handleRefresh={handleRefresh}
            marePossibles={marePossibles}
            setDisplayModal={setDisplayModal}
          />
        )}
      </View>
      <View style={{paddingTop: verticalScale(20)}}>
        <Button
          onPress={() => navigation.navigate('ThunderBolt')}
          title="Subscribe Now!"
          style={{
            width: scale(150),
            backgroundColor: isJowableTabActive ? '#E43C59' : '#FFBD28',
          }}
        />
      </View>
    </View>
  );
};

export default ThePossibles;
