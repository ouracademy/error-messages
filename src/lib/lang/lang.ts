const languages = {}
languages["es"] = {}
languages["es"]["required"] = (error, displayName) => `El campo ${displayName} es requerido.`
languages["es"]["minlength"] = (error, displayName) => `El campo ${displayName} debe tener más de  ${error.requiredLength} caracteres, pero tiene ${error.actualLength}.`
languages["es"]["maxlength"] = (error, displayName) => `El campo  ${displayName} debe tener menos de  ${error.requiredLength} caracteres, pero tiene ${error.actualLength}.`
languages["es"]["pattern"] = (error, displayName) => `El formato del campo  ${displayName} es inválido .`
languages["es"]["min"] = (error, displayName) => `El campo  ${displayName} debe ser mayor a ${error.min}, pero es ${error.actual}.`
languages["es"]["max"] = (error, displayName) => `El campo  ${displayName} debe ser menor a ${error.max}, pero es ${error.actual}.`
languages["es"]["email"] = (error, displayName) => `El campo  ${displayName} debe ser un email válido.`
languages["es"]["default"] = (error, displayName) => `El campo  ${displayName} es inválido`

languages["en"] = {}
languages["en"]["required"] = (error, displayName) => `The  ${displayName} is requerid.`
languages["en"]["minlength"] = (error, displayName) => `The ${displayName} must be at least ${error.requiredLength} characters long, but was ${error.actualLength}.`
languages["en"]["maxlength"] = (error, displayName) => `The ${displayName} cannot be more than ${error.requiredLength} characters long, but was ${error.actualLength}.`
languages["en"]["pattern"] = (error, displayName) => `The ${displayName} format is invalid.`
languages["en"]["min"] = (error, displayName) => `The ${displayName} must be at least ${error.min}, but was ${error.actual}.`
languages["en"]["max"] = (error, displayName) => `The ${displayName} cannot be more than ${error.max}, but was ${error.actual}.`
languages["en"]["email"] = (error, displayName) => `The ${displayName} must be a valid email address.`
languages["en"]["default"] = (error, displayName) => `The field ${displayName} is invalid`

export function getLang(lang: string) {
    return languages[lang]
}
export function addLanguage(lang, data) {
    languages[lang] = data
}
