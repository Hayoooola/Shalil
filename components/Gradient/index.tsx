import { LinearGradient } from 'expo-linear-gradient';

import VARIABLES from '../../enums/variables';


const MainGradient = () => {
  return (
    <LinearGradient
      colors={[VARIABLES.PINK_COLOR, VARIABLES.PRIMARY_COLOR_DARK]}
      style={{ flex: 1 }}
      locations={[0, 0.5]}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    />
  );
};
export default MainGradient;