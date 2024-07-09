import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';
import 'intl-pluralrules';

import SettingsScreen from '../../screens/‌Settings';
import DashboardScreen from '../../screens/Dashboard';
import TransactionsScreen from '../../screens/Transactions';
import AccountsScreen from '../../screens/Accounts';
import MainGradient from '../Gradient';
import VARIABLES from '../../enums/variables';


const TabNavigation = () => {
    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: Platform.OS === "android" ? 75 : 105,
                },
                tabBarLabelStyle: {
                    fontFamily: "vazir",
                    fontSize: 14,
                    fontWeight: "600",
                    marginBottom: Platform.OS === "android" ? 5 : -10,
                    marginTop: -10
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: VARIABLES.GRAY_COLOR_LIGHT,
                headerShown: false,
                tabBarBackground: () => (
                    <MainGradient />
                )
            }}
            sceneContainerStyle={{
                backgroundColor: "#fff"
            }}
            initialRouteName={t("dashboard")}
        >
            <Tab.Screen
                name={t("settings")}
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="settings-sharp" size={24} color={focused ? "#fff" : VARIABLES.GRAY_COLOR_LIGHT} />
                    ),
                }}
            />
            <Tab.Screen
                name={t("transactions")}
                component={TransactionsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="swap-vertical" size={focused ? 42 : 32} color={focused ? "#fff" : VARIABLES.GRAY_COLOR_LIGHT} />
                    )
                }}
            />
            <Tab.Screen
                name={t("accounts")}
                component={AccountsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="folder-sync" size={focused ? 42 : 32} color={focused ? "#fff" : VARIABLES.GRAY_COLOR_LIGHT} />
                    )
                }}
            />
            <Tab.Screen
                name={t("dashboard")}
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="home" size={focused ? 42 : 32} color={focused ? "#fff" : VARIABLES.GRAY_COLOR_LIGHT} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};
export default TabNavigation;