export interface User {
    id : number
    username : string,
    email : string,
    is_admin : boolean
}

export interface SubVariants{
    id :string,
    name:string,
    stock: string,
}

export interface Variants{
    id :string,
    name:string,
    subvariants:SubVariants
}


export interface Products{
    ProductID: string,
    ProductCode: string,
    ProductName: string,
    CreatedUser: User,
    variants: Variants,
    ProductImage:string,
    CreatedDate:string,
    Active:boolean,
}

