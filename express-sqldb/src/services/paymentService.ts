import {
  InitializePaymentArgs,
  InitializePaymentResponse,
  PaystackAPIResponse,
  VerifyPaymentResponse,
} from '../types/paymentTypes';
import { convertObjectFromSnakeToCamelCase } from '../utils';
import NodeFetchService from './nodeFetchService';

const { parsed } = require('dotenv').config();

const paystackSecret = parsed.PAYSTACK_SECRET!;
const paystackUrl = parsed.PAYSTACK_URL!;

const paymentRequestHeader = {
  headers: {
    'Content-Type': 'Application/json',
    authorization: `Bearer ${paystackSecret}`,
  },
};

const fetchService = new NodeFetchService(paystackUrl);

export const initializePaymentService = async (
  paymentDetails: InitializePaymentArgs,
) => {
  const response = await fetchService.post<
    PaystackAPIResponse<InitializePaymentResponse>
  >('/transaction/initialize', paymentDetails, undefined, paymentRequestHeader);

  return convertObjectFromSnakeToCamelCase<InitializePaymentResponse>(
    response.data,
  );
};

export const verifyPaymentService = (paymentReference: string) => fetchService.get<PaystackAPIResponse<VerifyPaymentResponse>>(
  `/transaction/verify/${paymentReference}`,
  undefined,
  paymentRequestHeader,
);
