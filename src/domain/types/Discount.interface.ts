type DiscountType = "FIXED_PRICE" | "PERCENTAGE";

interface IDiscount {
  id: string;
  type: DiscountType;
  createdAt: Date;
  expireDate: Date;
  amount: number;
  isValid: boolean;

  validateCoupon: () => void;
}

type IDiscountInputDTO = Pick<IDiscount, "type" | "amount" | "expireDate">;

export { IDiscount, DiscountType, IDiscountInputDTO };
