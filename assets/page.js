"use strict";
document.addEventListener('contextmenu', e => e.preventDefault());
class Application {
    constructor() {
        this.cookie = new Cookie();
        this.counter = 0;
        this.bgm = document.getElementById('ElmBgm');
        this.se = document.getElementById('ElmSe');
        this.setBgm(this.cookie.getAttribute('bgm') === 'true');
        document.getElementById('S7i').addEventListener('click', (() => this.click()));
        document.querySelector('.card > .card-block').addEventListener('click', (() => this.click()));
        document.getElementById('Bgm').addEventListener('click', (() => this.toggleBgm()));
        window.addEventListener('keydown', ((e) => this.keyEvents(e)));
    }
    click() {
        this.counter++;
        document.getElementById('Count').innerText = '' + this.counter;
        this.se.currentTime = 0;
        this.se.play();
    }
    keyEvents(e) {
        e.preventDefault();
        if (e.key === ' ')
            this.click();
        if (e.key === 'b')
            this.toggleBgm();
    }
    toggleBgm() {
        this.setBgm(this.bgm.paused || this.bgm.ended);
    }
    setBgm(doPlay) {
        this.cookie.setAttribute('bgm', doPlay);
        if (doPlay) {
            this.bgm.play();
        }
        else {
            this.bgm.pause();
        }
    }
}
class ApplicationR extends React.Component {
    constructor(props) {
        super(props);
        this.doSisiodosi = () => {
            this.setState({ counter: this.state.counter + 1 });
            this.sisiodosi.currentTime = 0;
            this.sisiodosi.play();
            this.cookie.setAttribute('sisioCount', this.state.counter);
        };
        this.keyEvents = (e) => {
            e.preventDefault();
            if (e.key === ' ')
                this.doSisiodosi();
            if (e.key === 'b') { }
        };
        this.cookie = new Cookie();
        this.state = {
            counter: parseInt(this.cookie.getAttribute('sisioCount') || '0'),
            isPlayBgm: false
        };
        this.sisiodosi = document.getElementsByTagName('audio')[0];
        window.addEventListener('keydown', ((e) => this.keyEvents(e)));
    }
    render() {
        return (React.createElement("div", { className: "card mx-auto my-5", style: { maxWidth: "600px" } },
            React.createElement(Sisiodosi, { onClick: this.doSisiodosi, counter: this.state.counter }),
            React.createElement(FooterBgm, null)));
    }
}
class Sisiodosi extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = () => {
            this.props.onClick();
        };
    }
    render() {
        return (React.createElement("div", { onClick: this._onClick },
            React.createElement("img", { className: 'card-img-top w-100', src: 'assets/s7i.png' }),
            React.createElement("p", { className: 'card-block text-center lh-1 m-0', style: { fontSize: "4rem" } }, this.props.counter),
            React.createElement("audio", { src: "assets/se.wav" })));
    }
}
class FooterBgm extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = () => {
        };
    }
    render() {
        return (React.createElement("footer", { className: "card-footer text-center text-mute", onClick: this._onClick },
            React.createElement("p", { className: "m-0" }, "bgm: off only"),
            React.createElement("audio", { id: "ElmBgm", src: "assets/bg.mp3", loop: true })));
    }
}
class Cookie {
    constructor() {
        this.attrs = {};
        this.init();
        this.pullAttributes();
        let v = this.getAttribute('bgm') || 'false';
        this.setAttribute('bgm', v);
    }
    getAttribute(key) {
        this.pullAttributes();
        return (this.attrs[key]) ? this.attrs[key] : null;
    }
    getAttributes() {
        this.pullAttributes();
        return this.attrs;
    }
    init() {
        this.setAttribute('sisiodosi', 'wabisabi');
        this.setAttribute('sisioCount', Math.floor(Math.random() * 20));
        this.removeAttribute('');
    }
    pullAttributes() {
        let cookies = document.cookie.split(';');
        for (let i in cookies) {
            let cookie = cookies[i].split('=');
            this.attrs[cookie[0]] = cookie[1];
        }
    }
    removeAttribute(key) {
        let cookies = '';
        for (let i in this.attrs) {
            if (i !== key)
                cookies += `${i}=${this.attrs[i]};`;
        }
        document.cookie = cookies;
    }
    setAttribute(key, val) {
        this.attrs[key] = val;
        document.cookie = key + '=' + val + ';';
    }
}
ReactDOM.render(React.createElement(ApplicationR, null), document.getElementById('app'));
//# sourceMappingURL=page.js.map