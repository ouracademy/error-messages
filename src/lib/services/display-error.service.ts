import { Injectable } from '@angular/core';

import { validationRuleMessages } from '../model/rule-message'
import { displayName } from '../model/display-name'
import { Subject } from 'rxjs/Subject'
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class DisplayErrorService {
    langDefault = "en"
    onChangeLang = new Subject()
    constructor() {
      console.log('dfd')
        validationRuleMessages.chooseLanguage(this.langDefault)
    }
    for(propertyName: string, error, alias: string = ""): string {
        return validationRuleMessages
            .get(error)
            .message(error, this.displayName(propertyName, alias))
    }
    setLanguage(lang): Observable<any> {
        return validationRuleMessages
            .chooseLanguage(lang).pipe(tap(res => {  console.log("hhjk"); this.onChangeLang.next() } ))
    }
    addLanguage(lang, data) {
        validationRuleMessages.addLanguage(lang, data)
    }
    addErrorMessage() {

    }
    private displayName(propertyName, alias) {
        if (alias) displayName.for(propertyName, alias)
        return displayName.of(propertyName)
    }

}




