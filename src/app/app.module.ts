import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  
    NgxSpinnerModule, 
    BrowserAnimationsModule,
    MaterialModule    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
