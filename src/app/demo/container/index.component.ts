import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'demo-app',
  templateUrl: 'index.component.html'
})
export class IndexComponent {
  form: FormGroup;
  valueFormated
  constructor(
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
}
