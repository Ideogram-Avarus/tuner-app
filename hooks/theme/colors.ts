// theme/colors.ts
export const colors = {
  // Core backgrounds
  background: '#0f172a',         // your main screen background
  surface:   '#1e293b',          // cards, sheets, elevated surfaces (slightly lighter)
  surfaceVariant: '#334155',     // subtle variant for dividers / alt surfaces

  // Primary accent (choose one — blue/indigo/teal/cyan work great with #0f172a)
  primary:   '#60a5fa',          // blue-400 — clean & modern
  // primary: '#38bdf8',         // cyan-400 alternative
  // primary: '#a78bfa',         // violet/indigo alternative

  onPrimary: '#0f172a',          // text/icons on primary → dark for contrast

  primaryContainer: '#1e40af',   // darker variant (used in some contained buttons)
  onPrimaryContainer: '#dbeafe',

  // Secondary / supporting colors
  secondary:   '#94a3b8',        // slate-400 — good for secondary text/buttons
  onSecondary: '#0f172a',

  // Status / semantic colors
  error:     '#f87171',
  onError:   '#0f172a',
  success:   '#4ade80',          // optional
  warning:   '#fbbf24',
  
  // Text / icons
  text:           '#f1f5f9',     // slate-100 – main body text
  textSecondary:  '#94a3b8',     // slate-400 – secondary text, hints
  textDisabled:   '#64748b',     // slate-500
  
  // Borders / dividers
  outline:   '#475569',          // slate-600
  border:    '#334155',          // slate-700
  
  // Inverse (rarely used in pure dark mode)
  inverseSurface: '#e2e8f0',
  inverseOnSurface: '#0f172a',

  //custom colors
  strongError: "#e74c3c",
  strongGray: "#7f8c8d"
};