const axios = require('axios');
const Data = require('./models/dataModel');

const apiToDB = async ()=>{
    try {
        const apiData = await axios.get("http://13.234.186.232/get_data");
        await console.log(apiData.data.length);
        for(let i=0; i<apiData.data.length; i++){
            //check if data is present
            const dataPresent = await Data.findOne({product_id:apiData.data[i]['product_id']});

            //if data is not present add the api data to MongoDb
            if(!dataPresent){
                const newData = new Data({
                    listing_time: apiData.data[i]['listing_time'],
                    product_id: apiData.data[i]['product_id'],
                    product_sku: apiData.data[i]['product_sku'],
                    product_price: apiData.data[i]['product_price'],
                    sell_price: apiData.data[i]['sell_price'],
                    stock_quantity: apiData.data[i]['stock_quantity'],
                })
    
                await newData.save();
            }
            //check if the data is not updated bu the user. then update the MongoDb data 
            //with api's data
            else if(!dataPresent.updated){
                await dataPresent.update(apiData.data[i]);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = apiToDB;