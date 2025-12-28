import type { LanguageChartItem } from '../types/langchartype';

export function buildLanguageChart(
  languages: Record<string, number>,
  limit: number = 5
): LanguageChartItem[] {
  // Ordena um array de linguagens por valor (bytes)
  const langArray = Object.entries(languages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Pega as top 5 linguagens
  const topLangs = langArray.slice(0, limit);
  
  // Calcula o total das outras
  const otherLangs = langArray.slice(limit);
  const otherTotal = otherLangs.reduce((sum, lang) => sum + lang.value, 0);

  // Calcula o total geral
  const total = langArray.reduce((sum, lang) => sum + lang.value, 0);

  // Cria o array final
  const result: LanguageChartItem[] = topLangs.map(({ name, value }) => {
    const rawPercent = total > 0 ? (value / total) * 100 : 0;
    
    // Formata porcentagem para não exibir 0%
    let formattedPercent: number;
    if (rawPercent < 0.1) {
      formattedPercent = Number(rawPercent.toFixed(3)); // 0.015
    } else if (rawPercent < 1) {
      formattedPercent = Number(rawPercent.toFixed(2)); // 0.15
    } else {
      formattedPercent = Number(rawPercent.toFixed(1)); // 15.0
    }
    
    return {
      name,
      value,
      percent: formattedPercent,
      rawPercent,
      color: undefined
    };
  });

 if (otherTotal > 0 && otherLangs.length > 0) {
    const rawPercent = total > 0 ? (otherTotal / total) * 100 : 0;
    
    let formattedPercent: number;
    if (rawPercent < 0.1) {
      formattedPercent = Number(rawPercent.toFixed(3));
    } else if (rawPercent < 1) {
      formattedPercent = Number(rawPercent.toFixed(2));
    } else {
      formattedPercent = Number(rawPercent.toFixed(1));
    }
    
    result.push({
      name: 'Outros',
      value: otherTotal,
      percent: formattedPercent,
      rawPercent,
      color: '#6e7681',
      meta: { details: otherLangs }
    });
  }

  return result;
}