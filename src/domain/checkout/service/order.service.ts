import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../checkout/order_item";
import {v4 as uuid} from "uuid";

export default class OrderService {

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if(items.length ===0){
            throw new Error("A ordem deve possuir ao menos um item!");
        }

        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(order.total()/2);
        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((acc,order) => acc + order.total(), 0);
    }
}