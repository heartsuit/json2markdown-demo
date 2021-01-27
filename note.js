const fs = require('fs');
const jsonFile = './file/temp.json';
const jsonObj = JSON.parse(fs.readFileSync(jsonFile));
const json2md = require("json2md");
const util = require("./utils/util");

// 自定义转换：反引号
json2md.converters.backquote = function (input, json2md) {
    // return "`" + input + "`";
    if (input instanceof Array) {
        return input.map(x => `\`${x}\``);
    } else {
        return `\`${input}\``;
    }
}

// 自定义转换：超链接
json2md.converters.link = function (input, json2md) {
    return `[${input.title}](${input.source})`;
}

// 自定义转换：分割线
json2md.converters.seperate = function (input, json2md) {
    return `---`;
}

// 执行转换
let result = json2md(jsonObj);

// console.log(result);

// 输出结果
util.writeToFile('./file/output.md', result);