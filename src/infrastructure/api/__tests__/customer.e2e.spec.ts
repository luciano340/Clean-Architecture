import request from "supertest";
import { app, sequelize } from "../express";

describe("Teste End to End para Customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    })

    it('Deve criar um novo cliente', async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Luciano",
                address: {
                    street: "Servidão Pedro Manoel dos Santos",
                    number: 122,
                    zip: "88058-479",
                    city: "Floripa"
                }
            });
        
            expect(response.status).toBe(200);
            expect(response.body.name).toBe("Luciano");
            expect(response.body.address.city).toBe("Floripa");
            expect(response.body.address.zip).toBe("88058-479");
            expect(response.body.address.number).toBe(122);
            expect(response.body.address.street).toBe("Servidão Pedro Manoel dos Santos");
    });

    it('Deve dar erro 500', async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name2: "Luciano",
                addrests: {
                    street: "Servidão Pedro Manoel dos Santos",
                    number: 122,
                    zip: "88058-479",
                    city: "Floripa"
                }
            });
        
            expect(response.status).toBe(500);
    });

    it('Deve listar todos os clientes', async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Luciano",
                address: {
                    street: "Servidão Pedro Manoel dos Santos",
                    number: 122,
                    zip: "88058-479",
                    city: "Floripa"
                }
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Taynara",
                address: {
                    street: "Rua Ouro Fino",
                    number: 122,
                    zip: "88058-479",
                    city: "Gravatai"
                }
            });
        expect(response2.status).toBe(200);
        
        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("Luciano");
        expect(customer.address.street).toBe("Servidão Pedro Manoel dos Santos");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Taynara");
        expect(customer2.address.street).toBe("Rua Ouro Fino");

    });
})