import { humanize, decapitalize } from 'underscore.string'

class DisplayName {
    private data: string[] = []

    for(propertyName: string, customDisplayName: string) {
        this.data[propertyName] = customDisplayName
    }

    of(propertyName: string): string {
        return this.data[propertyName] || this.defaultDisplayName(propertyName)
    }

    defaultDisplayName(propertyName: string): string {
        return decapitalize(humanize(propertyName))
    }
}

export const displayName = new DisplayName()