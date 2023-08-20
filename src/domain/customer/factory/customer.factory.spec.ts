import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe('Teste para factory de Customer', () => {

    it('Deve criar um novo cliente', () => {
        let customer = CustomerFactory.create("Luciano");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Luciano");
        expect(customer.address).toBeUndefined();
    })

    it('Deve criar um novo cliente com um endereço', () => {
        const adress = new Address('Servidão Pedro Manoel dos santos', 122, '88058-479', "Florianopolis");
        let customer = CustomerFactory.createWithAddress("Luciano", adress);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Luciano");
        expect(customer.address).toBe(adress);
    })
})