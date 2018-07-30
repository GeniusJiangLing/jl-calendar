/**
 description:
 author:  JiangL
 company:
 date:    7/23/2018
 version: v2.0
 */
var date = new Date();
var currYear = date.getFullYear();
var currMonth = date.getMonth() + 1;
var currDay = date.getDate();
var currQuarter = currMonth <= 3 ? 'Q1' : (currMonth <= 6 ? 'Q2' : (currMonth <= 9 ? 'Q3' : 'Q4'));
var currHalf = currMonth <= 6 ? 'H1' : 'H2';

window.onload = function () {
    var body = document.getElementsByTagName('body')[0];
    // 获取原始input
    var originalInputs = document.getElementsByClassName('jl-calendar');

    for (var i = 0; i < originalInputs.length; i++) {
        var originalInput = originalInputs[i];
        // 目前版本暂时禁用用户输入功能
        originalInput.readOnly = 'readOnly';
        // 该属性对应控件主体的id，用于将控件主体和原始input关联起来
        originalInput.setAttribute('jl-targetOutline', 'jl-calendarOutline-' + i);
        // 在原始input外嵌套一个行级div，这个div用于将input和日历图标捆绑在一起
        var outDiv = document.createElement('div');
        outDiv.className = 'jl-outDiv';

        // 获取原始input的父元素
        var oldParent = originalInput.parentNode;

        // 将刚才创建的外层div插入到原始input之前
        oldParent.insertBefore(outDiv, originalInput);

        // 将外层div设置为原始input的新父元素
        outDiv.appendChild(originalInput);

        // 获取原始input的样式，并将除width之外的所有样式转移导outDiv上
        if (originalInput.getAttribute('style') !== undefined) {
            var inputStyle = originalInput.getAttribute('style');
            var inputWidth = originalInput.style.width;
            outDiv.setAttribute('style', inputStyle);
            outDiv.style.width = '';
            originalInput.style = {};
            originalInput.style.width = inputWidth;
        }

        // 将日历图标放到原始input后面
        var calendarIcon = document.createElement('i');
        calendarIcon.className = 'fa fa-calendar fa-fw jl-calendar-icon';
        // 绑定对应的控件主体id
        calendarIcon.setAttribute('targetOutline', 'jl-calendarOutline-' + i);
        outDiv.appendChild(calendarIcon);

        // 给日历图标添加点击事件
        calendarIcon.onclick = function (e) {
            switchOutlineShowStatus(this, e);
        };

        // 创建控件主体外框，即主体父元素
        var calendarOutline = document.createElement('div');
        calendarOutline.className = 'jl-calendarOutline';
        calendarOutline.id = 'jl-calendarOutline-' + i;

        // 获取外层div的绝对坐标，并根据该坐标设置控件主体外框的位置
        // var x = outDiv.offsetLeft;
        // var y = outDiv.offsetTop;
        var x = outDiv.getBoundingClientRect().left;
        var y = outDiv.getBoundingClientRect().top;
        calendarOutline.style.left = x + 'px';
        calendarOutline.style.top = (y + 23) + 'px';
        calendarOutline.style.display = 'none';

        // 生成主体面板
        initDatePanel(calendarOutline, originalInput);

        // 将控件主体外框放到body中
        body.insertBefore(calendarOutline, body.getElementsByTagName('script')[0]);

        // 让控件主体也阻止冒泡，防止点击时将控件主体关闭
        calendarOutline.onclick = function (e) {
            e.stopPropagation();
        };
    }

    // 点击日历图标之外的地方关闭控件主体
    document.onclick = function () {
        closeAllOutlines();
    };

    // 选中一个日期后改变底色，关闭控件主体，并将时间显示在原始input中  unfinished
    var dateCells = document.getElementsByClassName('jl-cell');
    for (var i = 0; i < dateCells.length; i++) {
        var cell = dateCells[i];
        cell.onclick = function () {
            clickCell(this);
        }
    }


};

// 日期单元的点击事件
var clickCell = function (cell) {
    // 去掉原先被选中的日期的jl-selected类
    var brothers = cell.parentNode.childNodes;
    for (var j = 0; j < brothers.length; j++) {
        var brother = brothers[j];
        brother.classList.remove('jl-selected');
    }
    // 添加jl-selected类改变底色
    cell.classList.add('jl-selected');
    // 将时间显示在原始input中
    writeTime(cell);

    // 关闭控件主体
    var outline = cell.parentNode.parentNode;
    outline.style.display = 'none';
};

// 切换控件主体显示和隐藏的状态
var switchOutlineShowStatus = function (icon, e) {
    var targetOutline = document.getElementById(icon.getAttribute('targetOutline'));
    closeAllOutlines(targetOutline);
    var displayStatus = targetOutline.style.display;
    targetOutline.style.display = displayStatus === 'none' ? 'block' : 'none';
    e.stopPropagation();
};

// 关闭除当前激活控件之外的所有控件主体
var closeAllOutlines = function (exception) {
    var outlines = document.getElementsByClassName('jl-calendarOutline');
    for (var i = 0; i < outlines.length; i++) {
        var outline = outlines[i];
        if (exception === undefined || outline.id !== exception.id) {
            outline.style.display = 'none';
        }
    }
};

// 主体面板, jl-value属性为需要显示在原始input中的值
var initDatePanel = function (calendarOutline, originalInput) {
    var param = {};
    param.outline = calendarOutline;
    param.input = originalInput;

    var classArr = originalInput.className.split(/\s+/);

    if (classArr.indexOf('day') > -1) { // unfinished
        param.middleHtml = '<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>';
        param.buttonText = '选择当日';
        var panelBody = initComponent(param).panelBody;
        traditionalCalendar(panelBody, currYear, currMonth);

    }

    if (classArr.indexOf('month') > -1) {
        param.middleHtml = '请选择月份';
        param.buttonText = '选择当月';
        var panelBody = initComponent(param).panelBody;
        var months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        var values = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        for (var i = 0; i < 12; i++) {
            var monthCell = document.createElement('div');
            monthCell.className = 'jl-monthCell jl-cell';
            monthCell.setAttribute('jl-value', values[i]);
            monthCell.innerText = months[i];
            panelBody.appendChild(monthCell);
        }


    }

    if (classArr.indexOf('quarter') > -1) {
        param.middleHtml = '请选择季度';
        param.buttonText = '选择当季';
        var panelBody = initComponent(param).panelBody;
        var quarters = ['第一季度', '第二季度', '第三季度', '第四季度'];
        var values = ['Q1', 'Q2', 'Q3', 'Q4'];
        for (var i = 0; i < 4; i++) {
            var quarterCell = document.createElement('div');
            quarterCell.className = 'jl-quarterCell jl-cell';
            quarterCell.setAttribute('jl-value', values[i]);
            quarterCell.innerText = quarters[i];
            panelBody.appendChild(quarterCell);
        }
    }

    if (classArr.indexOf('half') > -1) {
        param.middleHtml = '请选择半年度';
        param.buttonText = '当前半年度';
        var panelBody = initComponent(param).panelBody;
        // 取消半年度的flex布局
        panelBody.style.display = 'block';
        var halves = ['上半年', '下半年'];
        var values = ['H1', 'H2'];
        for (var i = 0; i < 2; i++) {
            var halfCell = document.createElement('div');
            halfCell.className = 'jl-halfCell jl-cell';
            halfCell.setAttribute('jl-value', values[i]);
            halfCell.innerText = halves[i];
            panelBody.appendChild(halfCell);
        }
    }
};

// 生成主体面板
// 返回值为主体框架里的各个组成
var initComponent = function (calendar) {
    var calendarOutline = calendar.outline;
    var top = document.createElement('div');
    top.className = 'jl-panel-top';

    // 双箭头
    var doubleLeft = document.createElement('i');
    doubleLeft.className = 'fa fa-angle-double-left fa-fw jl-arrow';
    doubleLeft.onclick = function () {
        adjustYear(this, 'left');
    };
    var doubleRight = document.createElement('i');
    doubleRight.className = 'fa fa-angle-double-right fa-fw jl-arrow';
    doubleRight.onclick = function () {
        adjustYear(this, 'right');
    };
    // 单箭头
    var singleLeft = document.createElement('i');
    singleLeft.className = 'fa fa-angle-left fa-fw jl-arrow';
    singleLeft.onclick = function () {
        adjustMonth(this, 'left');
    };
    var singleRight = document.createElement('i');
    singleRight.className = 'fa fa-angle-right fa-fw jl-arrow';
    singleRight.onclick = function () {
        adjustMonth(this, 'right');
    };

    // 年份input
    var inputYear = document.createElement('input');
    inputYear.className = 'jl-inputYear';
    inputYear.maxLength = 4;
    inputYear.value = currYear;
    // 月份input
    if (calendar.input.className.indexOf('day') > -1) {
        var inputMonth = document.createElement('input');
        inputMonth.className = 'jl-inputMonth';
        inputMonth.maxLength = 2;
        inputMonth.value = currMonth > 9 ? currMonth : ('0' + currMonth.toString());
    }

    top.appendChild(doubleLeft);
    if (calendar.input.className.indexOf('day') > -1) top.appendChild(singleLeft);
    top.appendChild(inputYear);
    if (calendar.input.className.indexOf('day') > -1) {
        top.appendChild(inputMonth);
        top.appendChild(singleRight);
    }
    top.appendChild(doubleRight);

    var middle = document.createElement('div');
    middle.className = 'jl-panel-middle';
    middle.innerHTML = calendar.middleHtml;

    var body = document.createElement('div');
    body.className = 'jl-panel-body';

    var buttons = document.createElement('div');
    buttons.className = 'jl-panel-buttons';
    var button = document.createElement('button');
    button.className = 'jl-button';
    button.innerText = calendar.buttonText;
    button.onclick = function () {
        // 统计cell的个数判断当前控件的类型
        var cells = calendarOutline.getElementsByClassName('jl-cell');
        var inputYear = calendarOutline.getElementsByClassName('jl-inputYear')[0];
        inputYear.value = currYear;
        var inputMonth = calendarOutline.getElementsByClassName('jl-inputMonth')[0];
        if (inputMonth !== undefined) {
            inputMonth.value = currMonth > 9 ? currMonth : ('0' + currMonth.toString());
        }
        // 由于传统日期控件的面板会根据年份和月份的不同而改变，因此需要特殊处理
        if (cells.length > 12) {
            traditionalCalendar(calendarOutline.getElementsByClassName('jl-panel-body')[0], inputYear.value, inputMonth.value);
            // 重新获取cells
            cells = calendarOutline.getElementsByClassName('jl-cell');
            for (var i = 0; i < cells.length; i++) {
                if (parseInt(cells[i].getAttribute('jl-value')) === parseInt(currDay)) {
                    cells[i].click();
                    break;
                }
            }
        } else {
            for (var i = 0; i < cells.length; i++) {
                if (parseInt(cells[i].getAttribute('jl-value')) === parseInt(currMonth)
                    || cells[i].getAttribute('jl-value') === currQuarter
                    || cells[i].getAttribute('jl-value') === currHalf) {
                    cells[i].click();
                    break;
                }
            }
        }

        // 选择当前时间后关闭控件主体
        calendarOutline.style.display = 'none';
    };

    buttons.appendChild(button);

    calendarOutline.appendChild(top);
    calendarOutline.appendChild(middle);
    calendarOutline.appendChild(body);
    calendarOutline.appendChild(buttons);

    return {
        panelBody: calendarOutline.getElementsByClassName('jl-panel-body')[0]
    };
};

// 将选中的时间输入到原始input中,参数分别为选中的cell和原始input
var writeTime = function (cell) {
    var outline = cell.parentNode.parentNode;
    var inputYear = outline.getElementsByClassName('jl-inputYear')[0];
    var inputMonth = outline.getElementsByClassName('jl-inputMonth');

    var year = inputYear.value;
    var month = inputMonth.length === 0 ? undefined : inputMonth[0].value;
    var cellValue = cell.getAttribute('jl-value');

    // 最终显示在原始input中的时间
    var showDate = year + '-' + (month === undefined ? cellValue : (month + '-' + cellValue));
    var originalInputs = document.getElementsByClassName('jl-calendar');
    for (var i = 0; i < originalInputs.length; i++) {
        var input = originalInputs[i];
        if (input.getAttribute('jl-targetOutline') === outline.id) {
            input.value = showDate;
            break;
        }
    }
};

// 双箭头控制年份input
var adjustYear = function (arrow, direction) {
    var inputYear = arrow.parentNode.getElementsByClassName('jl-inputYear')[0];
    var reg = /\d{4}/;
    if (reg.test(inputYear.value)) {
        if (direction === 'left') {
            inputYear.value--;
        } else {
            inputYear.value++;
        }
    }
    // 不为0说明有月份输入框，则需要动态生成传统日历
    var inputMonth = arrow.parentNode.getElementsByClassName('jl-inputMonth');
    if (inputMonth.length !== 0) {
        inputMonth = inputMonth[0];
        var panelBody = arrow.parentNode.parentNode.getElementsByClassName('jl-panel-body')[0];
        traditionalCalendar(panelBody, inputYear.value, inputMonth.value);
    }
};

// 单箭头控制月份input
var adjustMonth = function (arrow, direction) {
    var inputMonth = arrow.parentNode.getElementsByClassName('jl-inputMonth')[0];
    var reg = /\d{1,2}/;
    if (reg.test(inputMonth.value)) {
        if (direction === 'left' && parseInt(inputMonth.value) > 1) {
            inputMonth.value--;
        } else if (direction === 'right' && parseInt(inputMonth.value) < 12) {
            inputMonth.value++;
        }
        if (inputMonth.value <= 9) {
            inputMonth.value = '0' + parseInt(inputMonth.value).toString();
        }
    }
    // 动态生成传统日历
    var inputYear = arrow.parentNode.getElementsByClassName('jl-inputYear')[0];
    var panelBody = arrow.parentNode.parentNode.getElementsByClassName('jl-panel-body')[0];
    traditionalCalendar(panelBody, inputYear.value, inputMonth.value);
};

// 生成传统日历
var traditionalCalendar = function (panelBody, year, month) {
    panelBody.innerHTML = '';
    year = parseInt(year);
    month = parseInt(month);
    var d = 1;
    // 获取month月的最后一天
    var lastDayOfThisMonth = new Date(year, month, 0).getDate();
    // 获取month月的第一天的星期
    var firstDayWeek = new Date(year, month - 1, 1).getDay();
    panelBody.style.justifyContent = 'flex-start';
    for (var i = 0; i < 42; i++) {
        if (d > lastDayOfThisMonth) {
            break;
        }
        var dayCell = document.createElement('div');
        dayCell.className = 'jl-dayCell jl-cell';
        if (i < firstDayWeek) {
            dayCell.style.visibility = 'hidden';
        } else {
            dayCell.innerText = d;
            dayCell.setAttribute('jl-value', d > 9 ? d : ('0' + d.toString()));
            d++;
        }
        dayCell.onclick = function () {
            clickCell(this);
        };
        panelBody.appendChild(dayCell);
    }
};
