import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Animated, Dimensions, ScrollView, StatusBar } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function TabTwoScreen() {
  const [loc, setLoc] = useState();  
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    altitude: null as number | null,
    velocity: null as number | null,
    visibility: null,
    errorMessage: null as string | null,
  });

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(width))[0];

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getLocation = async () => {
    try {
      const res = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');

      setLocation({
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        altitude: res.data.altitude,
        velocity: res.data.velocity,
        visibility: res.data.visibility,
        errorMessage: null,
      });

      const { latitude, longitude } = res.data;
      const res2 = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`);
      setLoc(res2.data.timezone_id);

      animateIn();
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocation({ ...location, errorMessage: "Unable to fetch location" });
    }
  };

  useEffect(() => {
    getLocation();
    const intervalId = setInterval(() => {
      getLocation();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content" // Sets the top bar to black
        backgroundColor="#000000" // Background color of the top bar
      />
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 55,
          longitudeDelta: 75,
        }}
      >

        <Marker coordinate={location}>
          <MaterialCommunityIcons name="satellite-variant" size={30} color="#8B5CF6" />
        </Marker>
      </MapView>

      <Animated.View 
        style={[
          styles.infoContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {location.errorMessage ? (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons name="alert-circle" size={24} color="#EF4444" />
              <Text style={styles.errorText}>{location.errorMessage}</Text>
            </View>
          ) : (
            <>
              <Text style={styles.title}>ISS Location</Text>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="latitude" size={24} color="#8B5CF6" />
                <Text style={styles.infoText}>Latitude: {location.latitude.toFixed(6)}°</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="longitude" size={24} color="#8B5CF6" />
                <Text style={styles.infoText}>Longitude: {location.longitude.toFixed(6)}°</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="airplane" size={24} color="#8B5CF6" />
                <Text style={styles.infoText}>Altitude: {location.altitude ? `${location.altitude.toFixed(2)} km` : 'N/A'}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="speedometer" size={24} color="#8B5CF6" />
                <Text style={styles.infoText}>Velocity: {location.velocity ? `${location.velocity.toFixed(2)} km/h` : 'N/A'}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="clock-time-three-outline" size={24} color="#8B5CF6" />
                <Text style={styles.infoText}>Timezone: {loc || 'N/A'}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="eye" size={24} color="#8B5CF6" />
                <Text style={styles.infoText}>Visibility: {location.visibility || 'N/A'}</Text>
              </View>
            </>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  map: {
    flex: 0.6,
  },
  infoContainer: {
    flex: 0.4,
    padding: 20,
    backgroundColor: '#2D3748',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 12,
  },
  infoText: {
    color: '#F3F4F6',
    fontSize: 16,
    marginLeft: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
  },
  errorText: {
    color: '#EF4444',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  scrollViewContent: {
    paddingBottom: 20,
  }
});
