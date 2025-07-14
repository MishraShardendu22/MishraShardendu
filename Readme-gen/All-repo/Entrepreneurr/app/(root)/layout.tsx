import { ReactNode } from 'react';

const layout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      {children}
    </main>
  )
}

export default layout
