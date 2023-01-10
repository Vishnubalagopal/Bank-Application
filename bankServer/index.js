//using express , create server

//1. import express

const express = require('express')

//impport data service

const dataService = require('./services/data.service')

//impoert cors

const cors = require('cors')


// import jsonwebtoken

const jwt = require('jsonwebtoken')



//2. create a server app using express

const app = express()

//using cors define origin to server app

app.use(cors({
    origin:['http://localhost:4200']
}))

//to parse json data

app.use(express.json())

//3. setup port for server app

app.listen(3000,()=>{
    console.log('server started at port 3000');
})

//http request REST api

// app.get('/',(req,res)=>{
//     res.send('GET METHOD')
// })

// app.post('/',(req,res)=>{
//     res.send('POST METHOD')
// })

// app.patch('/',(req,res)=>{
//     res.send('PATCH METHOD')
// })

// app.put('/',(req,res)=>{
//     res.send('PUT METHOD')
// })

// app.delete('/',(req,res)=>{
//     res.send('DELETE METHOD')
// })


//application specific middleware

const appMiddleware = (req,res,next)=>{
    console.log('This is application specific middleware');
    next()
}
 app.use(appMiddleware)

 //router specific middleware
//token validation

const jwtMiddleware = (req,res,next)=>{
    console.log('inside router specific middleware');
    //get token from req headers x-access-token key

    let token = req.headers['x-access-token']

    //verify token using jsonwebtoken

    try{
        let data = jwt.verify(token,'supersecretkey123')
        req.currentAcno = data.currentAcno
        next();
    }
    catch{
        res.status(404).json({
            status:false,
            message:" Authentication failed... Please Log In...."
        })
    }
}

// 4 http request REST api - BANK API

//1. login api

app.post('/login',(req,res)=>{
    console.log('inside login function');
    console.log(req.body);
    //asynchronus
    dataService.login(req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})

//2. register api

app.post('/register',(req,res)=>{
    console.log('inside register function');
    console.log(req.body);
    //asynchronus
    dataService.register(req.body.acno,req.body.pswd,req.body.uname)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})

//3. deposit api

app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log('inside deposit function');
    console.log(req.body);
    //asynchronus
    dataService.deposit(req,req.body.acno,req.body.pswd,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})

//3. withdraw api

app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log('inside withdraw function');
    console.log(req.body);
    //asynchronus
    dataService.withdraw(req,req.body.acno,req.body.pswd,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})

//3. getbalance api

app.post('/getBalance',jwtMiddleware,(req,res)=>{
    console.log('inside getBalance function');
    console.log(req.body);
    //asynchronus
    dataService.getBalance(req.body.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})

//3. transaction api


app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log('inside transaction function');
    console.log(req.body);
    //asynchronus
    dataService.transaction(req.body.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})


//3. deleteAccount api


app.delete('/deleteAccount/:acno',jwtMiddleware,(req,res)=>{
    console.log('inside delete function');
    //asynchronus
    dataService.deleteAccount(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})
