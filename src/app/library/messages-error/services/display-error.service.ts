import { Injectable } from '@angular/core';

import { validationRuleMessages } from '../model/rule-message'
import { displayName } from '../model/display-name'



@Injectable()
export class DisplayErrorService {
    langDefault = "en"
    constructor() {
        validationRuleMessages.chooseLanguage(this.langDefault)
    }
    for(propertyName: string, error, alias: string = ""): string {
        return validationRuleMessages
            .get(error)
            .message(error, this.displayName(propertyName, alias))
    }

    setLanguage(lang) {
        validationRuleMessages.chooseLanguage(lang)
    }
    addLanguage(lang,data) {
        validationRuleMessages.addLanguage(lang,data)
    }
    addErrorMessage(){

    }
    private displayName(propertyName, alias) {
        if(alias) displayName.for(propertyName,alias)
        return displayName.of(propertyName)
    }


}




