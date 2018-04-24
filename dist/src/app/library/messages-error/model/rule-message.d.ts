import { ValidationRule, ValidationError } from './validation-rule';
import "rxjs/add/observable/throw";
import { Observable } from 'rxjs/Observable';
export interface GetValidationMessage {
    (error: ValidationError, displayName: string): string;
}
export declare class ValidationRuleMessage {
    readonly key: string;
    private getValidationMessage;
    constructor(key: string, getValidationMessage: GetValidationMessage);
    message(error: ValidationError, displayName: string): string;
}
export declare class ValidationRuleMessages {
    private data;
    chooseLanguage(lang: any): Observable<any>;
    addLanguage(lang: any, data: any): void;
    private buildMessage(langMessage);
    private defaultValidationRuleMessage;
    get(validationRule: ValidationRule): any;
    add(validationRuleMessage: ValidationRuleMessage): void;
}
export declare const validationRuleMessages: ValidationRuleMessages;
