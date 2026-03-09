import { colors } from '@/hooks/theme';
import React from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';
import { useNeedle } from '../hooks/useNeedle';
import { NeedleSVG } from './SVG/NeedleSVG';

const AnimatedG = Animated.createAnimatedComponent(G);

interface Props {
  size: number;
  color: string;
  cents: number;
}

export const GaugeNeedle: React.FC<Props> = ({ size, color, cents }) => {
  const radius = size * 0.47;
  const cx = size / 2;
  const cy = radius + 35;
  const needleLength = radius * 0.88;

  const rotation = useNeedle(cents);

  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: cx },
      { translateY: cy },
      { rotate: `${rotation.value}deg` },
      { translateX: -cx },
      { translateY: -cy },
    ],
  }));

  return (
    <Svg
      width={size}
      height={radius + 70}
      viewBox={`0 0 ${size} ${radius + 70}`}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <AnimatedG animatedProps={animatedProps}>
        <NeedleSVG cx={cx} cy={cy} needleLength={needleLength} color={color} />
        { 
        // In tune halo
        Math.abs(cents) < 3 && (
          <Circle
            cx={cx}
            cy={cy - needleLength}
            r={11}
            fill="none"
            stroke={color}
            strokeWidth={2}
            opacity={0.4}
          />
        )}
      </AnimatedG>

      {/* Fixed pivot cap */}
      <Circle cx={cx} cy={cy} r={9} fill={colors.onError} stroke={colors.inverseSurface} strokeWidth={2.5} />
    </Svg>
  );
};