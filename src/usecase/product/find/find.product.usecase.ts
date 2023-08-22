import ProductRepositoryInterface from "../../../domain/product/repository/product-respository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

export default class FindProductUseCase{
    private productInterface: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface){
        this.productInterface = pr;
    }

    async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
        const product = await this.productInterface.find(input.id);
        
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}