var amazon = require('amazon-product-api');


var client = amazon.createClient({
    awsId: "AKIAI6DKFJZZTPCTX56Q",
    awsSecret: "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",
    awsTag: "snapshop01-20"
});



const express = require("express");
const app = express();
const port = process.env.PORT||3000;



app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.listen(port, function(err){
    if(err){
        console.log("Error: "+err);
        return false;
    }
    
    console.log("Port "+port+" is running")
    
});




app.get("/product/:num", (req,resp)=>{
    
    let itemId = req.params.num;
    let idType = process.argv[3] || 'UPC';
    let responseGroup = 'ItemAttributes,Offers,Images,Similarities';

    
    

client.itemLookup({
    idType,
    itemId,
    responseGroup
}).then(function (results) {
    
    for(var i = 0; i<results[0].ItemAttributes[0].Feature.length; i++){
        var description = JSON.stringify(results[0].ItemAttributes[0].Feature[i], null, '  ');
    };
    
    for(var i = 0; i<results[0].SimilarProducts[0].SimilarProduct.length; i++){
        var similarProducts = JSON.stringify(results[0].SimilarProducts[0].SimilarProduct[i].Title[0], null, '  ');
    };
    
    
    resp.json(results);
    
    
});
    
    
});




    
    
    
    
