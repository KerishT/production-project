import { Flex } from '../Flex/Flex';
import { FlexProps } from '../Flex/types';

export type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = (props: HStackProps) => (
    <Flex direction="row" {...props} />
);
