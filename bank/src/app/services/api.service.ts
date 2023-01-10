import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options= {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient  ) { }

  // api call to login

  login(acno:any,pswd:any){
    const body = {
      acno,
      pswd
    }

     return this.http.post('http://localhost:3000/login',body)
  }

    // api call to register

    register(acno:any,pswd:any,uname:any){
      const body = {
        acno,
        pswd,
        uname
      }
  
       return this.http.post('http://localhost:3000/register',body)
    }

    //function to append token in the request headers

    appendToken(){
      const token = localStorage.getItem("token")
      let headers = new HttpHeaders()

      if(token){
        headers = headers.append('x-access-token',token)
        options.headers = headers
      }
      return options
    }
  

        // api call to deposit

        deposit(acno:any,pswd:any,amount:any){
          const body = {
            acno,
            pswd,
            amount
          }
      
           return this.http.post('http://localhost:3000/deposit',body,this.appendToken())
        }
    

                // api call to withdrw

                withdraw(acno:any,pswd:any,amount:any){
                  const body = {
                    acno,
                    pswd,
                    amount
                  }
              
                   return this.http.post('http://localhost:3000/withdraw',body,this.appendToken())
                }
        
                
                // api call to getbalance

                balance(acno:any){
                  const body = {
                    acno
                    
                  }
              
                   return this.http.post('http://localhost:3000/getBalance',body,this.appendToken())
                }

                // api call to getbalance

                transaction(acno:any){
                  const body = {
                    acno
                    
                  }
              
                   return this.http.post('http://localhost:3000/transaction',body,this.appendToken())
                }

                //api call to acno deltion

                deleteAccount(acno:any){
                  return this.http.delete('http://localhost:3000/deleteAccount/'+acno,this.appendToken())

                }


}
