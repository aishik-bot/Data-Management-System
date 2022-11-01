const Data = require('../models/dataModel');

const getData = async (req, res)=>{
    try {
        const data = await Data.find();

        res.status(200).json({
            success: true,
            count: data.length,
            data
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}


const updateData = async (req, res)=>{
    try {
        const {productPrice, sellPrice, stockQuantity} = req.body;

        await Data.findByIdAndUpdate(req.params.id, {
            product_price: productPrice,
            sell_price: sellPrice,
            stock_quantity: stockQuantity,
            updated: true
        })
        
        res.status(201).json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

const deleteData = async (req, res)=>{
    try {
        await Data.findByIdAndDelete(req.params.id);
        res.status(201).json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}


module.exports = {
    getData,
    updateData,
    deleteData
}