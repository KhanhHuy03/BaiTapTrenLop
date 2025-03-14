var express = require('express');
var router = express.Router();
let productSchema = require('../schemas/category')

router.get('/', async function(req, res, next) {
    let categories = await productSchema.find({});
    res.send(categories);
});

router.get('/:id', async function(req, res, next) {
    try {
        let category = await categorySchema.findById(req.params.id);
        res.send({
            success:true,
            data:category
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.post('/newCategory', async function(req, res, next) {
    try {
        let body = req.body;
        let newCategory = categorySchema({
            name:body.name,
            description:body.description?body.description:"",
        });
        await newCategory.save()
        res.status(200).send({
            success:true,
            data:newCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.put('/edit/category/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updatedObj = {}
        if(body.name){
            updatedObj.name = body.name
        }
        if(body.quantity){
            updatedObj.quantity = body.quantity
        }
        if(body.price){
            updatedObj.price = body.price
        }
        if(body.category){
            updatedObj.category = body.category
        }
        let updatedCategory =  await categorySchema.findByIdAndUpdate(req.params.id,updatedObj,{new:true})
        res.status(200).send({
            success:true,
            data:updatedCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

module.exports = router;


