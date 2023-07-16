import { attach } from 'effector'

import {
  $fastForm,
  $fastFormError,
  $fastFormErrorResponse,
  $formSent,
  $isPendingForm,
  $responseData,
  $signal,
  fetchPostFormFx,
  resetFastForm,
  updateFastForm,
  updateValueEmailError,
  updateValuePhoneError,
} from '.'
import { TDataForm } from './type'

fetchPostFormFx.use(async (data: TDataForm) => {
  const { signal } = await abortFx()

  const req = await fetch('/api/clients', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      number: data.phone,
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    signal,
  })

  return req.json()
})

const abortFx = attach({
  source: $signal,
  effect(ctrl) {
    ctrl.abort()
    return new AbortController()
  },
})

$signal.on(abortFx.doneData, (_, ctrl) => ctrl)

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
  return { valueError: 'Make another request again' }
})

$fastForm.reset(resetFastForm).on(updateFastForm, (state, { key, value }) => {
  return {
    ...state,
    [key]: value,
  }
})

$responseData.reset(resetFastForm).on(fetchPostFormFx.doneData, (state, payload) => {
  return [...payload]
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
