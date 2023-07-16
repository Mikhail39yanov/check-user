const removeHyphens = (str: string): string => {
  return str.replace(/\D/g, '')
}

export default removeHyphens
