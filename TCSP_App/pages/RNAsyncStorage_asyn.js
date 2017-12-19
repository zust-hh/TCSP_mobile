let aaa = require('./RNAsyncStorage');
let storage = aaa.storage;

ssss = {
  // sync方法的名字必须和所存数据的key完全相同
  // 方法接受的参数为一整个object，所有参数从object中解构取出
  // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  user(params) {
  }
};
//导出ssss
exports.ssss = ssss;
