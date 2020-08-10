var cache = {};

// 通过解析Function.prototype.toString()取得参数名
function getParamNames(func) {
    // 正则表达式出自http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript
    var paramNames = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
    paramNames = paramNames.replace(/ /g, '');
    paramNames = paramNames.split(',');
    return paramNames;
}
var injector = {
    // 将func作用域中的this关键字绑定到bind对象上，bind对象可以为空
    resolve: function (func, bind) {
        // 取得参数名
        var paramNames = getParamNames(func);
        var params = [];
        for (var i = 0; i < paramNames.length; i++) {
            // 通过参数名在cache中取出相应的依赖
            params.push(cache[paramNames[i]]);
        }
        // 注入依赖并执行函数
        func.apply(bind, params);
    }
};

function Notebook() { }
Notebook.prototype.printName = function () {
    console.log('this is a notebook');
};

function Pencil() { }
Pencil.prototype.printName = function () {
    console.log('this is a pencil');
};

function Student() { }
Student.prototype.write = function (notebook, pencil) {
    if (!notebook || !pencil) {
        throw new Error('Dependencies not provided!');
    }
    console.log('writing...');
};
// 提供notebook依赖
cache['notebook'] = new Notebook();
// 提供pencil依赖
cache['pencil'] = new Pencil();
var student = new Student();
injector.resolve(student.write, student); 