// theme/theme.ts
import { MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { colors } from './colors';

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  dark: true,
  mode: 'adaptive',
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    primaryContainer: colors.primaryContainer,
    onPrimaryContainer: colors.onPrimaryContainer,

    secondary: colors.secondary,
    onSecondary: colors.onSecondary,

    tertiary: colors.primary,
    onTertiary: colors.onPrimary,

    background: colors.background,
    onBackground: colors.text,

    surface: colors.surface,
    onSurface: colors.text,
    surfaceVariant: colors.surfaceVariant,
    onSurfaceVariant: colors.textSecondary,

    error: colors.error,
    onError: colors.onError,

    outline: colors.outline,
    outlineVariant: colors.border,
    scrim: 'rgba(0, 0, 0, 0.6)',  
    inverseSurface: colors.inverseSurface,
    inverseOnSurface: colors.inverseOnSurface,
    elevation: {
      level0: 'transparent',
      level1: '#1e293b',       
      level2: '#253549',
      level3: '#2d4159',
      level4: '#334155',
      level5: '#3f4e68',
    },
  },
};