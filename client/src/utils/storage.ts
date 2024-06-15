export const getItemFromLocalStorage = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage?.getItem(key)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveItemToLocalStorage = <T>(key: string, value: T) => {
  try {
    const serializedState = JSON.stringify(value)
    localStorage?.setItem(key, serializedState)
    return true
  } catch (error) {
    return false
  }
}

export const removeItemFromLocalStorage = (key: string): undefined => {
  try {
    localStorage?.removeItem(key)
  } catch (error) {
    return undefined
  }
}

export const clearLocalStorage = async () => {
  try {
    if (typeof window !== 'undefined') {
      await localStorage?.clear()
    }
  } catch (err) {
    return undefined
  }
}
