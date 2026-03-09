import React from 'react';
import { View } from 'react-native';
import { GaugeBackground } from './GaugeBackground';
import { GaugeNeedle } from './GaugeNeedle';

interface Props {
  size: number;
  color: string;
  cents: number;
}

export const AnimatedGauge: React.FC<Props> = ({ size, color, cents }) => (
  <View style={{ position: 'relative', alignItems: 'center' }}>
    <GaugeBackground size={size} color={color} />
    <GaugeNeedle size={size} color={color} cents={cents} />
  </View>
);