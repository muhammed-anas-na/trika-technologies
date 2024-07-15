import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import axios from 'axios';

const app = express()


app.use(express.json({limit:"1000mb"}));
app.use(express.urlencoded());

app.use(bodyParser.json())

app.use(
    cors(
        {
            origin:"*"
        }
    )
)


app.get('/products' , (req,res)=>{
    try{
        const { itemsPerPage, currentPage } = req.query;
        const limit = parseInt(itemsPerPage, 10) || 10; // Default to 10 items per page if not specified
        const page = parseInt(currentPage, 10) || 1; // Default to the first page if not specified
        const skip = (page - 1) * limit;

        axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`).then((data)=>{
            const {products , total} = data.data
            res.json({
                products,total
            });
        })
    }catch(err){
        console.log(err);
        res.json({err:err.message})
    }
})


app.get('/search' , (req,res)=>{
    const {val} =req.query;
    console.log(val);
    try{
        axios.get(`https://dummyjson.com/products`).then((data)=>{
            const {products} = data.data
            const results = products.filter(product =>
                product.title.toLowerCase().includes(val.toLowerCase())
            );
            let response = results.slice(0,10);
            res.json({
               response
            });
        })
    }catch(err){
        res.json({err:err.message})
    }
})
app.use('/' , (req,res)=>res.json({message:"Success"}))

export {app}