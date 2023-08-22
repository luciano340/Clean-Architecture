import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("b", "maça", 5);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}
describe("Teste unitário para localizar um produto usando UseCase", () => {


      it('Deve achar um produto', async () => {
        const productRepository = MockRepository();
        const userCase = new FindProductUseCase(productRepository);
       
        await productRepository.create(product);
        const result1 = productRepository.find(product.id);
        
        const input = {
          id: product.id
        }

        const output = {
          id: product.id,
          name: "maça",
          price: 5
        }

        const result = await userCase.execute(input);

        expect(result).toEqual(output);
        
      });

      it('Deve dar erro pois não irá conseguir localizar um produto', async () => {
        const productRepository = MockRepository();
        const userCase = new FindProductUseCase(productRepository);
        productRepository.find.mockImplementation(() => {
          throw new Error("Produto não encontrado!")
        });

        const input = {
          id: product.id
        }

        expect(() => {
          return userCase.execute(input);
        }).rejects.toThrow("Produto não encontrado!");

      });
})