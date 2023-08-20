import Order from "./order";
import OrderItem from "./order_item";

describe("Order test", () => {

    it('Deve dar erro, quando ID da orde está vazio', () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrowError('O id é obrigatório!');

    });

    it('Deve dar erro, quando ID do cliente não é informado', () => {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrowError('O id do cliente é obrigatório!');

    });

    it('Deve dar erro, quando não haver items', () => {
        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrowError('É necessário informar ao menos um item a ordem!');

    });

    it('Deve calcular o total', () => {
        const item = new OrderItem("i1", "maça",5, 2, "D66");
        const item2 = new OrderItem("i2", "bolo",35, 10, "D67");
        const order = new Order('o1', 'Zé', [item, item2])

        const total = order.total()
        expect(total).toBe(360)
    });

});