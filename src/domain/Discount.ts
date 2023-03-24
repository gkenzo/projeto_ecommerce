import { DiscountType, IDiscount } from "./types";
import { v4 as uuid } from "uuid";

class Discount implements IDiscount {
  id: string;
  type: DiscountType;
  createdAt: Date;
  expireDate: Date;
  isValid = true;

  amount: number;
  constructor({
    type,
    amount,
    expireDate,
  }: {
    type: DiscountType;
    amount: number;
    expireDate: Date;
  }) {
    this.id = uuid();
    this.amount = amount;
    this.type = type;
    this.createdAt = new Date();
    this.expireDate = expireDate;
  }
  validateCoupon() {
    return this.expireDate < new Date();
  }
}

export { Discount };
