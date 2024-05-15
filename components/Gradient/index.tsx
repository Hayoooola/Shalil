import { LinearGradient } from 'expo-linear-gradient';

import VARIABLES from '../../enums/variables';
import { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
  borderRadius?: number;
}


const MainGradient: FC<IProps> = ({ children, borderRadius }) => {
  return (
    <LinearGradient
      colors={[VARIABLES.PINK_COLOR, VARIABLES.PRIMARY_COLOR_DARK]}
      style={{ flex: 1, borderRadius }}
      locations={[0, 0.5]}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}

    >
      {children}
    </LinearGradient>
  );
};


export const SecondaryGradient: FC<IProps> = ({ children, borderRadius }) => {
  return (
    <LinearGradient
      colors={[VARIABLES.SECONDARY_COLOR, VARIABLES.SECONDARY_COLOR_DARK]}
      style={{ flex: 1, borderRadius }}
      locations={[0, 0.5]}
      start={{ x: 0.1, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}

    >
      {children}
    </LinearGradient>
  );
};


export default MainGradient;