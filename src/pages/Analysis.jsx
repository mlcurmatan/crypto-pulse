import React from 'react';

const Analysis = () => {
  const stats = [
    { label: "Market Cap", value: "$2.4T", change: "+1.2%" },
    { label: "24h Volume", value: "$84.2B", change: "-5.4%" },
    { label: "BTC Dominance", value: "52.1%", change: "+0.3%" },
  ];

  return (
    <div style={{ padding: '20px', color: '#ffffff' }}>
      <h1>Market Analysis</h1>
      <p>Deep dive into current crypto trends and asset performance.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            flex: 1,
            backgroundColor: '#8f4444'
          }}>
            <h4 style={{ margin: 0, color: '#ffffff' }}>{stat.label}</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0' }}>{stat.value}</p>
            <span style={{ color: stat.change.startsWith('+') ? 'green' : 'red' }}>
              {stat.change} (24h)
            </span>
          </div>
        ))}
      </div>

      <div style={{ height: '300px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
        <p style={{ margin: 'auto', color: '#999' }}>[ Chart Visualization Placeholder ]</p>
      </div>
    </div>
  );
};

export default Analysis;