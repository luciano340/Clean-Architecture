import OrderItem from "./order_item";
export default class Order {

    private _id: string;
    private _customerID: string;
    private  _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerID = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string{
        return this._customerID;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    addItemToOrder(orderitem: OrderItem): void {
        this._items.push(orderitem);
        this.validate();
    }
    changeCustomerId(id: string): void {
        this._customerID = id;
        this.validate();
    }

    validate(): boolean {
        if (this._id.length === 0){
            throw new Error('O id é obrigatório!');
        }
        if (this._customerID.length === 0){
            throw new Error('O id do cliente é obrigatório!')
        }
        if (this._items.length === 0){
            throw new Error('É necessário informar ao menos um item a ordem!')
        }
        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}