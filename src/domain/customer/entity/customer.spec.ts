
import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer test", () => {

    it('Deve dar erro quando o id está vazio', () => {
        expect(() => {
            let customer = new Customer("", "João")
        }).toThrowError('O ID é obrigatório!');
    });

    it('Deve dar erro quando o nome está vazio', () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError('O nome é obrigatório!');
    });

    it('Deve trocar o nome', () => {
        const costumer = new Customer('123', 'João');
        costumer.changeName('Maria')
        expect(costumer.name).toBe("Maria")
    });

    it('Deve ativar o cliente', () => {
        const customer = new Customer("123", "João");
        const adreess = new Address('Rua 1', 123, '123-123', 'São paulo');
        customer.Address = adreess;
        customer.activate();

        expect(customer.isActive()).toBe(true)
    });

    it('Deve dar erro quando o endereço não for definido.', () => {
        expect(() => {
            const customer = new Customer('123', 'Zé');
            customer.activate()
        }).toThrowError('Endreço é obrigatório para ativar o cliente!');

    });

    it('Deve desativar o cliente!', () => {
        const customer = new Customer("1", "Maria");
        customer.deactive();
        expect(customer.isActive()).toBe(false);
    });



});