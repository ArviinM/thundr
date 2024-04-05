import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import LinearGradient from 'react-native-linear-gradient';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const completionPercentage = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.incompleteBar} />
      <View style={[styles.completedBar, {width: `${completionPercentage}%`}]}>
        <LinearGradient
          colors={['#E33051', '#EF9D47']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10, // Adjust thickness as needed
    backgroundColor: COLORS.gray2, // Placeholder for visibility - change as needed
    overflow: 'hidden',
  },
  incompleteBar: {
    flex: 1, // Occupy the entire container
    backgroundColor: COLORS.gray2, // Light gray
  },
  completedBar: {
    height: 10,
    backgroundColor: COLORS.primary1,
  },
  gradient: {flex: 1},
});

export default StepProgressBar;
