# ng-error-messages [![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] 

[npm-downloads-image]: http://img.shields.io/npm/dm/ng-error-messages.svg?style=flat
[npm-version-image]: http://img.shields.io/npm/v/ng-error-messages.svg?style=flat
[npm-url]: https://www.npmjs.com/package/ng-error-messages

A collection of classes to help handling display error messages on your form.
Based in [repository of my dear friend Arthur] (https://github.com/artmadeit/ngx-demo)


* [Demo](#demo)
* [Reason](#reason)
* [Installation](#installation)
* [Usage](#usage)
* [Validators](#validators)
* [Customizing](#customizing)
* [Development](#development)
* [TODO](#todo)

## Demo
https://ouracademy.github.io/error-messages/

## Reason

Tired to always write this in your angular  app:
```html
<input type="text" formControlName="text">

<div *ngIf="form.get('text').hasError('required') && form.get('text').touched">
  Field is required
</div>

```

And repeat this to every field in every form in every view.

So you can instead do this: 

```html
                <input placeholder="Texto:" matInput formControlName="text">
                </input>
                <div errorMessage="text" alias="Super Texto" ></div>
```

And it will do the same in very uniform way in all your fields in every forms in all your views. This package will create validation messages for you. It contains predefined validation messages.

## Installation
Install the npm module by running:
```sh
npm install ng-error-messages --save
```


## Usage

You can see the [demo app](https://github.com/ouracademy/error-messages/tree/master/src/app/demo) to have a more detail of the usage.

#### 1. Import the `ErrorMessageModule`:


```ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }           from './app.component';
import { ErrorMessageModule } from 'ng-error-messages';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ErrorMessageModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```



#### 2. Init the ValidationMessagesService for your application:
```ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayErrorService } from 'ng-error-messages'

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


```

#### 3. Use it on your template:
```html
    <mat-card [formGroup]="form">
        <mat-card-title>
            Messager for errors
        </mat-card-title>
        <div>
                <input placeholder="Texto:" matInput formControlName="text">
                </input>
                <div errorMessage="text" alias="Super Texto" ></div>
        </div>
    </mat-card>

```

## Validators
This is the list of the supported validations

#### angular2 built-in validators

- required
- minlength
- maxlength
- pattern
- min
- max
- email


## Customizing
 Actually only support alias for every field.
 TODO: Customize messages for error type.

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## TODO
This package it's creating on free times after university...and theses...
For now works with Reactive Driven Forms, it wasn't tested with Template Driven Forms. Probably it will work, if work send us a message.
