export interface InputListProductDTO {

}

type product = {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductDTO {
    products: product[];
}