import styles from './Form.module.scss'
import { ChangeEvent, FC, FormEvent, PropsWithChildren } from 'react'
import MaskedInput from 'react-text-mask'
import Send from '../../../../shared/ui/icons/Send'
import { TResponseData, TUpdateDataForm } from '../../model/type'

export interface FormProps {
  email: string
  phone: string
  data: TResponseData[]
  isPending: boolean
  isFormSent: boolean
  valueEmailError: string
  valuePhoneError: string
  valueError: string
  onHandleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<null | undefined>
  handleChangeEmail: (event: ChangeEvent<HTMLInputElement>) => TUpdateDataForm
  handleChangePhone: (event: ChangeEvent<HTMLInputElement>) => TUpdateDataForm
}

const Form: FC<PropsWithChildren<FormProps>> = ({
  email,
  phone,
  data,
  isPending,
  isFormSent,
  valueEmailError,
  valuePhoneError,
  valueError,
  onHandleSubmit,
  handleChangeEmail,
  handleChangePhone,
}) => {
  return (
    <>
      <section>
        <div className={'container grid container__plug'}>
          <div className={'plug'}>
            {!isFormSent && !isPending && !valueEmailError && !valuePhoneError && data[0]?.clientNotFound && (
              <p style={{ color: 'red' }}>'Client not found'</p>
            )}

            {!isFormSent &&
              !isPending &&
              !valueEmailError &&
              !valuePhoneError &&
              data.length !== 0 &&
              !data[0]?.clientNotFound && (
                <>
                  {data.map((item, i) => {
                    return (
                      <p key={i} style={{ color: 'greenyellow' }}>{`Client ${item.email} | ${item.number} found`}</p>
                    )
                  })}
                </>
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
    </>
  )
}

export default Form
