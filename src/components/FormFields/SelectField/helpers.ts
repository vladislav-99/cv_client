interface ISelectOption {
  label: string,
  value: string
}

export const getOptionsFromEnum = <T>(enumObj: T): ISelectOption[] => {
  const enumKeys = (Object.keys(enumObj) as Array<keyof typeof enumObj>);

  return enumKeys.map(key => ({
    value: String(key),
    label: String(enumObj[key])
  }))
}