const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter

});

router.get('/', async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json("Error " + err);
    }
});

router.post('/add', upload.single('productImage'), async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const category = req.body.category;
    const userID = req.body.userID;
    const productImage = req.file.path;

    if(name == '' || name.length < 3) {
        return res.status(400).json({msg: 'Name should contain 3 or more characters', success: false})
    }
    if(description == '' || description.length < 50) {
        return res.status(400).json({msg: 'Description should contain 50 or more characters', success: false})
    }

    const product = new Product({
        name,
        description,
        price,
        category,
        userID,
        productImage,
    });

    try {
        const savedProduct = await product.save();
        res.status(200).json({ msg: 'Product has been added successfully', product: savedProduct, success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }

});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({ product: product, success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        fs.unlink(product.productImage, err => {
            if(err) throw err;
        })
        res.status(200).json({ product: product, success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }
});

router.put('/:id', upload.single('productImage'), async (req, res) => {

    if(req.body.name == '' || req.body.name.length < 3) {
        return res.status(404).json({msg: 'Name should contain 3 or more characters', success: false})
    }
    if(req.body.description == '' || req.body.description.length < 50) {
        return res.status(404).json({msg: 'Description should contain 50 or more characters', success: false})
    }

    await Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = Number(req.body.price);
            product.category = req.body.category;
            product.userID = req.body.userID;
            product.productImage = req.file != undefined ? req.file.path : product.productImage

            product.save()
                .then(() => res.status(200).json({ msg: 'Product has been edited successfully', product: product, success: true }))
                .catch((err) => res.status(400).json({ msg: err, success: false }));

        })
        .catch(err => res.status(400).json({msg: err}));

});

module.exports = router