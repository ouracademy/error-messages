import { Directive, Optional, Host, SkipSelf, Input, OnChanges, OnDestroy, AfterViewInit, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormGroupDirective, ControlContainer, AbstractControl } from '@angular/forms';
import { DisplayErrorService } from './services/display-error.service'
import { startWith } from 'rxjs/operators';

@Directive({
  selector: '[errorMessages]',
  exportAs: 'errorMessages'
})
export class NgxErrorsDirective implements OnChanges, OnDestroy, OnInit {

  @Input('errorMessages') controlName: string;
  @Input('alias') alias: string = "";
  private _control: AbstractControl
  private _nodeMessage = null
  private _parent: ControlContainer

  constructor(
    private element: ElementRef,
    private form: FormGroupDirective,
    private renderer: Renderer2,
    private displayErrorService: DisplayErrorService,
    @Optional() @Host() @SkipSelf() parent: ControlContainer,
  ) {
    this._parent = parent;

  }
  ngOnChanges() {
    this.setControl()
  }
  ngOnInit() {
    this._control.statusChanges
      .pipe(startWith({}))
      .subscribe(() => this.checkStatus());
  }

  private checkStatus() {
    if (this._control.invalid) {
      const errors = Object
        .keys(this._control.errors)
        .map(key => { return Object.assign({}, { key: key }, this._control.getError(key))})
      
      this.showError(this.displayErrorService.for(this.controlName, errors[0],this.alias))

    } else {
      this.hideError()
    }
  }
  private hideError() {
    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
  }
  private showError(message) {
    this.renderer.removeStyle(this.element.nativeElement, 'display');
    if (!!this._nodeMessage) {
      this.renderer.removeChild(this.element.nativeElement, this._nodeMessage)
    }
    this._nodeMessage = this.renderer.createText(message);
    this.renderer.appendChild(this.element.nativeElement, this._nodeMessage);
  }

  private get pathFormControl() {
    return [...this._parent.path, this.controlName]
  }

  private setControl() {
    const c = this.form.control.get(this.pathFormControl)
    if (!c) {
      throw new Error(this.controlName);
    } else {
      this._control = c
    }
  }



  ngOnDestroy() {
  }

}