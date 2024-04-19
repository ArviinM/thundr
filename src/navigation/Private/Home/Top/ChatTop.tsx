import {Top} from '../../../../constants/navigator.ts';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {scale} from '../../../../utils/utils.ts';
import {COLORS} from '../../../../constants/commons.ts';
import {CustomTabBar} from './CustomTabBar.tsx';
export const ChatTop = () => {
  return (
    <Top.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Top.Screen name="JOWA" component={WorkingInProgress} />
      <Top.Screen name="MARE" component={WorkingInProgress} />
    </Top.Navigator>
  );
};
