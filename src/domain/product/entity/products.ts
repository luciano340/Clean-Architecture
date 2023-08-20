import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate(): boolean {
        if (this._id.length ===0) {
            throw new Error("O id é obrigatório!");
        }
        if (this._name.length ===0) {
            throw new Error("O nome é obrigatório!");
        }
        if (this._price < 0) {
            throw new Error("O preço deve ser maior que zero");
        }
        return true;
    }

    changeName(name: string) {
        this._name = name;
        this.validate()
    }

    changePrice(price: number){
        this._price = price;
        this.validate()
    }

    get name(){
        return this._name;
    }

    get price() {
        return this._price;
    }

    get id() {
        return this._id;
    }


}