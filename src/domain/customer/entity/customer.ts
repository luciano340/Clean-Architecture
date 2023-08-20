import Address from "../value-object/address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private  _active= false;
    private _rewardPoints = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get id(): string {
        return this._id;
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error('O nome é obrigatório!');           
        }
        if (this._id.length === 0) {
            throw new Error('O ID é obrigatório!');           
        }
    }

    changeAddress(address: Address) {
        this._address = address;
        this.validate();
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('Endreço é obrigatório para ativar o cliente!')
        }
        this._active = true;
    }

    deactive() {
        this._active = false;
    }

    set Address(adreess: Address) {
        this._address = adreess;
    }

    isActive() {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}