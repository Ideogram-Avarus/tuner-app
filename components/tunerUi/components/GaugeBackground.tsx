import { colors } from '@/hooks/theme';
import React from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { centsToDegrees, describeArc, polarToCartesian } from '../utils';

interface Props {
  size: number;
  color: string;
}

export const GaugeBackground: React.FC<Props> = ({ size, color }) => {

  const radius = size * 0.47;
  const cx = size / 2;
  const cy = radius + 35;
  const arcRadius = radius - 10;

  const arcPath = describeArc(cx, cy, arcRadius, -80, 80);

  const majorCents = Array.from({ length: 6 }, (_, i) => -80 + i * (160 / 5));
  const minorCents = Array.from({ length: 32 }, (_, i) => -80 + i * 5);

  const renderTick = (centsVal: number, length: number, width: number, isMajor: boolean) => {
    const angle = centsToDegrees(centsVal);
    const outer = polarToCartesian(cx, cy, radius - 4, angle);
    const inner = polarToCartesian(cx, cy, radius - length, angle);

    return (
      <Line
        key={`t-${centsVal}`}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke={
          isMajor ? 
          colors.inverseSurface : colors.secondary
        }
        strokeWidth={width}
        strokeLinecap="round"
      />
    );
  };

  return (
    <Svg width={size} height={radius + 70} viewBox={`0 0 ${size} ${radius + 70}`}>
      {/* Thick background arc */}
      <Path d={arcPath} fill="none" stroke={colors.border} strokeWidth="11" strokeLinecap="round" />
      {majorCents.map((c) => renderTick(c, 28, 4.5, true))}

      {/* Minor ticks */}
      {minorCents.map((c) => {
        if (majorCents.includes(c)) return null;
        return renderTick(c, 18, 2.2, false);
      })}

      {/* Pivot base */}
      <Circle cx={cx} cy={cy} r="11" fill={colors.surface} stroke={colors.outline} strokeWidth="3" />
    </Svg>
  );
};