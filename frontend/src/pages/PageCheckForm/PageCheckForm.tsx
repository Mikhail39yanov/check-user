import styles from './PageCheckForm.module.scss'
import { ChangeEvent, FC, FormEvent, PropsWithChildren, useEffect, useState } from 'react'
import MaskedInput from 'react-text-mask'

import Send from '../../shared/ui/icons/Send'
import { useUnit } from 'effector-react'
import {
  $fastForm,
  $fastFormError,
  $formSent,
  $isPendingForm,
  fetchPostFormFx,
  updateFastForm,
  updateValidateForm,
  updateValueEmailError,
  updateValuePhoneError,
} from './model'
import removeHyphens from './utils/removeHyphens'

export interface PageCheckFormProps {}

const PageCheckForm: FC<PropsWithChildren<PageCheckFormProps>> = () => {
  // yanovmikhailco@ya.ru
  // yanovmikhailco@gmail.com
  const [data, setData] = useState(null)
  const { email, phone } = useUnit($fastForm)
  const { valueEmailError, valuePhoneError } = useUnit($fastFormError)
  const updateFastFormFn = useUnit(updateFastForm)
  const updateValueNameErrorFn = useUnit(updateValueEmailError)
  const updateValuePhoneErrorFn = useUnit(updateValuePhoneError)
  const updateValidateFormFn = useUnit(updateValidateForm)
  const fetchPostForm = useUnit(fetchPostFormFx)

  const { isFormSent } = useUnit($formSent)
  const { isPending } = useUnit($isPendingForm)

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])

  const onHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    updateValueNameErrorFn(validateValueEmail())
    updateValuePhoneErrorFn(validateValuePhone())

    const { value: isValidateValueName } = validateValueEmail()
    const { value: isValidateValuePhone } = validateValuePhone()
    const isFormValid = !isValidateValueName && !isValidateValuePhone
    updateValidateFormFn(isFormValid)

    if (!isFormValid) {
      return null
    }

    console.log('Sending')

    let data = {
      email,
      phone: removeHyphens(phone),
    }

    await fetchPostForm(data)
  }

  const validateValueEmail = () => {
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(email)) {
      // return 'Неверный формат email'
      return { value: `Неверный формат email`, key: 'valueEmailError' }
    }

    return { value: '', key: 'valueEmailError' }
  }

  const validateValuePhone = () => {
    if (phone.replace(/\D/g, '').length !== 6) {
      return { value: `Неверный формат номера`, key: 'valuePhoneError' }
    }

    return { value: '', key: 'valuePhoneError' }
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    updateFastFormFn({ value: event.target.value, key: 'email' })

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) =>
    updateFastFormFn({ value: event.target.value, key: 'phone' })

  return (
    <div className={styles.pageCheckForm}>
      <main>
        <section>
          <div className={'container grid container__plug'}>
            <div className={'plug'}>
              <p style={{ color: 'white' }}>{!data ? 'Loading...' : data}</p>
              {isPending && !isFormSent && <p style={{ color: 'white' }}>Loading...</p>}
            </div>
          </div>
        </section>
        <section>
          <div className={'container grid container__form'}>
            <form className={styles.form} noValidate autoComplete="off" onSubmit={onHandleSubmit}>
              <div className={styles.inputWrapper}>
                <label htmlFor="email"></label>
                <input
                  className={styles.input}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                  aria-invalid={valueEmailError ? 'true' : undefined}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="phone"></label>
                <MaskedInput
                  className={styles.input}
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="phone"
                  // aria-invalid={valuePhoneError ? 'true' : undefined}
                  required
                  value={phone}
                  onChange={handleChangePhone}
                  aria-invalid={valuePhoneError ? 'true' : undefined}
                  mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                />
              </div>
              <div className={styles.submitWrapper}>
                <button type="submit" className={styles.submit}>
                  Submit
                  <Send />
                </button>
              </div>
            </form>
            <div className={styles.errorFieldsWrapper}>
              {valueEmailError && <p style={{ color: 'red' }}>{valueEmailError}</p>}
              {valuePhoneError && <p style={{ color: 'red' }}>{valuePhoneError}</p>}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PageCheckForm
