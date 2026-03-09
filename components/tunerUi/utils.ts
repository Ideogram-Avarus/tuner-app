import { colors } from "@/hooks/theme";
import { NoteInfo, TuningGlow } from "./types";

const NOTE_NAMES = [
  "C","C#",
  "D","D#",
  "E",
  "F","F#",
  "G","G#",
  "A","A#",
  "B"
]

export const midiToNoteInfo = (midiNote: number): NoteInfo => {
  const rounded = Math.round(midiNote);
  const noteIndex = ((rounded % 12) + 12) % 12;
  const octave = Math.floor(rounded / 12) - 1;
  const name = NOTE_NAMES[noteIndex];
  return { name, octave, fullName: `${name}${octave}` };
};


export const getTuningColor = (
  cents: number,
  hasPitch: boolean
) => {
  if (!hasPitch) return colors.strongGray
  const abs = Math.abs(cents)
  if (abs < 5) return colors.success
  if (abs < 15) return colors.warning
  return colors.error
}

export const getTuningGlow = (cents: number, hasPitch: boolean): TuningGlow => {
  if (!hasPitch) return { color: colors.strongGray, opacity: 0.15, radius: 8, strong: false };
  const absCents = Math.abs(cents);
  if (absCents <= 5) return { color: colors.success, opacity: 0.7, radius: 24, strong: true };
  if (absCents <= 15) return { color: colors.warning, opacity: 0.45, radius: 16, strong: false };
  return { color: colors.error, opacity: 0.3, radius: 12, strong: false };
};


export const clampCents = (cents: number) => {
  if (cents > 50) return 50
  if (cents < -50) return -50
  return cents
}

export const centsToDegrees = (cents: number): number =>
  Math.max(-80, Math.min(80, cents));

// Geometry helpers (0° = straight up, positive = clockwise)
export const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number
) => {
  const adjusted = -90 + angleInDegrees;
  const rad = (adjusted * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
};

export const describeArc = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x},${start.y} A ${radius},${radius} 0 ${largeArc} 1 ${end.x},${end.y}`;
};