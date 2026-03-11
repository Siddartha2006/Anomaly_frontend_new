import { formatPercent } from '../../../shared/utils/formatters.js';

const stats = [
  { label: 'Active Alerts', value: '18', trend: formatPercent(-12) },
  { label: 'Resolved Today', value: '43', trend: formatPercent(9) },
  { label: 'Avg. Resolution Time', value: '34m', trend: formatPercent(-18) },
  { label: 'Data Streams', value: '127', trend: formatPercent(4) }
];

const activity = [
  { id: 1, title: 'Inventory drift detected in East Region', timestamp: '2 min ago' },
  { id: 2, title: 'Webhook recovery job completed', timestamp: '8 min ago' },
  { id: 3, title: 'Operator approved threshold override', timestamp: '14 min ago' },
  { id: 4, title: 'Latency anomaly normalized', timestamp: '22 min ago' }
];

export function getSummaryData() {
  return {
    updatedAt: new Date().toISOString(),
    stats
  };
}

export function getActivityData() {
  return {
    items: activity
  };
}
