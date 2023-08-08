// import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
type Point = { x: number; y: number }

export const useSwipe = (element: Ref<HTMLElement | undefined>) => {
  const start = ref<Point>()
  const end = ref<Point>()
  const swiping = ref(false)
  const onStart = (e: TouchEvent) => {
    e.preventDefault()
    swiping.value = true
    end.value = start.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onMove = (e: TouchEvent) => {
    end.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onEnd = (e: TouchEvent) => {
    swiping.value = false
  }
  const distance = computed(() => {
    if (!end.value || !start.value) return null
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y
    }
  })
  const direction = computed(() => {
    if (!distance.value) return ''
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })
  onMounted(() => {
    if (!element.value) return
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMove)
    element.value.addEventListener('touchend', onEnd)
  })
  onUnmounted(() => {
    if (!element.value) return
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })
  return {
    swiping,
    distance,
    direction
  }
}
