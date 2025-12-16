import { GoogleGenAI, Type } from "@google/genai";
import { CyclePhase, Recipe } from "../types";

// Note: In a real production app, this key should be guarded.
// The prompt instructions say the key comes from process.env.API_KEY.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. AI features will be simulated.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDailyInsight = async (
  phase: CyclePhase,
  symptoms: string[],
  moods: string[]
): Promise<string> => {
  const client = getClient();
  
  // Fallback if no API key
  if (!client) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`既然处于${phase}，且感觉${moods.join('、')}，今天请多喝温水，注意休息。身体需要温柔的呵护。`);
      }, 1000);
    });
  }

  const prompt = `
    你是一位富有同情心的女性健康助手。
    用户目前处于周期的 ${phase} 阶段。
    报告的症状: ${symptoms.join(', ')}。
    报告的心情: ${moods.join(', ')}。
    
    请提供一句简短、温暖且治愈的每日洞察（不超过2句话），推荐一种具体的食物或活动。
    语调：支持性、温柔、像姐姐一样。
    请使用中文回答。
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: prompt }] },
    });
    return response.text || "今天也要好好爱自己，你很棒。";
  } catch (error) {
    console.error("Gemini API Error", error);
    return "记得多喝水，好好休息。";
  }
};

export const generateCycleReportAnalysis = async (cycleLength: number, symptoms: string[]): Promise<string> => {
    const client = getClient();
    if(!client) {
         return "您的周期长度在正常范围内。坚持记录以获得更准确的预测。";
    }

    const prompt = `
        分析一个为期 ${cycleLength} 天的月经周期。
        本月报告的常见症状: ${symptoms.join(', ')}。
        提供一份简短、令人安心的健康总结（不超过50个字），适合作为移动应用的卡片展示。
        请使用中文回答。
    `;

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: prompt }] },
        });
        return response.text || "周期分析需要更多数据。";
    } catch (e) {
        console.error("Report Analysis Error", e);
        return "暂时无法进行分析。";
    }
}

export const generateDietPlan = async (season: string, phase: string, symptoms: string[]): Promise<Recipe[]> => {
    const client = getClient();
    
    const fallbackRecipes: Recipe[] = [
        { mealType: '早餐', name: '生姜红枣粥', ingredients: ['大米', '生姜', '红枣', '红糖'], benefit: '温中散寒，补充气血', calories: 280 },
        { mealType: '午餐', name: '菠菜猪肝汤', ingredients: ['菠菜', '猪肝', '枸杞', '姜丝'], benefit: '富含铁质，改善经期贫血', calories: 450 },
        { mealType: '下午茶', name: '玫瑰花茶', ingredients: ['干玫瑰花', '蜂蜜'], benefit: '疏肝解郁，缓解痛经', calories: 60 },
        { mealType: '晚餐', name: '清蒸鲈鱼配豆腐', ingredients: ['鲈鱼', '豆腐', '葱姜'], benefit: '优质蛋白，易消化不积食', calories: 380 }
    ];

    if (!client) {
        return new Promise(resolve => setTimeout(() => resolve(fallbackRecipes), 1500));
    }

    const prompt = `
        为一位处于"${phase}"（特别关注月经期调理）的女性设计一日食谱（早餐、午餐、下午茶、晚餐）。
        当前季节：${season}。
        当前症状/需求：${symptoms.join(', ') || '无特殊不适，需常规保养'}。
        
        请返回一个标准的 JSON 数组，包含 4 个对象。
    `;

    try {
        const response = await client.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: { parts: [{ text: prompt }] },
             config: { 
                 responseMimeType: 'application/json',
                 responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            mealType: { type: Type.STRING },
                            name: { type: Type.STRING },
                            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                            benefit: { type: Type.STRING },
                            calories: { type: Type.NUMBER },
                        },
                        required: ["mealType", "name", "ingredients", "benefit", "calories"],
                    }
                 }
             }
        });
        
        const text = response.text;
        if (!text) return fallbackRecipes;
        
        return JSON.parse(text) as Recipe[];
    } catch (e) {
        console.error("Diet Gen Error", e);
        return fallbackRecipes;
    }
}