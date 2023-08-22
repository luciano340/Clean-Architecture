import CustomerCreateUseCase from "./create.customer.usecase";

const input = {
    name: "Luciano",
    address: {
        street: "Servidão Pedro Manoel Dos Santos",
        number: 122,
        zip: "88058-479",
        city: "Floripa",
    }
};

const MockRepository = () => {
    return {
       find: jest.fn(),
       findAll : jest.fn(),
       create: jest.fn(),
       update: jest.fn(),
    }
}

describe("Teste unitário para a criação de um Customer com UseCase", () => {
    it("Deve criar um Customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        });
    });

    it("Deve dar erro quando o nome está vazio", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
        input.name = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("O nome é obrigatório!");

    });

    it("Deve dar erro quando o rua do endereço está vazio", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
        input.address.street = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("O nome da rua é obrigatório!");

    });
});