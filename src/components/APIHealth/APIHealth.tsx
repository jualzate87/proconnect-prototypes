import React, { useState } from 'react';
import { MetricsCards } from './MetricsCards';
import { TrafficLogs } from './TrafficLogs';
import apiHealthData from '../../data/apiHealth.json';
import { APIHealthMetric, TrafficLog } from '../../types';
import './APIHealth.css';

export const APIHealth: React.FC = () => {
  const metrics = apiHealthData.metrics as APIHealthMetric[];
  const logs = apiHealthData.trafficLogs as TrafficLog[];
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Calculate aggregate metrics
  const aggregateMetrics = {
    uptime: metrics.reduce((acc, m) => acc + m.uptime, 0) / metrics.length,
    successRate: metrics.reduce((acc, m) => acc + m.successRate, 0) / metrics.length,
    latency: metrics.reduce((acc, m) => acc + m.latency, 0) / metrics.length,
  };

  return (
    <div className="api-health">
      <div className="api-health-header">
        <div>
          <h1 className="api-health-title">API Health</h1>
          <p className="api-health-description">
            Monitor the performance and status of your API integrations. View
            real-time metrics, traffic logs, and system health indicators.
          </p>
        </div>
        <div className="api-health-time-range">
          <button
            className={`time-range-btn ${timeRange === '24h' ? 'active' : ''}`}
            onClick={() => setTimeRange('24h')}
          >
            24h
          </button>
          <button
            className={`time-range-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7d
          </button>
          <button
            className={`time-range-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30d
          </button>
        </div>
      </div>

      <MetricsCards metrics={aggregateMetrics} />

      <div className="api-health-section">
        <h2 className="api-health-section-title">API Status</h2>
        <MetricsCards metrics={aggregateMetrics} detailed detailedMetrics={metrics} />
      </div>

      <div className="api-health-section">
        <h2 className="api-health-section-title">Traffic Logs</h2>
        <TrafficLogs logs={logs} />
      </div>
    </div>
  );
};
