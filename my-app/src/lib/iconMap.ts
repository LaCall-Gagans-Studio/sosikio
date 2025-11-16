// src/lib/iconMap.ts
import {
  BarChart2,
  Headphones,
  TrendingUp,
  Users,
  Target,
  Briefcase,
  BrainCircuit,
  PlayCircle,
  Zap,
  Layers,
} from 'lucide-react'

export const ICON_MAP = {
  barChart2: BarChart2,
  headphones: Headphones,
  trendingUp: TrendingUp,
  users: Users,
  target: Target,
  briefcase: Briefcase,
  brainCircuit: BrainCircuit,
  playCircle: PlayCircle,
  zap: Zap,
  layers: Layers,
} as const

export type IconKey = keyof typeof ICON_MAP
