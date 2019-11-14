/*
* 创建时间: 2019/11/4
* 作者: JiuMu
* 名称: 常用WEB页面JavaScript工具
* 简介: 正则验证,时间戳转换
* */
const [ymdhmss,ymdhms, ymdhm, ymdh, ymd, ym, y] = [`yyyy-MM-dd HH:mm:ss:sss`, `yyyy-MM-dd HH:mm:ss`, `yyyy-MM-dd HH:mm`, `yyyy-MM-dd HH`, `yyyy-MM-dd`, `yyyy-MM`, `yyyy`];
let exps = new Map();
(() => {
    /*
    * 1. 匹配中文字符
    * ^[\u4e00-\u9fa5]*$
    * */
    exps.set(0, `^[\u4e00-\u9fa5]*$`);
    /*
    * 2. 匹配Email地址
    * [\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?
    * */
    exps.set(1, `[\\w!#$%&'*+/=?^_\`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_\`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?`);
    /*
    * 3. 匹配网址URL
    * [a-zA-z]+://[^\s]*
    * */
    exps.set(2, `[a-zA-z]+://[^\\s]*`);
    /*
    * 4. 匹配国内电话号码
    * \d{3}-\d{8}|\d{4}-\{7,8}
    * */
    exps.set(3, `\\d{3}-\\d{8}|\\d{4}-\\{7,8}`);
    /*
    * 5. 匹配腾讯QQ号
    * [1-9][0-9]{4,}
    * */
    exps.set(4, `[1-9][0-9]{4,}`);
    /*
    * 6. 匹配中国邮政编码
    * [1-9]\d{5}(?!\d)
    * */
    exps.set(5, `[1-9]\\d{5}(?!\\d)`);
    /*
    * 7. 匹配18位身份证号
    * ^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$
    * */
    exps.set(6, `^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$`);
    /*
    * 8. 匹配日期格式(年-月-日)
    * ^[2-9]\d{3}\-(0{1}[1-9]|1{1}[0-2])\-(0{1}[1-9]|[1-2]{1}\d|3{1}[0-1]{1})$
    * */
    exps.set(7, `^[2-9]\\d{3}\\-(0{1}[1-9]|1{1}[0-2])\\-(0{1}[1-9]|[1-2]{1}\\d|3{1}[0-1]{1})$`);
    /*
    * 9. 匹配日期格式(年/月/日)
    * ^[2-9]\d{3}\/(0{1}[1-9]|1{1}[0-2])\/(0{1}[1-9]|[1-2]{1}\d|3{1}[0-1]{1})$
    * */
    exps.set(8, `^[2-9]\\d{3}\\/(0{1}[1-9]|1{1}[0-2])\\/(0{1}[1-9]|[1-2]{1}\\d|3{1}[0-1]{1})$`);
    /*
    * 10. 匹配日期格式(年:月:日)
    * ^[2-9]\d{3}:(0{1}[1-9]|1{1}[0-2]):(0{1}[1-9]|[1-2]{1}\d|3{1}[0-1]{1})$
    * */
    exps.set(9, `^[2-9]\\d{3}:(0{1}[1-9]|1{1}[0-2]):(0{1}[1-9]|[1-2]{1}\\d|3{1}[0-1]{1})$`);
    /*
    * 11. 匹配日期格式(年-月-日 时:分:秒)
    * ^[2-9]\d{3}\-(0{1}[1-9]|1{1}[0-2])\-(0{1}[1-9]|[1-2]{1}\d|3{1}[0-1]{1})\s([0-1]{1}\d|2{1}[0-3])(:[0-5]{1}\d){2}$
    * */
    exps.set(10, `^[2-9]\\d{3}\\-(0{1}[1-9]|1{1}[0-2])\\-(0{1}[1-9]|[1-2]{1}\\d|3{1}[0-1]{1})\\s([0-1]{1}\\d|2{1}[0-3])(:[0-5]{1}\\d){2}$`);
    /*
    * 12. 匹配日期格式(年/月/日 时:分:秒)
    * ^[2-9]\d{3}\/(0{1}[1-9]|1{1}[0-2])\/(0{1}[1-9]|[1-2]{1}\d|3{1}[0-1]{1})\s([0-1]{1}\d|2{1}[0-3])(:[0-5]{1}\d){2}$
    * */
    exps.set(11, `^[2-9]\\d{3}\\/(0{1}[1-9]|1{1}[0-2])\\/(0{1}[1-9]|[1-2]{1}\\d|3{1}[0-1]{1})\\s([0-1]{1}\\d|2{1}[0-3])(:[0-5]{1}\\d){2}$`);
    /*
    * 13. 匹配日期格式(年-月-日 时:分:秒:毫秒)
    * ^[2-9]\d{3}\-(0{1}[1-9]|1{1}[0-2])\-(0{1}[1-9]|[1-2]{1}\d|3{1}[0-1]{1})\s([0-1]{1}\d|2{1}[0-3])(:[0-5]{1}\d){2}:\d{3}$
    * */
    exps.set(12, `^[2-9]\\d{3}\\-(0{1}[1-9]|1{1}[0-2])\\-(0{1}[1-9]|[1-2]{1}\\d|3{1}[0-1]{1})\\s([0-1]{1}\\d|2{1}[0-3])(:[0-5]{1}\\d){2}:\\d{3}$`);
    /*
    * 14. 匹配日期格式(年/月/日 时:分:秒:毫秒)
    * ^[2-9]\d{3}\/(0{1}[1-9]|1{1}[0-2])\/(0{1}[1-9]|[1-2]{1}\d|3{1}[0-1]{1})\s([0-1]{1}\d|2{1}[0-3])(:[0-5]{1}\d){2}:\d{3}$
    * */
    exps.set(13, `^[2-9]\\d{3}\\/(0{1}[1-9]|1{1}[0-2])\\/(0{1}[1-9]|[1-2]{1}\\d|3{1}[0-1]{1})\\s([0-1]{1}\\d|2{1}[0-3])(:[0-5]{1}\\d){2}:\\d{3}$`);
    /*
    * 15. 匹配文本值只允许中文,字母,数字,下划线
    * [\u4e00-\u9fa5\w]
    * */
    exps.set(14, `^[\u4e00-\u9fa5\\w]$`);
    /*
    * 15. 匹配字符串中含有-字符
    *
    * */
    exps.set(15, `-`);
})();

/* ---------------正则校验工具--------------- */
export class Regular {
    doms = new Array();
    type = -1;
    expression = ``;
    constructor() {}
    match(target) {
        let reg;
        if (this.type !== -1) this.expression = exps.get(this.type);
        if (this.expression) new Error(`expression is empty.`);
        reg = new RegExp(this.expression);
        if (target) {
            return reg.test(target);
        } else {
            for (let value of this.doms) {
                let dom = document.getElementById(value);
                console.log(dom.value);
                if (!reg.test(dom.value)) return false;
            }
            return true;
        }
    }
    set doms(value) {
        this.doms = value;
    }
    get doms() {
        return this.doms;
    }
    set type(value) {
        this.type = value;
    }
    set expression(value) {
        this.expression = value;
    }
    get expression() {
        return this.expression;
    }
}

/* ---------------时间转换工具--------------- */
export class Datetime {
    #year;
    #month;
    #day;
    #hour;
    #minute;
    #second;
    #millisecond;
    #date = new Date();
    constructor(type) {
        this.type = type;
    }
    init() {
        this.year = this.#date;
        this.mon = this.#date;
        this.day = this.#date;
        this.hour = this.#date;
        this.minute = this.#date;
        this.second = this.#date;
        this.millisecond = this.#date;
    }
    format(target) {
        if (target) {
            if (typeof target === `number`) {
                if (this.type) {
                    this.#date.setTime(target);
                    return this.choose();
                } else {
                    throw new Error(`type value is empty.`);
                }
            } else if (typeof target === `string`) {
                target.replace(exps.get(15), `-`);
                return new Date(target).getTime();
            } else {
                throw new Error(`target type of data is error.`);
            }
        } else {
            throw new Error(`target value is empty.`);
        }
    }
    choose() {
        this.init();
        switch (this.type) {
            case y : {
                return this.year;
            }
            case ym : {
                return this.year + `-` + this.mon;
            }
            case ymd : {
                return this.year + `-` + this.mon + `-` + this.day;
            }
            case ymdh : {
                return this.year + `-` + this.mon + `-` + this.day + ` ` + this.hour;
            }
            case ymdhm : {
                return this.year + `-` + this.mon + `-` + this.day + ` ` + this.hour + `:` + this.minute;
            }
            case ymdhms : {
                return this.year + `-` + this.mon + `-` + this.day + ` ` + this.hour + `:` + this.minute + `:` + this.second;
            }
            case ymdhmss : {
                return this.year + `-` + this.mon + `-` + this.day + ` ` + this.hour + `:` + this.minute + `:` + this.second + `:` + this.millisecond;
            }
            default : {
                return this.type;
            }
        }
    }
    set year(date) {
        this.#year = date.getFullYear();
    }
    get year() {
        return this.#year;
    }
    set mon(date) {
        this.#month = date.getMonth() + 1;
    }
    get mon() {
        if (this.#month < 10) {
            this.#month = `0` + this.#month;
        }
        return this.#month;
    }
    set day(date) {
        this.#day = date.getDate();
    }
    get day() {
        if (this.#day < 10) {
            this.#day = `0` + this.#day;
        }
        return this.#day;
    }
    set hour(date) {
        this.#hour = date.getHours();
    }
    get hour() {
        if (this.#hour < 10) {
            this.#hour = `0` + this.#hour;
        }
        return this.#hour;
    }
    set minute(date) {
        this.#minute = date.getMinutes();
    }
    get minute() {
        if (this.#minute < 10) {
            this.#minute = `0` + this.#minute;
        }
        return this.#minute;
    }
    set second(date) {
        this.#second = date.getSeconds();
    }
    get second() {
        if (this.#second < 10) {
            this.#second = `0` + this.#second;
        }
        return this.#second;
    }
    set millisecond(date) {
        this.#millisecond = date.getMilliseconds();
    }
    get millisecond() {
        return this.#millisecond;
    }
}