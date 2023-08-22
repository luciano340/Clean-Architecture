import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequilize/customer.models";
import CustomerRepository from "../../../infrastructure/customer/repository/sequilize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Teste para find customer UseCase", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

      it('Deve achar um Customer', async () => {
        const customerRepository = new CustomerRepository();
        const userCase = new FindCustomerUseCase(customerRepository);
        const customer = new Customer("123", "Luciano");
        const address = new Address("Servidão Pedro Manoel dos santos", 122, "88058-479", "Floripa");
        customer.changeAddress(address);
       
        await customerRepository.create(customer);
        const result1 = customerRepository.find(customer.id);
        const input = {
          id: customer.id
        }

        const output = {
          id: "123",
          name: "Luciano",
          address: {
            street: "Servidão Pedro Manoel dos santos",
            city: "Floripa",
            number: 122,
            zip: "88058-479"
          }
        }

        const result = await userCase.execute(input);

        expect(result).toEqual(output);
        
      })
})