import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const Star: React.FC<{ size: number; position: { x: number; y: number }; duration: number }> = ({ size, position, duration }) => {
  const opacity = useSharedValue(Math.random());
  const translateY = useSharedValue(position.y);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(Math.random(), { duration: duration * 1.5, easing: Easing.linear }),
      -1,
      true
    );
    translateY.value = withRepeat(
      withTiming(position.y + 50, { duration: duration, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const starStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: position.x,
    top: translateY.value,
    opacity: opacity.value,
  }));

  return <Reanimated.View style={starStyle} />;
};

const styles = StyleSheet.create({
  star: {
    // Style for individual stars
  },
});

export default Star;
