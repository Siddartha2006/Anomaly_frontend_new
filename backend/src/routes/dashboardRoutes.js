import { Router } from 'express';
import { getActivity, getDashboardSummary } from '../controllers/dashboardController.js';

const dashboardRouter = Router();

dashboardRouter.get('/dashboard/summary', getDashboardSummary);
dashboardRouter.get('/activity', getActivity);

export default dashboardRouter;
