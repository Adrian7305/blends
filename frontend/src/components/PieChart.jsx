import React from 'react';

const PieChart = ({ data }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  let currentAngle = 0;
  const colors = { 
    Technical: '#761cbc', 
    Cultural: '#ff6b9d', 
    Academic: '#4ade80', 
    Sports: '#fbbf24' 
  };

  return (
    <svg viewBox="0 0 200 200" className="w-72 h-72 mx-auto drop-shadow-2xl">
      {Object.entries(data).map(([key, value]) => {
        const percentage = value / total;
        const angle = percentage * 360;
        const startAngle = currentAngle;
        currentAngle += angle;

        const x1 = 100 + 90 * Math.cos((startAngle - 90) * Math.PI / 180);
        const y1 = 100 + 90 * Math.sin((startAngle - 90) * Math.PI / 180);
        const x2 = 100 + 90 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
        const y2 = 100 + 90 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
        const largeArc = angle > 180 ? 1 : 0;

        return (
          <g key={key}>
            <path
              d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={colors[key] || '#888'}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          </g>
        );
      })}
      <circle cx="100" cy="100" r="55" fill="#0a0a0a" />
    </svg>
  );
};

export default PieChart;