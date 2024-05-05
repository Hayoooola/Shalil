import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

import DashboardScreen from './screens/Dashboard';
import InteractionsScreen from './screens/Interactions';
import CalendarScreen from './screens/Calendar';
import MainLoading from './components/Loading';
import fa from "./assets/locale/fa.json";

// Config i18n to support multi-lang
i18next
  .use(initReactI18next)
  .init({
    lng: 'fa', // Default language
    resources: {
      fa: { translation: fa },
      // en: { translation: enTranslation },
    },
  });


export default function App() {
  const Tab = createBottomTabNavigator();

  const [fontsLoaded] = useFonts({
    'vazir': require('./assets/fonts/Vazir.ttf'),
  });

  return (
    <>
      {fontsLoaded ? (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Interactions" component={InteractionsScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <MainLoading />
      )}
    </>
  );
}
