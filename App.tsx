import { useFonts } from 'expo-font';
import i18next from "i18next";
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';
import Toast from 'react-native-toast-message';

import MainLoading from './components/Loading';
import fa from "./assets/locale/fa.json";
import MainNavigator from './components/Navigator';
import toastConfig from './toastConfig';
import { Provider } from 'react-redux';
import store from './store';

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
  const [fontsLoaded] = useFonts({
    'vazir': require('./assets/fonts/Vazir.ttf'),
  });

  return (
    <>
      {fontsLoaded ? (
        <Provider store={store}>
          <MainNavigator />
          <Toast config={toastConfig} />
        </Provider>
      ) : (
        <MainLoading />
      )}
    </>
  );
}
