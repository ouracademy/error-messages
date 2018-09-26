export interface ValidationRule {
    key: string
}

export interface ValidationError extends ValidationRule {
    [attribute: string]: any;
}