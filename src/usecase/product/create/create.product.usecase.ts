import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-respository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export default  class ProductCreateUseCase {
    private ProductRepository: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface) {
        this.ProductRepository = pr;
    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO>{
        const product = ProductFactory.create(input.type, input.name, input.price);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}