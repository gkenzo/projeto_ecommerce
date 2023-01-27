import { IProduct } from "./types";
import { v4 as uuid } from "uuid";

class Product implements IProduct {
  id: string;
  name: string;
  price: number;
  constructor({ name, price }: { name: string; price: number }) {
    this.id = uuid();
    this.name = name;
    this.price = price;
  }
}

export { Product };
