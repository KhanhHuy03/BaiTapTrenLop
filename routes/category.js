var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category')

router.get('/categories', async function(req, res, next) {
    let categories = await categorySchema.find({});
    res.send(categories);
});

router.get('/category/:id', async function(req, res, next) {
    try {
        let category = await categorySchema.findById(req.params.id);
        res.send({
            success:true,
            data:categoryt t
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

router.put('/editcategory/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updatedObj = {}
        if(body.name){
            updatedObj.name = body.name
        }
        if(body.description){
            updatedObj.description = body.description
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
router.put('/softDeleteCategory/:id',async function(res,req,next)
{
    try{



    }catch(error){
        res.status(404).send({
            success:false,
            message:error.message,
        })
    }
});

module.exports = router;


