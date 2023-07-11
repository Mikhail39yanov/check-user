// import styles from './FormContainer.module.scss'
import { ChangeEvent, FC, FormEvent, PropsWithChildren } from 'react'
import Form from './ui/Form'

import { useUnit } from 'effector-react'

import removeHyphens from './utils/removeHyphens'
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

export interface FormContainerProps {}

const FormContainer: FC<PropsWithChildren<FormContainerProps>> = () => {
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

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    updateFastFormFn({ value: event.target.value, key: 'email' })

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) =>
    updateFastFormFn({ value: event.target.value, key: 'phone' })

  return (
    <Form
      email={email}
      phone={phone}
      data={data}
      isPending={isPending}
      isFormSent={isFormSent}
      valueEmailError={valueEmailError}
      valuePhoneError={valuePhoneError}
      valueError={valueError}
      onHandleSubmit={onHandleSubmit}
      handleChangeEmail={handleChangeEmail}
      handleChangePhone={handleChangePhone}
    />
  )
}

export default FormContainer
