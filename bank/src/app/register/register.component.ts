import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  eMsg=""

    //register form

    registerForm = this.fb.group({
      username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],

      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

    })
  
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }
  
  register(){

    if (this.registerForm.valid){

      let uname = this.registerForm.value.username

      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.pswd
      //asynchronous

      this.api.register(acno,pswd,uname)
      .subscribe(
        //response 200
        (result:any)=>{
        console.log(result);
        alert(result.message)
        this.router.navigateByUrl('')

        
      },
      //response 4xx
      (result:any)=>{
        this.eMsg = result.error.message
        
      }

      )
  
    }
    else{
      alert('invalid form')

    }
  }

}
