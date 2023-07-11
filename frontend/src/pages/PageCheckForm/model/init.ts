import {
  $fastForm,
  $fastFormError,
  $fastFormErrorResponse,
  $fastFormValidate,
  $formSent,
  $isPendingForm,
  $responseData,
  fetchPostFormFx,
  resetFastForm,
  updateFastForm,
  updateValidateForm,
  updateValueEmailError,
  updateValuePhoneError,
} from '.'
import { TDataForm } from './type'

fetchPostFormFx.use(async (data: TDataForm) => {
  const response = await fetch('/api/clients', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      number: data.phone,
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json())
  // console.log(response)
  return response
})

$isPendingForm.on(fetchPostFormFx.pending, (_, payload) => {
  return { isPending: payload }
})

$formSent.reset(fetchPostFormFx.doneData).on(fetchPostFormFx.done, (state, payload) => {
  return {
    ...state,
    isFormSent: !state.isFormSent,
  }
})

$fastFormErrorResponse.reset(fetchPostFormFx.doneData).on(fetchPostFormFx.fail, (_, payload) => {
  return { valueError: 'A repeat request cannot be sent!' }
})

$fastForm.reset(resetFastForm).on(updateFastForm, (state, { key, value }) => {
  return {
    ...state,
    [key]: value,
  }
})

$responseData.reset(resetFastForm).on(fetchPostFormFx.doneData, (state, payload) => {
  return { ...state, email: payload.email, number: payload.number, clientNotFound: payload.clientNotFound }
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
