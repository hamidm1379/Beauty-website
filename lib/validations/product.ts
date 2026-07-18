export interface VariantInput{

    colorName:string;

    colorCode:string;

    stock:number;

    image?:string;

}


export interface ProductInput{

    title:string;

    slug:string;

    price:number;

    discountPrice?:number;

    description?:string;

    shortDescription?:string;

    stock:number;

    thumbnail?:string;

    variants:VariantInput[];

}