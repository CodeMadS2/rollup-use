export default class Father {
  constructor (surname) {
    this.surname = surname;
  }

  show () {
    console.log(`我的姓是${this.surname}.`)
  }
}