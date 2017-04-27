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
var Horagai = (function (_super) {
    __extends(Horagai, _super);
    function Horagai(props) {
        var _this = _super.call(this, props) || this;
        _this.doSisiodosi = function () {
            _this.setState({ counter: _this.state.counter + 1 });
            _this.sisiodosi.currentTime = 0;
            _this.sisiodosi.play();
            _this.cookie.setAttribute('horagCount', _this.state.counter, true);
        };
        _this.keyEvents = function (e) {
            if (e.key === ' ')
                _this.doSisiodosi();
        };
        _this.cookie = new Cookie();
        _this.cookie.setAttribute('horagCount', _this.cookie.getAttribute('horagCount') || '0', true);
        _this.cookie.setAttribute('bgm', _this.cookie.getAttribute('bgm') || 'false', true);
        _this.state = {
            counter: parseInt(_this.cookie.getAttribute('horagCount'))
        };
        return _this;
    }
    Horagai.prototype.componentDidMount = function () {
        var _this = this;
        this.sisiodosi = document.getElementsByTagName('audio')[0];
        document.addEventListener('contextmenu', function (e) { return e.preventDefault(); });
        window.addEventListener('keydown', function (e) { return _this.keyEvents(e); });
    };
    Horagai.prototype.render = function () {
        return (React.createElement("div", { className: "card mx-auto my-5", style: { maxWidth: "600px" } },
            React.createElement(HoragaiImg, { asset: "h5i", onClick: this.doSisiodosi, counter: this.state.counter }),
            React.createElement(HoragaiFooter, { asset: "bg.mp3", cookie: this.cookie, ref: "bg" })));
    };
    return Horagai;
}(React.Component));
var HoragaiImg = (function (_super) {
    __extends(HoragaiImg, _super);
    function HoragaiImg(props) {
        var _this = _super.call(this, props) || this;
        _this._onClick = function () {
            _this.props.onClick();
        };
        return _this;
    }
    HoragaiImg.prototype.render = function () {
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
    return HoragaiImg;
}(React.Component));
var HoragaiFooter = (function (_super) {
    __extends(HoragaiFooter, _super);
    function HoragaiFooter(props) {
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
    HoragaiFooter.prototype.render = function () {
        var isBgm = (this.state.isPlay) ? "on" : "off";
        var src = "assets/" + this.props.asset;
        return (React.createElement("footer", { className: "card-footer text-center text-mute", onClick: this.toggleBgm },
            React.createElement("p", { className: "m-0" },
                "bgm: ",
                isBgm),
            React.createElement("audio", { src: src, loop: true, ref: "aux" })));
    };
    HoragaiFooter.prototype.componentDidMount = function () {
        this.bgm = this.refs.aux;
        if (this.state.isPlay)
            this.willPlay(true);
    };
    return HoragaiFooter;
}(React.Component));
ReactDOM.render(React.createElement(Horagai, null), document.getElementById('horagai'));
//# sourceMappingURL=horagai.js.map