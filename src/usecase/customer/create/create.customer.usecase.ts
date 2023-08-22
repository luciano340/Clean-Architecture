import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-respository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";

export default class CustomerCreateUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
        const customer = CustomerFactory.createWithAddress(input.name, new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        ));

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        };
    }
}