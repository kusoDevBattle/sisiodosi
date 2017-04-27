"use strict";
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
//# sourceMappingURL=Cookie.js.map