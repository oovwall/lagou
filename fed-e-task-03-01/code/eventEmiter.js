class EventEmitter {
  constructor () {
    this.em = Object.create(null)
  }
  $on (eventType, handler) {
    this.em[eventType] = this.em[eventType] || []
    this.em[eventType].push(handler)
  }
  $emit (eventType) {
    if (this.em[eventType]) {
      this.em[eventType].forEach((handler) => {
        handler()
      })
    }
  }
}

const em = new EventEmitter()
em.$on('click', () => {
  console.log('click1')
})
em.$on('click', () => {
  console.log('click2')
})
em.$emit('click')

