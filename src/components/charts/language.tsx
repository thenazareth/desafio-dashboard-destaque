import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'; 
import type { LanguageChartItem } from '../../types/langchartype.ts';

interface LanguagePieChartProps {
  data: LanguageChartItem[];
}

const LanguagePieChart: React.FC<LanguagePieChartProps> = ({ data }) => {
  // Cores fixas
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
  
  // Tooltip customizado 
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as LanguageChartItem;
      
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #e1e4e8',
          borderRadius: '6px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <p style={{ fontWeight: 'bold', margin: 0 }}>
            {item.name}: ({item.percent}%)
          </p>
          
          {item.name === 'Outros' && item.meta?.details && (
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '5px' }}>
                Inclui:
              </p>
              {item.meta.details.map((lang: any, idx: number) => (
                <p key={idx} style={{ fontSize: '12px', margin: '2px 0', color: '#666' }}>
                  {lang.name}: {((lang.value / item.value) * 100).toFixed(1)}%
                </p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="60%" height='100%'>
      <PieChart>
        <Pie
          data={data as any[]}
          cx="70%"
          cy="50%"
          labelLine={false}
          label={false}
          //labelLine={true}
          //label={(entry) => `${entry.name}: ${entry.percent}%`}
          outerRadius={90}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip 
          content={<CustomTooltip />}
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e1e4e8',
            borderRadius: '6px'
          }}
        />
        <Legend
          layout="vertical"
          align="left"
          verticalAlign="middle" 
          wrapperStyle={{
            marginLeft: "60px",
            paddingLeft: "0px", 
            fontSize: "14px"
          }}
          formatter={(value) => {
            const item = data.find(d => d.name === value);
            return (
              <span style={{ color: '#333' }}>
                {value}: <strong>{item?.percent || 0}%</strong>
              </span>
            );
          }}
                  />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default LanguagePieChart;