//1.all
// 如果数组所有元素满足函数条件，则返回true
//every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。

const { retry } = require("async");
const { reverse } = require("dns");

//fn = Boolean ;声明fn是布尔函数？？
const all = (arr, fn = Boolean) => arr.every(fn)
all([4,2,5],x=>x>1)
all([4,1,5],x=>x>1)

// 2.allEqual
// 判断数组中的元素是否都相等
const allEqual = arr => arr.every(val => val === arr[0])
allEqual([1,2,3,4,5]);
allEqual([1,1,1,1,1])

// 3.approximatelyEqual
// 检查两个数字是否近似相等
const approximatelyEqual = (v1, v2, epsilon) => Math.abs(v1 - v2) < epsilon
approximatelyEqual(Math.PI / 2.0, 1.5708,0.01)

// 4.arrayToCSV
// 将没有逗号或双引号的元素转换成带有逗号分隔符的字符串；即CSV格式识别的形式
// 只能弄两层
// `"${x}"`  模板字符串，ES2015新增的符号。
const arrayToCSV = (arr, delimiter = ',') => arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');
arrayToCSV([['a','b'],['c','d']])

// 5.arrayToHtmlList
// 将数组转化为li标记
const arrayToHtmlList = (arr, listID) => (
  el=>(
    (el=document.querySelector('#'+ listID)),
    (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(''))
))();
arrayToHtmlList(['item1','item2'], 'myListID')

//6.attempt
// 执行一个函数，将剩余的参数传回函数当参数
// 返回响应的结果，并能捕获异常
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  }catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};
//test
var elements = attempt(function(selector){ return document.querySelectorAll(selector);},'>_>');
if (elements instanceof Error) elements = [];

// 7.average
// 返回两个或多个数的平均数
// reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
// (...nums)  ES6展开语法
const average = (...nums) => nums.reduce((acc, val) => acc + val, 0)/nums.length
average(...[1,2,3]);
average(1,2,3);

//8.averageBy
// 此函数通过map()将对象转换成数组,再调用reduce()函数进行累加，然后根据数组长度返回平均值
const averageBy =(arr,fn) => arr.map(typeof fn === 'function'?fn:val=>val[fn]).reduce(
  (acc, val) =>  acc + val,0) / arr.length;
averageBy([{n:4},{n:2},{n:8},{n:6}],o => o.n);
averageBy([{n:4},{n:2},{n:8},{n:6}],'n');

// 9.bifurcate  ？？？
// 此函数包含两个参数，类型都为数组，依据第二参数的真假条件,将一个参数的数组进行分组，条件为真的放入第一个数组，其他的放入第二个数组
// reduce() 方法将数组缩减为单个值。
// reduce() 方法为数组的每个值（从左到右）执行提供的函数。
const bifurcate = (arr, filter) => arr.reduce(
  (acc, val, i) => (acc[filter[i] ? 0:1].push(val),acc),[[],[]]
);

bifurcate(['beep','boop','foo'],[true,true,true]);

// 10.bifurcateBy  ？？？
// 此函数将数组按照指定的函数逻辑进行分组，满足函数条件的逻辑为真，放入第一个数组，其他的不满足的放入第二个数组
// reduce() 方法将数组缩减为单个值。
// reduce() 方法为数组的每个值（从左到右）执行提供的函数。
const bifurcateBy = (arr, fn) => arr.reduce(
  (acc, val, i) => (acc[fn(val, i) ? 0:1].push(val),acc),[[],[]]
);

bifurcateBy(['beep','boop','foo'],x => x[0]=== 'b');

// 11.bottomVisible
// 用于检测页面是否滚动到页面底部
const bottomVisible = () => document.documentElement.clientHeight + window.scrollY >= 
 (document.documentElement.scrollHeight || document.documentElement.clientHeight);

 bottomVisible();

//  12.byteSize
// 此代码返回字符串的字节长度
// Blob对象代表一段二进制数据，提供了一系列操作接口。其他API都是建立在BLOB对象基础上的，继承他的属性和方法
 const byteSize = str => new Blob([str]).size;
 byteSize('');
 byteSize('Hello World');

//  13.captitalize
// 将字符串的首字母转换为大写
const captitalize = ([first,...rest]) => first.toUpperCase() + rest.join('');
captitalize("animal");
captitalize("animal",true);

// 14.captitalizeEveryWord
// 将一个句子中的每个单词首字母转换成大写字母
// 运用正则表达式替换
const captitalizeEveryWord = str => str.replace(/\b[a-z]/g,char => char.toUpperCase());
captitalizeEveryWord('hello world!')

// 15.castArray
// 将非数值对象转换为数组对象
const castArray = val =>(Array.isArray(val) ? val:[val]);
castArray('foo');
castArray([1]);

// 16.compact
// 将数组中移除值为false的内容
const compact = arr => arr.filter(Boolean);
compact([0,1,false,2,'3','e','asd',NaN])

// 17.countOccurrences
// 统计数组中某个值出现的次数
const countOccurrences = (arr,val) =>arr.reduce((a,v) => (v===val ? a+1:a),0);
countOccurrences([1,2,2,3,3,3],3)

// 18.Create Directory
// 此代码使用exitSync()检查目录是否存在,然后使用mkdirSync创建目录
// 运行在node环境里
const fs = require('fs');
const { isArray } = require("util");
const createDirIfNotExists = dir => (!fs.existsSync(dir)?fs.mkdirSync(dir):undefined);
createDirIfNotExists('test')

// 19.currentURL
// 返回当前访问的URL地址
const currentURL = () => window.location.href;
currentURL();

// 20.dayOfYear
// 返回当前是今年的第几天

const dayOfYear = date => Math.floor((date -new Date(date.getFullYear(),0,0))/1000/60/60/24)
dayOfYear(new Date());

// 21.将字符串的首字母转换成小写字母
const decaptitalize = ([first,...rest]) => first.toLowerCase() + rest.join('');
decaptitalize("FFoobar")

// 22.deepFlatten
// 通过递归的形式，将多维数组展平成一位数组
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v)?deepFlatten(v):v)));
deepFlatten([1,2,3,[1,2,[2,3,[3,4]]]])

// 23.defaults
// 如果对象中含有重复的属性，以前面的为准
// Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
// Object.assign(target, ...sources)  
// ???  reverse
const defaults = (obj,...defs) => Object.assign({},obj,...defs.reverse(),obj);
defaults({a:1},{b:2},{b:6},{c:3},{a:2})

// 24.defer
// 延迟函数的调用，即异步调用函数
// setTimeout() 是属于 window 的方法，该方法用于在指定的毫秒数后调用函数或计算表达式。
// setTimeout(要执行的代码, 等待的毫秒数)
const defer =(fn,...args) =>setTimeout(fn,1,...args);
defer(console.log,'a'),console.log('b')

// 25.degreesToRads
// 将标准的度数转换为弧度
const degreesToRads = deg => (deg*Math.PI) / 180.0;
degreesToRads(90.0)

// 26.difference
// 此代码查找两个给定数组的差异,找出前者数组不在后者数组中不存在的元素
// filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
const difference = (a,b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
difference([1,2,3],[1,2,4])

// 27.differenceBy
// 通过给定的函数来处理需要对比差异的数组,找出前者数组在后者数组中不存在的元素
// map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
// Math.floor() 返回小于或等于一个给定数字的最大整数。
const differenceBy = (a,b,fn) =>{
  const s = new Set(b.map(fn));
  return a.filter(x => !s.has(fn(x)));
};
differenceBy([2.1,1.2],[2.3,2.4],Math.floor);
differenceBy([{x:2},{x:1}],[{x:1}],v => v.x)

// 28.differenceWith
// 按照给定函数逻辑筛选需要对比差异的数组,找出前者数组在后者数组中不存在的元素
const differenceWith = (arr,val,comp) => arr.filter(a => val.findIndex(b =>comp(a,b)) === -1);
differenceWith ([1,1.2,1.5,3,0],[1.9,3,0],(a, b) => Math.round(a) === Math.round(b))

// 29.digitize
// 将输入的数字拆分成单个数字组成的数组
const digitize = n =>[...`${n}`].map(i => parseInt(i));
digitize(432)

// 30.distance
// 计算两点之间距离
// Math.hypot() 函数返回所有参数的平方和的平方根，即：
const distance = (x0,y0,x1,y1) => Math.hypot(x1-x0,y1-y0);
distance(1,1,2,2)

//31.drop
// 将给定的数组从左边开始删除n个元素
const drop = (arr,n=1) => arr.slice(n);
drop([1,2,3,4,5,6],3)

// 32.dropRight
// 将给定的数组从右边开始删除n个元素
const drop = (arr,n=1) => arr.slice(0,-n);
drop([1,2,3,4,5,6],3)

// 33. dropRightWhile
// 将给定的数组按照给定的函数条件从右开始删除,直到当前元素满足函数条件为True时，停止删除，并返回剩余元素。
const dropRightWhile = (arr, func) =>{
  while (arr.length >0 && !func(arr[arr.length - 1]))
    arr = arr.slice(0, -1);
    return arr;
}

dropRightWhile([1,2,3,4], n => n<3 )

// 34.dropWhile
// 按给定的函数条件筛选数组，不满足函数条件的将从数组中移除
const dropWhile = (arr, func) => {
  while(arr.length >0 && !func(arr[0]))
  arr = arr.slice(1);
  return arr;
};
dropWhile([1,2,3,4],n => n>=  3)

// 35.elementContains
// 接收两个DOM元素对象参数，判断后者是否是前者的子元素
const elementContains = (parent,child) => parent !== child && parent.contains(child)

elementContains(document.querySelector('head'),document.querySelector('title'));
elementContains(document.querySelector('body'),document.querySelector('body'));

// 36.filterNonUnique
// 移除数组中重复的元素
const filterNonUnique = arr => [...new Set(arr)];
filterNonUnique([1,2,2,3,3,3])

// 37.findKey
// 按照给定的函数条件，查找第一个满足条件对象的键值
// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
// find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
const findKey = (obj, fn) => Object.keys(obj).find(key => fn(obj[key],key,obj));
findKey({
  barney :{ age:36,active :true},
  fred :{ age:36,active :false},
  pebbles :{ age:1,active :true},
}, o => o['active']);

// 38.findLast
// 按照给定的函数条件筛选数组，将最后一个满足条件的元素进行删除
// filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
// pop() 方法用于删除数组的最后一个元素并返回删除的元素。
const findLast = (arr, fn) => arr.filter(fn).pop();

findLast([1,2,3,4],n=> n%2 ===1)


// 39.flatten
// 按照指定数组的深度，将嵌套数组进行展平\
// concat() 方法用于连接两个或多个数组。
// 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
const flatten = (arr,depth =1) => arr.reduce((a,v) => a.concat(depth >1 && Array.isArray(v)? flatten(v,depth-1):v),[]);
flatten([1,[2],3,4])
flatten([1,[2,[3,4],5,6],7],2)

// 40.forEachRight
// 按照给定的函数条件，从数组的右边往左依次进行执行
const forEachRight = (arr,callback) => arr.slice(0).reverse().forEach(callback);
forEachRight([1,2,3,4],val=> console.log(val))


// 41.forOwn
// 按照给定函数条件，支持三个参数作为输入（键、值、对象），进行迭代对象。
const forOwn = (obj,fn) => Object.keys(obj).forEach(key => fn(obj[key],key,obj));
forOwn({foo:'bar',a:1},v => console.log(v));

// 42.functionName
此段代码输出函数的名称
const functionName = fn => (console.debug(fn,name),fn);
functionName(Math.max)

// 43.getColonTimeFromDate
// 从日期对象里获取当前时间
const getColonTimeFromDate = date => date.toTimeString().slice(0,8)
getColonTimeFromDate(new Date());

// 44.getDaysDiffBetweenDates
// 返回两个日期之间相差多少天
const getDaysDiffBetweenDates = (dateInitial,dateFinal) => (dateFinal - dateInitial)/(1000*3600*24);
getDaysDiffBetweenDates(new Date('2020-01-01'),new Date('2020-01-10'))

// 45.getStyle
// 返回dom元素节点对应的属性值
const getStyle = (el,ruleName) => getComputedStyle(el)[ruleName];
getStyle(document.querySelector('p'),'font-size')

// 46.getType
// 返回数据类型
const getType = v => v === undefined ? 'undefined' : v === null ? 'null':v.constructor.name.toLowerCase();
getType(new Set([1,2,3]));

// 47.hasClass
// 返回Dom元素是否包含指定的Class样式
const hasClass = (el,className) => el.classList.contains(className);
hasClass(document.querySelector('p'),'btn-tx')

// 48.head
// 输出数组的第一个元素
const head = arr => arr[0]
head([1,2,3,4])

// 49.hide
// 隐藏指定的Dom元素
const hide = (el) => Array.from(el).forEach(e => (e.style.display = 'none'));
hide(document.querySelectorAll('img'))

// 50.httpsRedirect 
// 将http网址，重新定向为https网址
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://'+location.href.split('//')[1]);
}
httpsRedirect();

// 51.indexOfAll
// 返回数组中某个值对应的所有索引值
const indexOfAll = (arr, val) => arr.reduce ((acc,el,i) => (el === val?[...acc,i]:acc),[]);
indexOfAll([1,2,3,1,2,3],1)

// 52.inital
// 返回数组中除最后一个元素的所有元素
const initial = arr => arr.slice(0,-1);
initial([1,2,3])

// 53.insertAfter
// 在给定的DOM节点后插入新的节点内容
const insertAfter =(el,htmlString) => el.insertAdjacentHTML('afterend',htmlString);
insertAfter(document.getElementById(''),'<p>after</p>');

// 54.insertBefore
// 在给定的DOM节点前插入新的节点内容
const insertBefore =(el,htmlString) => el.insertAdjacentHTML('beforebegin',htmlString);
insertAfter(document.getElementById(''),'<p>before</p>');

// 55.intersection
// 返回两个数组元素之间的交集
const intersectionBy = (a,b,fn) => {
  const s = new Set(b);
  return a.filter(x => s.has(x))};
intersectionBy([2.1,1.2,3.4],[2.3,2.1,3.4])


// 56.intersectionBy
// 按照给定的函数处理需要对比的数组元素，然后根据处理后的数组找出交集，最后从第一个数组中将对应的元素输出。
const intersectionBy = (a,b,fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => s.has(fn(x)))};
intersectionBy([2.1,1.2],[2.3,3.4],Math.floor)

// 57.intersectionWith
// 按照给定的函数对比两个数组的差异，然后找出交集，最后从第一个数组中将对应的元素输出。
const intersectionWith = (a,b,comp) =>a.filter(x=>b.findIndex(y=>comp(x,y)) !== -1)
intersectionWith([1,1.2,1.3,3.6,3],[1.9,3,0,3.9],(a,b)=>Math.round(a)===Math.round(b))

// 58.is
// 此代码用于判断数据是否为指定的数据类型
const is= (type,val) => ![,null].includes(val)&& val.constructor === type;
is(Array,[1]);
is(ArrayBuffer,new ArrayBuffer());
is(Map,new Map());
is(RegExp,/./g);
is(Set,new Set());
is(WeakMap,new WeakMap());
is(WeakSet,new WeakSet());s
is(String,'');
is(String,new String(''));
is(Number,1);
is(Number,new Number(1))
is(Boolean,true)
is(Boolean,new Boolean(true))

// 59.isAfterDate
// 判断前者的日期是否晚于后者的日期
const isAfterDate = (dateA,dateB) => dateA>dateB
isAfterDate(new Date('2021-02-02'),new Date('2021-02-01'))

// 60.isAnagram
// 用于检测两个单词是否相似
const isAnagram = (str1,str2) => {
  const normalize = str => 
  str.toLowerCase()
     .replace(/[^a-z0-9]/gi,'')
     .split('')
     .join('');
     return normalize(str1) === normalize(str2)
};
 isAnagram('iceman','cinema')

// 61.isArrayLike
// 检测对象是否为类数组对象，是否可迭代
// 其实他的构造函数是Object，只不过这个对象的key值是0,1…写出来之后类似数组的下标，所以叫类数组。
const isArrayLike = obj => obj !=null&& typeof obj[Symbol.iterator === 'function']
isArrayLike(document.querySelectorAll('.className'));
isArrayLike('abc');
isArrayLike(null)


// 62.isBeforeDate
// 接受两个日期类型的参数，判断前者的日期是否早于后者的日期
const isBeforeDate = (dateA,dateB) => dateA<dateB
isBeforeDate(new Date('2021-02-02'),new Date('2021-02-01'))

// 63.isBoolean
用于检查参数是否为布尔类型
const isBoolean = val => typeof val === 'boolean';
isBoolean(null);
isBoolean(false);




