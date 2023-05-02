import express from 'express';
import questionRouter from './questions';
import subjectRouter from './subjects';
import userRouter from './users';

const router = express.Router();

router.use('/questions', questionRouter);
router.use('/subjects', subjectRouter);
router.use('/users', userRouter);

export default router;