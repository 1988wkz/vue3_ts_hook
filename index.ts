import { reactive, onUnmounted, ref } from 'vue'

export function usePaginationTypes () {
  const PaginationTypes = reactive({
    page: 1,
    page_size: 10
  })
  const handleCurrentChange = async (val) => {
    PaginationTypes.page = val
  }
  const handleSizeChange = () => {
    PaginationTypes.page = 1
  }
  return {
    PaginationTypes, handleCurrentChange, handleSizeChange
  }
}
// 优点:结束时自动清除setTimeout
export function useSetTimeout () {
  const timer = ref(null)
  const useTimeout = (callback, time = 0) => {
    timer.value = setTimeout(() => {
      callback && callback()
    }, time)
  }
  onUnmounted(() => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
      console.log('on,removed,timeout')
    }
  })
  // setInterval(())
  return {
    useTimeout
  }
}
// 优点:结束时自动清除SetInterval
export function useSetInterval () {
  const timer = ref()
  const useInterval = (callback, time = 0) => {
    timer.value = setInterval(() => {
      callback && callback()
    }, time)
  }
  onUnmounted(() => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
      console.log('removed,interval')
    }
  })
  return {
    useInterval
  }
}
