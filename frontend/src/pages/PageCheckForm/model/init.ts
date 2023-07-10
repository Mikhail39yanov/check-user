import {
  $fastForm,
  $fastFormError,
  $fastFormValidate,
  $formSent,
  $isPendingForm,
  fetchPostFormFx,
  resetFastForm,
  updateFastForm,
  updateValidateForm,
  updateValueEmailError,
  updateValuePhoneError,
} from '.'
import { TDataForm } from './type'

fetchPostFormFx.use(async (data: TDataForm) => {
  const response = await fetch('/api', {
    method: 'POST',
    body: JSON.stringify({
      name: data.email,
      phone: data.phone,
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })

  console.log(response)

  return response
})

$isPendingForm.on(fetchPostFormFx.pending, (_, payload) => {
  return { isPending: payload }
})

$formSent.on(fetchPostFormFx.done, (state, payload) => {
  return {
    ...state,
    isFormSent: !state.isFormSent,
  }
})

fetchPostFormFx.fail.watch(({ params, error }) => {
  console.error(params)
  console.error(error)
})

$fastForm.reset(resetFastForm).on(updateFastForm, (state, { key, value }) => {
  return {
    ...state,
    [key]: value,
  }
})

$fastFormError
  .reset(resetFastForm)
  .on(updateValueEmailError, (state, { key, value }) => {
    return {
      ...state,
      [key]: value,
    }
  })
  .on(updateValuePhoneError, (state, { key, value }) => {
    return {
      ...state,
      [key]: value,
    }
  })

$fastFormValidate.reset(resetFastForm).on(updateValidateForm, (state, payload) => {
  return {
    ...state,
    isValidateForm: payload,
  }
})
