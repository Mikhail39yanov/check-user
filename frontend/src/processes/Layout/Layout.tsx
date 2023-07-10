import styles from './Layout.module.scss'
import { FC, PropsWithChildren } from 'react'

import ReactLogo from '../../shared/ui/icons/ReactLogo'
import NodeLogo from '../../shared/ui/icons/NodeLogo'
export interface LayoutProps {}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={'container'}>
          <ul className={styles.logoList}>
            <li className={styles.logoReact}>
              <ReactLogo />
            </li>
            <li className={styles.logoNode}>
              <NodeLogo />
            </li>
          </ul>
        </div>
      </header>
      {children}
    </div>
  )
}

export default Layout
