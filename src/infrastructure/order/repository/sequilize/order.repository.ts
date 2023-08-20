import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-respository.interface";
import OrderItemModel from "./order-item.models";
import OrderModel from "./order.models";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entitiy: Order): Promise<void> {
    await OrderModel.create({
      id: entitiy.id,
      customerId: entitiy.customerId,
      total: entitiy.total(),
      items: entitiy.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      }))
    },
    {
      include: [{model: OrderItemModel}]
    });
  }

  async update(entitiy: Order): Promise<void> {
    await OrderModel.destroy({
      where: {
        id: entitiy.id
      }
    })

    await OrderModel.create({
      id: entitiy.id,
      customerId: entitiy.customerId,
      total: entitiy.total(),
      items: entitiy.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      }))
    },
    {
      include: [{model: OrderItemModel}]
    });
  }

  async find(id_search: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id: id_search
        },
        rejectOnEmpty: true,
        include: ["items"],
      })
    } catch (error: any) {
      throw new Error(error);
    }
  
    const order = new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items.map((item) => {
        let orderItem = new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.product_id
        );
        return orderItem;
      })
    );
    return order;
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll(
      { include: [{ model: OrderItemModel }] }
    );

    const orders = ordersModel.map((orderModel) => {
      let order = new Order(
        orderModel.id,
        orderModel.customerId,
        orderModel.items.map((item) => {
          let orderItem = new OrderItem(
            item.id,
            item.name,
            item.price,
            item.quantity,
            item.product_id
          );
          return orderItem;
        })
      );

      return order;
    });
    return orders;    
  }


}