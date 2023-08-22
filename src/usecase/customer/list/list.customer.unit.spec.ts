import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Luciano",
    new Address(
        "Rua 1",
        120,
        "88058-479",
        "Floripa"
    )
);

const customer2 = CustomerFactory.createWithAddress(
    "Rafael",
    new Address(
        "Rua 2",
        120,
        "88058-478",
        "Palhoça"
    )
);

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
      create: jest.fn(),
      update: jest.fn()
    }
}

describe("Teste unitário para a listagem de todos os usuários", () => {
    it('Deve listar todos os clientes ', async () => {
        const respository = MockRepository();
        const useCase = new ListCustomerUseCase(respository);
        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });
});