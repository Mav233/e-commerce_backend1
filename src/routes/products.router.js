import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { uploader } from "../utils/uploader.js";

const router = Router();

/* GET /api/products (API con paginate)*/
router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const filter = query
            ? { $or: [{ category: query }, { status: query === "true" }] }
            : {};

        const options = {
            limit: Number(limit),
            page: Number(page),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {}
        };

        const result = await ProductModel.paginate(filter, options);

        res.json({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage
                ? `/api/products?page=${result.prevPage}`
                : null,
            nextLink: result.hasNextPage
                ? `/api/products?page=${result.nextPage}`
                : null
        });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});

/* POST */

router.post("/", uploader.single("thumbnail"), async (req, res) => {
    try {
        const { title, description, price, stock, category } = req.body;

        const newProduct = {
            title,
            description,
            price: Number(price),
            stock: Number(stock),
            category,
            status: true,
            code: `${title.toUpperCase().replace(/\s+/g, "-")}-${Date.now()}`,
            thumbnails: req.file
                ? [`/uploads/${req.file.filename}`]
                : []
        };

        await ProductModel.create(newProduct);

        // Websocket realtime
        const io = req.app.get("io");
        const products = await ProductModel.find().lean();
        io.emit("products", products);

        // Redirige a la lista
        res.redirect("/products");

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});

/* DELETE */

router.delete("/:pid", async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.pid);

        const io = req.app.get("io");
        const products = await ProductModel.find().lean();
        io.emit("products", products);

        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});

export default router;