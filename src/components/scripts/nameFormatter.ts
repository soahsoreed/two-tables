export function nameFormatter(name: string) {
  if (name && name.length > 1) {
    const splittedArr = name.split(' ')
    if(splittedArr.length > 1 ) {
      const nameFirstLetter = splittedArr[splittedArr.length - 2][0]
      const lastName = splittedArr[splittedArr.length - 1]
      return `${nameFirstLetter}. ${lastName}`
    }
    return null
  } else {
    return null
  }
}