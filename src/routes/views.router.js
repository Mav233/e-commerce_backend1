import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { CartModel } from "../models/cart.model.js";

const router = Router();

/* HOME */

router.get("/", (req, res) => {
    res.render("home");
});

/* FORMULARIO NUEVO PRODUCTO */

router.get("/products/new", (req, res) => {
    res.render("productForm");
});

/* LISTA DE PRODUCTOS */

router.get("/products", async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 3;

    const result = await ProductModel.paginate(
        {},
        {
            page,
            limit,
            lean: true
        }
    );

    res.render("index", {
        title: "E-commerce Scopper",
        products: result.docs,

        // paginación
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        totalPages: result.totalPages
    });
});

/* DETALLE DE PRODUCTO */

router.get("/products/:pid", async (req, res) => {
    const product = await ProductModel.findById(req.params.pid).lean();
    res.render("productDetail", { product });
});

/* REAL TIME PRODUCTS */

router.get("/realtimeproducts", async (req, res) => {
    const products = await ProductModel.find().lean();
    res.render("realTimeProducts", { products });
});

/* CARRITO */

router.get("/carts/:cid", async (req, res) => {
    const cart = await CartModel.findById(req.params.cid)
        .populate("products.product")
        .lean();

    res.render("cart", cart);
});

export default router;