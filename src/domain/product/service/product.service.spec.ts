import Product from "../entity/products";
import ProductService from "./product.service";

describe("Testes de serviços de produtos", () => {

    it("Deve mudar o preço de todos os produtos", () => {

        const product1 = new Product("Produto1", "produto1", 10);
        const product2 = new Product("Produto2", "produto1", 20);
        const products = [product1, product2];

        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);
    });
});