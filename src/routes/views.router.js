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
    try {
        const {
            limit = 3,
            page = 1,
            category,
            stock,
            sort
        } = req.query;

        /* FILTROS */
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (stock === "available") {
            filter.stock = { $gt: 0 };
        } else if (stock === "empty") {
            filter.stock = 0;
        }

        /* ORDENAMIENTO */
        let sortOption = {};
        if (sort === "asc") sortOption.price = 1;
        if (sort === "desc") sortOption.price = -1;

        /* PAGINATE */
        const result = await ProductModel.paginate(filter, {
            page: Number(page),
            limit: Number(limit),
            sort: sortOption,
            lean: true
        });

        res.render("index", {
            title: "E-commerce Scopper",
            products: result.docs,

            // paginación
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,

            category,
            stock,
            sort
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error cargando productos");
    }
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