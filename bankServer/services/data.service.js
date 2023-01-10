//import model account

const db = require('./db')

// import jsonwebtoken

const jwt = require('jsonwebtoken')

//1 login function

const login = (acno,pswd)=>{
    //check acno and pswd is present in mongo db
    return db.Account.findOne({
        acno,
        pswd
    }).then((result)=>{
        if(result){
            //acno n password is present in db
            console.log('login successful');

            //current acno
            let currentAcno = acno

            //generate token
            const token = jwt.sign({
                currentAcno:acno},
                'supersecretkey123')
            return{
                status:true,
                message:'login successful',
                username:result.username,
                statusCode:200,
                token,
                currentAcno

            }
        }
        else{
            console.log('invalid account/password');
            return{
                status:false,
                message:'invalid account/password',
                statusCode:404

            }

        }
    })
}

//register function

const register = (acno,pswd,uname)=>{
    console.log('inside register functinon definition');
    //check acno and pswd is present in mongo db
    return db.Account.findOne({
        acno,
        pswd
    }).then((result)=>{
        if(result){
            //acno n password is present in db
            console.log(' already registered ');
            return{
                status:false,
                message:'Account already exist.. Please Login',
                statusCode:404

            }
        }
        else{
            console.log('registered successfully');
            let newAccount = new db.Account({
                acno,
                pswd,
                username:uname,
                balance:0,
                transaction:[]
            })
            newAccount.save()
            return{
                status:true,
                message:'Registered successfully',
                statusCode:200

            }

        }
    })
}

const deposit = (req,acno,pswd,amount)=>{



    //convert string amount to number
    let amt = Number(amount)

    //check acno and pswd is present in mongo db
    return db.Account.findOne({
        acno,
        pswd
    }).then((result)=>{
        if(result){
            if(req.currentAcno!=acno){
                return{
                    status:false,
                    message:'operation denied',
                    statusCode:404
    
                }
    
            }

            result.balance += amt
            result.transaction.push({
                type:"CREDIT",
                amount:amt
            })
            result.save()
            //acno n password is present in db
            return{
                status:true,
                message:`${amount} deposited successfully`,
                statusCode:200

            }
        }
        else{
            console.log('invalid account/password');
            return{
                status:false,
                message:'invalid account/password',
                statusCode:404

            }

        }
    })


}

const withdraw = (req,acno,pswd,amount)=>{

    //convert string amount to number
    let amt = Number(amount)

    //check acno and pswd is present in mongo db
    return db.Account.findOne({
        acno,
        pswd
    }).then((result)=>{
        if(result){
            if(req.currentAcno!=acno){
                return{
                    status:false,
                    message:'operation denied.. allows only own account transaction',
                    statusCode:404
    
                }
    
            }
            //check sufficient balance
            if(result.balance<amt){
                //insufficint balance
                return{
                    status:false,
                    message:'Transaction denied.. Insufficient balance',
                    statusCode:404

                }
            }
            //perform withdraw


            result.balance -= amt
            result.transaction.push({
                type:"DEBIT",
                amount:amt
            })
            result.save()
            //acno n password is present in db
            return{
                status:true,
                message:`${amount} debited successfully`,
                statusCode:200

            }
        }
        else{
            console.log('invalid account/password');
            return{
                status:false,
                message:'invalid account/password',
                statusCode:404

            }

        }
    })
}


//get balance

const getBalance = (acno)=>{
    //asynchronous fnctn
    return db.Account.findOne({
        acno
        
    }).then(
        (result)=>{
            if(result){
                //acno present in db
                let balance = result.balance
                //add type
                result.transaction.push({
                    type:"BALANCE ENQUIRY",
                    amount:'NIL'
                })
                result.save()
                //send to client
                return {
                    status:true,
                    statusCode:200,
                    message:`Your current balance is:${balance}`
                }
            }
            else{

                //acno not present db
                //send to client
                return {
                    status:false,
                    statusCode:404,
                    message:`Invalid Account Number`
                }

            }
        }
    )

}

const transaction = (acno)=>{
    return db.Account.findOne({
        acno
        
    }).then(
        (result)=>{
            if(result){
                //acno present in db
                //send to client
                return {
                    status:true,
                    statusCode:200,
                    transaction:result.transaction
                }
            }
            else{

                //acno not present db
                //send to client
                return {
                    status:false,
                    statusCode:404,
                    message:`Invalid Account Number`
                }

            }
        }
    )


}

//deleteaccount

const deleteAccount = (acno)=>{
    return db.Account.deleteOne({
        acno
        
    }).then((result)=>{
        if(result){

            //send to client
            return {
                status:true,
                statusCode:200,
                message:'Account deleted successfully'
            }

        }
        else{

            //acno not present db
            //send to client
            return {
                status:false,
                statusCode:404,
                message:`Invalid Account Number`
            }

        }

    })

}

//export
module.exports={
    login,
    register,
    deposit,
    withdraw,
    getBalance,
    transaction,
    deleteAccount
}