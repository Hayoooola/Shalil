import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import 'intl-pluralrules';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import DashboardScreen from '../../screens/Dashboard';
import InteractionsScreen from '../../screens/Interactions';
import CalendarScreen from '../../screens/Calendar';
import AccountsScreen from '../../screens/Accounts';
import VARIABLES from '../../enums/variables';
import { Platform } from 'react-native';


const MainNavigator = () => {
    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: Platform.OS === "android" ? 75 : 105,
                    },
                    tabBarLabelStyle: {
                        fontFamily: "vazir",
                        fontSize: 16,
                        fontWeight: "600",
                        marginBottom: Platform.OS === "android" ? 5 : -10,
                        marginTop: -10
                    },
                    tabBarActiveTintColor: "#fff",
                    tabBarInactiveTintColor: VARIABLES.GRAY_COLOR_LIGHT,
                    headerShown: false,
                    tabBarBackground: () => (
                        <LinearGradient
                            colors={[VARIABLES.PINK_COLOR, VARIABLES.PRIMARY_COLOR_DARK]}
                            style={{ flex: 1 }}
                            locations={[0, 0.5]}
                            start={{ x: 0.1, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                        />
                    )
                }}
            >
                <Tab.Screen
                    name={t("calendar")}
                    component={CalendarScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <AntDesign name="calendar" size={focused ? 42 : 32} color={focused ? "#fff" : VARIABLES.GRAY_COLOR_LIGHT} />
                        ),
                    }}
                />
                <Tab.Screen
                    name={t("interactions")}
                    component={InteractionsScreen}
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
        </NavigationContainer>
    );
};
export default MainNavigator;