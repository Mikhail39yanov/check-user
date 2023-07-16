import { createEffect, createEvent, createStore } from 'effector'
import { TDataForm, TDataFormError, TResponseData, TUpdateDataForm } from './type'

export const updateFastForm = createEvent<TUpdateDataForm>()
export const updateValueEmailError = createEvent<TUpdateDataForm>()
export const updateValuePhoneError = createEvent<TUpdateDataForm>()
export const resetFastForm = createEvent()

export const fetchPostFormFx = createEffect<TDataForm, TResponseData[]>()

export const $signal = createStore(new AbortController())
export const $fastForm = createStore<TDataForm>({
  email: '',
  phone: '',
})
export const $responseData = createStore<TResponseData[]>([])
export const $fastFormError = createStore<TDataFormError>({
  valueEmailError: '',
  valuePhoneError: '',
})
export const $fastFormErrorResponse = createStore<{ valueError: string }>({
  valueError: '',
})
// export const $fastFormValidate = createStore<{ isValidateForm: boolean }>({
//   isValidateForm: true,
// })
export const $formSent = createStore<{ isFormSent: boolean }>({
  isFormSent: false,
})
export const $isPendingForm = createStore<{ isPending: boolean }>({
  isPending: false,
})

// $responseData.watch((state) => {
//   console.log(state)
// })

// $fastForm.watch((state) => {
//   console.log(state)
// })

// $fastFormError.watch((state) => {
//   console.log(state)
// })

// $fastFormValidate.watch((state) => {
//   console.log(state)
// })

// $fastFormErrorResponse.watch((state) => {
//   console.log(state)
// })

// $formSent.watch((state) => {
//   console.log(state)
// })

// $isPendingForm.watch((state) => {
//   console.log(state)
// })
