import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
  ReadProductInput,
  DeleteProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";
import { Product } from "../models/product.model";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const user = res.locals.user._id;

  // Destructure the required properties from req.body
  const { title, description, price, image } = req.body;

  try {
    const product = await createProduct({
      user,
      title,
      description,
      price,
      image,
    } as Product);
    return res.status(201).send(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Failed to create product" });
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;

  try {
    const product = await findProduct({ _id: productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct(
      { _id: productId },
      update,
      { new: true }
    );

    return res.send(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Failed to update product" });
  }
}

export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  // console.log("here");
  const productId = req.params.productId;

  try {
    const product = await findProduct({ _id: productId });

    if (!product) {
      return res.sendStatus(404);
    }

    return res.send(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    return res.status(500).json({ message: "Failed to retrieve product" });
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  try {
    const product = await findProduct({ _id: productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
      return res.sendStatus(403);
    }

    const deleteditem = await deleteProduct({ _id: productId });

    return res.sendStatus(200).json({
      message: "Success",
      deleteditem
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Failed to delete product" });
  }
}
