import styles from './PageCheckForm.module.scss'
import { FC, PropsWithChildren } from 'react'

import FormContainer from '../../features/FormContainer'

export interface PageCheckFormProps {}

const PageCheckForm: FC<PropsWithChildren<PageCheckFormProps>> = () => {
  return (
    <div className={styles.pageCheckForm}>
      <main>
        <section>
          <div className={'container grid container__plug'}>
            <div className={'plug'}>
              <h1 style={{ color: 'white' }}>Find a user</h1>
            </div>
          </div>
        </section>
        <FormContainer />
      </main>
    </div>
  )
}

export default PageCheckForm
