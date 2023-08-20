import Product from "./products";

describe("Product test", () => {

    it('Deve dar erro, quando ID do produto estiver vazio', () => {
        expect(() => {
            let order = new Product("", "maca", 5)
        }).toThrowError('O id é obrigatório!');

    });

    it('Deve dar erro, quando o nome estiver vazio', () => {
        expect(() => {
            let order = new Product("123", "", 5)
        }).toThrowError('O nome é obrigatório!');

    }); 

    it('Deve dar erro, quando o preço for menor que zero', () => {
        expect(() => {
            let order = new Product("123", "maca", -1)
        }).toThrowError('O preço deve ser maior que zero');

    });  

    it('Deve trocar o nome do produto', () => {
        const product = new Product('123', 'maça', 5);
        product.changeName("Pera");
        expect(product.name).toBe("Pera");

    }); 

    it('Deve trocar o preço do produto', () => {
        const product = new Product('123', 'maça', 5);
        product.changePrice(10);
        expect(product.price).toBe(10);

    }); 
});