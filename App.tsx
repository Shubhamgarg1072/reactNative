import React from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// --- Import Your Components ---
import Header from "./src/Header";
import SearchBar from "./src/SearchBar";
import CategoryTabs from "./src/CategoryTabs";
import PlaceCard from "./src/PlaceCard";
import DetailScreen from "./src/DetailScreen";
import FoodMenuScreen from "./src/FoodMenuScreen";
import CameraScreen from "./src/CameraScreen";

import HomeIcon from './src/assets/ic_home.svg';
import SearchIcon from './src/assets/ic_clock.svg'; // Using clock as search for now based on your files
import SavedIcon from './src/assets/ic_whishlist.svg'; // Added the 'h' to match your file
import ProfileIcon from './src/assets/ic_profile.svg';

// --- Dummy Data ---
const PLACES = [
  {
    id: '1',
    title: 'Mount Fuji',
    location: 'Tokyo, Japan',
    rating: 4.8,
    price: '$230',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80',
    description: 'Japan’s tallest peak, Mount Fuji is an active volcano about 100 kilometers southwest of Tokyo.'
  },
  {
    id: '2',
    title: 'Andes Mtn',
    location: 'South America',
    rating: 4.5,
    price: '$230',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    description: 'The Andes are the longest continental mountain range in the world, forming a continuous highland along the western edge of South America.'
  },
  {
    id: '3',
    title: 'Altay Mtn',
    location: 'Mongolia',
    rating: 4.7,
    price: '$180',
    image: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=600&q=80',
    description: 'The Altai Mountains are a mountain range in Central and East Asia, where Russia, China, Mongolia, and Kazakhstan come together.'
  },
];

// --- Navigation Setup ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Screens ---

// 1. The Real Home Screen
function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>



      <Header />
      <SearchBar />
      <CategoryTabs />

      <FlatList
        data={PLACES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PlaceCard item={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}

// 2. Dummy Screens for tabs
function ProfileScreen() {
  return <View style={styles.center}><Text>Profile Page</Text></View>;
}
function SavedScreen() {
  return <View style={styles.center}><Text>Saved Places</Text></View>;
}
function SearchScreen() {
  return <View style={styles.center}><Text>Saved Places</Text></View>;
}

// // --- The Tab Navigator Component ---
// function BottomTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: styles.tabBar,
//         tabBarActiveTintColor: '#000',
//         tabBarInactiveTintColor: '#999',
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName = 'home'; // <--- 1. Initialize with a default value

//           if (route.name === 'HomeTab') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Saved') {
//             iconName = focused ? 'bookmark' : 'bookmark-outline';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'person' : 'person-outline';
//           }

//           // 2. Now 'iconName' is guaranteed to be a string
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="HomeTab" component={HomeScreen} />
//       <Tab.Screen name="Saved" component={SavedScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#1C1C1E', // Black for active
        tabBarInactiveTintColor: '#999999', // Grey for inactive
        tabBarIcon: ({ color, size }) => {
          // We pass size and color props to the SVG components
          const iconProps = { width: size, height: size, fill: color };

          switch (route.name) {
            case 'HomeTab':
              return <HomeIcon {...iconProps} />;
            case 'Search':
              return <SearchIcon {...iconProps} />;
            case 'Saved':
              return <SavedIcon {...iconProps} />;
            case 'Profile':
              return <ProfileIcon {...iconProps} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={FoodMenuScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
// --- Main App Component ---
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* Stack Screen 1: The Tabs (which contains Home) */}
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

          {/* Stack Screen 2: The Details (covers the tabs) */}
          <Stack.Screen name="DetailScreen" component={DetailScreen} />

          {/* New Screens */}
          <Stack.Screen name="FoodMenuScreen" component={FoodMenuScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingBottom: 80, // Add padding so list isn't hidden by tabs
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});

export default App;