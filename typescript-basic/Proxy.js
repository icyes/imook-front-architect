let product = { price: 5, quantity: 2 }
let total = 0

let effect =  () => { 
  total = product.price * product.quantity
}

track()
effect()

const person = {
  name: 'viking'
}
const handler = {
  get() {
    console.log('trigger get')
    return Reflect.get(...arguments)
  },
  set() {
    console.log('trigger set')
    return Reflect.set(...arguments)
  }
}
const proxy = new Proxy(person, handler)
proxy.name = 'maomao'
console.log(proxy.name)
const reactive = (obj) => {
  const handler = {
    get() {
      console.log('trigger get')
      return Reflect.get(...arguments)
    },
    set() {
      console.log('trigger set')
      return Reflect.set(...arguments)
    }
  }
  return new Proxy(obj, handler)
}
