import { CyclePhase, Recommendation, ExerciseItem } from "./types";

export const MOCK_SLEEP_DATA = [
  { date: '一', value: 7.5 },
  { date: '二', value: 6.8 },
  { date: '三', value: 8.0 },
  { date: '四', value: 7.2 },
  { date: '五', value: 6.5 },
  { date: '六', value: 9.0 },
  { date: '日', value: 8.5 },
];

export const MOCK_HEART_DATA = [
  { date: '一', value: 72 },
  { date: '二', value: 75 },
  { date: '三', value: 70 },
  { date: '四', value: 68 },
  { date: '五', value: 74 },
  { date: '六', value: 71 },
  { date: '日', value: 69 },
];

export const MOCK_BP_DATA = [
  { date: '一', systolic: 118, diastolic: 78 },
  { date: '二', systolic: 120, diastolic: 80 },
  { date: '三', systolic: 119, diastolic: 79 },
  { date: '四', systolic: 122, diastolic: 81 },
  { date: '五', systolic: 121, diastolic: 80 },
  { date: '六', systolic: 117, diastolic: 76 },
  { date: '日', systolic: 119, diastolic: 78 },
];

// 颜色更新以匹配用户要求的草绿色
export const PHASE_COLORS: Record<CyclePhase, string> = {
  [CyclePhase.Menstrual]: '#FF8C5A', // 活力橙色
  [CyclePhase.Follicular]: '#5D7B24', // 匹配更新后的草绿色 mintDark
  [CyclePhase.Ovulation]: '#FFD900', // 亮黄色
  [CyclePhase.Luteal]: '#C9BBCF',
};

export const PHASE_DESCRIPTIONS: Record<CyclePhase, string> = {
  [CyclePhase.Menstrual]: '月经期',
  [CyclePhase.Follicular]: '卵泡期',
  [CyclePhase.Ovulation]: '排卵期',
  [CyclePhase.Luteal]: '黄体期',
};

export const RECOMMENDATIONS: Record<CyclePhase, Recommendation[]> = {
  [CyclePhase.Menstrual]: [
    { type: 'Diet', title: '温补', description: '姜茶与红枣，温暖子宫', tags: ['暖身'] },
    { type: 'Exercise', title: '静修', description: '冥想与呼吸，放松身心', tags: ['舒缓'] }
  ],
  [CyclePhase.Follicular]: [
    { type: 'Diet', title: '代谢', description: '补充铁质，恢复活力', tags: ['能量'] },
    { type: 'Exercise', title: '有氧', description: '慢跑，促进血液循环', tags: ['活力'] }
  ],
  [CyclePhase.Ovulation]: [
     { type: 'Diet', title: '抗氧', description: '深色蔬菜，保持状态', tags: ['护肤'] },
     { type: 'Exercise', title: '力量', description: '核心训练，释放能量', tags: ['释放'] }
  ],
  [CyclePhase.Luteal]: [
    { type: 'Diet', title: '平衡', description: '粗粮纤维，稳定血糖', tags: ['稳糖'] },
    { type: 'Exercise', title: '塑形', description: '普拉提，缓解水肿', tags: ['控制'] }
  ]
};

export const MOOD_OPTIONS = [
  { id: 'happy', label: '愉悦', icon: '😊' },
  { id: 'calm', label: '平静', icon: '😌' },
  { id: 'energetic', label: '活力', icon: '⚡' },
  { id: 'tired', label: '疲乏', icon: '😴' },
  { id: 'sad', label: '低落', icon: '😢' },
  { id: 'anxious', label: '焦虑', icon: '😰' },
];

export const SYMPTOM_OPTIONS = [
  { id: 'cramps', label: '痛经', icon: '⚡' },
  { id: 'headache', label: '头痛', icon: '🤕' },
  { id: 'fatigue', label: '疲劳', icon: '😫' },
  { id: 'bloating', label: '腹胀', icon: '🎈' },
  { id: 'backache', label: '腰酸', icon: '🦴' },
  { id: 'acne', label: '痘痘', icon: '🔴' },
  { id: 'insomnia', label: '失眠', icon: '🌙' },
  { id: 'cravings', label: '贪食', icon: '🍰' },
];

export const EXERCISE_DATA: Record<string, ExerciseItem[]> = {
  aerobic: [
    { id: '1', title: '晨间慢跑', duration: '30分钟', calories: 250, intensity: 'Medium', tags: ['心肺'] },
    { id: '2', title: '尊巴舞', duration: '45分钟', calories: 350, intensity: 'High', tags: ['快乐'] },
  ],
  anaerobic: [
    { id: '4', title: '核心训练', duration: '20分钟', calories: 150, intensity: 'High', tags: ['腹肌'] },
    { id: '5', title: '全身塑形', duration: '25分钟', calories: 180, intensity: 'Medium', tags: ['线条'] },
  ],
  yoga: [
    { id: '7', title: '舒缓瑜伽', duration: '20分钟', calories: 80, intensity: 'Low', tags: ['放松'] },
    { id: '8', title: '助眠冥想', duration: '15分钟', calories: 60, intensity: 'Low', tags: ['静心'] },
  ]
};