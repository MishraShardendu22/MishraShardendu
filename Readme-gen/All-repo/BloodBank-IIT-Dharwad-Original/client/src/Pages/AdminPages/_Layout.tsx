import { ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}
const _Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}
export default _Layout