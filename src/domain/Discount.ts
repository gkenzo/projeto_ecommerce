import { DiscountType, IDiscount } from "./types";
import { v4 as uuid } from "uuid";

class Discount implements IDiscount {
  id: string;
  type: DiscountType;
  amount: number;
  constructor({ type, amount }: { type: DiscountType; amount: number }) {
    this.id = uuid();
    this.amount = amount;
    this.type = type;
  }
}

export { Discount };
