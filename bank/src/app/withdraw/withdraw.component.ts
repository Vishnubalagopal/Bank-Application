import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  eMsg=""
  user=""
  balance=""
  //deposit form

  withdrawForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })


  constructor(private fb:FormBuilder, private api:ApiService) { }

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


  withdraw(){

    if (this.withdrawForm.valid){

      let amount = this.withdrawForm.value.amount

      let acno = this.withdrawForm.value.acno
      let pswd = this.withdrawForm.value.pswd
      //asynchronous

      this.api.withdraw(acno,pswd,amount)
      .subscribe(
        //response 200
        (result:any)=>{
        console.log(result);
        setTimeout(()=>{
          alert(result.message)
          this.withdrawForm.reset()
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


