import styles from './TemplateName.module.scss'
import { FC, PropsWithChildren } from 'react'

export interface TemplateNameProps {}

const TemplateName: FC<PropsWithChildren<TemplateNameProps>> = () => {
  return <div className={styles.templateName}>TemplateName Component</div>
}

export default TemplateName
