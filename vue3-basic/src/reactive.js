let product = { price: 5, quantity: 2 }
let total = 0
let dep = new Set()
function track() {
  dep.add(effect) // Store the current effect
}
function trigger() { 
  dep.forEach(effect => effect()) 
}
const reactive = (obj) => {
  const handler = {
    get() {
      let result = Reflect.get(...arguments)
      track()
      return result
    },
    set() {
      let result = Reflect.set(...arguments)
      trigger()
      return result
    }
  }
  return new Proxy(obj, handler)
}

const productProxy = reactive(product)
let effect =  () => { 
  total = productProxy.price * productProxy.quantity
}
effect()
productProxy.price = 10
console.log(total)
// track()
// product.price = 10
// trigger()
// console.log(total)