import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayErrorService } from '../../library/messages-error'

@Component({
  selector: 'demo-app',
  templateUrl: 'index.component.html'
})
export class IndexComponent {
  form: FormGroup;
  valueFormated
  constructor(
    private displayErrorService: DisplayErrorService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm(): void {
    this.form = this.fb.group({
      'text': ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]]
    });
  }
  setLanguage(lang) {
    this.displayErrorService
      .setLanguage(lang)
      .subscribe(r => {
        console.log("change language")
      }, err => {
        alert(err)
      })
  }
}
