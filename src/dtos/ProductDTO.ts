import { PaymentMethodsDTO } from "./paymentMethodsDTO";
import { ProductImageDTO } from "./ProductImageDTO";
import { UserDTO } from "./UserDTO";

export type ProductDTO = {
  id: string;
  user_id: string;
  product_images: ProductImageDTO[];
  name: string;
  description: string;
  is_new: boolean;
  accept_trade: boolean; // aceita troca?
  payment_methods: PaymentMethodsDTO[];
  price: number;
  is_active: boolean;
  user: UserDTO;
};
