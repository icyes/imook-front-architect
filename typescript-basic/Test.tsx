import { FunctionComponent } from 'react'
interface TestProps {
  title: string;
  desc: string;
}
const Test: FunctionComponent<TestProps> = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
    </>
  )
}
Test.propTypes







