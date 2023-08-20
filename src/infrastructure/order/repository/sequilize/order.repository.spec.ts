import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/products";
import CustomerModel from "../../../customer/repository/sequilize/customer.models";
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository";
import ProductModel from "../../../product/repository/sequilize/product.models";
import ProductRepository from "../../../product/repository/sequilize/product.repository";
import OrderItemModel from "./order-item.models";
import OrderModel from "./order.models";
import OrderRepository from "./order.repository";

describe("Testes repositório de Ordem", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Deve criar uma nova ordem', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Luciano")
    const  address = new Address("Servidão Pedro Manoel dos santos",122, "88058-479", "Floripa");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1234", "maça", 5);
    await productRepository.create(product);

    const orderItem = new OrderItem("123", product.name, product.price, 5, product.id)
    const order = new Order("123", customer.id, [orderItem])
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id
      },
      include: ["items"],
     });

    expect(orderModel.toJSON()).toStrictEqual({
    id: order.id,
    customerId: customer.id,
    total: order.total(),
    items: [
      {
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        order_id: orderItem.id,
        product_id: orderItem.productId
      }
    ]
    });
  });
  
  it('Deve atualizar uma ordem!', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Luciano")
    const  address = new Address("Servidão Pedro Manoel dos santos",122, "88058-479", "Floripa");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1234", "maça", 5);
    const product2 = new Product("999", "bolo", 25);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem("123", product.name, product.price, 5, product.id)
    const orderItem2 = new OrderItem("234", product2.name, product2.price, 1, product2.id)
    const order = new Order("123", customer.id, [orderItem])
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const order2 = new Order("123", customer.id, [orderItem, orderItem2]);
    await orderRepository.update(order2);

    const orderModel = await OrderModel.findOne({ where: { id: "123" }, include: ["items"] });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order2.id,
      customerId: customer.id,
      total: order2.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order2.id,
          product_id: orderItem.productId
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order2.id,
          product_id: orderItem2.productId
        }
      ]
      });

  });

  it('Deve localizar uma ordem!', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Luciano")
    const  address = new Address("Servidão Pedro Manoel dos santos",122, "88058-479", "Floripa");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1234", "maça", 5);
    await productRepository.create(product);

    const orderItem = new OrderItem("123", product.name, product.price, 5, product.id)
    const order = new Order("123", customer.id, [orderItem])
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);


    const orderModel = await OrderModel.findOne({where: {id: "123"}, include: ['items']})
    const orderFound = await orderRepository.find(order.id);

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: orderItem.id,
          product_id: orderItem.productId
        }
      ]
    });
  });

  it('Deve localizar todos os produtos!', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer1 = new Customer("123", "Luciano");
    const address = new Address("Servidão Pedro manoel dos santos", 122, "88058-479", "Floripa");
    customer1.changeAddress(address);
    await customerRepository.create(customer1);

    const product1 = new Product("123", "maça", 5);
    await productRepository.create(product1);

    const orderItem1 = new OrderItem("i1", product1.name, product1.price, 2, product1.id);
    const order1 = new Order("o123", customer1.id, [orderItem1]);
    await orderRepository.create(order1);

    const customer2 = new Customer("456", "Taynara");
    customer2.changeAddress(address);
    await customerRepository.create(customer2);

    const product2 = new Product("456", "bolo", 25);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem("i9", product2.name, product2.price,5, product2.id);
    const orderItem3 = new OrderItem("i10", product1.name, product1.price, 2, product1.id);
    const order2 = new Order("o890", customer2.id, [orderItem3, orderItem2]);
    await orderRepository.create(order2);

    const orders = [order1, order2];
    const allOrders = await orderRepository.findAll();

    expect(orders).toEqual(allOrders);
  })
});