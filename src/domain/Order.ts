import { Account } from "./Account";
import { IDiscount, IOrder, IProduct, createOrderInputDTO } from "./types";
import { v4 as uuid } from "uuid";
class Order implements IOrder {
  id: string;
  created_at: Date = new Date();
  total: number = 0;
  discounts: IDiscount[] = [];
  totalDiscount: number = 0;
  products: IProduct[] = [];
  shopper = <Account>{};
  constructor(shopper: Account) {
    this.id = uuid();
    this.shopper = shopper;
  }
  applyDiscountCoupon(discount: IDiscount) {
    if (discount.isValid()) this.discounts.push(discount);
  }
  updateTotal = () => {
    const totalRawPrice = this.products.reduce(
      (acc, { price }) => acc + price,
      0
    );
    if (this.discounts.length === 0) {
      this.total = totalRawPrice;
      return;
    }
    let totalDiscount = 0;
    for (const { type, amount } of this.discounts) {
      if (type === "FIXED_PRICE") totalDiscount += amount;
      if (type === "PERCENTAGE")
        totalDiscount += totalRawPrice * (amount / 100);
      this.totalDiscount = totalDiscount;
      this.total = totalRawPrice - totalDiscount;
    }
  };
  addProduct = (product: IProduct) => {
    this.products.push(product);
    this.updateTotal();
  };
  removeProduct = (productID: string) => {
    const productIndex = this.products.findIndex(
      (product) => product.id == productID
    );
    this.products.splice(productIndex, 1);
    this.updateTotal();
  };
  isValid = () => {
    if (this.products.length <= 0 && this.total <= 0) return false;
    if (!(this.shopper instanceof Account) || !this.shopper.isValidDocument())
      return false;
    return true;
  };
  applyDiscount = (discount: IDiscount) => {
    this.discounts.push(discount);
    this.updateTotal();
  };
}
export { Order };
