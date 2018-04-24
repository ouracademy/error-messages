import { ValidationRule, ValidationError } from './validation-rule'
import { getLang, addLanguage } from '../lang/lang'

interface GetValidationMessage {
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

class ValidationRuleMessages {
    private data

    chooseLanguage(lang) {
        this.buildMessage(getLang(lang))
    }
    addLanguage(lang, data) {
        if (getLang(lang)) {
            new Error("Lan already exist")
        } else {
            addLanguage(lang, data)
        }
    }
    private buildMessage(langMessage) {
        this.data = [
            new ValidationRuleMessage('required', langMessage["required"]),
            new ValidationRuleMessage('minlength', langMessage["minlength"]),
            new ValidationRuleMessage('maxlength', langMessage["maxlength"]),
            new ValidationRuleMessage('pattern', langMessage["pattern"]),
            new ValidationRuleMessage('min', langMessage["min"]),
            new ValidationRuleMessage('max', langMessage["max"]),
            new ValidationRuleMessage('email', langMessage["email"])
        ]
    }

    private defaultValidationRuleMessage = new ValidationRuleMessage(
        'default', (error, displayName) => `The ${displayName} field is invalid.`)

    get(validationRule: ValidationRule) {
        return this.data.find(x => x.key === validationRule.key) || this.defaultValidationRuleMessage
    }

    add(validationRuleMessage: ValidationRuleMessage) {
        this.data.push(validationRuleMessage)
    }
}

export const validationRuleMessages = new ValidationRuleMessages()