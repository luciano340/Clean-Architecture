import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/checkout/order_item";

let customer = new Customer("123", 'Luciano Romao');
const address = new Address("Servidao pedro manoel dos santos", 122, '88058-479', 'Floripa')
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "maça", 5);
const item2 = new OrderItem("2", "bolo", 15);

const order = new Order("1", "123", [item1, item2])