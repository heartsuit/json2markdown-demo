const fs = require('fs');

module.exports = {
  /**
   * 读取文件
   * @param {文件路径} filePath 
   */
  readFromFile: function (filePath) {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, bytesRead) => {
          if (err) {
            reject(err);
          } else {
            resolve(bytesRead);
          }
        })
      } catch (err) {
        reject(err);
      }
    })
  },

  /**
   * 写入文件
   * @param {文件路径} filePath 
   * @param {待写入的数据} data 
   */
  writeToFile: function (filePath, data) {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile(filePath, data, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);// must resolve here, otherwise this funciton will be blocked
          }
        });
      } catch (err) {
        reject(err);
      }
    })
  },

  /**
   * 日期格式化
   * @param {日期} date 
   */
  formatDate: function (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return [year, month, day].map(this.formatNumber).join('-');
  },

  /**
   * 数字格式化
   * @param {数字} n 
   */
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}
