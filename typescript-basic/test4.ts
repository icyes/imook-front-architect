function echo<T>(arg: T): T {
  return arg
}

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result = swap(['string', 123])
let test = 123

interface GithubResp {
  name: string;
  count: number;
}
interface CountryResp {
  name: string;
  area: number;
  population: number;
}

function withAPI<T>(url: string): Promise<T> {
  return fetch(url).then(resp => resp.json())
}
withAPI<CountryResp>('country.resp').then(resp => {
  
})
// keyof
type Keys = keyof CountryResp
// lookup types
type NameType = CountryResp['name']
// mapped types
type Test = {
  [key in Keys]: any
}
type CountryOpt = {
  [p in Keys]?: CountryResp[p]
}

interface IWithLength {
  length: number
}
// extends in generics
function echoWithArr<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}

const arrs = echoWithArr([1, 2, 3])
const str = echoWithArr('123')
const obj = echoWithArr({length: 123, width: 'hello' })
type NonType<T> = T extends null | undefined ? never : T
let demo1: NonType<number>
let demo2: NonType<null>

