import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {

    private _name: string;
    private _address!: Address;
    private  _active= false;
    private _rewardPoints = 0;

    constructor(id: string, name: string) {
        super();
        this.id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    validate() {
        if (this._name.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "O nome é obrigatório!"
            })        
        }
        if (this.id.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "O ID é obrigatório!"
            })           
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