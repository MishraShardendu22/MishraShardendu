import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Star from './Star';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedBackground: React.FC = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    position: {
      x: Math.random() * SCREEN_WIDTH,
      y: Math.random() * SCREEN_HEIGHT,
    },
    duration: Math.random() * 3000 + 2000,
  }));

  return (
    <View style={styles.starsContainer}>
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

export default AnimatedBackground;
