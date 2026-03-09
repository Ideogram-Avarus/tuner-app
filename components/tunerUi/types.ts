import type { TunerResult } from "tuner";


export interface TuningGlow {
    color: string;
    opacity: number;
    radius: number;
    strong: boolean;
}



export interface TunerDisplay {
  noteInfo: NoteInfo
  octave: number
  label: string
  cents: number
  frequency: number
  amplitude: number
  confidence: number
  color: string
  glow: TuningGlow;
}

export interface NoteInfo {
  name: string;
  octave: number;
  fullName: string;
}

export type { TunerResult };

