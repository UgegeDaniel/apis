import express from 'express';
import {
  initializePayment,
  verifyPayment,
} from '../controllers/paystackController';
import { authMiddleware } from '../middlewares/auth';
import { ApplicationGeneric } from '../types/requestType';

const router = express.Router();

// METHOD: post
// ACCESS: Verified User
// DESCRIPTION: initialize payment
router.post(
  '/initialize',
  authMiddleware as express.RequestHandler,
  initializePayment,
);

// METHOD: post
// ACCESS: Verified User
// DESCRIPTION: Verify payment
router.get(
  '/verify',
  authMiddleware as express.RequestHandler,
  verifyPayment as ApplicationGeneric<Record<string, any>>,
);

export default router;
