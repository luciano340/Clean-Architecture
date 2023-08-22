import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-respository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "../../product/update/update.product.dto";


export default class FindCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const customer = await this.customerRepository.find(input.id);
        
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            },
        }
    }
}