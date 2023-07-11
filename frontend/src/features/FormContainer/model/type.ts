export type TDataForm = {
  email: string
  phone: string
}

export type TDataFormError = {
  valueEmailError: string
  valuePhoneError: string
}

export type TUpdateDataForm = {
  value: string
  key: string
}

export type TResponseData = {
  email: string
  number: string
  clientNotFound?: string
}
