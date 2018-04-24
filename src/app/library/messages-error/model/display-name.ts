import { humanize, decapitalize } from 'underscore.string'

export class DisplayName {
    private data: string[] = []

    for(propertyName: string, customDisplayName: string) {
        this.data[propertyName] = customDisplayName.split(" ").map(e => decapitalize(e)).join(" ")
    }

    of(propertyName: string): string {
        return this.data[propertyName] || this.defaultDisplayName(propertyName)
    }

    defaultDisplayName(propertyName: string): string {
        return decapitalize(humanize(propertyName))
    }
}

export const displayName = new DisplayName()