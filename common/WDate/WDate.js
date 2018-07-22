import dateformat from "./dateformat";

export default class WDate {

    static _date = new WDate();
    _serverTime = null;
    _serverZoneOffset = null;
    _timeDifference = null;

    static getInstance() {
        return WDate._date;
    }

    static apiZoneToOffset(apiZone) {
        return (12 - apiZone) * 60;
    }

    initByLocalTime() {
        this._setServerTime(Date.now());
        this._serverZoneOffset = new Date().getTimezoneOffset();
        return WDate.getInstance();
    }

    /**
     * 通过接口标准定义的UTC时间字符串重新设置时间
     *
     * 转化规则：假如服务器为东九区，12:00，则会被转化为本地东八区，同一日期12:00，对应的时间戳
     * 注意：之所以不是11:00，是因为页面也要显示12:00，且Date工具类格式化输出时使用的是本地时区
     *
     * @param apiStr 如 20170101T12:00:00+0000
     * @param apiZone
     * @author jia.lin
     */
    initByApiStr(apiStr, apiZone) {
        const arr = apiStr.match(/([\d]{4})([\d]{2})([\d]{2})T([\d]{2}):([\d]{2}):([\d]{2})([+-][\d]{4})/);
        if (arr) {
            const time = Date.UTC(arr[1], arr[2] - 1, arr[3], arr[4], arr[5], arr[6]) - parseInt(arr[7]) * 60 * 60 * 10;
            this._serverZoneOffset = WDate.apiZoneToOffset(apiZone);
            this._setServerTime(time + (new Date().getTimezoneOffset() - this._serverZoneOffset ) * 60 * 1000);
        } else {
            this.initByLocalTime();
        }
        return WDate.getInstance();
    }

    /**
     * 将时间转化为接口标准定义的UTC时间字符串
     *
     * 转化规则：setServerTimeByApiStr()的反过程，也就是本地东八区12:00 --> 服务器东九区12:00 -> 服务器UTC时间3:00
     *
     * @author jia.lin
     */
    static getApiStr(time, zoneOffset) {
        const tmp = time + (zoneOffset - new Date().getTimezoneOffset()) * 60 * 1000;
        return dateformat(tmp, "yyyymmdd\'T\'HH:MM:sso", true);
    }

    getApiStr() {
        if (this._serverTime === null) {
            return "";
        }
        return WDate.getApiStr(this._serverTime, this._serverZoneOffset);
    }

    getServerTime() {
        return this._serverTime;
    }

    _setServerTime(serverTime) {
        this._serverTime = serverTime;
        this._timeDifference = this._serverTime - Date.now();
        return WDate.getInstance();
    }

    /**
     *
     * @returns {number}
     * @author jia.lin
     */
    getServerZoneOffset() {
        return this._serverZoneOffset;
    }

    /**
     * 设置服务器zoneOffset
     *
     * @param newZoneOffset
     * @author jia.lin
     */
    setServerZoneOffset(newZoneOffset) {
        if (this._serverTime !== null && this._serverZoneOffset !== newZoneOffset) {
            this._serverTime = this._serverTime + (this._serverZoneOffset - newZoneOffset) * 60 * 1000;
            this._serverZoneOffset = newZoneOffset;
            this._timeDifference = this._serverTime - Date.now();
        }
        return WDate.getInstance();
    }

    /**
     * 更新时间
     *
     * 原理：之前设置this.serverTime时，会记录它与本地时间的时间差，现在只需要重新获取本地时间并与差值比较，即可更新时间
     * 注意：不采用内部变量递增方式更新时间，是因为网页线程可能会受影响，长时间后会产生较大的误差
     *
     * @author jia.lin
     */
    updateTime() {
        if (this._serverTime !== null) {
            this._serverTime = Date.now() + this._timeDifference;
        }
        return WDate.getInstance();
    }

    format(...param) {
        if (this._serverTime === null) {
            return "";
        }
        return dateformat(new Date(this._serverTime), ...param);
    }

    formatByLang(lang) {
        if (lang === "zh_CN") {
            return this.format("yyyy/mm/dd HH:MM:ss");
        } else {
            return this.format("mmm. ddS, yyyy HH:MM:ss");
        }
    }
}