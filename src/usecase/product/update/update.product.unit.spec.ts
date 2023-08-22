import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "ração para gatos", 68);

const input = {
    id: product.id,
    name: "Ração para cachorros",
    price: 50
};

const MockRepository = () => {
    return {
       find: jest.fn().mockReturnValue(Promise.resolve(product)),
       findAll : jest.fn(),
       create: jest.fn(),
       update: jest.fn(),
    }
};

describe("Teste unitário para atualização de um produto", () => {
    it("Deve atualizar um produto", async () => {
        const pr = MockRepository();
        const customerUpdateUseCase = new UpdateProductUseCase(pr);

        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });
});