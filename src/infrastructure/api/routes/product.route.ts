import express, { Request, Response } from "express";
import ProductCreateUseCase from "../../../usecase/product/create/create.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequilize/product.repository";

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const  productRepository = new ProductRepository();
    const useCase = new ProductCreateUseCase(productRepository);

    try {
        const productDTO = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        };

        const output = await useCase.execute(productDTO);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req:Request, res: Response) => {
    const  productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    try {
        const output = await useCase.execute({});
        res.send(output)
    } catch (error){
        res.status(500).send(error)
    }
});

productRoute.get("/:id", async (req:Request, res: Response) => {
    const  productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const findtDTO = {
        id: req.params.id,
    };

    try {
        const output = await useCase.execute(findtDTO);
        res.send(output)
    } catch (error){
        res.status(500).send(error)
    }
});
