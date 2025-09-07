type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface NonClickableIconProps extends IconBaseProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
    clicable?: false
}

interface ClickableIconBaseProps extends IconBaseProps {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
    clicable?: true,
    onClick: () => void
}

export type IconProps = NonClickableIconProps | ClickableIconBaseProps
