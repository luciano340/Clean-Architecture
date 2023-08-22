import ProductCreateUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Bolo",
    price: 25
};

const MockRepository = () => {
    return {
       find: jest.fn(),
       findAll : jest.fn(),
       create: jest.fn(),
       update: jest.fn(),
    }
}

describe("Teste unitário para a criação de um produto com UseCase", () => {
    it("Deve criar um Produto", async () => {
        const ProductRepository = MockRepository();
        const ProductUseCase = new ProductCreateUseCase(ProductRepository);

        const output = await ProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("Deve dar erro quando o nome está vazio", async () => {
        const ProductRepository = MockRepository();
        const ProductUseCase = new ProductCreateUseCase(ProductRepository);
        input.name = "";
        await expect(ProductUseCase.execute(input)).rejects.toThrow("O nome é obrigatório!");

    });

    it("Deve dar erro quando o rua do endereço está vazio", async () => {
        const ProductRepository = MockRepository();
        const ProductUseCase = new ProductCreateUseCase(ProductRepository);
        input.name = 'Bolo'
        input.price = -1;
        await expect(ProductUseCase.execute(input)).rejects.toThrow("O preço deve ser maior que zero");

    });
});