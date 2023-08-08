export const throttle = (fn: Function, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  return (...args: [any]) => {
    if (!timer) {
      fn(...args)
      timer = setTimeout(() => {
        timer = undefined
      }, wait)
    }
  }
}
