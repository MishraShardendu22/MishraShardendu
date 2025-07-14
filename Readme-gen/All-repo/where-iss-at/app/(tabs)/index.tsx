import Reanimated, { useAnimatedStyle, useSharedValue, withSpring, interpolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import { StyleSheet, View, Text, Pressable, Dimensions, Image, StatusBar } from 'react-native';
import AnimatedBackground from '../../components/MyComponents/AnimatedBackground';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

const HomeScreen: React.FC = () => {
  const scrollY = useSharedValue(0);
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, HEADER_HEIGHT], [HEADER_HEIGHT, HEADER_HEIGHT * 0.6], 'clamp'),
  }));

  const renderInfoCard = (title: string, text: string, icon: string) => {
    const scale = useSharedValue(1);
    const cardStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
      scale.value = withSpring(0.95, {}, () => {
        scale.value = withSpring(1);
      });
      setIsExpanded(prev => ({...prev, [title]: !prev[title]}));
    };

    return (
      <Reanimated.View style={[styles.container, cardStyle]} key={title}>
        <Pressable onPress={handlePress} style={styles.cardPressable}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Icon name={icon} size={28} color="#E9D5FF" style={styles.icon} />
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={[
            styles.text,
            { height: isExpanded[title] ? 'auto' : 80 }
          ]}>
            {text}
          </Text>
        </Pressable>
      </Reanimated.View>
    );
  };

  return (
    <View style={styles.mainContainer}>
            <StatusBar
              barStyle="dark-content" // Sets the top bar to black
              backgroundColor="#000000" // Background color of the top bar
            />
      <AnimatedBackground />
      <Reanimated.View style={[styles.header, headerAnimatedStyle]}>
        <Image source={require('@/assets/images/iss-header.webp')} style={styles.headerImage} />
        <View style={styles.overlay} />
        <Text style={styles.headerTitle}>International Space Station</Text>
        <Text style={styles.headerSubtitle}>Explore Humanity's Home in Space</Text>
      </Reanimated.View>

      <Reanimated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {renderInfoCard(
          "What is ISS?",
          "The ISS is the abbreviation of International Space Station. It is a space station, or a habitable artificial satellite, in low Earth orbit. Its first component was launched into orbit in 1998, with the first long-term residents arriving in November 2000. It has been inhabited continuously since that date.",
          "rocket"
        )}

        {renderInfoCard(
          "How does ISS work?",
          "The ISS serves as a microgravity and space environment research laboratory in which scientific research is conducted in astrobiology, astronomy, meteorology, physics, and other fields. The station is suited for the testing of spacecraft systems and equipment required for missions to the Moon and Mars.",
          "microscope"
        )}

        {renderInfoCard(
          "How to see ISS?",
          "The International Space Station orbits the Earth every 90 minutes. It is visible to the naked eye and can be seen from the ground if you know when and where to look. You can check the schedule of ISS passing over your location on the internet.",
          "telescope"
        )}

        {renderInfoCard(
          "Why do we need ISS?",
          "The ISS is crucial for advancing our understanding of living and working in space. It serves as a unique scientific platform for research that benefits life on Earth and prepares us for future space exploration. The station also promotes international cooperation in space exploration.",
          "help-circle"
        )}
      </Reanimated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0A0118',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 1, 24, 0.3)',
  },
  headerTitle: {
    position: 'absolute',
    bottom: 45,
    left: 20,
    color: '#F3E8FF',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#E9D5FF',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT + 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  container: {
    backgroundColor: '#1A0B2E',
    borderRadius: 20,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#9333EA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.2)',
  },
  cardPressable: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: 'rgba(147, 51, 234, 0.2)',
    borderRadius: 12,
    padding: 10,
    marginRight: 16,
  },
  icon: {
    marginRight: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E9D5FF',
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#DDD6FE',
    lineHeight: 24,
    overflow: 'hidden',
  },
  readMore: {
    color: '#A855F7',
    marginTop: 12,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default HomeScreen;
