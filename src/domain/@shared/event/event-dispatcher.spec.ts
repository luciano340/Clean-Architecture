import ProductCreatedEvent from "../../product/event/handler/product-created.event";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/send-email-when-product-is-created.event";
import EventDispacher from "./event-dispacthcer";

describe("Teste de domínio de eventos", () => {

    it('Deve registrar um event handler', () => {
        const eventDispacher= new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    })

    it('Deve desregistrar um event Handler!', () => {

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent", eventHandler);
        eventDispacher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it('Deve desregistrar todos os eventos!', () => {
        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispacher.register("ProductCreatedEvent", eventHandler);
        eventDispacher.register("ProductCreatedEvent2", eventHandler);
        eventDispacher.unregisterAll();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBe(undefined);


    })

    it('Deve notificar todos events handlers!', () => {
        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spy = jest.spyOn(eventHandler, "handle");

        eventDispacher.register("ProductCreatedEvent", eventHandler);
        const pdevent = new ProductCreatedEvent({
            name: "Bolo",
            decription: "teste",
            price: 25.0,
        });

        eventDispacher.notify(pdevent);

        expect(spy).toBeCalled();

    })
})