import { Sequelize } from "sequelize-typescript";

import Product from "../../../../domain/product/entity/products";
import ProductModel from "./product.models";
import ProductRepository from "./product.repository";

describe("Teste de repositorio de produto", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('Deve criar um novo produto', async () => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "maça", 5);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "maça",
            price: 5,
        });

    });

    it('Deve atualizar um produto', async () => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "maça", 5);

        await productRepository.create(product);

        product.changeName("Luciano");
        product.changePrice(999999999);

        await productRepository.update(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Luciano",
            price: 999999999,
        });

    });

    it('Deve localizar um produto', async () => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "maça", 5);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});
        const foundProcut = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProcut.id,
            name: foundProcut.name,
            price: foundProcut.price,
        })

    });

    it('Deve localizar todos os produto', async () => {

        const productRepository = new ProductRepository();

        const product = new Product("1", "maça", 5);
        await productRepository.create(product);

        const product2 = new Product("2", "bolo", 25);
        await productRepository.create(product2);

        const AllproductsModel = await productRepository.findAll();
        const products = [product, product2];

        expect(products).toEqual(AllproductsModel);

    });
});