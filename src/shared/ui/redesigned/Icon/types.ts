type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
    'data-testid'?: string
}

interface NonClickableIconProps extends IconBaseProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
    clickable?: false
}

interface ClickableIconBaseProps extends IconBaseProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
    clickable?: true,
    onClick: () => void
}

export type IconProps = NonClickableIconProps | ClickableIconBaseProps
