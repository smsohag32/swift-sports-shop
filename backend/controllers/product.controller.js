import Product from "../models/Product.js";
import mongoose from "mongoose";
import { deleteImageFromCloud, uploadImageToCloud } from "../store/upLoadToCloud.js";

// Create a new product
export const createProduct = async (req, res) => {
   try {
      let imageUrls = [];
      if (req.files) {
         imageUrls = await uploadImageToCloud(req.files);
      }
      const content = JSON.parse(req.body.content);
      const { name, description, price, brand, sizes, colors, stock, category } = content;

      const newProduct = new Product({
         name,
         description,
         price,
         brand,
         sizes,
         colors,
         stock,
         category,
         images: imageUrls.map((url) => ({ url, alt: name })),
      });

      const savedProduct = await newProduct.save();
      res.status(201).json({ product: savedProduct });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get all products
export const getProducts = async (req, res) => {
   try {
      const products = await Product.find().populate("category").sort({ createdAt: -1 });
      res.status(200).json({ products });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
   try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid product ID." });
      }
      const product = await Product.findById(id).populate("category");
      if (!product) {
         return res.status(404).json({ message: "Product not found." });
      }
      res.status(200).json({ product });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
   try {
      const { id } = req.params;
      const content = JSON.parse(req.body.content);
      const { name, description, price, brand, sizes, colors, stock, category } = content;

      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid product ID." });
      }

      const product = await Product.findById(id);
      if (!product) {
         return res.status(404).json({ message: "Product not found." });
      }

      let images = product.images;

      if (req.files) {
         try {
            if (images.length > 0) {
               await deleteImageFromCloud(images.map((img) => img.url));
            }

            const uploadedImages = await uploadImageToCloud(req.files);
            images = uploadedImages.map((url) => ({ url, alt: name }));
         } catch (uploadError) {
            return res
               .status(500)
               .json({ message: "Image upload failed.", error: uploadError.message });
         }
      }

      const updatedProduct = await Product.findByIdAndUpdate(
         id,
         {
            name,
            description,
            price,
            brand,
            sizes,
            colors,
            stock,
            category,
            images,
            updatedAt: Date.now(),
         },
         { new: true, runValidators: true }
      );

      if (!updatedProduct) {
         return res.status(404).json({ message: "Failed to update product." });
      }
      res.status(200).json({ product: updatedProduct });
   } catch (error) {
      res.status(500).json({ message: "Server error occurred.", error: error.message });
   }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
   try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid product ID." });
      }
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
         return res.status(404).json({ message: "Product not found." });
      }
      if (deletedProduct.images.length > 0) {
         await deleteImageFromCloud(deletedProduct.images.map((img) => img.url));
      }
      res.status(200).json({ message: "Product deleted successfully." });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Change product status (activate/deactivate)
export const changeProductStatus = async (req, res) => {
   try {
      const { id } = req.params;
      const { status } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid product ID." });
      }

      const product = await Product.findById(id);
      if (!product) {
         return res.status(404).json({ message: "Product not found." });
      }

      product.status = status;
      product.updatedAt = Date.now();
      const updatedProduct = await product.save();

      res.status(200).json({ product: updatedProduct });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
