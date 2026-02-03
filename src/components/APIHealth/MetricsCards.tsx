import React from 'react';
import { Card } from '../Shared/Card';
import { Badge } from '../Shared/Badge';
import { APIHealthMetric } from '../../types';
import './MetricsCards.css';

interface MetricsCardsProps {
  metrics: {
    uptime: number;
    successRate: number;
    latency: number;
  };
  detailed?: boolean;
  detailedMetrics?: APIHealthMetric[];
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  metrics,
  detailed = false,
  detailedMetrics = [],
}) => {
  if (detailed && detailedMetrics.length > 0) {
    return (
      <div className="metrics-cards-detailed">
        {detailedMetrics.map((metric) => (
          <Card key={metric.apiName} className="metric-card-detailed">
            <div className="metric-card-header">
              <h3 className="metric-card-title">{metric.apiName}</h3>
              <Badge
                variant={
                  metric.status === 'healthy'
                    ? 'success'
                    : metric.status === 'degraded'
                    ? 'warning'
                    : 'error'
                }
                size="sm"
              >
                {metric.status}
              </Badge>
            </div>
            <div className="metric-card-metrics">
              <div className="metric-item">
                <div className="metric-label">Uptime</div>
                <div className="metric-value">{metric.uptime.toFixed(1)}%</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Success Rate</div>
                <div className="metric-value">{metric.successRate.toFixed(1)}%</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Latency</div>
                <div className="metric-value">{metric.latency}ms</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="metrics-cards">
      <Card className="metric-card">
        <div className="metric-card-icon">📈</div>
        <div className="metric-card-content">
          <div className="metric-label">Uptime</div>
          <div className="metric-value-large">{metrics.uptime.toFixed(2)}%</div>
          <div className="metric-trend">↑ 0.1% from last period</div>
        </div>
      </Card>

      <Card className="metric-card">
        <div className="metric-card-icon">✅</div>
        <div className="metric-card-content">
          <div className="metric-label">Success Rate</div>
          <div className="metric-value-large">{metrics.successRate.toFixed(2)}%</div>
          <div className="metric-trend">↑ 0.5% from last period</div>
        </div>
      </Card>

      <Card className="metric-card">
        <div className="metric-card-icon">⚡</div>
        <div className="metric-card-content">
          <div className="metric-label">Avg Latency</div>
          <div className="metric-value-large">{metrics.latency.toFixed(0)}ms</div>
          <div className="metric-trend">↓ 5ms from last period</div>
        </div>
      </Card>
    </div>
  );
};
