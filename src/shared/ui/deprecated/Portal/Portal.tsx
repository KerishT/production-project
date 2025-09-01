import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode,
  element?: HTMLElement
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const Portal: FC<PortalProps> = ({ children, element = document.body }) => createPortal(children, element);
