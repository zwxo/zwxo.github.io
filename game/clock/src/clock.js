let monthText = ["01月", "02月", "03月", "04月", "05月", "06月", "07月", "08月", "09月", "10月", "11月", "12月"];

let dayText = ["01号", "02号", "03号", "04号", "05号", "06号", "07号", "08号", "09号", "10号", "11号", "12号", "13号", "14号", "15号", "16号", "17号", "18号", "19号", "20号", "21号", "22号", "23号", "24号", "25号", "26号", "27号", "28号", "29号", "30号", "31号"];

let weekText = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

let hourText = ["00点", "01点", "02点", "03点", "04点", "05点", "06点", "07点", "08点", "09点", "10点", "11点", "12点", "13点", "14点", "15点", "16点", "17点", "18点", "19点", "20点", "21点", "22点", "23点"];

let minuteText = ["00分","01分", "02分", "03分", "04分", "05分", "06分", "07分", "08分", "09分", "10分",  "11分","12分", "13分", "14分", "15分", "16分", "17分", "18分", "19分", "20分", "21分", "22分", "23分", "24分", "25分", "26分", "27分", "28分", "29分", "30分", "31分", "32分", "33分", "34分", "35分", "36分", "37分", "38分", "39分", "40分", "41分", "42分", "43分", "44分", "45分", "46分", "47分", "48分", "49分", "50分", "51分", "52分", "53分", "54分", "55分", "56分", "57分", "58分", "59分"];

let secondText = ["00秒","01秒", "02秒", "03秒", "04秒", "05秒", "06秒", "07秒", "08秒", "09秒", "10秒", "11秒", "12秒", "13秒", "14秒", "15秒", "16秒", "17秒", "18秒", "19秒", "20秒", "21秒", "22秒", "23秒", "24秒", "25秒", "26秒", "27秒", "28秒", "29秒", "30秒", "31秒", "32秒", "33秒", "34秒", "35秒", "36秒", "37秒", "38秒", "39秒", "40秒", "41秒", "42秒", "43秒", "44秒", "45秒", "46秒", "47秒", "48秒", "49秒", "50秒", "51秒", "52秒", "53秒", "54秒", "55秒", "56秒", "57秒", "58秒", "59秒"];

// 存放dom元素的数组

let monthList = [];

let dayList = [];

let weekList = [];

let hourList = [];

let minuteList = [];

let secondList = [];

//二维数组 存放文字内容及页面显示标签

let timeTextSet = [

    [monthText, monthList],

    [dayText, dayList],

    [weekText, weekList],

    [hourText, hourList],

    [minuteText, minuteList],

    [secondText, secondList]

];

// 判断是否为旋转页面

let isRotating = true;

//时钟页面

let clock;

window.onload = function () {

    init();

    // 每隔100ms获得 当前时间

    setInterval(function () {

        runTime();

    }, 100);

    // 旋转之前定位到当前时间

    locateCurrent();

    // 3秒后变成旋转样式

    setTimeout(function () {

        toRotate();

    }, 3000);

}



// 初始化函数

function init() {

    clock = document.getElementById('clock');

    // 生成标签 存放文字展示

    for (let i = 0; i < timeTextSet.length; i++) {

        for (let j = 0; j < timeTextSet[i][0].length; j++) {

            let temp = createLabel(timeTextSet[i][0][j]);

            clock.appendChild(temp);

            // 将生成的标签存放在数组list中

            timeTextSet[i][1].push(temp);

        }

    }

}



// 创建标签并将文字填充标签内 接收参数为文字内容

function createLabel(text) {

    let div = document.createElement('div');

    div.classList.add('label');

    div.innerText = text;

    return div;

}



function runTime() {

    //当前时间获取

    let now = new Date();

    let month = now.getMonth();

    let day = now.getDate();

    let week = now.getDay();

    let hour = now.getHours();

    let minute = now.getMinutes();

    let seconds = now.getSeconds();

    // 初始化时间颜色 并将走过的时间设置为白色

    initStyle();

    // 当前时间设为与背景色对比度高一点的颜色

    // 将当前时间月份存放在数组中

    let nowValue = [month, day - 1, week, hour, minute, seconds];

    for (let i = 0; i < nowValue.length; i++) {

        let num = nowValue[i];

        timeTextSet[i][1][num].style.color = 'red';

    }

    // 变成旋转时钟

    if (isRotating) {

        // 圆心位置确定

        let widthMid = document.body.clientWidth / 2;

        let heightMid = document.body.clientHeight / 2;

        // 将每一个dom元素确定到圆的位置

        for (let i = 0; i < timeTextSet.length; i++) {

            for (let j = 0; j < timeTextSet[i][0].length; j++) {

                // 计算出每一个元素的位置  x y 坐标，圆的半径与时分秒的位置有关

                let r = (i + 1) * 35 + 50 * i;

                // 计算每一个平均的角度  将每一个单位对齐,再转化成弧度

                let deg = 360 / timeTextSet[i][1].length * (j - nowValue[i]);

                // 计算dom元素的坐标

                let x = r * Math.sin(deg * Math.PI / 180) + widthMid;

                let y = heightMid - r * Math.cos(deg * Math.PI / 180);

                // 样式

                let temp = timeTextSet[i][1][j];

                temp.style.transform = 'rotate(' + (-90 + deg) + 'deg)';

                temp.style.left = x + 'px';

                temp.style.top = y + 'px';

            }

        }

    }

}



function initStyle() {

    // 将所有标签置为白色

    let label = document.getElementsByClassName('label');

    for (let i = 0; i < label.length; i++) {

        label[i].style.color = 'white';

    }

}



function locateCurrent() {

    for (let i = 0; i < timeTextSet.length; i++) {

        for (let j = 0; j < timeTextSet[i][1].length; j++) {

            // 获取原来的位置  再修改position 设置left top

            let tempX = timeTextSet[i][1][j].offsetLeft + "px";

            let tempY = timeTextSet[i][1][j].offsetTop + "px";

            // console.log(timeTextSet[i][1][j]);

            // 利用let 防止闭包

            setTimeout(function () {

                timeTextSet[i][1][j].style.position = "absolute";

                timeTextSet[i][1][j].style.left = tempX;

                timeTextSet[i][1][j].style.top = tempY;

            }, 50);

        }

    }

}



function toRotate() {

    isRotating = true;

    clock.style.transform = "rotate(90deg)";

}

