import styles from './index.less';
import { useEffect } from 'react'

export default function IndexPage() {

  useEffect(() => {
    // 获取 mock 接口数据
    fetch('/api/mock-demo')
      .then(res => res.json())
      .then(data => {
        console.log('mock-demo res data', data)
      })
      .catch(ex => {
        console.error('mock-demo error', ex)
      })
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
