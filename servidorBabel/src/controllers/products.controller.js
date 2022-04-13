import Product from '../models/Product'

export const createProduct = async (req, res) => {
    const {name, category, price, imgURL} = req.body;
    const newProduct = new Product({name, category, price, imgURL});
    const productSaved = await newProduct.save();
    res.status(200).json(productSaved);
}

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

export const getProductById = async (req, res) => { // GET
    const product = await Product.findOne({name:req.params.productId});
    res.json(product);
}

export const updateProductById = async (req, res) => { // PUT
    const product = await Product.findOneAndUpdate({name:req.params.productId}, req.body, {
        new: true
    });
    res.status(200).json(product);

}

export const deleteProductById = async (req, res) => { // DELETE
    await Product.findOneAndDelete({name:req.params.productId});
    res.status(204).json();
}
