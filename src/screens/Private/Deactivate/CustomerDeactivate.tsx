import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import {COLORS} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';

import {useAuth} from '../../../providers/Auth.tsx';
import {profileCreationStyles} from '../ProfileCreation/styles.tsx';
import {scale} from '../../../utils/utils.ts';
import Button from '../../../components/shared/Button.tsx';
import {useDeactivateAccount} from '../../../hooks/deactivate/useDeactivateAccount.ts';
import DeactivateModal from '../../../components/shared/DeactivateModal.tsx';
import {useCustomerSurvey} from '../../../hooks/deactivate/useCustomerSurvey.ts';

interface RadioButtonProps {
  value: string;
  label: string;
  isSelected: boolean;
  onSelect: (value: any) => void;
  index: number;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  isSelected,
  onSelect,
  index,
}) => (
  <TouchableOpacity
    onPress={() => onSelect(value)} // Update here!
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderBottomWidth: index !== 5 && index !== 6 ? 1 : 0,
      borderTopWidth: index !== 6 ? 0 : 1,
      borderColor: COLORS.gray2,
    }}>
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isSelected && (
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 6,
            backgroundColor: COLORS.primary1,
          }}
        />
      )}
    </View>
    <Text style={{marginLeft: scale(14), fontFamily: 'Montserrat-Regular'}}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface OtherInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const OtherInput: React.FC<OtherInputProps> = ({value, onChangeText}) => (
  <View style={{paddingHorizontal: 20, gap: scale(10)}}>
    <Text
      style={{
        fontFamily: 'Montserrat-Regular',
        color: COLORS.gray,
        fontSize: scale(10),
        marginTop: -10,
      }}>
      We want to understand how to improve your experience. Why are you
      deactivating your Thundr account?
    </Text>
    <TextInput
      style={{
        fontSize: scale(12),
        fontFamily: 'Montserrat-Regular',
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: 16,
        paddingHorizontal: 16,
        minHeight: 120,
        maxHeight: 120,
        marginBottom: 20,
      }}
      keyboardType="default"
      placeholder="Type here"
      placeholderTextColor={COLORS.gray3}
      inputMode={'text'}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="none"
      selectionColor={COLORS.primary1}
      multiline={true}
      maxLength={255}
      textAlignVertical={'top'}
    />
  </View>
);

const CustomerDeactivate = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const auth = useAuth();

  // const [loading, isLoading] = useState(false);

  const [selectedValue, setSelectedValue] = useState<
    | 'found_a_match'
    | 'entering_new_relationship'
    | 'taking_a_break'
    | 'not_interested'
    | 'something_broken'
    | 'other'
  >('found_a_match');
  const [otherValue, setOtherValue] = useState('');

  const handleSelect = (value: string) => {
    setSelectedValue(
      value as
        | 'found_a_match'
        | 'entering_new_relationship'
        | 'taking_a_break'
        | 'not_interested'
        | 'something_broken'
        | 'other',
    );
    if (value !== 'other') {
      setOtherValue('');
    }
  };

  const [visible, isVisible] = useState(false);
  const deactivate = useDeactivateAccount();
  const customerSurvey = useCustomerSurvey();

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={profileCreationStyles.container}>
      <DeactivateModal
        isVisible={visible}
        title="Sure ka na ba sis?"
        content={
          <Text style={{fontFamily: 'Montserrat-Regular'}}>
            Upon deactivation, you may reactivate your account only for seven
            (7) days. Gora na siz?
          </Text>
        }
        buttonText="Deactivate"
        onDeactivate={async () => {
          try {
            if (auth.authData) {
              await customerSurvey.mutateAsync({
                sub: auth.authData.sub,
                type: 'DEACTIVATE',
                value: otherValue
                  ? `${selectedValue.toUpperCase()}: ${otherValue}`
                  : selectedValue.toUpperCase(),
              });
              await deactivate.mutateAsync({sub: auth.authData.sub});
              auth.signOut();
              isVisible(false);
            }
          } catch (error) {
            auth.signOut();
            console.error(error);
          }
        }}
        onClose={() => isVisible(false)}
      />
      <KeyboardAwareScrollView
        bottomOffset={220}
        style={profileCreationStyles.flex}>
        <View style={profileCreationStyles.container}>
          <View style={profileCreationStyles.backButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={profileCreationStyles.backButton}>
              <Image
                source={IMAGES.back}
                style={[profileCreationStyles.backImage]}
              />
            </TouchableOpacity>
          </View>
          <View style={profileCreationStyles.titleContainer}>
            <Text
              style={[profileCreationStyles.textTitle, {fontSize: scale(22)}]}>
              Deactivate Account
            </Text>
            <Text
              style={[
                profileCreationStyles.textSubtitle,
                {paddingVertical: scale(10)},
              ]}>
              We understand you might want to deactivate your account. If you
              do, you may be asked to share a reason to help us improve.
            </Text>

            <View
              style={{
                marginTop: 20,
                marginBottom: 50,
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: COLORS.gray2,
                }}>
                <RadioButton
                  index={1}
                  value="found_a_match"
                  label="Found a match"
                  isSelected={selectedValue === 'found_a_match'}
                  onSelect={() => handleSelect('found_a_match')}
                />
                <RadioButton
                  index={2}
                  value="entering_new_relationship"
                  label="Entering a new relationship"
                  isSelected={selectedValue === 'entering_new_relationship'}
                  onSelect={() => handleSelect('entering_new_relationship')}
                />
                <RadioButton
                  index={3}
                  value="taking_a_break"
                  label="Taking a break"
                  isSelected={selectedValue === 'taking_a_break'}
                  onSelect={() => handleSelect('taking_a_break')}
                />
                <RadioButton
                  index={4}
                  value="not_interested"
                  label="Not interested in online dating anymore"
                  isSelected={selectedValue === 'not_interested'}
                  onSelect={() => handleSelect('not_interested')}
                />
                <RadioButton
                  index={5}
                  value="something_broken"
                  label="Something is broken"
                  isSelected={selectedValue === 'something_broken'}
                  onSelect={() => handleSelect('something_broken')}
                />
                {selectedValue === 'something_broken' && (
                  <OtherInput value={otherValue} onChangeText={setOtherValue} />
                )}
                <RadioButton
                  index={6}
                  value="other"
                  label="Other"
                  isSelected={selectedValue === 'other'}
                  onSelect={() => handleSelect('other')}
                />
                {selectedValue === 'other' && (
                  <OtherInput value={otherValue} onChangeText={setOtherValue} />
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{closed: -20, opened: 0}}>
        <View style={profileCreationStyles.buttonContainer}>
          <Button
            onPress={() => isVisible(true)}
            text="Deactivate My Account"
            buttonStyle={[
              profileCreationStyles.buttonStyle,
              {backgroundColor: COLORS.primary1},
            ]}
            textStyle={profileCreationStyles.buttonTextStyle}
          />
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

export default CustomerDeactivate;
