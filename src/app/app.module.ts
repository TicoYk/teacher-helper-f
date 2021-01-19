import { StudentComponent } from './pages/student/student.component';
import { RoomService } from './services/room.service';
import { StudentService } from './services/student.service';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoomComponent } from './pages/room/room.component';
import { ErrorStateMatcher } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    StudentComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StudentService,
    RoomService,
    ErrorStateMatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
