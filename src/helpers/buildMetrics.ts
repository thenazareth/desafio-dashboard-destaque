import type { RepoDashboard } from '../types/github.ts';
import type { Metric } from '../types/cardtype.ts';

// Setta as métricas do repositório para exibição nos cards
export function buildMetrics(data: RepoDashboard): Metric[] {
  return [
    {
      type: 'stars',
      count: data.metrics.totalStars,
    },
    {
      type: 'forks',
      count: data.metrics.totalForks,
    },
    {
      type: 'watchers',
      count: data.repo.watchers_count,
    },
  ];
}
