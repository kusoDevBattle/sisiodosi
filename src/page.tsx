document.addEventListener('contextmenu', e=>e.preventDefault())
// document.addEventListener('DOMContentLoaded', _=>new Application())





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



class ApplicationR extends React.Component<any, any> {
  private sisiodosi :HTMLAudioElement
  private cookie :Cookie

  constructor(props:any) {
    super(props)
    this.cookie = new Cookie()
    this.state = {
      counter  : parseInt(this.cookie.getAttribute('sisioCount') || '0'),
      isPlayBgm: false
    }
    this.sisiodosi = document.getElementsByTagName('audio')[0]
    window.addEventListener('keydown', ((e:any)=>this.keyEvents(e)))
  }

  doSisiodosi = () => {
    this.setState({ counter: this.state.counter+1 })
    this.sisiodosi.currentTime = 0
    this.sisiodosi.play()
    this.cookie.setAttribute('sisioCount', this.state.counter)
  }
  keyEvents = (e :KeyboardEvent) => {
    e.preventDefault()
    if(e.key === ' ') this.doSisiodosi()
    if(e.key === 'b') {}
  }

  render() {
    return (
      <div
        className="card mx-auto my-5"
        style={{maxWidth: "600px"}}
      >
        <Sisiodosi onClick={this.doSisiodosi} counter={this.state.counter} />
        <FooterBgm />
      </div>
    )
  }
}



class Sisiodosi extends React.Component<any, any> {

  constructor(props:any) {
    super(props)
  }

  _onClick = () => {
    this.props.onClick()
  }

  render() {
    return (
      <div
        onClick={this._onClick}
      >
        <img
          className='card-img-top w-100'
          src='assets/s7i.png'
        />
        <p
          className='card-block text-center lh-1 m-0'
          style={{fontSize: "4rem"}}
        >
          {this.props.counter}
        </p>
        <audio src="assets/se.wav"></audio>
      </div>
    )
  }
}

class FooterBgm extends React.Component<any, any> {

  constructor(props:any) {
    super(props)
  }

  _onClick = () => {

  }

  render() {
    return (
      <footer
        className="card-footer text-center text-mute"
        onClick={this._onClick}
      >
        <p className="m-0">
          bgm: off only
        </p>
        <audio
          id="ElmBgm"
          src="assets/bg.mp3"
          loop
        ></audio>
      </footer>
    )
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
    this.setAttribute('sisioCount', Math.floor(Math.random()*20))
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


ReactDOM.render(<ApplicationR />, document.getElementById('app'))
