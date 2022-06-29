
// 类的基本定义
// public private protected
class Animal {
  protected name: string;
  constructor(name: string) {
    this.name = name
  }
  run() {
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')
snake.run()
// 继承
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}

const xiaobao = new Dog('xiaobao')
xiaobao.run()
// 多态
class Cat extends Animal {
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run() {
    return 'Meow, ' + super.run()
  }
}
const maomao = new Cat('maomao')

interface ClockInterface {
  currentTime: number;
  alert(): void;
}
interface ClockStatic {
  new (h: number, m: number): void;
  time: number;
}
interface GameInterface {
  play(): void;
}
const Clock:ClockStatic = class Clock implements ClockInterface {
  constructor(h:number, m: number) {

  }
  static time = 12;
  currentTime: number = 123;
  alert() {

  }
}
class Cellphone implements ClockInterface, GameInterface {
  currentTime: number = 123;
  alert() {

  }
  play() {

  }
}
