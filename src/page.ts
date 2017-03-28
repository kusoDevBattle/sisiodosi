document.addEventListener('contextmenu', ()=>event!.preventDefault())
document.addEventListener('DOMContentLoaded', ()=>new Application())





class Application {
  private cookie :Cookie
  private counter :number
  private bgm :HTMLAudioElement
  private se  :HTMLAudioElement
  constructor() {
    this.cookie = new Cookie()
    this.counter = 0
    this.bgm = document.getElementById('ElmBgm')! as HTMLAudioElement
    this.se  = document.getElementById('ElmSe')!  as HTMLAudioElement
    this.setBgm(this.cookie.getAttribute('bgm')==='true')
    document.getElementById('S7i')!.addEventListener('click', (()=>this.click()))
    document.querySelector('.card > .card-block')!.addEventListener('click', (()=>this.click()))
    document.getElementById('Bgm')!.addEventListener('click', (()=>this.toggleBgm()))
    window.addEventListener('keydown', ((e:any)=>this.keyEvents(e)))
  }
  private click() {
    this.counter++
    document.getElementById('Count')!.innerText = '' + this.counter
    this.se.currentTime = 0
    this.se.play()
  }
  private keyEvents(e :KeyboardEvent) {
    e.preventDefault()
    if(e.key === ' ') this.click()
    if(e.key === 'b') this.toggleBgm()
  }
  private toggleBgm() {
    this.setBgm(this.bgm.paused || this.bgm.ended)
  }
  private setBgm(doPlay:boolean) {
    this.cookie.setAttribute('bgm', doPlay)
    if(doPlay) {
      this.bgm.play()
    }else{
      this.bgm.pause()
    }
  }
}





class Cookie {
  private attrs :any
  constructor() {
    this.attrs = {}
    this.init()
    this.pullAttributes()
    let v = this.getAttribute('bgm') || 'false'
    this.setAttribute('bgm', v)
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
    this.setAttribute('sisiodosi', 'wabisabi')
    this.removeAttribute('')
  }
  pullAttributes() {
    let cookies = document.cookie.split(';')
    for(let i in cookies) {
      let cookie = cookies[i].split('=')
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
  setAttribute(key:string, val:any) {
    this.attrs[key] = val
    document.cookie = key + '=' + val + ';'
  }
}
