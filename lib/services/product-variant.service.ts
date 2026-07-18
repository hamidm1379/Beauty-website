import { productVariantRepository }
from "../repositories/product-variant.repository";


class ProductVariantService{


    createMany(
        productId:number,
        variants:any[],
    ){

        return productVariantRepository.createMany(

            productId,
            variants,

        );

    }


}


export const productVariantService=
new ProductVariantService();