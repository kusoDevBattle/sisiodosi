class Cookie {
  private attrs :any
  private expireUTC :string
  constructor() {
    this.attrs = {}
    this.init()
    this.pullAttributes()
  }
  getAttribute(key:string) :string|null {
    this.pullAttributes()
    return (this.attrs[key])? this.attrs[key] : null
  }
  getAttributes() {
    this.pullAttributes()
    return this.attrs
  }
  private init() {
    const date = new Date(Date.now() + 14*24*60*60*1000)  //->14days
    this.expireUTC = date.toUTCString()
    this.setAttribute('expires', this.expireUTC)
    this.removeAttribute('')
  }
  pullAttributes() {
    let cookies = document.cookie.split(';')
    for(let i in cookies) {
      let cookie = cookies[i].trim().split('=')
      this.attrs[cookie[0]] = cookie[1]
    }
  }
  removeAttribute(key:string) {
    let cookies = ''
    for(let i in this.attrs) {
      if(i!==key) cookies += `${i}=${this.attrs[i]};`
    }
    document.cookie = cookies
  }
  setAttribute(key:string, val:any, expire=false) {
    let opt = (!expire)? '': `;expires=${this.expireUTC}`
    this.attrs[key] = val
    document.cookie = key + '=' + val + opt
  }
}
