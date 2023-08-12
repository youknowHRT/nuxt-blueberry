export const useBool = (initValue = false) => {
  const state = ref(initValue)
  const toggle = () => {
    state.value = !state.value
  }
  const on = () => {
    state.value = true
  }
  const off = () => {
    state.value = false
  }
  return {ref:state, toggle, on, off}
}