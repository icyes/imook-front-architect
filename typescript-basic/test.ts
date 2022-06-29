import { createStore } from 'redux'
import myFetch from 'myFetch'
// basic types
let isDone: boolean = false
let age: number = 10

let firstName: string = 'viking'
let message: string = `Hello, ${firstName}`

let u: undefined = undefined
let n: null = null

let num: string = null

let notSure: any = 4
notSure = 'maybe a string'
notSure = true

notSure.myName
notSure.getName()

// array
let arrOfNumbers: number[] = [1, 2, 3, 4]
arrOfNumbers.push(3)


// tuple
let user: [string, number] = ['viking', 20]
user = ['viking', 30]

// function
function add(x: number, y: number, z:number): number {
  return x + y
}
//let result = add(2, 3)
let add2 = (x: number, y:number): number => {
  return x + y
}
const add3:(x: number, y:number, z?: number) => number = add

// type inference
let str = 'str'

myFetch<string>('test', 'POST', { name: 'hello' }).then(data => {

})
myFetch.get<number>('test').then(data => {

})