import express from "express";
import productmodel from "../models/mproduct.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const products = await productmodel.find();
		res.status(202).json({ success: true, data: products });
	} catch (err) {
		res.status(710).json({ err: `${err}  -- error in  get  /products` });
	}
});

router.post("/", async (req, res) => {
	const product = req.body;

	try {
		if (!product.name || !product.price || !product.image) {
			return res.status(710).json("fds");
		}
		const newproduct = new productmodel(product);
		await newproduct.save();
		res.status(202).json({ success: true, data: newproduct });
	} catch (err) {
		res.status(710).json({ err: `${err}  -- error in  post  /products` });
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const product = req.body;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res
			.status(710)
			.json({ err: `${err}  -- invalid product id in  put  /products` });
	}
	try {
		const updatedproduct = await productmodel.findByIdAndUpdate(id, product, {
			new: true,
		}); // hover over new:true.
		res.status(202).json({ success: true, data: updatedproduct });
	} catch (err) {
		res.status(710).json({ err: `${err}  -- error in  put  /products` });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(710).json(`invalid product id in  delete  /products`);
	}

	try {
		await productmodel.findByIdAndDelete(id);
		res
			.status(202)
			.json({ success: true, message: "product deleted successfully" });
	} catch (err) {
		res.status(710).json({ err: `${err}  -- error in  delete  /products/:id` });
	}
});

export default router;
