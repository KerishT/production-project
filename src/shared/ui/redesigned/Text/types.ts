export type TextVariant = 'primary' | 'accent' | 'error'

export type TextAlign = 'left' | 'center' | 'right'

export type TextSize = 's' | 'm' | 'l'

export type HeaderTagType = 'h1' | 'h2' | 'h3';

export interface TextProps {
    className?: string,
    title?: string,
    text?: string,
    variant?: TextVariant,
    align?: TextAlign,
    size?: TextSize,
    'data-testid'?: string
}
