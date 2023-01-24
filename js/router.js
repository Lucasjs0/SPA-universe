export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    
    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })

    switch (window.location.pathname) {
      case "/universo":
        document.body.classList.add('body-universe')
        document.body.classList.remove('body-exploration')
        break;
      case "/exploracao":
        document.body.classList.remove('body-universe')
        document.body.classList.add('body-exploration')
        break;
      default:
        document.body.classList.remove('body-universe')
        document.body.classList.remove('body-exploration')
    }
  }
}