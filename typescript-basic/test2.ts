interface Person {
  readonly id: number;
  name: string;
  age?: number;
}

let viking: Person = {
  name: 'viking',
  age: 20,
  id: 1
}

const sum = (x: number, y: number) => {
  return x + y
}
interface ISum {
  (x: number, y: number): number
}
const sum2: ISum = sum

interface RandomMap {
  [propName: string]: string;
}
const test: RandomMap = {
  a: 'hello',
  b: 'test',
  c: 'test'
}
interface LikeArray {
  [index: number]: string
}

const likeArray: LikeArray = ['1', '2', '3']

// duck typing

interface FunctionWithProps {
  (x: number): number;
  name: string;
}
const a: FunctionWithProps = (x: number) => {
  return x
}
a.name = 'abc'


