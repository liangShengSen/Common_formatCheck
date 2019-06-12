// 获取地址栏参数，兼容中文
export function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
// 清空字符串两边指定字符
export const tirmString = (str, char, type) => { // str:需要被清除的字符串；char:需要清除的字符；type:清除字符串左边还是右边
    if (char) {
        if (type == 'left') {
            return str.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type == 'right') {
            return str.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return str.replace(/^\s+|\s+$/g, ''); // 清除空格
}
// 返回顶部
export const scrollTop = (number = 0, time) => { // number:距离顶部距离；time:回到顶部的时间
    if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number;
        return number;
    }
    const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime; // 计算循环的次数
    let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
            spacingInex--;
            scrollTop(nowTop += everTop);
        } else {
            clearInterval(scrollTimer); // 清除计时器
        }
    }, spacingTime);
};
// 获取对象中某个值,不存在返回null
export const getValue = (i,k,d) => {
    if (typeof d === 'undefined') { d = null; }
    if (!k) return i;
    var s = k.split('.');
    var o = i;
    for(var x = 0;x < s.length; x++){
        if (null !== o && o.hasOwnProperty(s[x])){
            o = o[s[x]];
        }else{
            return d;
        }
    }
    return o;
};
// 根据key获取cookie的value
export const getCookie = (c_name) => {
    if (document.cookie.length > 0){
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1){
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";",c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return null;
};
// 设置cookie
export const setCookie = (c_name,value,expiredays) => {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toUTCString())
}