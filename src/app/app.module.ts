import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { DemoAppModule } from './demo'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    DemoAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
