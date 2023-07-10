import Send from '../../shared/ui/icons/Send'
import styles from './PageCheckForm.module.scss'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

export interface PageCheckFormProps {}

const PageCheckForm: FC<PropsWithChildren<PageCheckFormProps>> = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])
  return (
    <div className={styles.pageCheckForm}>
      <main>
        <div className={'container'}>
          <p>{!data ? 'Loading...' : data}</p>
          <form autoComplete="off" className={styles.form}>
            <div className={styles.inputWrapper}>
              <label htmlFor="email"></label>
              <input
                className="FastForm_fastFormInput__5jHPm fastFormInput"
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                required
                // value=""
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="phone"></label>
              <input
                className="FastForm_fastFormInput__5jHPm fastFormInput"
                id="email"
                type="tel"
                name="phone"
                placeholder="phone"
                required
                // value=""
              />
            </div>
            <div className={styles.submitWrapper}>
              <button type="submit" className="">
                <span className="">Submit</span>
                <Send />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default PageCheckForm
