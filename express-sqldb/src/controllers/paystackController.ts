import { InitializePaymentArgs } from '../types/paymentTypes';
import { ApiError } from '../types/apiErrorType';
import {
  initializePaymentService,
  verifyPaymentService,
} from '../services/paymentService';
import { Controller, CustomController } from '../types/requestType';
import { UserModel } from '../models';

export const initializePayment: Controller = async (req, res, next) => {
  const {
    amount, email, callbackUrl, name,
  } = req.body;
  try {
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
  } catch (e) {
    next(e);
  }
};

export const verifyPayment: CustomController = async (req, res, next) => {
  const { reference } = req.query;
  const { userId } = req;

  if (!reference) {
    throw new ApiError(400, 'Missing transaction reference');
  }

  try {
    const {
      data: { reference: paymentReference, status: transactionStatus },
    } = await verifyPaymentService(reference as string);

    if (transactionStatus !== 'success') {
      throw new ApiError(400, `Transaction: ${transactionStatus}`);
    }
    const paidUser = await UserModel.savePaymentRef(userId, paymentReference);

    return res.status(200).send({
      message: 'Payment verified',
      paidUser,
    });
  } catch (e) {
    next(e);
  }
};
