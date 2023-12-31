
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeBackendInterceptorInterceptor } from './core/fake-backend-interceptor.interceptor';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    BrowserModule,
    //AppRoutingModule,
    RouterModule.forRoot([]),
    LayoutModule,
    SharedModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptorInterceptor
      ,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
