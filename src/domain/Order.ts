import { IDiscount, IOrder, IProduct } from "./types";
import { v4 as uuid } from "uuid";

class Order implements IOrder {
  id: string;
  created_at: Date = new Date();
  totalPrice: number = 0;
  discounts: IDiscount[] = [];
  totalDiscount: number = 0;
  products: IProduct[] = [];

  constructor() {
    this.id = uuid();
  }

  updateTotalPrice = () => {
    const totalRawPrice = this.products.reduce(
      (acc, { price }) => acc + price,
      0
    );
    if (this.discounts.length === 0) {
      this.totalPrice = totalRawPrice;
      return;
    }
    let totalDiscount = 0;
    for (const { type, amount } of this.discounts) {
      if (type === "FIXED_PRICE") totalDiscount += amount;
      if (type === "PERCENTAGE") {
        totalDiscount += totalRawPrice * (amount / 100);
      }
      this.totalDiscount = totalDiscount;
      this.totalPrice = totalRawPrice - totalDiscount;
    }
  };

  addProduct = (product: IProduct) => {
    this.products.push(product);
    this.updateTotalPrice();
  };

  removeProduct = (productID: string) => {
    const productIndex = this.products.findIndex(
      (product) => product.id == productID
    );
    this.products.splice(productIndex, 1);
    this.updateTotalPrice();
  };

  isValid = () =>
    this.products.length > 0 && this.totalPrice > 0 ? true : false;

  applyDiscount = (discount: IDiscount) => {
    this.discounts.push(discount);
    this.updateTotalPrice();
  };
}

export { Order };
