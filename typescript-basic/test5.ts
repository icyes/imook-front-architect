// 类型别名
let sum: (x: number, y: number) => number
const result = sum(1,2)
type PlusType = (x: number, y: number) => number
let sum2: PlusType
sum2(1, 2)


// 交叉类型
interface IName  {
  name: string
}
type IPerson = IName & { age: number }
let person: IPerson = { name: 'hello', age: 12 }

// 联合类型
let numberOrString: number | string 

// 类型断言
function getLength(input: number | string) {
  const str = input as string
  if (str.length) {
    return str.length
  } else {
    const number = input as number
    return number.toString().length
  }
}

interface Person {
  name: string
  age: number
}
type PersonOptional = Partial<IPerson>
let viking2: PersonOptional = {name: '12'}


