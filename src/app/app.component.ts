import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserResponse } from './interface/user';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Prueba-Andromeda';

  private destroy$ = new Subject<any>();
  
  constructor(  
    public authSvc:AuthService,
    ) {}   


  ngOnInit(): void {  

    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: UserResponse) => {  
        
    });


   }
}