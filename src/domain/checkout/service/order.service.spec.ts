import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Teste de Order Service", () => {


    it("Deve criar uma ordem", () => {
        const customer = new Customer("C1", "Zé");
        const item1 = new OrderItem("i1", "item 1", 10, 1 ,"p1");

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    });

    it('Testando pontos', () => {
        const customer = new Customer("C1", "Zé");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

    it('Deve somar o total de todas as ordens', () => {
         const item1 = new OrderItem("i1", "Item1", 100,  1 , "p1");
         const item2 = new OrderItem("i2", "Item1", 200,  2 , "p2");

         const order = new Order("o1", "c1", [item1]);
         const order2 = new Order("o2", "c2", [item2]);

         const total = OrderService.total([order, order2]);
         expect(total).toBe(500);
    });

});