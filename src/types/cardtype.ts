import type { ReactNode } from "react";
import fork from '../assets/forkicon.svg';
import watchers from '../assets/watchericon.svg';
import star from '../assets/staricon.svg';

//tipos das métricas
export type Metrictype = 'stars' | 'forks' | 'watchers';

export interface Metric {
    type: Metrictype;
    count: number;
}

//props do componente
export interface CardProps {
    metric: Metric;
    icon?: ReactNode;
    title?: string;
    description?: string;
}

export const MetricConfig: Record<Metrictype, { 
    label: string;
    icon: string; 
    description: string }> = {
    stars: {
        label: 'Estrelas',
        icon: star,
        description: 'Número de estrelas no repositório'
    },
    forks: {
        label: 'Forks',
        icon: fork,
        description: 'Número de forks do repositório'
    },
    watchers: {
        label: 'Watchers',
        icon: watchers,
        description: 'Número de watchers do repositório'
    }
};
