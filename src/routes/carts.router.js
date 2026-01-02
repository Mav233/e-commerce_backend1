import { Router } from "express";
import { CartModel } from "../models/cart.model.js";

const router = Router();

router.post("/", async (req, res) => {
    const cart = await CartModel.create({ products: [] });
    res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
    const cart = await CartModel.findById(req.params.cid)
        .populate("products.product");

    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
});

router.post("/add/:pid", async (req, res) => {
    const { pid } = req.params;

    const cart = await CartModel.create({
        products: [{ product: pid, quantity: 1 }]
    });

    res.redirect(`/carts/${cart._id}`);
});


router.put("/:cid/products/:pid", async (req, res) => {
    const { quantity } = req.body;

    const cart = await CartModel.findById(req.params.cid);
    const product = cart.products.find(
        p => p.product.toString() === req.params.pid
    );

    product.quantity = quantity;
    await cart.save();

    res.json(cart);
});

router.delete("/:cid/products/:pid", async (req, res) => {
    const cart = await CartModel.findById(req.params.cid);
    cart.products = cart.products.filter(
        p => p.product.toString() !== req.params.pid
    );
    await cart.save();

    res.json(cart);
});

router.delete("/:cid", async (req, res) => {
    const cart = await CartModel.findById(req.params.cid);
    cart.products = [];
    await cart.save();

    res.json({ message: "Carrito vaciado" });
});

export default router;