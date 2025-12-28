export interface LanguageChartItem {
  name: string;
  value: number;
  percent: number;
  rawPercent?: number;
  color?: string;
  meta?: {  
    languages?: string[];
    details?: Array<{ name: string; value: number }>;
  };
}

export type LanguageChartType = LanguageChartItem[];