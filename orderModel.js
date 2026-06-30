const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId:String,
    customerName:String,
    productName:String,

    image:String,
    price:String,
    size:String,
    address:String,

    phone:String,
    city:String,
    payment:String,

    orderDate:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        default:"Placed"
    },

    cancelReason:{
        type:String,
        default:""
    },

    cancelDate:{
    type:String,
    default:""
},

    deliveryDate:String

},{
    timestamps:true
});

module.exports = mongoose.model("Order", orderSchema);