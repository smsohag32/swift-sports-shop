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

export const searchProduct = async (req, res) => {
   try {
      let {
         categoryId,
         categoryIds,
         searchText,
         isAscending,
         brand,
         sortBy,
         itemPerPage = 10,
         page = 1,
      } = req.query;

      itemPerPage = Math.max(1, parseInt(itemPerPage));
      page = Math.max(1, parseInt(page));

      let filter = { status: "active" };

      // ✅ Accept multiple category IDs from `categoryIds` array or `categoryId` string
      if (categoryIds) {
         categoryIds = Array.isArray(categoryIds) ? categoryIds : categoryIds.split(",");
      } else if (categoryId) {
         categoryIds = [categoryId];
      }

      categoryIds = categoryIds?.filter((id) => mongoose.Types.ObjectId.isValid(id));

      if (categoryIds?.length > 0) {
         filter.category = { $in: categoryIds.map((id) => new mongoose.Types.ObjectId(id)) };
      }

      if (brand) filter.brand = brand;
      if (searchText) filter.name = { $regex: searchText, $options: "i" };

      const totalProducts = await Product.countDocuments(filter);
      const sortOrder = isAscending === "true" ? 1 : -1;
      const sortField = ["price", "name", "createdAt"].includes(sortBy) ? sortBy : "createdAt";

      const products = await Product.find(filter)
         .populate("category")
         .sort({ [sortField]: sortOrder })
         .skip((page - 1) * itemPerPage)
         .limit(itemPerPage)
         .lean();

      const formattedProducts = products.map((product) => {
         const totalRatings = product.reviews?.length || 0;
         const avgRating =
            totalRatings > 0
               ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
               : 0;
         return { ...product, avgRating: avgRating.toFixed(1) };
      });

      res.status(200).json({ totalProducts, products: formattedProducts });
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
