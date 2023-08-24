import Product from "../../../domain/product/entity/products";
import ProductRepositoryInterface from "../../../domain/product/repository/product-respository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface) {
        this.productRepository = pr;
    }

    async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products)
    }
}

class OutputMapper {
    static toOutput(product: Product[]): OutputListProductDTO {
        return {
            products: product.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        };
    }
}