import Product from "../model/product-model.js";

export const create = async (req, res) => {
  const { name, price, description, discount } = req.body;

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinI_44p5jN05YioLyPBhn_1j5tsl7q85rfA&s";

  try {
    const newProduct = await Product.create({
      name,
      price:Number(price),
      description,
      discount:Number(discount),
      image: req.file ? req.file.path : defaultImage,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error while creating product:", error.message);
    res.status(500).json({ message: "Failed to create product", error });
  }
};
