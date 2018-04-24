import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { humanize, decapitalize } from 'underscore.string';
import { Injectable, Directive, Optional, Host, SkipSelf, Input, Renderer2, ElementRef, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { tap, startWith } from 'rxjs/operators';
import { FormGroupDirective, ControlContainer } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const languages = {};
languages["es"] = {};
languages["es"]["required"] = (error, displayName) => `El campo ${displayName} es requerido.`;
languages["es"]["minlength"] = (error, displayName) => `El campo ${displayName} debe tener más de  ${error.requiredLength} caracteres, pero tiene ${error.actualLength}.`;
languages["es"]["maxlength"] = (error, displayName) => `El campo  ${displayName} debe tener menos de  ${error.requiredLength} caracteres, pero tiene ${error.actualLength}.`;
languages["es"]["pattern"] = (error, displayName) => `El formato del campo  ${displayName} es inválido .`;
languages["es"]["min"] = (error, displayName) => `El campo  ${displayName} debe ser mayor a ${error.min}, pero es ${error.actual}.`;
languages["es"]["max"] = (error, displayName) => `El campo  ${displayName} debe ser menor a ${error.max}, pero es ${error.actual}.`;
languages["es"]["email"] = (error, displayName) => `El campo  ${displayName} debe ser un email válido.`;
languages["en"] = {};
languages["en"]["required"] = (error, displayName) => `The  ${displayName} is requerid.`;
languages["en"]["minlength"] = (error, displayName) => `The ${displayName} must be at least ${error.requiredLength} characters long, but was ${error.actualLength}.`;
languages["en"]["maxlength"] = (error, displayName) => `The ${displayName} cannot be more than ${error.requiredLength} characters long, but was ${error.actualLength}.`;
languages["en"]["pattern"] = (error, displayName) => `The ${displayName} format is invalid.`;
languages["en"]["min"] = (error, displayName) => `The ${displayName} must be at least ${error.min}, but was ${error.actual}.`;
languages["en"]["max"] = (error, displayName) => `The ${displayName} cannot be more than ${error.max}, but was ${error.actual}.`;
languages["en"]["email"] = (error, displayName) => `The ${displayName} must be a valid email address.`;
/**
 * @param {?} lang
 * @return {?}
 */
function getLang(lang) {
    return languages[lang];
}
/**
 * @param {?} lang
 * @param {?} data
 * @return {?}
 */
function addLanguage(lang, data) {
    languages[lang] = data;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class ValidationRuleMessage {
    /**
     * @param {?} key
     * @param {?} getValidationMessage
     */
    constructor(key, getValidationMessage) {
        this.key = key;
        this.getValidationMessage = getValidationMessage;
    }
    /**
     * @param {?} error
     * @param {?} displayName
     * @return {?}
     */
    message(error, displayName) {
        return this.getValidationMessage(error, displayName);
    }
}
class ValidationRuleMessages {
    constructor() {
        this.defaultValidationRuleMessage = new ValidationRuleMessage('default', (error, displayName) => `The ${displayName} field is invalid.`);
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    chooseLanguage(lang) {
        let /** @type {?} */ langData = getLang(lang);
        if (langData) {
            this.buildMessage(langData);
            return of(true);
        }
        else {
            return Observable.throw("Language not supported, add messages for this language");
        }
    }
    /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    addLanguage(lang, data) {
        if (getLang(lang)) {
            
        }
        else {
            addLanguage(lang, data);
        }
    }
    /**
     * @param {?} langMessage
     * @return {?}
     */
    buildMessage(langMessage) {
        this.data = [
            new ValidationRuleMessage('required', langMessage["required"]),
            new ValidationRuleMessage('minlength', langMessage["minlength"]),
            new ValidationRuleMessage('maxlength', langMessage["maxlength"]),
            new ValidationRuleMessage('pattern', langMessage["pattern"]),
            new ValidationRuleMessage('min', langMessage["min"]),
            new ValidationRuleMessage('max', langMessage["max"]),
            new ValidationRuleMessage('email', langMessage["email"])
        ];
    }
    /**
     * @param {?} validationRule
     * @return {?}
     */
    get(validationRule) {
        return this.data.find(x => x.key === validationRule.key) || this.defaultValidationRuleMessage;
    }
    /**
     * @param {?} validationRuleMessage
     * @return {?}
     */
    add(validationRuleMessage) {
        this.data.push(validationRuleMessage);
    }
}
const validationRuleMessages = new ValidationRuleMessages();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DisplayName {
    constructor() {
        this.data = [];
    }
    /**
     * @param {?} propertyName
     * @param {?} customDisplayName
     * @return {?}
     */
    for(propertyName, customDisplayName) {
        this.data[propertyName] = customDisplayName.split(" ").map(e => decapitalize(e)).join(" ");
    }
    /**
     * @param {?} propertyName
     * @return {?}
     */
    of(propertyName) {
        return this.data[propertyName] || this.defaultDisplayName(propertyName);
    }
    /**
     * @param {?} propertyName
     * @return {?}
     */
    defaultDisplayName(propertyName) {
        return decapitalize(humanize(propertyName));
    }
}
const displayName = new DisplayName();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DisplayErrorService {
    constructor() {
        this.langDefault = "en";
        this.onChangeLang = new Subject();
        validationRuleMessages.chooseLanguage(this.langDefault);
    }
    /**
     * @param {?} propertyName
     * @param {?} error
     * @param {?=} alias
     * @return {?}
     */
    for(propertyName, error, alias = "") {
        return validationRuleMessages
            .get(error)
            .message(error, this.displayName(propertyName, alias));
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    setLanguage(lang) {
        return validationRuleMessages
            .chooseLanguage(lang).pipe(tap(res => { console.log("hhjk"); this.onChangeLang.next(); }));
    }
    /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    addLanguage(lang, data) {
        validationRuleMessages.addLanguage(lang, data);
    }
    /**
     * @return {?}
     */
    addErrorMessage() {
    }
    /**
     * @param {?} propertyName
     * @param {?} alias
     * @return {?}
     */
    displayName(propertyName, alias) {
        if (alias)
            displayName.for(propertyName, alias);
        return displayName.of(propertyName);
    }
}
DisplayErrorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DisplayErrorService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxErrorsDirective {
    /**
     * @param {?} element
     * @param {?} form
     * @param {?} renderer
     * @param {?} displayErrorService
     * @param {?} parent
     */
    constructor(element, form, renderer, displayErrorService, parent) {
        this.element = element;
        this.form = form;
        this.renderer = renderer;
        this.displayErrorService = displayErrorService;
        this.alias = "";
        this._nodeMessage = null;
        this._parent = parent;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.setControl();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.displayErrorService.onChangeLang.subscribe(r => {
            console.log("change lang");
            this.checkStatus();
        });
        this._control.statusChanges
            .pipe(startWith({}))
            .subscribe(() => this.checkStatus());
    }
    /**
     * @return {?}
     */
    checkStatus() {
        if (this._control.invalid) {
            const /** @type {?} */ errors = Object
                .keys(this._control.errors)
                .map(key => { return Object.assign({}, { key: key }, this._control.getError(key)); });
            this.showError(this.displayErrorService.for(this.controlName, errors[0], this.alias));
        }
        else {
            this.hideError();
        }
    }
    /**
     * @return {?}
     */
    hideError() {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    }
    /**
     * @param {?} message
     * @return {?}
     */
    showError(message) {
        this.renderer.removeStyle(this.element.nativeElement, 'display');
        if (!!this._nodeMessage) {
            this.renderer.removeChild(this.element.nativeElement, this._nodeMessage);
        }
        this._nodeMessage = this.renderer.createText(message);
        this.renderer.appendChild(this.element.nativeElement, this._nodeMessage);
    }
    /**
     * @return {?}
     */
    get pathFormControl() {
        return [...this._parent.path, this.controlName];
    }
    /**
     * @return {?}
     */
    setControl() {
        const /** @type {?} */ c = this.form.control.get(this.pathFormControl);
        if (!c) {
            throw new Error(this.controlName);
        }
        else {
            this._control = c;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
NgxErrorsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[errorMessage]',
                exportAs: 'errorMessage'
            },] },
];
/** @nocollapse */
NgxErrorsDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: FormGroupDirective, },
    { type: Renderer2, },
    { type: DisplayErrorService, },
    { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf },] },
];
NgxErrorsDirective.propDecorators = {
    "controlName": [{ type: Input, args: ['errorMessage',] },],
    "alias": [{ type: Input, args: ['alias',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const dependencies = [
    NgxErrorsDirective
];
class ErrorMessageModule {
}
ErrorMessageModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...dependencies],
                exports: [...dependencies],
                providers: [DisplayErrorService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { DisplayErrorService, ErrorMessageModule };
//# sourceMappingURL=ng-error-messages.js.map
