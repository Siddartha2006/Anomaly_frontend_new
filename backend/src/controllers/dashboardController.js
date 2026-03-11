import { fetchActivityFeed, fetchDashboardSummary } from '../services/dashboardService.js';

export function getDashboardSummary(req, res, next) {
  try {
    res.status(200).json(fetchDashboardSummary());
  } catch (error) {
    next(error);
  }
}

export function getActivity(req, res, next) {
  try {
    res.status(200).json(fetchActivityFeed());
  } catch (error) {
    next(error);
  }
}
