type DiscountType = "FIXED_PRICE" | "PERCENTAGE";

interface IDiscount {
  id: string;
  type: DiscountType;
  amount: number;
}

type IDiscountInputDTO = Pick<IDiscount, "type" | "amount">;

export { IDiscount, DiscountType, IDiscountInputDTO };
