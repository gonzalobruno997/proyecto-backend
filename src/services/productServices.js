const ProductModel = require("../models/productsmodel");

const getproducts = async (opciones, filters) => {
    try {
        const result = await ProductModel.paginate(filters, opciones);
        const propName = Object.keys(filters)[0];

        const propValue = filters[propName];
        console.log("filters", filters);
        return {
            status: "success",
            products: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ?
                `http://localhost:8080/api/products?limit=${opciones.limit}&page=${result.prevPage}&sort=${opciones.sort.price}&${propName}=${propValue}` :
                null,
            nextLink: result.hasNextPage ?
                `http://localhost:8080/api/products?limit=${opciones.limit}&page=${result.nextPage}&sort=${opciones.sort.price}&${propName}=${propValue}` :
                null,
        };
    } catch (error) {
        return {
            status: "error",
            payload: error.message
        };
    }
};
const getproductById = async (pid) => {
    try {
        const productoid = await ProductModel.findById(pid);
        return productoid;
    } catch (error) {
        console.log(error);
    }
};
const deleteproductById = async (pid) => {
    try {
        await ProductModel.deleteOne({
            _id: pid,
        });
    } catch (error) {
        console.log(error);
    }
};

const createproduct = async (
    title,
    stock,
    price,
    code,
    thumbnail,
    description,
    id
) => {
    try {
        const newproduct = await new ProductModel({
            title: title,
            stock: stock,
            price: price,
            code: code,
            thumbnail: thumbnail,
            description: description,
        }).save();
        const products = await ProductModel.find();
        console.log("products", products);
        return products;
    } catch (error) {
        console.log(error);
    }
};
const editproduct = async (
    pid,
    title,
    price,
    stock,
    code,
    thumbnail,
    description,
    id
) => {
    let body = {
        title,
        price,
        stock,
        code,
        thumbnail,
        description,
        id,
    };

    try {
        let productupdate = await ProductModel.findOneAndUpdate(pid, body, {
            returnOriginal: false,
        });
        return productupdate;
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

