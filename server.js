const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
origin:"http://127.0.0.1:5500"
}));

mongoose.connect("mongodb://127.0.0.1:27017/urbanstyle")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const Product = require("./productModel");

const Order = require("./orderModel");

app.get("/", (req,res)=>{
 res.send("UrbanStyle backend running 🚀");
});

// ADD PRODUCT (ADMIN)
app.post("/add-product", async (req,res)=>{
  try{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send("Product Added Successfully");
  }catch(err){
    res.send(err);
  }
});

// GET ALL PRODUCTS
app.get("/products", async (req,res)=>{
  const data = await Product.find();
  res.json(data);
});

app.post("/place-order", async (req,res)=>{

try{

const newOrder = new Order(req.body);

await newOrder.save();

res.json({
success:true,
message:"Order Placed Successfully"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

});
app.get("/orders", async (req,res)=>{

try{

const orders = await Order.find().sort({createdAt:-1});

res.json(orders);

}catch(err){

res.status(500).json({
message:err.message
});

}

});

app.put("/update-order/:id", async (req,res)=>{

try{

  console.log(req.body);

let updateData = {
    status:req.body.status,
    cancelReason:req.body.cancelReason || "",
    cancelDate:req.body.cancelDate || ""
};

if(req.body.status === "Delivered"){
    updateData.deliveryDate =
    new Date().toLocaleDateString();
}else{
    updateData.deliveryDate = "";
}

await Order.findByIdAndUpdate(
    req.params.id,
    updateData
);

res.json({
    success:true
});

}catch(err){

res.status(500).json({
    success:false,
    message:err.message
});

}

});

app.listen(5000, ()=>console.log("Server running on port 5000"));
