import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {


  eMsg=""
  user =""
  balance=""
      //deposit form

      depositForm = this.fb.group({
        amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  
        acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
        pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  
      })
  

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("username")){
      this.user = localStorage.getItem("username") ||''

    }


  }

  getBalance(){
    if(localStorage.getItem("currentAcno")){
      let acno = localStorage.getItem("currentAcno")
      this.api.balance(acno)
      .subscribe(
        //response 2xx
        (result:any)=>{
          this.balance=result.message

      },
      //response error
      (result:any)=>{
        this.balance=result.message
      }
      )
    }
  }




  deposit(){

    if (this.depositForm.valid){

      let amount = this.depositForm.value.amount

      let acno = this.depositForm.value.acno
      let pswd = this.depositForm.value.pswd
      //asynchronous

      this.api.deposit(acno,pswd,amount)
      .subscribe(
        //response 200
        (result:any)=>{
          console.log(result);
          
          setTimeout(()=>{
            alert(result.message)
            this.depositForm.reset()
          },1000)
          // this.router.navigateByUrl('')

        
      },
      //response 4xx
      (result:any)=>{
        this.eMsg = result.error.message
        setTimeout(()=>{
          this.eMsg = ""
        },1000)
        
      }

      )
  
    }
    else{
      alert('invalid form')

    }
  }


}
