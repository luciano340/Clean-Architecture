import Product from "../../../../domain/product/entity/products";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-respository.interface";
import ProductModel from "./product.models";

export default class ProductRepository implements ProductRepositoryInterface {

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,

         });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price,
         },
         {
            where: {
                id: entity.id
            }
         });    
    }

    async find(id: string): Promise<Product> {
        let product;
        try {
            product = await ProductModel.findOne({where: {id: id}})
        } catch(error) {
            throw new Error("Produto não encontrado!");
        }
        
        return new Product(
            product.id,
            product.name,
            product.price
        )
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products.map((products) => 
            new Product(products.id, products.name, products.price)
        );
    }
}