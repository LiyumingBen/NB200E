import T from "../Lang/T";

function getObjFromSecond(totalSecond) {
    let countSecond = totalSecond;
    // 获取到秒
    let second = countSecond % 60;
    let minute = 0;
    let hour = 0;
    let day = 0;

    countSecond -= second;

    // 获取到分钟
    if (countSecond > 0) {
        minute = (countSecond / 60) % 60;
        countSecond -= minute * 60;
    }

    // 获取到小时
    if (countSecond > 0) {
        hour = (countSecond / 60 / 60) % 24;
        countSecond -= hour * 60 * 60;
    }

    // 获取到天
    if (countSecond > 0) {
        day = countSecond / 60 / 60 / 24;
    }

    return {
        day,
        hour,
        minute,
        second
    }
}

function getStrFromSecond(totalSecond, space, clearSecond) {
    const obj = getObjFromSecond(totalSecond);
    space = typeof space === "undefined" ? "" : space;
    clearSecond = typeof clearSecond === "undefined" ? false : clearSecond;

    let str = "";

    if (obj.day > 0) {
        str += obj.day + T.T_Time_Day + space;
        str += obj.hour + T.T_Time_Hour + space;
        str += obj.minute + T.T_Time_Minute + space;
        if (!clearSecond) {
            str += obj.second + T.T_Time_Second;
        }
    } else if (obj.hour > 0) {
        str += obj.hour + T.T_Time_Hour + space;
        str += obj.minute + T.T_Time_Minute + space;
        if (!clearSecond) {
            str += obj.second + T.T_Time_Second;
        }
    } else if (obj.minute > 0) {
        str += obj.minute + T.T_Time_Minute + space;
        if (!clearSecond) {
            str += obj.second + T.T_Time_Second;
        }
    } else {
        str += obj.second + T.T_Time_Second;
    }

    return str;
}

function getDayFromSecond(data, modifier, clearsecond) {
    if (isNaN(Number(data))) return '';
    data = parseInt(data);
    let units = [T.T_Time_Second, T.T_Time_Minute, T.T_Time_Hour, T.T_Time_Day];
    let unitsPow = [60, 60, 60, 24];
    let curunitindex = 0;
    let str = '';
    while (curunitindex < units.length) {
        if (data < unitsPow[curunitindex + 1] || ( units.length - 1 === curunitindex)) {
            str = data + units[curunitindex] + str;
            break;
        }
        let per = unitsPow[curunitindex + 1];
        str = (modifier || '') + parseInt(data % per) + units[curunitindex] + str;
        data = parseInt(data / per);
        curunitindex++;
    }

    if (clearsecond) {
        let data = str.split(' ');
        let newdata = [];
        let newstr = '';
        for (let i = 0; i < data.length - 1; i++) {
            newdata.push(data[i]);
            newstr += newdata[i] + ' ';
        }
        return newstr;
    }
    else {
        return str;
    }
}


/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
function secondToDate(s) {
    let t;

    if (s > -1) {
        let hour = Math.floor(s / 3600);
        let min = Math.floor(s / 60) % 60;
        let sec = s % 60;
        if (hour < 10) {
            t = '0' + hour + ":";
        } else {
            t = hour + ":";
        }

        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec.toFixed(0);
    }
    return t;
}


/**
 * 时间转为秒
 * @param time 时间(00:00:00)
 * @returns {string} 时间戳（单位：秒）
 */

function DateToSecond(time) {
    let s = '';

    let hour = time.split(':')[0];
    let min = time.split(':')[1];
    let sec = time.split(':')[2];

    s = Number(hour*3600) + Number(min*60) + Number(sec);

    return s;
}
const Date = {
    getDayFromSecond,
    getStrFromSecond,
    secondToDate,
    DateToSecond
};

export default Date
