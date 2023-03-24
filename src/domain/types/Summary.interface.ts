interface ISummary {
  subtotal: number;
  discount: number;
  tax?: number;
  shipping: number;
  total: number;
}

export { ISummary };
