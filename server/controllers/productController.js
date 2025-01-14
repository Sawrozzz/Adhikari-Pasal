import Product from "../model/product-model.js";

//code to create product
export const create = async (req, res) => {
  const { name, price,category, description, discount } = req.body;

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinI_44p5jN05YioLyPBhn_1j5tsl7q85rfA&s";


    
    try {
      const actualImage = req.file ? req.file.path : defaultImage;
      const discountedPrice = discount
      ? price - (price * discount) / 100
      : price; 

      const newProduct = await Product.create({
        name,
        category,
        
        price: Number(price),
        discountedPrice:Number(discountedPrice),
        description,
        discount: Number(discount),
        image: actualImage,
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({
        message: "Product created successfully",
        product: savedProduct,
        success: true,
      });
    } catch (error) {
    console.error("Error while creating product:", error.message);
    res.status(500).json({ message: "Failed to create product", error ,success:false});
  }
};

//code to get all products
export const allProducts = async(req, res) =>{
 try{
  const products = await Product.find();
  // if(!products.length){
  //   return res.status(400).json({
  //     message:"No products found",
  //     success:false,
  //   });
  // }
  res.status(200).json({
    message:"Products retrieved successfully",
    success:true,
    data:products,
  })

 }catch(error){
  console.log("Error during getting all products", error.message);
  res.status(500).json({
    message:"Server Error",
    success:false
  })
 } 
}
