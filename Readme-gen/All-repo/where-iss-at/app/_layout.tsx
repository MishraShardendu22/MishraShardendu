import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';


const THEME = {
  primary: '#4C2882', // Darker purple
  secondary: '#5B3698', // Deep muted purple
  background: '#1A1A2E', // Almost black with a purple tint
  inactive: '#4A4A6A', // Muted dark purple for inactive tabs
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.secondary,
        tabBarInactiveTintColor: THEME.inactive,
        headerShown: false,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
          backgroundColor: THEME.background,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="(tabs)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(location)/index"
        options={{
          title: 'Where is ISS?',
          tabBarIcon: ({ color }) => (
            <Icon name="location-pin" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(about)/index"
        options={{
          title: 'Who is the creator?',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
