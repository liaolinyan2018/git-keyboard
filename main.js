/*1.0 初始化数据*/ 
var hashT = init() /*hashT是一个哈希，其值对也是一个哈希表*/
var hash = hashT['hash']
var keys = hashT['keys']
  
/*2.0 生成键盘*/
generateKeyboard(hash,keys)//用js写html //div自动换行功能//创建div和kbd、kbd内容

/*3.0 监听用户动作*/
listenToUser(hash)

/*4.0 自定义函数工具*/
function init(){
    let keys = {//定义键盘值数组。
                0:{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p','length':10},
                1:{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l','length':9},
                2:{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m','length':7},
                'length': 3
                }
    let hash = { //初始化网站hash表
                'q':'www.qq.com','w':'weibo.com','e':'ele.me','r':'renren.com',
                't':'www.taobao.com','y':'youtube.com','u':'uc.com','i':'iqiyi.com','o':'opera.com',
                'p':undefined,'a':undefined,'s':'sohu.com','d':'dribbble.com','f':'facebook.com',
                'g':'google.com','h':undefined,'j':'jd.com','k':undefined,'l':undefined,'z':'zhihu.com',
                'x':'xiedaimala.com','c':'css-tricks.com','v':'visualgo.net','b':'getbootstrap.com','n':undefined,'m':undefined
               }
    //每次优先读取localStorage 里 randomN 对应的hash 每次刷新网页重新读档
    let hashInLocalStorage = getFromLocalStorage('randomN')
    if(hashInLocalStorage){
        hash = hashInLocalStorage  
    }
    return {'keys': keys,'hash': hash}
}

function generateKeyboard(hash,keys){
  for(index=0;index < keys['length'];index=index+1 ){ 
    var div = tag('div') //用js代码给文档创建三个标签元素div,注意引号
    div.className = 'row'
    wrapper.appendChild(div) 

    var row = keys[index]   //共3行

    for(index2 = 0;index2 < row['length'];index2 = index2 + 1){
        /*kbd不能放到后面*/
        var kbd = tag('kbd')
        kbd.className = 'key'
        
        var button = createButton(row[index2]) // row[index2]='q'/'w'
        var span = createSpan(row[index2])
        var img = createImg(hash[row[index2]])

        kbd.appendChild(span)
        kbd.appendChild(button)
        kbd.appendChild(img)
        div.appendChild(kbd)
    }
  }
}

function listenToUser(hash){
    document.onkeypress = function(e){
        var key = e.key  //key 为 'q' 'w' 按键值字符串  
        var website = hash[key]         //qq.com weibo.com taobao.com 这的key不能加引号 key 
        //location.href = 'http://'+website     //模拟用户在地址栏输入地址，修改当前网址为按键地址
        window.open('http://'+website,'_blank') //新开窗口打开用户按键的网站
    }
    /*不需要返回值就不用return*/
}

function getFromLocalStorage(n){
    return JSON.parse(localStorage.getItem(n) || 'null')
}

function tag(tagName){
    return document.createElement(tagName)
}

function createSpan(textContent){
    var span = tag('span') 
    span.className = 'text'
    span.textContent = textContent //q w e r t 给kbd添加文本内容 
    return span
}

function createButton(id){
    var button = tag('button')  
    button.id = id             //给每个编辑按键加上对应的id
    button.textContent = 'E' 
    button.onclick = function(e) { //这里的e就是事件click哈希表的名称,包含事件的所有信息，
        button2 = e.target         //e.target是用户点击的元素
        img2 = button2.nextSibling  //button2.nextSibling 可以取到当前被点击的button2的下一个兄弟
        var key = button2.id        //q w 取出用户要编辑哪一个kbd的键值
        var x = prompt('请输入要变更的网址域名,不用输入协议。如：iqiyi.com或www.taobao.com')  //获取用户要更改的网址
        if(x){
            hash[key] = x  //hash变更
            localStorage.setItem('randomN',JSON.stringify(hash))//hash变更后要立刻存档到randomN,JSON.stringify(hash)是把hash变成字符串的
            img2.src = 'http://' + hash[key] + '/favicon.ico'      //更新网站icon
        }                  
        if(hash[key]){
            img2.src = 'http://' + hash[key] + '/favicon.ico'
        }
        else{
            img2.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
        img2.onerror = function(e){/*监听icon获取失败事件*/
            e.target.src = '//i.loli.net/2018/11/21/5bf545065c22b.jpg'}
        }
    return button
}

function createImg(domain){
    var img = tag('img')
    if(domain){
        img.src = 'http://' + domain + '/favicon.ico'
    }
    else{
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function(e){/*监听icon获取失败事件*/
        e.target.src = '//i.loli.net/2018/11/21/5bf545065c22b.jpg'
    }
    return img
}
