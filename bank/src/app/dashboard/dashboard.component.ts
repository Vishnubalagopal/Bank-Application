import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user=""
  balance=""
  isCollapse=true
  isLogout:boolean=false;
  acno=""
  deleteMsg =""
  eMsg=""
  confirmMsg=false

  
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("username")){
      this.user = localStorage.getItem("username") ||''

    }

    if(!localStorage.getItem("token")){
      alert("Please Log In")
      this.router.navigateByUrl("")
    }

    
  }

  collapse(){
    this.isCollapse=!this.isCollapse
  }
  expand(){
    
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

  //logout fnctn

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    this.isLogout=true

    setTimeout(() => {
      this.router.navigateByUrl("")

    }, 2000);
      }

      //dlelete

      deleteAcno(){
        if(localStorage.getItem("currentAcno")){
          this.acno = localStorage.getItem("currentAcno") || ""

        }
      }

      //cancel

      cancel(){
        this.acno=""
      }

      //deletePrent

      deleteParent(event:any){
        //event is acnco that should be deleted
        console.log(event);
        this.confirmMsg = event[1]
        
        this.api.deleteAccount(event[0])
        .subscribe(
          //response 2xx
          (result:any)=>{
            
            this.acno=""
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("currentAcno")
            this.deleteMsg = result.message
            // alert(this.deleteMsg)
            setTimeout(() => {
              this.router.navigateByUrl("")
        
            }, 2000);
    
          },
          //respose 4xx
          (result:any)=>{
            this.eMsg = result.error.message
          }
        )
                
      }

    }
