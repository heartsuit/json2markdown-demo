const fs = require('fs');
const jsonFile = './file/input.json';
const jsonObj = JSON.parse(fs.readFileSync(jsonFile));
const util = require("./utils/util");

// console.log(jsonObj.length);

// 选取属性进行组装
let temp = [];
for (let book of jsonObj) {
    temp.push({ "seperate": '' });

    let image = { img: { "alt": book.image, "source": book.image } };
    let title = { "h3": (book.title + ((book.subtitle.length != 0) ? (":" + book.subtitle) : book.subtitle)) };
    let note = { "ul": book.note };

    temp.push(title);

    if (book.image) {
        temp.push(image);
    }
    temp.push({
        "p": "作者：" + book.author.map(x => {
            return `${x.name}[${x.nationality}]`;
        }).toString()
    });
    if (book.isbn13) {
        temp.push({ "p": "ISBN：" + book.isbn13 });
    }
    if (book.publisher) {
        temp.push({ "p": "出版社：" + book.publisher });
    }
    if (book.pubdate) {
        temp.push({ "p": "出版日期：" + util.formatDate(new Date(book.pubdate)) });
    }
    if (book.tags.length > 0) {
        temp.push({ "p": "图书标签：" });
        temp.push({ "backquote": book.tags });
    }

    if (book.douban) {
        temp.push({ "p": "豆瓣地址：" });
        temp.push({ "link": { "title": book.douban, "source": book.douban } });
    }

    temp.push({ "p": "阅读日期：" + util.formatDate(new Date(book.read)) });

    if (book.note.length > 0) {
        temp.push({ "p": "读书笔记" });
        temp.push(note);
    }
}

// console.log(temp);

// 生成中间文件
util.writeToFile('./file/temp.json', JSON.stringify(temp));