(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/observable/of'), require('rxjs/add/observable/throw'), require('rxjs/Observable'), require('underscore.string'), require('@angular/core'), require('rxjs/Subject'), require('rxjs/operators'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define('ng-error-messages', ['exports', 'rxjs/observable/of', 'rxjs/add/observable/throw', 'rxjs/Observable', 'underscore.string', '@angular/core', 'rxjs/Subject', 'rxjs/operators', '@angular/forms'], factory) :
	(factory((global['ng-error-messages'] = {}),global.Rx.Observable,global.Rx.Observable,global.Rx,global.underscore_string,global.ng.core,global.Rx,global.Rx.Observable.prototype,global.ng.forms));
}(this, (function (exports,of,_throw,Observable,underscore_string,core,Subject,operators,forms) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */










function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var languages = {};
languages["es"] = {};
languages["es"]["required"] = function (error, displayName) { return "El campo " + displayName + " es requerido."; };
languages["es"]["minlength"] = function (error, displayName) { return "El campo " + displayName + " debe tener m\u00E1s de  " + (error.requiredLength-1) + " caracteres, pero tiene " + error.actualLength + "."; };
languages["es"]["maxlength"] = function (error, displayName) { return "El campo  " + displayName + " debe tener menos de  " + error.requiredLength + " caracteres, pero tiene " + error.actualLength + "."; };
languages["es"]["pattern"] = function (error, displayName) { return "El formato del campo  " + displayName + " es inv\u00E1lido ."; };
languages["es"]["min"] = function (error, displayName) { return "El campo  " + displayName + " debe ser mayor a " + error.min + ", pero es " + error.actual + "."; };
languages["es"]["max"] = function (error, displayName) { return "El campo  " + displayName + " debe ser menor a " + error.max + ", pero es " + error.actual + "."; };
languages["es"]["email"] = function (error, displayName) { return "El campo  " + displayName + " debe ser un email v\u00E1lido."; };
languages["en"] = {};
languages["en"]["required"] = function (error, displayName) { return "The  " + displayName + " is requerid."; };
languages["en"]["minlength"] = function (error, displayName) { return "The " + displayName + " must be at least " + error.requiredLength + " characters long, but was " + error.actualLength + "."; };
languages["en"]["maxlength"] = function (error, displayName) { return "The " + displayName + " cannot be more than " + error.requiredLength + " characters long, but was " + error.actualLength + "."; };
languages["en"]["pattern"] = function (error, displayName) { return "The " + displayName + " format is invalid."; };
languages["en"]["min"] = function (error, displayName) { return "The " + displayName + " must be at least " + error.min + ", but was " + error.actual + "."; };
languages["en"]["max"] = function (error, displayName) { return "The " + displayName + " cannot be more than " + error.max + ", but was " + error.actual + "."; };
languages["en"]["email"] = function (error, displayName) { return "The " + displayName + " must be a valid email address."; };
function getLang(lang) {
    return languages[lang];
}
function addLanguage(lang, data) {
    languages[lang] = data;
}
var ValidationRuleMessage = /** @class */ (function () {
    function ValidationRuleMessage(key, getValidationMessage) {
        this.key = key;
        this.getValidationMessage = getValidationMessage;
    }
    ValidationRuleMessage.prototype.message = function (error, displayName) {
        return this.getValidationMessage(error, displayName);
    };
    return ValidationRuleMessage;
}());
var ValidationRuleMessages = /** @class */ (function () {
    function ValidationRuleMessages() {
        this.defaultValidationRuleMessage = new ValidationRuleMessage('default', function (error, displayName) { return "The " + displayName + " field is invalid."; });
    }
    ValidationRuleMessages.prototype.chooseLanguage = function (lang) {
        var langData = getLang(lang);
        if (langData) {
            this.buildMessage(langData);
            return of.of(true);
        }
        else {
            return Observable.Observable.throw("Language not supported, add messages for this language");
        }
    };
    ValidationRuleMessages.prototype.addLanguage = function (lang, data) {
        if (getLang(lang)) {
        }
        else {
            addLanguage(lang, data);
        }
    };
    ValidationRuleMessages.prototype.buildMessage = function (langMessage) {
        this.data = [
            new ValidationRuleMessage('required', langMessage["required"]),
            new ValidationRuleMessage('minlength', langMessage["minlength"]),
            new ValidationRuleMessage('maxlength', langMessage["maxlength"]),
            new ValidationRuleMessage('pattern', langMessage["pattern"]),
            new ValidationRuleMessage('min', langMessage["min"]),
            new ValidationRuleMessage('max', langMessage["max"]),
            new ValidationRuleMessage('email', langMessage["email"])
        ];
    };
    ValidationRuleMessages.prototype.get = function (validationRule) {
        return this.data.find(function (x) { return x.key === validationRule.key; }) || this.defaultValidationRuleMessage;
    };
    ValidationRuleMessages.prototype.add = function (validationRuleMessage) {
        this.data.push(validationRuleMessage);
    };
    return ValidationRuleMessages;
}());
var validationRuleMessages = new ValidationRuleMessages();
var DisplayName = /** @class */ (function () {
    function DisplayName() {
        this.data = [];
    }
    DisplayName.prototype.for = function (propertyName, customDisplayName) {
        this.data[propertyName] = customDisplayName.split(" ").map(function (e) { return underscore_string.decapitalize(e); }).join(" ");
    };
    DisplayName.prototype.of = function (propertyName) {
        return this.data[propertyName] || this.defaultDisplayName(propertyName);
    };
    DisplayName.prototype.defaultDisplayName = function (propertyName) {
        return underscore_string.decapitalize(underscore_string.humanize(propertyName));
    };
    return DisplayName;
}());
var displayName = new DisplayName();
var DisplayErrorService = /** @class */ (function () {
    function DisplayErrorService() {
        this.langDefault = "en";
        this.onChangeLang = new Subject.Subject();
        validationRuleMessages.chooseLanguage(this.langDefault);
    }
    DisplayErrorService.prototype.for = function (propertyName, error, alias) {
        if (alias === void 0) { alias = ""; }
        return validationRuleMessages
            .get(error)
            .message(error, this.displayName(propertyName, alias));
    };
    DisplayErrorService.prototype.setLanguage = function (lang) {
        var _this = this;
        return validationRuleMessages
            .chooseLanguage(lang).pipe(operators.tap(function (res) { console.log("hhjk"); _this.onChangeLang.next(); }));
    };
    DisplayErrorService.prototype.addLanguage = function (lang, data) {
        validationRuleMessages.addLanguage(lang, data);
    };
    DisplayErrorService.prototype.addErrorMessage = function () {
    };
    DisplayErrorService.prototype.displayName = function (propertyName, alias) {
        if (alias)
            displayName.for(propertyName, alias);
        return displayName.of(propertyName);
    };
    return DisplayErrorService;
}());
DisplayErrorService.decorators = [
    { type: core.Injectable },
];
DisplayErrorService.ctorParameters = function () { return []; };
var NgxErrorsDirective = /** @class */ (function () {
    function NgxErrorsDirective(element, form, renderer, displayErrorService, parent) {
        this.element = element;
        this.form = form;
        this.renderer = renderer;
        this.displayErrorService = displayErrorService;
        this.alias = "";
        this._nodeMessage = null;
        this._parent = parent;
    }
    NgxErrorsDirective.prototype.ngOnChanges = function () {
        this.setControl();
    };
    NgxErrorsDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.displayErrorService.onChangeLang.subscribe(function (r) {
            console.log("change lang");
            _this.checkStatus();
        });
        this._control.statusChanges
            .pipe(operators.startWith({}))
            .subscribe(function () { return _this.checkStatus(); });
    };
    NgxErrorsDirective.prototype.checkStatus = function () {
        var _this = this;
        if (this._control.invalid) {
            var errors = Object
                .keys(this._control.errors)
                .map(function (key) { return Object.assign({}, { key: key }, _this._control.getError(key)); });
            this.showError(this.displayErrorService.for(this.controlName, errors[0], this.alias));
        }
        else {
            this.hideError();
        }
    };
    NgxErrorsDirective.prototype.hideError = function () {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    };
    NgxErrorsDirective.prototype.showError = function (message) {
        this.renderer.removeStyle(this.element.nativeElement, 'display');
        if (!!this._nodeMessage) {
            this.renderer.removeChild(this.element.nativeElement, this._nodeMessage);
        }
        this._nodeMessage = this.renderer.createText(message);
        this.renderer.appendChild(this.element.nativeElement, this._nodeMessage);
    };
    Object.defineProperty(NgxErrorsDirective.prototype, "pathFormControl", {
        get: function () {
            return __spread(this._parent.path, [this.controlName]);
        },
        enumerable: true,
        configurable: true
    });
    NgxErrorsDirective.prototype.setControl = function () {
        var c = this.form.control.get(this.pathFormControl);
        if (!c) {
            throw new Error(this.controlName);
        }
        else {
            this._control = c;
        }
    };
    NgxErrorsDirective.prototype.ngOnDestroy = function () {
    };
    return NgxErrorsDirective;
}());
NgxErrorsDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[errorMessage]',
                exportAs: 'errorMessage'
            },] },
];
NgxErrorsDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: forms.FormGroupDirective, },
    { type: core.Renderer2, },
    { type: DisplayErrorService, },
    { type: forms.ControlContainer, decorators: [{ type: core.Optional }, { type: core.Host }, { type: core.SkipSelf },] },
]; };
NgxErrorsDirective.propDecorators = {
    "controlName": [{ type: core.Input, args: ['errorMessage',] },],
    "alias": [{ type: core.Input, args: ['alias',] },],
};
var dependencies = [
    NgxErrorsDirective
];
var ErrorMessageModule = /** @class */ (function () {
    function ErrorMessageModule() {
    }
    return ErrorMessageModule;
}());
ErrorMessageModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: __spread(dependencies),
                exports: __spread(dependencies),
                providers: [DisplayErrorService]
            },] },
];

exports.DisplayErrorService = DisplayErrorService;
exports.ErrorMessageModule = ErrorMessageModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-error-messages.umd.js.map
