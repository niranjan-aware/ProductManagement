import Product from "../models/product.model.js";

export const createProduct = async(req,res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please provide all the fields"})
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(200).json({success:true,newProduct});
    } catch (error) {
        console.log("Error in creating product: ",error);   
        return res.status(500).json({success:false,message:"Server Error"});
    }
}

export const getProducts = async(req,res)=>{
    try {
        const products = await Product.find({});
        return res.status(200).json({success:true,products});
    } catch (error) {
        console.log("Error in fetching product: ",error);   
        return res.status(500).json({success:false,message:"Server Error"});
    }
}

export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const product = req.body;
    console.log(product);
    
    if(!id || !product.name || !product.price || !product.image ){
        return res.status(400).json({success:false,message:"Please provide the required values"});
    }
    try {
        const newProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        return res.status(200).json({success:true,newProduct});
    } catch (error) {
        console.log("Error while updating product: ",error);
        return res.status(500).json({success:false,message:"server error"});
        
    }
}

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({success:false,message:"Please provide the id of product"});
    }
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({success:true,message:"Product deleted successfully"});
    } catch (error) {
        console.log("Error while deleting product: ",error);
        return res.status(500).json({success:false,message:"server error"});
        
    }
}