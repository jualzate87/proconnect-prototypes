import React from 'react';
import './Table.css';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (item: T) => void;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  className = '',
  onRowClick,
}: TableProps<T>) {
  return (
    <div className={`table-wrapper ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="table-header">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className={onRowClick ? 'table-row-clickable' : ''}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.render
                      ? column.render(item)
                      : (item[column.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
