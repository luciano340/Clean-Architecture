import ProductFactory from "./product.factory";

describe("Teste de factory de produtos", () => {

    it('Deve criar um produto do tipo A', () => {

        const product = ProductFactory.create("a", "produto A", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("produto A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product")
    })

})

it('Deve criar um produto do tipo B', () => {

    const product = ProductFactory.create("b", "produto B", 10);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("produto B");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("ProductB")
})