const formatUtils = {

    // 校验数字输入框格式
    checkNumber(str) {
        let len1 = str.substr(0,1), // 第一位
            len2 = str.substr(1,1); // 第二位
        if(str.length > 1 && len1 == 0 && len2 != '.'){ // 如果第一位是0，第二位不是点，就用数字把点替换掉
            str = str.substr(1,1);
        }
        if(len1 == '.'){ // 第一位不能是.
            str = '';
        }
        if(str.indexOf(".") != -1){ // 限制只能输入一个小数点
            var str_ = str.substr(str.indexOf(".") + 1);
            if(str_.indexOf(".") != -1){
                str = str.substr(0,str.indexOf(".") + str_.indexOf(".") + 1);
            }
        }
        return str;
    },

}

module.exports = methodsUtil