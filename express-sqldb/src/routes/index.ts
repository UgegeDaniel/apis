import express from 'express';
import questionRouter from './questions';
import subjectRouter from './subjects';
import userRouter from './users';
import paymentRouter from './payment';

const router = express.Router();

router.use('/questions', questionRouter);
router.use('/subjects', subjectRouter);
router.use('/users', userRouter);
router.use('/paystack', paymentRouter);

export default router;
