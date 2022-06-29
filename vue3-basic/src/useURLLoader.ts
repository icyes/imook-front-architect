import axios from 'axios'
import { reactive } from 'vue'
interface DataProps<T> {
  result: T | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}
function useURLLoader<T>(url: string) {
  const data = reactive<DataProps<T>>({
    result: null,
    loading: true,
    loaded: false,
    error: null
  })
  axios.get(url).then((rawData) => {
    data.loading = false
    data.loaded = true
    data.result = rawData.data
  }).catch(e => {
    data.error = e
  }).finally(() => {
    data.loading = false
  })
  return data
}

export default useURLLoader
