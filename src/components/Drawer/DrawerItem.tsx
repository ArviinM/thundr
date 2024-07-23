import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {IMAGES} from '../../constants/images.ts';
import {scale} from '../../utils/utils.ts';

interface DrawerItemProps {
  label: string;
  onPress: () => void;
  icon?: string;
  isSelected?: boolean; // Update prop name to isSelected
}

const DrawerItem: React.FC<DrawerItemProps> = ({
  label,
  onPress,
  icon,
  isSelected,
}) => {
  const getImageSource = (icon: string): ImageSourcePropType => {
    switch (icon) {
      case 'thundrHomeDrawer':
        return IMAGES.thundrHomeDrawer;
      case 'profileDrawer':
        return IMAGES.profileDrawer;
      case 'thundrBoltDrawer':
        return IMAGES.thundrBoltDrawer;
      // case 'thundrMachiDrawer':
      //   return IMAGES.thundrMachiDrawer;
      case 'settings':
        return IMAGES.settings;
      case 'log-out':
        return IMAGES.logout;
      default:
        return IMAGES.thundrHomeDrawer;
    }
  };

  const source = icon ? getImageSource(icon) : undefined;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, isSelected && styles.itemSelected]}>
      <Image source={source} style={{height: scale(24), width: scale(24)}} />
      <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: COLORS.white2,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 12,
  },
  itemSelected: {
    borderColor: COLORS.primary1,
    borderWidth: 1,
  },
  itemText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: COLORS.black,
    letterSpacing: -0.4,
    marginLeft: 14,
  },
  itemTextSelected: {
    color: COLORS.primary1,
  },
});

export default DrawerItem;
