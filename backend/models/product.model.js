import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true //createdAt,updatedAt
}
)

const Product = mongoose.model('Product',productSchema);
//in db it will create collection as products from Product
export default Product;

