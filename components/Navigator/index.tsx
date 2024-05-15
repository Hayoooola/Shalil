import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import 'intl-pluralrules';

import TabNavigation from './TabNavigation';
import CreateAccountScreen from '../../screens/CreateAccount';
import VARIABLES from '../../enums/variables';
import MainGradient from '../Gradient';


const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    const { t } = useTranslation();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleStyle: {
                        fontFamily: "vazir",
                    },
                    contentStyle: {
                        backgroundColor: "#fff"
                    },
                    headerBackground: () => <MainGradient />,
                    headerTitleAlign: "center",
                    headerTintColor: VARIABLES.WHITE_COLOR,
                }}
            >

                {/* ---------- Default Layout ---------- */}
                <Stack.Screen
                    name="App"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />

                {/* ---------- Custom Layout ---------- */}
                <Stack.Screen name={t("add_account")} component={CreateAccountScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default MainNavigator;
