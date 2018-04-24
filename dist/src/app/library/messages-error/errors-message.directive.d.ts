import { OnChanges, OnDestroy, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormGroupDirective, ControlContainer } from '@angular/forms';
import { DisplayErrorService } from './services/display-error.service';
export declare class NgxErrorsDirective implements OnChanges, OnDestroy, OnInit {
    private element;
    private form;
    private renderer;
    private displayErrorService;
    controlName: string;
    alias: string;
    private _control;
    private _nodeMessage;
    private _parent;
    constructor(element: ElementRef, form: FormGroupDirective, renderer: Renderer2, displayErrorService: DisplayErrorService, parent: ControlContainer);
    ngOnChanges(): void;
    ngOnInit(): void;
    private checkStatus();
    private hideError();
    private showError(message);
    private readonly pathFormControl;
    private setControl();
    ngOnDestroy(): void;
}
