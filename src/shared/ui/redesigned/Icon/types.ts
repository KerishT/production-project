type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface NonClickableIconProps extends SvgProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
    clicable?: false
}

interface ClickableIconBaseProps extends SvgProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
    clicable?: true,
    onClick: () => void
}

export type IconProps = NonClickableIconProps | ClickableIconBaseProps
