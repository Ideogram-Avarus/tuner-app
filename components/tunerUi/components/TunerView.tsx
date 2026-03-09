import { colors } from '@/hooks/theme';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, useWindowDimensions } from 'react-native';
import { useTunerDisplay, useTunerResult } from '../hooks';
import { AnimatedGauge } from './AnimatedGauge';
import { NoteDisplay } from './NoteDisplay';

export interface TunerViewProps {
  containerStyle?: StyleProp<ViewStyle>
}

export const TunerView: React.FC<TunerViewProps> = ({ containerStyle }) => {
  const { width } = useWindowDimensions();
  const { result: rawData } = useTunerResult()
  const { noteInfo, cents, frequency, color } = useTunerDisplay(rawData);

  const gaugeSize = Math.min(width * 0.9, 320);



  return (
    <View style={[styles.container, containerStyle]}>
      <NoteDisplay
        noteInfo={noteInfo}
        frequency={frequency}
        color={color}
      />
      <AnimatedGauge size={gaugeSize} color={color} cents={cents} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inverseOnSurface,
  },
});