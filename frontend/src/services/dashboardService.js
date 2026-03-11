import apiClient from './apiClient';

export async function getDashboardSnapshot() {
  const { data } = await apiClient.get('/dashboard/summary');
  return data;
}

export async function getActivityFeed() {
  const { data } = await apiClient.get('/activity');
  return data;
}
