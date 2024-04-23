import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {scale} from '../../../../utils/utils.ts';

import {COLORS} from '../../../../constants/commons.ts';

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 3,
        paddingVertical: 6,
        backgroundColor: COLORS.white,
        borderBottomWidth: 0.2,
        borderBottomColor: COLORS.gray5,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const isMare = route.name === 'MARE';

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              borderWidth: 1,
              height: scale(50),
              justifyContent: 'center',
              alignItems: 'center',
              margin: 2,
              borderRadius: 11,
              borderColor: isFocused
                ? isMare
                  ? COLORS.secondary2
                  : COLORS.primary1
                : COLORS.gray5,
            }}>
            <Text
              style={[
                {
                  fontFamily: 'Montserrat-Black',
                  fontSize: scale(18),
                  color: isFocused
                    ? isMare
                      ? COLORS.secondary2
                      : COLORS.primary1
                    : COLORS.gray5,
                },
              ]}>
              {typeof label === 'string' ? label : ''}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
