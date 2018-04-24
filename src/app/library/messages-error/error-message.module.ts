import { NgModule } from '@angular/core';

import { NgxErrorsDirective } from './errors-message.directive';
import { DisplayErrorService } from './services/display-error.service'

const dependencies = [
  NgxErrorsDirective
];

@NgModule({
  declarations: [...dependencies],
  exports: [...dependencies],
  providers: [ DisplayErrorService ]
})
export class ErrorMessageModule {}