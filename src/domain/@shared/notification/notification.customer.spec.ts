import Notification from "./notification.";

describe("Teste para notificação", () => {

    it('Deve criar erros', () => {
        const notification = new Notification();
        const error = {
            message: "Mensagem de erro",
            context: "Customer"
        }

        notification.addError(error);

        expect(notification.messages("Customer")).toBe("Customer: Mensagem de erro," );

        const error2 = {
            message: "Mensagem de erro2",
            context: "Customer"
        }

        notification.addError(error2);

        expect(notification.messages("Customer")).toBe("Customer: Mensagem de erro,Customer: Mensagem de erro2,");

        const error3 = {
            message: "Mensagem de erro de order",
            context: "Order"
        }

        notification.addError(error3);
        expect(notification.messages("Customer")).toBe("Customer: Mensagem de erro,Customer: Mensagem de erro2,");

        expect(notification.messages()).toBe(
            "Customer: Mensagem de erro,Customer: Mensagem de erro2,Order: Mensagem de erro de order,"
        );

    });

    it('Deve verificar se existe ao menos uma notificação', () => {
        const notification = new Notification();
        const error = {
            context: "customer",
            message: "isso é um erro"
        }

        notification.addError(error);
        expect(notification.hasErrors()).toBe(true);

    });

    it('Deve pegar todos os props de erro', () => {
        const notification = new Notification();
        const error = {
            context: "customer",
            message: "isso é um erro"
        }

        notification.addError(error);
        expect(notification.getErrors()).toEqual([error]); 
    });
});