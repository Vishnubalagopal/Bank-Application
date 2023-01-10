//connection between server and mongo db

//1.import mongoose

const mongoose = require('mongoose')

//2.define connection string and connect db with node

mongoose.connect('mongodb://localhost:27017/shoe',()=>{
    console.log('Mongodb connected succcessfully');
})

//3. create model

const Account = mongoose.model('Account',{
    acno:Number,
    pswd:String,
    username:String,
    balance:Number,
    transaction:[]

})

//4. export model

module.exports ={
    Account
}