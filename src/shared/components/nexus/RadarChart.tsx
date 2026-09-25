"use client";
import React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export interface RadarChartProps {
  data?: Array<{ dimension: string; score: number; fullMark?: number }>;
  models?: Array<{ name: string; data: Array<{ dimension: string; score: number }> }>;
  height?: number;
  className?: string;
  showLegend?: boolean;
}

const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b"]; // blue, purple, cyan, amber

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  models,
  height = 300,
  className = "",
  showLegend = true,
}) => {
  let chartData: any[] = [];
  let series: { name: string; key: string }[] = [];

  if (models && models.length > 0) {
    const allDimensions = new Set<string>();
    models.forEach(model => model.data.forEach(d => allDimensions.add(d.dimension)));
    
    chartData = Array.from(allDimensions).map(dimension => {
      const row: any = { dimension };
      models.forEach((model, idx) => {
        const point = model.data.find(d => d.dimension === dimension);
        row[model.name] = point ? point.score : 0;
      });
      return row;
    });

    series = models.map(m => ({ name: m.name, key: m.name }));
  } else if (data) {
    chartData = data;
    series = [{ name: "Score", key: "score" }];
  }

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="rgba(156, 163, 175, 0.3)" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          {showLegend && series.length > 1 && (
            <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
          )}
          {series.map((s, i) => (
            <Radar
              key={s.key}
              name={s.name}
              dataKey={s.key}
              stroke={colors[i % colors.length]}
              fill={colors[i % colors.length]}
              fillOpacity={0.3}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
