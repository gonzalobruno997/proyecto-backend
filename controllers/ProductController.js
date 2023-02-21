const productservices = require("../services/productservices");

const getproducts = async (req, res) => {
    try {
        const products = await productservices.getproducts();

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
        await productservices.deleteproductById(Number(pid));
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
            _id: req.params.pid
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
}