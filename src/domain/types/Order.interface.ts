import { IDiscount, IProduct } from ".";

interface IOrder {
  id: string;
  created_at: Date;
  totalPrice: number;
  totalDiscount: number;
  products: IProduct[];
  discounts: IDiscount[];

  addProduct: (product: IProduct) => void;
  removeProduct: (productID: string) => void;
  updateTotalPrice: () => void;
  isValid: () => boolean;
  applyDiscount: (discount: IDiscount) => void;
}

export { IOrder };
