import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Luciano");
const address = new Address("Servidão Pedro Manoel dos santos", 122, "88058-479", "Floripa");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}
describe("Teste unitário para find customer UseCase", () => {


      it('Deve achar um Customer', async () => {
        const customerRepository = MockRepository();
        const userCase = new FindCustomerUseCase(customerRepository);
       
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
        
      });

      it('Deve dar erro pois não irá conseguir localizar um cliente', async () => {
        const customerRepository = MockRepository();
        const userCase = new FindCustomerUseCase(customerRepository);
        customerRepository.find.mockImplementation(() => {
          throw new Error("Cliente não encontrado!")
        });

        const input = {
          id: customer.id
        }

        expect(() => {
          return userCase.execute(input);
        }).rejects.toThrow("Cliente não encontrado!");

      });
})