import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
export declare class DisplayErrorService {
    langDefault: string;
    onChangeLang: Subject<{}>;
    constructor();
    for(propertyName: string, error: any, alias?: string): string;
    setLanguage(lang: any): Observable<any>;
    addLanguage(lang: any, data: any): void;
    addErrorMessage(): void;
    private displayName(propertyName, alias);
}
