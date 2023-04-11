import { PaymentMethodsDTO } from "./paymentMethodsDTO";

export type QueryDTO = {
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: PaymentMethodsDTO[];
  query: string;
};
