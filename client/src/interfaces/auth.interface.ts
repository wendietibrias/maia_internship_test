
export interface ILoginField {
    email:string;
    password:string;
}

export interface IRegisterField extends ILoginField{
    name:string;
}