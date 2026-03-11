import { getActivityData, getSummaryData } from '../models/dashboardModel.js';

export function fetchDashboardSummary() {
  return getSummaryData();
}

export function fetchActivityFeed() {
  return getActivityData();
}
