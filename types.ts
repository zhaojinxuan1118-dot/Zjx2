
export enum CyclePhase {
  Menstrual = 'Menstrual',
  Follicular = 'Follicular',
  Ovulation = 'Ovulation',
  Luteal = 'Luteal',
}

export interface DailyLog {
  date: string;
  mood: string[];
  symptoms: string[];
  flow?: 'Light' | 'Medium' | 'Heavy';
  notes?: string;
  temperature?: number;
  weight?: number;
}

export interface HealthMetric {
  date: string;
  value: number;
}

export interface BloodPressureMetric {
  date: string;
  systolic: number;
  diastolic: number;
}

export interface Recommendation {
  type: 'Diet' | 'Exercise' | 'Lifestyle';
  title: string;
  description: string;
  tags: string[];
}

export interface ReportSummary {
  cycleLength: number;
  periodLength: number;
  predictedNext: string;
  wellnessScore: number;
  analysis: string;
}

export interface ExerciseItem {
  id: string;
  title: string;
  duration: string;
  calories: number;
  intensity: 'Low' | 'Medium' | 'High';
  tags: string[];
}

export interface Recipe {
  mealType: string;
  name: string;
  ingredients: string[];
  benefit: string;
  calories: number;
}

// Added MealPlan and MetricCard interfaces to fix import errors in Insights.tsx
export interface MealPlan {
  id: string;
  time: string;
  name: string;
  cal: string;
  status: string;
}

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: any;
  color: string;
  subText: string;
}
