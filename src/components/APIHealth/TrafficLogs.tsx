import React from 'react';
import { Table } from '../Shared/Table';
import { Badge } from '../Shared/Badge';
import { TrafficLog } from '../../types';
import './TrafficLogs.css';

interface TrafficLogsProps {
  logs: TrafficLog[];
}

export const TrafficLogs: React.FC<TrafficLogsProps> = ({ logs }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusVariant = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'success';
    if (statusCode >= 400 && statusCode < 500) return 'warning';
    if (statusCode >= 500) return 'error';
    return 'info';
  };

  const columns = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (log: TrafficLog) => formatTimestamp(log.timestamp),
    },
    {
      key: 'endpoint',
      header: 'Endpoint',
      render: (log: TrafficLog) => (
        <div className="log-endpoint">
          <Badge
            variant={
              log.method === 'GET'
                ? 'info'
                : log.method === 'POST'
                ? 'success'
                : log.method === 'PUT'
                ? 'warning'
                : 'error'
            }
            size="sm"
          >
            {log.method}
          </Badge>
          <code className="log-path">{log.endpoint}</code>
        </div>
      ),
    },
    {
      key: 'statusCode',
      header: 'Status',
      render: (log: TrafficLog) => (
        <Badge variant={getStatusVariant(log.statusCode)} size="sm">
          {log.statusCode}
        </Badge>
      ),
    },
    {
      key: 'clientName',
      header: 'Client',
      render: (log: TrafficLog) => log.clientName,
    },
    {
      key: 'responseTime',
      header: 'Response Time',
      render: (log: TrafficLog) => (
        <span className={`log-response-time ${
          log.responseTime > 300 ? 'log-response-time-slow' : ''
        }`}>
          {log.responseTime}ms
        </span>
      ),
    },
  ];

  return <Table<TrafficLog> columns={columns} data={logs} />;
};
