import { v4 as uuid } from 'uuid';
import ProductInterface from "../entity/product.interface";
import Product from "../entity/products";
import ProductB from '../entity/productsB';

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {
        switch(type){
            case "a":
                return new Product(uuid(), name, price);
            case "b":
                return new ProductB(uuid(), name, price);
            default:
                throw new Error('Tipo de produto inválido!');
        }
        
    }

    public static createProduct(type: string, name: string, price: number): Product {
        return new Product(uuid(), name, price);    
    }
}