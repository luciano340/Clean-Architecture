import ProductRepositoryInterface from "../../../domain/product/repository/product-respository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";


export default class UpdateProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface){
        this.productRepository = pr;
    }

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const product = await this.productRepository.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.productRepository.update(product);
        
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}