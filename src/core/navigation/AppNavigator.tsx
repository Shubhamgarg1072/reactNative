import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../../features/home';
import { FoodMenuScreen } from '../../features/foodMenu';
import { DetailScreen } from '../../features/detail';
import { CameraScreen } from '../../features/camera';

import HomeIcon from '../assets/ic_home.svg';
import SearchIcon from '../assets/ic_clock.svg';
import SavedIcon from '../assets/ic_whishlist.svg';
import ProfileIcon from '../assets/ic_profile.svg';

import ProfileScreen from './ProfileScreen';
import SavedScreen from './SavedScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Extracted outside BottomTabNavigator — stable component reference, not recreated on re-render
function TabBarIcon({ routeName, color, size }: { routeName: string; color: string; size: number }) {
    const iconProps = { width: size, height: size, fill: color };
    switch (routeName) {
        case 'HomeTab': return <HomeIcon {...iconProps} />;
        case 'Search': return <SearchIcon {...iconProps} />;
        case 'Saved': return <SavedIcon {...iconProps} />;
        case 'Profile': return <ProfileIcon {...iconProps} />;
        default: return null;
    }
}

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#1C1C1E',
                tabBarInactiveTintColor: '#999999',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => (
                    <TabBarIcon routeName={route.name} color={color} size={size} />
                ),
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeScreen} />
            <Tab.Screen name="Search" component={FoodMenuScreen} />
            <Tab.Screen name="Saved" component={SavedScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export function AppNavigator(): React.JSX.Element {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
                    <Stack.Screen name="DetailScreen" component={DetailScreen} />
                    <Stack.Screen name="FoodMenuScreen" component={FoodMenuScreen} />
                    <Stack.Screen name="CameraScreen" component={CameraScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});
