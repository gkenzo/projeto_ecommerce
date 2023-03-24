import { IDiscount, IProduct } from ".";
import { Account } from "../Account";

type createOrderInputDTO = Pick<IOrder, "shopper" | "products">;
interface IOrder {
  id: string;
  created_at: Date;
  total: number;
  totalDiscount: number;
  products: IProduct[];
  discounts: IDiscount[];
  shopper: Account;

  addProduct: (product: IProduct) => void;
  removeProduct: (productID: string) => void;
  updateTotal: () => void;
  isValid: () => boolean;
  applyDiscountCoupon: (discount: IDiscount) => void;
}

export { IOrder, createOrderInputDTO };
