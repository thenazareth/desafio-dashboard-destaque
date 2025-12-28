import React from "react";
import {
    BarChart, 
    Bar,
    Tooltip,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface CommitChartProps {
  data?: Array<{
    week: string;
    commits: number;
  }>;
}

//Dados de teste
// const data = [
//     { month: 'Jan', commits: 30 },
//     { month: 'Feb', commits: 45 },
//     { month: 'Mar', commits: 28 },
//     { month: 'Apr', commits: 50 },
// ];

const CommitChart: React.FC<CommitChartProps> = ({ data }) => {
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
     const chartData = Array.isArray(data) ? data : [];
    return(
        <>
        <ResponsiveContainer width="60%" height='100%'>
            <BarChart 
                data={chartData} 
                margin={{ 
                    top: 20, 
                    right: 30, 
                    left: 20, 
                    bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commits" 
                    name="Commits" 
                    radius={[4, 4, 0, 0]}>
                    {chartData.map((_, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={colors[index % colors.length]} 
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        </>
    );
}

export default CommitChart;
