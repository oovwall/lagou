// 发布者 - 目标
class Dep {
  constructor () {
    // 记录所有的订阅者
    this.subs = []
  }

  // 添加订阅者
  addSub (sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 发布通知
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 订阅者 - 观察者
class Watcher {
  update () {
    console.log('update')
  }
}

const dep = new Dep()
const watcher = new Watcher()

dep.addSub(watcher)
dep.notify()
