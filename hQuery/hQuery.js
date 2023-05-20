(function (window, undefined) {
    let hQuery = function (selector) {
        return new hQuery.prototype.init(selector);
    };
    hQuery.prototype = {
        constructor: hQuery,
        init: function (selector) {
            // 1.传入"", 0, false, NaN, null, undefined等情况时
            if (!selector){
                return this;
            }
            // 2.传入方法时;
            else if (hQuery.isFunction(selector)){
                hQuery.ready(selector);
            }
            // 2.传入字符串时
            else if(hQuery.isString(selector)){
                // 处理传入数据(去掉内容前后空格)
                selector = selector.trim();
                // 判断传入为代码段时
                if (hQuery.isHTML(selector)){
                    let temp = document.createElement("div");
                    temp.innerHTML = selector;
                    /*
                    // 遍历数组,将数据传入hQuery对象;
                    for (let i = 0; i < temp.children.length; i++){
                        this[i] = temp.children[i];
                    }
                    this.length = temp.children.length;
                    */
                    [].push.apply(this, temp.children);
                }
                // 传入为选择器时
                else {
                    let res = document.querySelectorAll(selector);
                    /*
                    // 遍历数组,将数据传入hQuery对象;
                    for (let i = 0; i < res.length; i++){
                        this[i] = res[i];
                    }
                    this.length = res.length;
                    */
                    [].push.apply(this, res);
                }
            }
            // 3.传入数组时
            else if(hQuery.isArray(selector)){
                /*
                // 传入为真数组时;
                if (hQuery.isRealArray(selector)){
                    [].push.apply(this, selector);
                }
                // 传入为伪数组时;
                else {
                    [].push.apply(this, selector);
                }
                */
                [].push.apply(this, selector);
            }
            // 4.传入其他类型时
            else {
                this[0] = selector;
                this.length = 1;
            }
            return this;
        },
        jquery: "0.0.1",
        selector: "",
        length: 0,
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function () {
            return [].slice.call(this);
        },
        get: function (num) {
            if (arguments.length === 0){
                return [].slice.call(this);
            }else if (num >= 0){
                return this[num];
            }else {
                return this[this.length + num];
            }
        },
        eq: function (num) {
            if (arguments.length === 0){
                return new hQuery();
            }else {
                return hQuery(this.get(num));
            }
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        each: function (fn) {
            return hQuery.each(this, fn);
        },
        map: function (fn) {
            return hQuery.map(this, fn);
        }
    };
    hQuery.extend = hQuery.prototype.extend = function (obj) {
        for (let key in obj){
            this[key] = obj[key];
        }
    };
    //工具方法;
    hQuery.extend({
        window: function (win) {
            return win === window;
        },
        isString: function (str) {
            return typeof str === "string";
        },
        isHTML: function (str) {
            return str.charAt(0) === "<" && str.charAt(str.length-1) === ">" && str.length >= 3;
        },
        isObject: function (obj) {
            return typeof obj === "object";
        },
        isArray: function (arr) {
            return hQuery.isObject(arr) && "length" in arr && !hQuery.window(arr);
        },
        isRealArray: function (arr) {
            return Array.isArray(arr);
        },
        isFunction: function (obj) {
            return typeof obj === "function";
        },
        ready: function (fn) {
            if (document.readyState === "complete"){
                fn();
            }else {
                document.addEventListener("DOMContentLoaded", function () {
                    fn();
                });
            }
        },
        each: function (obj, fn) {
            if (hQuery.isArray(obj)){
                for (let i = 0; i < obj.length; i++){
                    // let res = fn(i, obj[i]);
                    let res = fn.call(obj[i], i, obj[i]);
                    if (res === false){
                        break;
                    }
                }
            }else if (hQuery.isObject(obj)){
                for (let key in obj){
                    // let res = fn(key, obj[key]);
                    let res = fn.call(obj[key], key, obj[key]);
                    if (res === false){
                        break;
                    }
                }
            }
            return obj;
        },
        map: function (obj, fn) {
            let res = [];
            if (hQuery.isArray(obj)){
                for (let i = 0; i < obj.length; i++){
                    let temp = fn(i, obj[i]);
                    if (temp){
                        res.push(temp);
                    }
                }
            }else if (hQuery.isObject(obj)){
                for (let key in obj){
                    let temp = fn(key, obj[key]);
                    if (temp){
                        res.push(temp);
                    }
                }
            }
            return res;
        },
        addEvent: function (dom, name, callback) {
            dom.addEventListener(name, callback);
        }
    });
    //DOM操作相关方法;
    hQuery.prototype.extend({
        empty: function () {
            this.each(function (index, value) {
                value.innerHTML = "";
            });
            return this;
        },
        remove: function (sel) {
            if (arguments.length === 0){
                this.each(function (key, value) {
                    let parent = value.parentNode;
                    parent.removeChild(value);
                });
            }else {
                let $this = this.toArray();
                let selector = $(sel).toArray();
                let res = $this.filter(function (ele) {
                    if (selector.indexOf(ele) > -1){
                        return true;
                    }
                });
                $(res).each(function (index, value) {
                    value.parentNode.removeChild(value);
                });
            }
        },
        html: function (content) {
            if (arguments.length === 0){
                return this[0].innerHTML;
            }else {
                this.each(function (index, value) {
                    value.innerHTML = content;
                });
            }
            return this;
        },
        text: function (content) {
            if (arguments.length === 0){
                let res = "";
                this.each(function (key, value) {
                   res += value.innerText + "\n\n";
                });
                return res;
            }else {
                this.each(function (index, value) {
                    value.innerText = content;
                });
            }
            return this;
        },
        appendTo: function (target) {
            let source = this;
            target = $(target);
            let res = [];
            hQuery.each(source, function (key, value) {
                hQuery.each(target, function (k, v) {
                    if (k === 0){
                        v.appendChild(value);
                        res.push(value);
                    }else {
                        let item = value.cloneNode(true);
                        v.appendChild(item);
                        res.push(item);
                    }
                });
            });
            return $(res);
            /*for (let i = 0; i < source.length; i++) {
                let sourceItem = source[i];
                target[0].appendChild(sourceItem);
                for (let j = 1; j < target.length; j++) {
                    let item = sourceItem.cloneNode(true);
                    target[j].appendChild(item);
                }
            }*/
        },
        prependTo: function (target) {
            let source = this;
            target = $(target);
            let res = [];
            hQuery.each(source, function (key, value) {
                hQuery.each(target, function (k, v) {
                    if (k === 0){
                        v.insertBefore(value, v.firstChild);
                        res.push(value);
                    }else {
                        let item = value.cloneNode(true);
                        v.insertBefore(item, v.firstChild);
                        res.push(item);
                    }
                });
            });
            return $(res);
        },
        append: function (sel) {
            if (hQuery.isString(sel)){
                this.each(function (key, value) {
                   value.innerHTML += sel;
                });
            }else {
                $(sel).appendTo(this);
            }
            return this;
        },
        prepend: function (sel) {
            if (hQuery.isString(sel)){
                this.each(function (key, value) {
                    value.innerHTML = sel + value.innerHTML;
                });
            }else {
                $(sel).prependTo(this);
            }
            return this;
        },
        insertBefore: function (sel) {
            let source = this;
            let target = $(sel);
            let res = [];
            hQuery.each(source, function (key, value) {
                hQuery.each(target, function (k, v) {
                    if (k === 0){
                        v.parentNode.insertBefore(value, v);
                        res.push(value);
                    }else {
                        let item = value.cloneNode(true);
                        v.parentNode.insertBefore(item, v);
                        res.push(item);
                    }
                });
            });
            return res;
        },
        replaceAll: function (sel) {
            let source = this;
            let target = $(sel);
            let res = [];
            hQuery.each(source, function (key, value) {
                hQuery.each(target, function (k, v) {
                    if (k === 0){
                        $(value).insertBefore(v);
                        $(v).remove();
                        res.push(value);
                    }else {
                        let item = value.cloneNode(true);
                        $(item).insertBefore(v);
                        $(v).remove();
                        res.push(item);
                    }
                });
            });
            return res;
        },
        clone: function (deep) {
            let res = [];
            if (deep){
                this.each(function (key, ele) {
                    let temp = ele.cloneNode(true);
                    hQuery.each(ele.eventsCache, function (type, callbacks) {
                        hQuery.each(callbacks, function (key, callback) {
                           $(temp).on(type, callback);
                        });
                    });
                    res.push(temp);
                });
            }else {
                this.each(function (key, ele) {
                    let temp = ele.cloneNode(true);
                    res.push(temp);
                });
            }
            return $(res);
        }
    });
    //属性操作相关方法;
    hQuery.prototype.extend({
        attr: function (attr, value) {
            if (hQuery.isString(attr)){
                if (arguments.length === 1){
                    return this[0].getAttribute(attr);
                }else {
                    this.each(function (key, ele) {
                        ele.setAttribute(attr, value);
                    });
                }
            }else if (hQuery.isObject(attr)){
                let $this = this;
                $.each(attr, function (name, value) {
                    $this.each(function (key, ele) {
                        ele.setAttribute(name, value);
                    });
                });
            }
            return this;
        },
        prop: function (attr, value) {
            attr = attr === "class" ? "className" : attr;
            if (hQuery.isString(attr)){
                if (arguments.length === 1){
                    return this[0][attr];
                }else {
                    this.each(function (key, ele) {
                        ele[attr] = value;
                    });
                }
            }else if (hQuery.isObject(attr)){
                let $this = this;
                $.each(attr, function (name, value) {
                    name = name === "class" ? "className" : name;
                    $this.each(function (key, ele) {
                        ele[name] = value;
                    });
                });
            }
            return this;
        },
        css: function (attr, value) {
            if (hQuery.isString(attr)){
                if (arguments.length === 1){
                    return getComputedStyle(this[0])[attr];
                }else {
                    this.each(function (key, ele) {
                        ele.style[attr] = value;
                    });
                }
            }else if (hQuery.isObject(attr)){
                let $this = this;
                $.each(attr, function (name, value) {
                    $this.each(function (key, ele) {
                        ele.style[name] = value;
                    });
                });
            }
            return this;
        },
        val: function (content) {
            if (arguments.length === 0){
                return this[0].value;
            }else {
                this.each(function (key, ele) {
                    ele.value = content;
                });
            }
            return this;
        },
        hasClass: function (content) {
            if (arguments.length === 0){
                return false;
            }else {
                content = " " + content + " ";
                let flag = false;
                this.each(function (key, ele) {
                    let className = " " + ele.className + " ";
                    if (className.indexOf(content) !== -1){
                        flag = true;
                        return false;
                    }
                });
                return flag;
            }
        },
        addClass: function (content) {
            if (arguments.length === 0){
                return this;
            }else {
                let classNames = content.split(" ");
                this.each(function (key, ele) {
                    $.each(classNames, function (l, name) {
                        if (!$(ele).hasClass(name)){
                            ele.className = ele.className + " " + name;
                        }
                    });
                });
                return this;
            }
        },
        removeClass: function (content) {
            if (arguments.length === 0){
                this.each(function (key, value) {
                    value.className = "";
                });
            }else {
                let classNames = content.split(" ");
                this.each(function (key, ele) {
                    $.each(classNames, function (l, name) {
                        if ($(ele).hasClass(name)){
                            let thisName = " " + ele.className + " ";
                            ele.className = thisName.replace(" " + name + " ", " ").replace(/(^\s*)|(\s*$)/g, "");
                        }
                    });
                });
            }
            return this;
        },
        toggleClass: function (content) {
            if (arguments.length === 0){
                this.removeClass();
            }else {
                let classNames = content.split(" ");
                this.each(function (key, ele) {
                    $.each(classNames, function (l, name) {
                        if ($(ele).hasClass(name)){
                            $(ele).removeClass(name);
                        }else {
                            $(ele).addClass(name);
                        }
                    });
                });
            }
            return this;
        }
    });
    hQuery.prototype.extend({
        on: function (name, callback) {
            this.each(function (key, ele) {
                if (!ele.eventsCache){
                    ele.eventsCache = {};
                }
                if (!ele.eventsCache[name]){
                    ele.eventsCache[name] = [];
                    ele.eventsCache[name].push(callback);
                        hQuery.addEvent(ele, name, function (){
                            hQuery.each(ele.eventsCache[name], function (key, method) {
                                method();
                            });
                        }
                    );
                }else {
                    ele.eventsCache[name].push(callback);
                }
            });
            return this;
        },
        off: function (type, callback) {
            if (arguments.length === 0){
                this.each(function (key, ele) {
                    ele.eventsCache = {};
                });
            }else if (arguments.length === 1){
                this.each(function (key, ele) {
                    if (ele.eventsCache){
                        ele.eventsCache[type] = [];
                    }
                });
            }else {
                this.each(function (key, ele) {
                   let index = ele.eventsCache[type].indexOf(callback);
                    ele.eventsCache[type].splice(index, 1);
                });
            }
            return this;
        },
    });
    hQuery.prototype.init.prototype = hQuery.prototype;
    window.hQuery = window.$ = hQuery;
})(window);