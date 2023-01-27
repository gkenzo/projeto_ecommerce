import { Product, Order } from "../src/domain";

describe("Testing orders", () => {
  it("should be able to create an order with 3 products", () => {
    const product1DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product2DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product3DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product1 = new Product(product1DTO);
    const product2 = new Product(product2DTO);
    const product3 = new Product(product3DTO);
    const order = new Order();
    order.addProduct(product1);
    order.addProduct(product2);
    order.addProduct(product3);
    expect(order.isValid()).toBe(true);
    expect(order.products.length).toBe(3);
  });

  it("should be able to remove a product from an order", () => {
    const product1DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product2DTO = {
      id: "id_p1",
      name: "p1",
      price: 50.0,
    };
    const product1 = new Product(product1DTO);
    const product2 = new Product(product2DTO);
    const order = new Order();
    order.addProduct(product1);
    order.addProduct(product2);
    order.removeProduct(order.products[0].id);
    expect(order.isValid()).toBe(true);
    expect(order.products.length).toBe(1);
  });
});
