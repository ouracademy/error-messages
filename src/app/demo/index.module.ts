import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { ErrorMessageModule } from '../library/messages-error/error-message.module'


import { IndexComponent } from './container/index.component';



@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule,
        MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule,
        ErrorMessageModule],
    declarations: [IndexComponent],
    exports : [ IndexComponent ],
    providers: []
})
export class DemoAppModule { }
