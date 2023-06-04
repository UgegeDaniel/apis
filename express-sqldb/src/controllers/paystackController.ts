import { Request, Response } from 'express';
import { InitializePaymentArgs } from '../types/paymentTypes';
import { ApiError } from '../types/apiErrorType';
import {
  initializePaymentService,
  verifyPaymentService,
} from '../services/paymentService';
import { CustomRequest } from '../types/requestType';
import { UserModel } from '../models';

export const initializePayment = async (req: Request, res: Response) => {
  const {
    amount, email, callbackUrl, name,
  } = req.body;
  const paymentDetails: InitializePaymentArgs = {
    amount,
    email,
    callback_url: callbackUrl,
    metadata: { amount, email, name },
  };

  const data = await initializePaymentService(paymentDetails);

  return res.status(201).send({
    msg: 'Payment initialized successfully',
    data,
  });
};

export const verifyPayment = async (req: CustomRequest, res: Response) => {
  const { reference } = req.query;
  const { userId } = req;

  if (!reference) {
    throw new ApiError(400, 'Missing transaction reference');
  }
  
  const {
    data: {
      reference: paymentReference,
      status: transactionStatus,
    },
  } = await verifyPaymentService(reference as string);

  if (transactionStatus !== 'success') {
    throw new ApiError(400, `Transaction: ${transactionStatus}`);
  }
  const paidUser = await UserModel.savePaymentRef(userId, paymentReference);

  return res.status(200).send({
    message: 'Payment verified',
    paidUser
  });
};
