import { useEffect } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { centsToDegrees } from '../utils';

export const useNeedle = (cents: number) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withSpring(centsToDegrees(cents), {
      damping: 22,
      stiffness: 135,
      mass: 0.9,
      overshootClamping: false,
    });
  }, [cents]);

  return rotation;
};