import request from "supertest";
import { app, sequelize } from "../express";

describe("Teste End to End para Produtos", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    })

    it('Deve criar um novo cliente', async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Bolo",
                price: 25,
            });
        
            expect(response.status).toBe(200);
            expect(response.body.name).toBe("Bolo");
            expect(response.body.price).toBe(25);

    });

    it('Deve dar erro 500', async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name2: "Bolo",
            });
        
            expect(response.status).toBe(500);
    });

    it('Deve localizar apenas um produto', async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Bolo",
                price: 25,
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
        .post("/product")
        .send({
            type: "a",
            name: "Maça",
            price: 5,
        });
        expect(response2.status).toBe(200);
        
        const product = await request(app).get(`/product/${response2.body.id}`).send();
        expect(product.status).toBe(200);
        expect(product.body.name).toBe("Maça");
        expect(product.body.price).toBe(5);
        expect(product.body.id).toBe(response2.body.id);
    });

    it('Deve listar todos os produtos', async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Bolo",
                price: 25,
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Maça",
                price: 5,
            });
        expect(response2.status).toBe(200);
        
        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product1 = listResponse.body.products[0];
        expect(product1.name).toBe("Bolo");
        expect(product1.price).toBe(25);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Maça");
        expect(product2.price).toBe(5);

    });
})