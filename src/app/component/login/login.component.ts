import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fg: FormGroup;
  
  registrar:boolean=false;

  constructor(
    private fb:FormBuilder,
    private authSvc:AuthService,
    private router:Router,   
    private loadSvc:LoaderService 
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({            
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
 ])),
      password:['',[Validators.required]]     
    });
  }



  signin(){
    this.loadSvc.show();
    let obj = Object.assign({},this.fg.value); 

    this.authSvc.login(obj).subscribe(res=>{
      if(res){
        this.loadSvc.hide();
        let credenciales = this.authSvc.getToken();        
        // this.router.navigate(['/']);
        console.log(res);         
      }
    },(err)=>{
      this.loadSvc.hide();
    });
    
  }

  onRegistrar(){
    this.registrar = !this.registrar;
  }

  signup(){
    this.loadSvc.show();
    let obj = Object.assign({},this.fg.value);

    this.authSvc.RegistrarUser(obj).subscribe((res:any)=>{
      if(res.code == 200){
        Swal.fire(
          res.message,
          'Presione el boton para continuar',
          'success'
        )
        this.registrar = false;
        this.loadSvc.hide();
      }
    },(err:any)=>{
      Swal.fire(
        err.error.message,
        'Presione el boton para continuar',
        'error'
      )
      this.loadSvc.hide();      
    });
  }

}
