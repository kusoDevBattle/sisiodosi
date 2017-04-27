"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ApplicationR = (function (_super) {
    __extends(ApplicationR, _super);
    function ApplicationR(props) {
        var _this = _super.call(this, props) || this;
        _this.doSisiodosi = function () {
            _this.setState({ counter: _this.state.counter + 1 });
            _this.sisiodosi.currentTime = 0;
            _this.sisiodosi.play();
            _this.cookie.setAttribute('sisioCount', _this.state.counter, true);
        };
        _this.keyEvents = function (e) {
            if (e.key === ' ')
                _this.doSisiodosi();
        };
        _this.cookie = new Cookie();
        _this.cookie.setAttribute('sisioCount', _this.cookie.getAttribute('sisioCount') || '0', true);
        _this.cookie.setAttribute('bgm', _this.cookie.getAttribute('bgm') || 'false', true);
        _this.state = {
            counter: parseInt(_this.cookie.getAttribute('sisioCount'))
        };
        return _this;
    }
    ApplicationR.prototype.componentDidMount = function () {
        var _this = this;
        this.sisiodosi = document.getElementsByTagName('audio')[0];
        document.addEventListener('contextmenu', function (e) { return e.preventDefault(); });
        window.addEventListener('keydown', function (e) { return _this.keyEvents(e); });
    };
    ApplicationR.prototype.render = function () {
        return (React.createElement("div", { className: "card mx-auto my-5", style: { maxWidth: "600px" } },
            React.createElement(Sisiodosi, { asset: "s7i", onClick: this.doSisiodosi, counter: this.state.counter }),
            React.createElement(FooterBgm, { asset: "bg.mp3", cookie: this.cookie, ref: "bg" })));
    };
    return ApplicationR;
}(React.Component));
var Sisiodosi = (function (_super) {
    __extends(Sisiodosi, _super);
    function Sisiodosi(props) {
        var _this = _super.call(this, props) || this;
        _this._onClick = function () {
            _this.props.onClick();
        };
        return _this;
    }
    Sisiodosi.prototype.render = function () {
        var img = "assets/" + this.props.asset + ".png";
        var se = "assets/" + this.props.asset + ".wav";
        return (React.createElement("div", { onClick: this._onClick },
            React.createElement("img", { className: 'card-img-top w-100', src: img }),
            React.createElement("p", { className: 'card-block text-center lh-1 m-0', style: {
                    fontSize: "4rem",
                    overflow: "hidden"
                } }, this.props.counter),
            React.createElement("audio", { src: se })));
    };
    return Sisiodosi;
}(React.Component));
var FooterBgm = (function (_super) {
    __extends(FooterBgm, _super);
    function FooterBgm(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleBgm = function () {
            _this.setState({ isPlay: !_this.state.isPlay });
            var wilB = (_this.state.isPlay) ? 'false' : 'false';
            _this.props.cookie.setAttribute('bgm', wilB, true);
            _this.willPlay(!_this.state.isPlay);
        };
        _this.willPlay = function (willPlay) {
            if (willPlay) {
                _this.bgm.play();
            }
            else {
                _this.bgm.pause();
            }
        };
        _this.state = {
            isPlay: _this.props.cookie.getAttribute('bgm') === 'true'
        };
        return _this;
    }
    FooterBgm.prototype.render = function () {
        var isBgm = (this.state.isPlay) ? "on" : "off";
        var src = "assets/" + this.props.asset;
        return (React.createElement("footer", { className: "card-footer text-center text-mute", onClick: this.toggleBgm },
            React.createElement("p", { className: "m-0" },
                "bgm: ",
                isBgm),
            React.createElement("audio", { src: src, loop: true, ref: "aux" })));
    };
    FooterBgm.prototype.componentDidMount = function () {
        this.bgm = this.refs.aux;
        if (this.state.isPlay)
            this.willPlay(true);
    };
    return FooterBgm;
}(React.Component));
var Cookie = (function () {
    function Cookie() {
        this.attrs = {};
        this.init();
        this.pullAttributes();
    }
    Cookie.prototype.getAttribute = function (key) {
        this.pullAttributes();
        return (this.attrs[key]) ? this.attrs[key] : null;
    };
    Cookie.prototype.getAttributes = function () {
        this.pullAttributes();
        return this.attrs;
    };
    Cookie.prototype.init = function () {
        var date = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        this.expireUTC = date.toUTCString();
        this.setAttribute('expires', this.expireUTC);
        this.removeAttribute('');
    };
    Cookie.prototype.pullAttributes = function () {
        var cookies = document.cookie.split(';');
        for (var i in cookies) {
            var cookie = cookies[i].trim().split('=');
            this.attrs[cookie[0]] = cookie[1];
        }
    };
    Cookie.prototype.removeAttribute = function (key) {
        var cookies = '';
        for (var i in this.attrs) {
            if (i !== key)
                cookies += i + "=" + this.attrs[i] + ";";
        }
        document.cookie = cookies;
    };
    Cookie.prototype.setAttribute = function (key, val, expire) {
        if (expire === void 0) { expire = false; }
        var opt = (!expire) ? '' : ";expires=" + this.expireUTC;
        this.attrs[key] = val;
        document.cookie = key + '=' + val + opt;
    };
    return Cookie;
}());
ReactDOM.render(React.createElement(ApplicationR, null), document.getElementById('app'));
//# sourceMappingURL=page.js.map