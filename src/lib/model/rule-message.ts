import { ValidationRule, ValidationError } from './validation-rule'
import { getLang, addLanguage } from '../lang/lang'
import { of } from 'rxjs/observable/of'
import "rxjs/add/observable/throw"
import { Observable } from 'rxjs/Observable'


export interface GetValidationMessage {
    (error: ValidationError, displayName: string): string;
}

export class ValidationRuleMessage {
    constructor(public readonly key: string,
        private getValidationMessage: GetValidationMessage) {
    }

    message(error: ValidationError, displayName: string): string {
        return this.getValidationMessage(error, displayName)
    }
}

export class ValidationRuleMessages {
    private data

    chooseLanguage(lang): Observable<any> {
        let langData = getLang(lang)
        if (langData) { this.buildMessage(langData); return of(true); }
        else {
            return Observable.throw("Language not supported, add messages for this language")
        }
    }
    addLanguage(lang, data) {
        if (getLang(lang)) {
            new Error("Lang already exist")
        } else {
            addLanguage(lang, data)
        }
    }
    private buildMessage(langMessage) {
        this.data = [
            new ValidationRuleMessage('default', langMessage["default"]),
            new ValidationRuleMessage('required', langMessage["required"]),
            new ValidationRuleMessage('minlength', langMessage["minlength"]),
            new ValidationRuleMessage('maxlength', langMessage["maxlength"]),
            new ValidationRuleMessage('pattern', langMessage["pattern"]),
            new ValidationRuleMessage('min', langMessage["min"]),
            new ValidationRuleMessage('max', langMessage["max"]),
            new ValidationRuleMessage('email', langMessage["email"])
        ]
    }

    get(validationRule: ValidationRule) {
        return this.data.find(x => x.key === validationRule.key) || this.data[0]
    }

    add(validationRuleMessage: ValidationRuleMessage) {
        this.data.push(validationRuleMessage)
    }
}

export const validationRuleMessages = new ValidationRuleMessages()
