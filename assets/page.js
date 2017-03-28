"use strict";
document.addEventListener('contextmenu', function () { return event.preventDefault(); });
document.addEventListener('DOMContentLoaded', function () { return new Application(); });
var Application = (function () {
    function Application() {
        var _this = this;
        this.cookie = new Cookie();
        this.counter = 0;
        this.bgm = document.getElementById('ElmBgm');
        this.se = document.getElementById('ElmSe');
        this.setBgm(this.cookie.getAttribute('bgm') === 'true');
        document.getElementById('S7i').addEventListener('click', (function () { return _this.click(); }));
        document.querySelector('.card > .card-block').addEventListener('click', (function () { return _this.click(); }));
        document.getElementById('Bgm').addEventListener('click', (function () { return _this.toggleBgm(); }));
        window.addEventListener('keydown', (function (e) { return _this.keyEvents(e); }));
    }
    Application.prototype.click = function () {
        this.counter++;
        document.getElementById('Count').innerText = '' + this.counter;
        this.se.currentTime = 0;
        this.se.play();
    };
    Application.prototype.keyEvents = function (e) {
        e.preventDefault();
        if (e.key === ' ')
            this.click();
        if (e.key === 'b')
            this.toggleBgm();
    };
    Application.prototype.toggleBgm = function () {
        this.setBgm(this.bgm.paused || this.bgm.ended);
    };
    Application.prototype.setBgm = function (doPlay) {
        this.cookie.setAttribute('bgm', doPlay);
        if (doPlay) {
            this.bgm.play();
        }
        else {
            this.bgm.pause();
        }
    };
    return Application;
}());
var Cookie = (function () {
    function Cookie() {
        this.attrs = {};
        this.init();
        this.pullAttributes();
        var v = this.getAttribute('bgm') || 'false';
        this.setAttribute('bgm', v);
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
        this.setAttribute('sisiodosi', 'wabisabi');
        this.removeAttribute('');
    };
    Cookie.prototype.pullAttributes = function () {
        var cookies = document.cookie.split(';');
        for (var i in cookies) {
            var cookie = cookies[i].split('=');
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
    Cookie.prototype.setAttribute = function (key, val) {
        this.attrs[key] = val;
        document.cookie = key + '=' + val + ';';
    };
    return Cookie;
}());
