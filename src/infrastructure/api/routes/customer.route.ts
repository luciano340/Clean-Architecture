import express, { Request, Response } from "express";
import CustomerCreateUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequilize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const  customerRepository = new CustomerRepository();
    const useCase = new CustomerCreateUseCase(customerRepository);

    try {
        const customerDTO = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        };

        const output = await useCase.execute(customerDTO);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get("/", async (req:Request, res: Response) => {
    const  customerRepository = new CustomerRepository();
    const useCase = new ListCustomerUseCase(customerRepository);

    try {
        const output = await useCase.execute({});
        res.send(output)
    } catch (error){
        res.status(500).send(error)
    }
});
