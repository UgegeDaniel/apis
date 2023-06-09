import express from 'express';
import questionRouter from './questions';
import subjectRouter from './subjects';
import paymentRouter from './payment';
import tutorRouter from './tutor';
import studentRouter from './student';

const router = express.Router();

router.use('/questions', questionRouter);
router.use('/subjects', subjectRouter);
router.use('/tutor', tutorRouter);
router.use('/student', studentRouter);
router.use('/paystack', paymentRouter);

export default router;
