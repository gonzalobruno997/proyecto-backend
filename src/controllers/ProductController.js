const productservices = require("../services/productServices");

const getproducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 2;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || "-createdAt";
        // const queryParam = req.query.stock || "";
        let filters = {};
        if (req.query) {
            filters = req.query;
            delete filters.limit;
            delete filters.page;
            delete filters.sort;
            delete filters.query;
        }

        const opciones = {
            page,
            limit,
            sort: sort ? {
                price: sort === "asc" ? 1 : -1
            } : {},
        };
        const products = await productservices.getproducts(opciones, filters);
        console.log("products", products);
        res.send(products);
    } catch (error) {
        console.log(error);
    }
};

const getproductById = async (req, res) => {
    try {
        const productid = await productservices.getproductById(req.params.pid);
        res.send(productid);
    } catch (error) {
        console.log(error);
    }
};

const deleteproductById = async (req, res) => {
    try {
        const {
            pid
        } = req.params;
        console.log("pid", pid);
        // if (isNaN(pid) || pid < 1) {
        //   return res.json({
        //     content: "ERROR: EL ID INGRESADO NO ES NUMERICO O ES MENOR A 1",
        //   });
        // }
        await productservices.deleteproductById(pid);
        res.send("se elimino");
    } catch (error) {
        console.log(error);
    }
};
const createproduct = async (req, res) => {
    try {
        const {
            title,
            stock,
            price,
            code,
            thumbnail,
            description
        } = req.body;
        console.log("reqbody", req.body);
        const products = await productservices.createproduct(
            title,
            stock,
            price,
            code,
            thumbnail,
            description
        );
        res.send(products);
    } catch (error) {
        console.log(error);
    }
};
const editproduct = async (req, res) => {
    try {
        const pid = {
            _id: req.params.pid,
        };
        const {
            title,
            price,
            stock,
            code,
            thumbnail,
            description,
            id
        } = req.body;
        const productupdate = await productservices.editproduct(
            pid,
            title,
            price,
            stock,
            code,
            thumbnail,
            description,
            id
        );
        res.send("se modifico");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getproducts,
    getproductById,
    deleteproductById,
    createproduct,
    editproduct,
};