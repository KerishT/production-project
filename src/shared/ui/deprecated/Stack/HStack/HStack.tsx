import { Flex, FlexProps } from '../Flex/Flex';

export type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const HStack = (props: HStackProps) => (
    <Flex direction="row" {...props} />
);
