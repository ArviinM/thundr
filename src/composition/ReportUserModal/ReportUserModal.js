// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {Overlay} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

// Components
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Separator from '../../components/Separator/Separator';
import TextInput from '../TextInput/TextInput';

// Ducks
import {
  REPORT_CATEGORY,
  UPDATE_DASHBOARD_STATE,
} from '../../ducks/Dashboard/actionTypes';

// Utils
import {scale, verticalScale} from '../../utils/commons';

import Image from '../../components/Image/Image';
import {DASHBOARD_ASSET_URI, GLOBAL_ASSET_URI} from '../../utils/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const problemArray = [
  'Nudity/Obscenity',
  'Involves a child',
  'Harassment',
  'Something else',
];

const nudity = [
  'Photos, videos and content that show sexual intercourse and genitals. ',
  'Nudity in photos of paintings and sculptures are allowed.',
  'Intimate images of people shared without permission.',
];

const harrasment = [
  'Posts that threaten, degrade or put people in a bad light.',
  'Posts with personal information of other people aimed to harass or blackmail.',
  'Posts or threats involving dissemination of intimate images of others.',
];

const involvesChild = [
  'Videos or photos that show nude or partially-nude children.',
];

const somethingElse = [
  'Please specify your experience and provide full context.',
];

const ReportUserModal = props => {
  const dispatch = useDispatch();
  const {category, targetSub} = props;
  const {showReportUserModal} = useSelector(state => state.dashboard);
  const [expandedDetails, setExpandedDetails] = useState('');
  const [remarks, setRemarks] = useState('');

  const isExpandedDetailsVisible = expandedDetails !== '';

  const handleNavigation = () => {
    dispatch({
      type: UPDATE_DASHBOARD_STATE,
      newState: {showReportUserModal: false},
    });
    setExpandedDetails('');
    setRemarks('');
  };

  const selectAProblem = () => {
    return (
      <>
        <View
          style={{
            alignSelf: 'flex-start',
            top: verticalScale(20),
          }}>
          <Text fontFamily="Montserrat-Bold" size={20} weight={700}>
            Please select a problem
          </Text>
          <View
            style={{
              marginTop: verticalScale(30),
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            {problemArray.map(item => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setExpandedDetails(item);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: verticalScale(10),
                    }}>
                    <Text fontFamily="Montserrat-Regular" size={20}>
                      {item}
                    </Text>
                    <Image
                      source={DASHBOARD_ASSET_URI.EXPAND_REPORT}
                      height={20}
                      width={20}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#FEBC29',
                      width: scale(280),
                      marginBottom: verticalScale(10),
                    }}
                  />
                </>
              );
            })}
          </View>
        </View>
        <Separator space={40} />
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={handleNavigation}
            title="Cancel"
            style={{width: scale(100), backgroundColor: '#FFBC28'}}
          />
        </View>
      </>
    );
  };

  const moreDetails = () => {
    const renderTitle = () => {
      if (expandedDetails === 'Nudity/Obscenity') {
        return 'Nudity/Obscenity';
      } else if (expandedDetails === 'Involves a child') {
        return 'Involves a child';
      } else if (expandedDetails === 'Harassment') {
        return 'Harassment';
      } else {
        return 'Something else';
      }
    };

    const renderData = () => {
      if (expandedDetails === 'Nudity/Obscenity') {
        return nudity;
      } else if (expandedDetails === 'Involves a child') {
        return involvesChild;
      } else if (expandedDetails === 'Harassment') {
        return harrasment;
      } else {
        return somethingElse;
      }
    };

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          maxWidth: scale(280),
        }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{alignSelf: 'flex-start', top: verticalScale(20)}}>
          <Text fontFamily="Montserrat-Bold" weight={700} size={18}>
            {renderTitle()}
          </Text>
          <Separator space={20} />
          {renderData().map(item => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: verticalScale(20),
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: '#E43C59',
                  }}
                />
                <Text
                  fontFamily="Montserrat-Regular"
                  size={14}
                  customStyle={{left: scale(8)}}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{alignItems: 'center', top: verticalScale(20)}}>
          <Text fontFamily="Montserrat-Regular" size={14}>
            Tell us more
          </Text>
          <TextInput
            inputStyle={{height: verticalScale(35), width: scale(250)}}
            value={remarks}
            onChangeText={text => setRemarks(text)}
          />
          <Separator space={10} />
          <Text fontFamily="Montserrat-Regular" size={14}>
            We won’t tell (name) you reported them
          </Text>
          <Separator space={10} />
          <Button
            title="Submit"
            style={{width: scale(100)}}
            onPress={() => {
              dispatch({
                type: REPORT_CATEGORY,
                payload: {
                  targetSub,
                  reportCategory: {type: category, category: expandedDetails},
                  remark: remarks,
                },
              });
              handleNavigation();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <Overlay
      onBackdropPress={handleNavigation}
      overlayStyle={{
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
          {translateX: -scale(160)},
          {translateY: -verticalScale(118)},
        ],
        height: verticalScale(400),
        width: scale(320),
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: scale(isExpandedDetailsVisible ? 15 : 20),
      }}
      isVisible={showReportUserModal}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: scale(isExpandedDetailsVisible ? 90 : 0),
        }}>
        {isExpandedDetailsVisible && (
          <TouchableOpacity onPress={() => setExpandedDetails('')}>
            <Image
              source={GLOBAL_ASSET_URI.BACK_ICON}
              height={20}
              width={20}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        )}
        <Text
          fontFamily="Montserrat-Bold"
          size={20}
          weight={700}
          style={{marginLeft: 10, marginRight: 'auto', textAlign: 'center'}}>
          Report
        </Text>
        <TouchableOpacity
          onPress={handleNavigation}
          style={{left: scale(isExpandedDetailsVisible ? 0 : 100)}}>
          <Image
            source={DASHBOARD_ASSET_URI.CLOSE_REPORT}
            height={20}
            width={20}
            style={{
              marginLeft: 'auto',
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      {isExpandedDetailsVisible ? moreDetails() : selectAProblem()}
    </Overlay>
  );
};

export default ReportUserModal;
