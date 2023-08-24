import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-respository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export default  class ProductCreateUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface) {
        this.productRepository = pr;
    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO>{
        const product = ProductFactory.createProduct(input.type, input.name, input.price);

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}