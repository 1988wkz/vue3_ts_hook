import { reactive, onUnmounted, ref, watch } from 'vue'

export function usePaginationTypes () {
  const PaginationTypes = reactive({
    page: 1,
    page_size: 10
  })
  const handleCurrentChange = async (val:number|string) => {
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
  const useTimeout = (callback:Function, time = 0) => {
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
    useTimeout,
	timer
  }
}
// 优点:结束时自动清除SetInterval
export function useSetInterval () {
  const timer = ref()
  const useInterval = (callback:Function, time = 0) => {
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

// 防抖
export function useDebounce(){
	const {useTimeout,timer}=useSetTimeout()
	const cancel=()=>{
		if(!timer.value)return
		clearTimeout(timer.value)
		timer.value=null
	}
	const useDebounce=(callback:Function,time:number)=>{
		cancel()
		if(!timer.value)
		timer.value=useTimeout(()=>callback&&callback(),time)
	}
	return {
		cancel,
		useDebounce
	}
}

//节流
export function useThrottle(){
	const start=+new Date()
	const useThrottle=(callback:Function,time:number)=>{
		let now=+new Date()
		if(now-start>=time){
			callback&&callback()
		}
	}
}


//title
export function useTitle(){
	const title=ref<string>('')
	const initTitle=ref<string>('')
	watch(title,(newValue:string,oldValue)=>{
		if(!newValue){
			document.title=initTitle.value
		}else{
			title.value=newValue
			document.title=title.value
		}
	})
	return {
		title,initTitle
	}
}