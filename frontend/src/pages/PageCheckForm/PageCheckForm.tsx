import styles from './PageCheckForm.module.scss'
import { ChangeEvent, FC, FormEvent, PropsWithChildren } from 'react'
import MaskedInput from 'react-text-mask'

import Send from '../../shared/ui/icons/Send'
import { useUnit } from 'effector-react'
import {
  $fastForm,
  $fastFormError,
  $fastFormErrorResponse,
  $formSent,
  $isPendingForm,
  $responseData,
  fetchPostFormFx,
  updateFastForm,
  updateValidateForm,
  updateValueEmailError,
  updateValuePhoneError,
} from './model'
import removeHyphens from './utils/removeHyphens'

export interface PageCheckFormProps {}

const PageCheckForm: FC<PropsWithChildren<PageCheckFormProps>> = () => {
  // jim@gmail.com
  // 221122
  const { email, phone } = useUnit($fastForm)
  const data = useUnit($responseData)
  const { isPending } = useUnit($isPendingForm)
  const { isFormSent } = useUnit($formSent)

  const { valueEmailError, valuePhoneError } = useUnit($fastFormError)
  const { valueError } = useUnit($fastFormErrorResponse)
  const updateFastFormFn = useUnit(updateFastForm)
  const updateValueNameErrorFn = useUnit(updateValueEmailError)
  const updateValuePhoneErrorFn = useUnit(updateValuePhoneError)
  const updateValidateFormFn = useUnit(updateValidateForm)
  const fetchPostForm = useUnit(fetchPostFormFx)

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
      return { value: `Invalid email format`, key: 'valueEmailError' }
    }

    return { value: '', key: 'valueEmailError' }
  }

  const validateValuePhone = () => {
    if (phone.replace(/\D/g, '').length !== 6) {
      return { value: `Invalid number format`, key: 'valuePhoneError' }
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
              <h1 style={{ color: 'white' }}>Find a user</h1>
            </div>
          </div>
        </section>
        <section>
          <div className={'container grid container__plug'}>
            <div className={'plug'}>
              {!isFormSent && !isPending && !valueEmailError && !valuePhoneError && data.clientNotFound && (
                <p style={{ color: 'red' }}>{data.clientNotFound}</p>
              )}
              {!isFormSent &&
                !isPending &&
                !valueEmailError &&
                !valuePhoneError &&
                data.email !== undefined &&
                data.email !== '' && (
                  <p style={{ color: 'greenyellow' }}>{`Client ${data.email} | ${data.number} found`}</p>
                )}
              {isPending && !isFormSent && <p style={{ color: 'aquamarine' }}>Loading...</p>}
            </div>
          </div>
        </section>
        <section>
          <div className={'container grid container__form'}>
            <form className={styles.form} noValidate autoComplete="on" onSubmit={onHandleSubmit}>
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
              {valueEmailError && <p style={{ color: 'red', fontSize: '12px' }}>{valueEmailError}</p>}
              {valuePhoneError && <p style={{ color: 'red', fontSize: '12px' }}>{valuePhoneError}</p>}
              {valueError && <p style={{ color: 'red', fontSize: '12px' }}>{valueError}</p>}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PageCheckForm
