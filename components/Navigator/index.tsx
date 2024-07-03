import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import 'intl-pluralrules';

import TabNavigation from './TabNavigation';
import CreateAccountScreen from '../../screens/CreateAccount';
import CreateTransactionScreen from '../../screens/CreateTransaction';
import MainGradient from '../Gradient';
import VARIABLES from '../../enums/variables';
import AccountDetail from '../../screens/AccountDetail';


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
                    headerTitleAlign: "center",
                    headerTintColor: VARIABLES.WHITE_COLOR,
                }}
            >

                {/* ---------- Default Layout ---------- */}
                <Stack.Screen
                    name={"App"}
                    component={TabNavigation}
                    options={{
                        headerShown: false,
                        headerTransparent: true
                    }}
                />

                {/* ---------- Custom Layout ---------- */}
                {/* Add new Account */}
                <Stack.Screen
                    name={t("add_account")}
                    component={CreateAccountScreen}

                    options={{
                        headerBackTitleVisible: false,
                        headerBackground: () => <MainGradient />,
                    }}
                />
                {/* Add new Transaction */}
                <Stack.Screen
                    name={t("add_transaction")}
                    component={CreateTransactionScreen}
                    options={({ route }) => ({
                        // @ts-ignore
                        title: route.params?.currentTransaction ? t("edit_transaction") : t("add_transaction"),
                        headerBackTitleVisible: false,
                        headerBackground: () => <MainGradient />,
                    })}
                />
                {/* Single account detail page */}
                <Stack.Screen
                    name={t("account_detail")}
                    component={AccountDetail}
                    options={({ route }) => ({
                        // @ts-ignore
                        title: route.params?.accountData ? route.params?.accountData.title : t("account_detail"),
                        headerBackTitleVisible: false,
                        headerBackground: () => <MainGradient />,
                    })}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default MainNavigator;
