// <page URL, scrool position>
export type ScrollSchema = Record<string, number>;

export interface UISchema {
    scroll: ScrollSchema
}
