import { IDiscount, IProduct } from ".";
import { Account } from "../Account";

type createOrderInputDTO = Pick<IOrder, "shopper">;
interface IOrder {
  id: string;
  created_at: Date;
  totalPrice: number;
  totalDiscount: number;
  products: IProduct[];
  discounts: IDiscount[];
  shopper: Account | {};

  addProduct: (product: IProduct) => void;
  removeProduct: (productID: string) => void;
  updateTotalPrice: () => void;
  isValid: () => boolean;
  applyDiscount: (discount: IDiscount) => void;
}

export { IOrder, createOrderInputDTO };
