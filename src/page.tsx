/// <reference path="./Cookie.ts" />


class ApplicationR extends React.Component<any, any> {
  private sisiodosi :HTMLAudioElement
  private cookie :Cookie

  constructor(props:any) {
    super(props)
    this.cookie = new Cookie()
    this.cookie.setAttribute('sisioCount', this.cookie.getAttribute('sisioCount') || '0', true)
    this.cookie.setAttribute('bgm', this.cookie.getAttribute('bgm') || 'false', true)

    this.state = {
      counter  : parseInt(this.cookie.getAttribute('sisioCount')!)
    }
  }
  componentDidMount() {
    this.sisiodosi = document.getElementsByTagName('audio')[0]

    document.addEventListener('contextmenu', e=>e.preventDefault())
    window.addEventListener('keydown', e=>this.keyEvents(e))
  }

  doSisiodosi = () => {
    this.setState({ counter: this.state.counter+1 })
    this.sisiodosi.currentTime = 0
    this.sisiodosi.play()
    this.cookie.setAttribute('sisioCount', this.state.counter, true)
  }
  keyEvents = (e :KeyboardEvent) => {
    if(e.key === ' ') this.doSisiodosi()
    // if(e.key === 'b') (this.refs.bg as any).toggleBgm()
  }

  render() {
    return (
      <div
        className="card mx-auto my-5"
        style={{maxWidth: "600px"}}
      >
        <Sisiodosi asset={"s7i"} onClick={this.doSisiodosi} counter={this.state.counter} />
        <FooterBgm asset={"bg.mp3"} cookie={this.cookie} ref="bg" />
      </div>
    )
  }
}



class Sisiodosi extends React.Component<any, any> {

  constructor(props:any) {
    super(props)
  }

  render() {
    let img = `assets/${this.props.asset}.png`
    let se  = `assets/${this.props.asset}.wav`
    return (
      <div
        onClick={this.props.onClick}
      >
        <img
          className='card-img-top w-100'
          src={img}
        />
        <p
          className='card-block text-center lh-1 m-0'
          style={{
            fontSize: "4rem",
            overflow: "hidden"
          }}
        >
          {this.props.counter}
        </p>
        <audio src={se}></audio>
      </div>
    )
  }
}



class FooterBgm extends React.Component<any, any> {

  private bgm :HTMLAudioElement

  constructor(props:any) {
    super(props)
    this.state = {
      isPlay: this.props.cookie.getAttribute('bgm') === 'true'
    }
  }

  toggleBgm = () => {
    this.setState({ isPlay: !this.state.isPlay })
    const wilB = (this.state.isPlay)? 'false' : 'true'
    this.props.cookie.setAttribute('bgm', wilB, true)
    this.willPlay(!this.state.isPlay)
  }
  willPlay = (willPlay:boolean) => {
    if(willPlay) {
      this.bgm.play()
    } else {
      this.bgm.pause()
    }
  }

  render() {
    let isBgm = (this.state.isPlay)? `on`: `off`
    let src = `assets/${this.props.asset}`
    return (
      <footer
        className="card-footer text-center text-mute"
        onClick={this.toggleBgm}
      >
        <p className="m-0">
          bgm: {isBgm}
        </p>
        <audio
          src={src}
          loop
          ref="aux"
        ></audio>
      </footer>
    )
  }
  componentDidMount() {
    this.bgm = this.refs.aux as HTMLAudioElement
    if(this.state.isPlay) this.willPlay(true)
  }
}





ReactDOM.render(<ApplicationR />, document.getElementById('app'))
