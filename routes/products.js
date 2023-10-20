const express = require('express');
const router = express.Router();
const Product = require('../models/productschema');

// ROUTE FOR GETTING ALL PRODUCTS
router.get('/', async (req, res) => {
    if(req.params.name !== null)
    {
        console.log('name search---')
        try {
            const searchName = req.query.name;
            const regex = new RegExp(`.*${searchName}.*`, 'i');
            productbyName = await Product.find({ name: { $regex: regex } })
            if(productbyName == null) {
                return res.status(404).json({message: 'Cannot find product with that name'});
            }
        } catch(error) {
            return res.status(500).json({message: error.message});
        }
        res.product = productbyName;
    
        res.json(res.product);
    }
    else {
        try {
            const products = await Product.find()
            res.json(products)
        } catch(err) {
            res.status(500).json({ message: err.message })
        }
    }
})

// ROUTE FOR GETTING ONE PRODUCT (ID)
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product)
});

// ROUTE FOR ADDING NEW PRODUCT
router.post('/', async (req, res) => {
    // console.log(req.query);
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        published: req.body.published,
        category: req.body.category
    });

    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
});

// ROUTE FOR UPDATE PRODUCT (ID)
router.patch('/:id', getProduct, async (req, res) => {
    console.log(req.body);
    if(req.body.name != null) {
        res.product.name = req.body.name;
    }
    if(req.body.description != null) {
        res.product.description = req.body.description;
    }
    if(req.body.price != null) {
        res.product.price = req.body.price;
    }
    if(req.body.published != null) {
        res.product.published = req.body.published;
    }
    if(req.body.category != null) {
        res.product.category = req.body.category;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
});

// ROUTE FOR REMOVING PRODUCT (ID)
router.delete('/:id', getProduct, async (req, res) => {
    try {
        console.log(res.product)
        await res.product.remove
        res.json({message: "Deleted Product" })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

// ROUTE FOR REMOVING ALL PRODUCTS
router.delete('/', async (req, res) => {
    try {
        console.log('deleting everything')
        await Product.deleteMany({});
        res.json({ message: 'successfully Deleted all products from collection.'} )
        
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

// ROUTE FOR GETTING ALL PRODUCTS WITH NAME QUERY
// router.get('', async (req, res) => {
//     try {
//         const searchName = req.query.name;
//         const regex = new RegExp(`.*${searchName}.*`, 'i');
//         productbyName = await Product.find({ name: { $regex: regex } })
//         if(productbyName == null) {
//             return res.status(404).json({message: 'Cannot find product with that name'});
//         }
//     } catch(error) {
//         return res.status(500).json({message: error.message});
//     }
//     res.product = productbyName;

//     res.json(res.product);
// });

async function getProduct(req, res, next) {
    try {
        productbyId = await Product.findById(req.params.id)
        if(productbyId == null) {
            return res.status(404).json({message: 'Cannot find product with that id'});
        }
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
    
    res.product = productbyId;
    next();
}

module.exports = router;