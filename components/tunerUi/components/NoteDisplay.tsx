import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { NoteInfo } from '../types';

interface Props {
  noteInfo: NoteInfo;
  frequency: number;
  color: string;
}

export const NoteDisplay: React.FC<Props> = ({ noteInfo, frequency, color }) => (
  <View style={styles.container}>
    <Text variant='displayMedium' style={{color}}>{noteInfo.fullName}</Text>
    <Text variant='labelMedium'style={{ color }}>
      {`${frequency >= 0 ? '+' : ''}${frequency.toFixed(1)} Hz`}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 24 },
});