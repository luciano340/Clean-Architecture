import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Luciano",
    new Address(
        "Servidão Pedro Manoel Dos Santos",
        122,
        "88058-479",
        "Floripa"
    )
);

const input = {
    id: customer.id,
    name: "Taynara",
    address: {
        street: "Rua ouro fino",
        number: 2789,
        zip: "88058-584",
        city: "Gravatai",
    }
};

const MockRepository = () => {
    return {
       find: jest.fn().mockReturnValue(Promise.resolve(customer)),
       findAll : jest.fn(),
       create: jest.fn(),
       update: jest.fn(),
    }
};

describe("Teste unitário para atualização de Customer", () => {
    it("Deve atualizar um cliente", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });
});