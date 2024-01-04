// React modules
import React, {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';

// Components
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';
import PossiblesSelection from '../../../composition/PossiblesSelection/PossiblesSelection';

// Utils
import {scale, verticalScale} from '../../../utils/commons';

// Styles
import {BorderLinearGradient} from '../PersonalityType/Styled';

const Jowables = props => {
  const {handleRefresh} = props;
  const navigation = useNavigation();

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
      numColumns={2}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
      data={['1', '2', '3', '4', '5', '6']}
      renderItem={({item, index}) => {
        return (
          <BorderLinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E43C59', '#E43C59']}
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
                  uri: item?.customerPhoto?.[0]?.photoUrl,
                }}
                height={200}
                width={150}
                resizeMode="cover"
                customStyle={{
                  borderRadius: 15,
                }}
              />
            </View>
          </BorderLinearGradient>
        );
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text size={20}>No Jowable Data</Text>
          </View>
        );
      }}
    />
  );
};

const Marebles = props => {
  const {handleRefresh} = props;
  const navigation = useNavigation();

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={['1', '2', '3', '4']}
      renderItem={({item, index}) => {
        return (
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
                  uri: item?.customerPhoto?.[0]?.photoUrl,
                }}
                height={200}
                width={150}
                resizeMode="cover"
                customStyle={{
                  borderRadius: 15,
                }}
              />
            </View>
          </BorderLinearGradient>
        );
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text size={20}>No Mareble Data</Text>
          </View>
        );
      }}
    />
  );
};

const ThePossibles = () => {
  const [isJowableTabActive, setJowableTabActive] = useState(true);
  const handleRefresh = () => {};

  // For loader
  // if (loading) {
  //   return <Spinner />;
  // }

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
          <Jowables handleRefresh={handleRefresh} />
        ) : (
          <Marebles handleRefresh={handleRefresh} />
        )}
      </View>
      <View style={{paddingTop: verticalScale(20)}}>
        <Button
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
