import React from "react";
import { MetricConfig } from "../../types/cardtype";
import type { CardProps } from "../../types/cardtype";
import "./card.css";

const Card: React.FC<CardProps> = ({ 
    metric, }) => {
        const config = MetricConfig[metric.type];

        const formatNumber = (count: number): string => {
            if (count >= 1000){
                return `${(count / 1000).toFixed(1)}k`;
            }
            return count.toString();
        };

        return (
            <>
            <div className="card">
                <div className="card-header">
                    {config.label}
                </div>
                <div className="card-body">
                    {formatNumber(metric.count)}
                    <img className='card-icon' src={config.icon}/>
                </div>
                <div className="card-footer">
                    {config.description}
                </div>
            </div>
            </>
        )
    };

    export default Card;