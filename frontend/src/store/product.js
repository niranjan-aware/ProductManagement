import {create} from "zustand" 
export const useProductStore = create((set)=>({
    products: [],
    serProducts: (products) => set({ products }),
    createProduct:async(newProduct)=>{
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:"Please fill all the fields"}
        }
        const res = await fetch("/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = res.json();
        set((state)=>({products:[...state.products,data.data]}));
        return {success:true, message:"Product created successfully"}
    },
    fetchProduct: async () => {
        try {
          const res = await fetch("/api/products");
          const data = await res.json();
          set({ products: data.products }); // or data.data, depending on API
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
      deleteProduct: async(pid)=>{
        const res = await fetch(`/api/products/${pid}`,{
          method: "DELETE",
        });
        const data = await res.json();
        if(!data.success){
          return {success: false, message: data.message};
        }
        set(state=>({products: state.products.filter(prodcut => prodcut._id !== pid)}));
        return {success:true, message:data.message};
      },
      updateProduct: async(pid,updatedProduct)=>{
        const res = await fetch(`/api/products/${pid}`,{
          method: "PUT",
          headers:{
            "Content-Type":"application/json"
          },
        body:JSON.stringify(updatedProduct)
        });
        console.log("inProd",updatedProduct);
        
        const data = await res.json();

        if (!data.success) {
          return { success: false, message: data.message };
        }
        
        set((state) => ({
          products: state.products.map((product) =>
            product._id === pid ? data.newProduct : product
          ),
        }));
        
        return { success: true, message: "Product updated successfully" };
      }
}));