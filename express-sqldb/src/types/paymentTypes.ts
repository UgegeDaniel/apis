interface Metadata {
    email: string;
    name: string;
    amount: number;
  }
  
  export interface InitializePaymentArgs {
    email: string;
    amount: number;
    callback_url?: string;
    metadata: Metadata;
  }
  
  export interface PaystackAPIResponse<T> {
    status: boolean;
    message: string;
    data: T;
  }
  
  export interface InitializePaymentResponse {
    authorizationUrl: string;
    accessCode: string;
    reference: string;
  }
  
  export interface VerifyPaymentResponse {
    amount: number;
    reference: string;
    status: string;
    metadata: Metadata;
  }