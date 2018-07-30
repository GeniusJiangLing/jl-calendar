var currYear = new Date().getFullYear();
var currMonth = (new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1) : ('0' + (new Date().getMonth() + 1));
var currQuarter = (new Date().getMonth() + 1) <= 3 ? 1 : ((new Date().getMonth() + 1) <= 6 ? 2 : ((new Date().getMonth() + 1) <= 9 ? 3 : 4));
var currHalf = currQuarter <= 2 ? 1 : 2;

$(function () {
    var $calendars = $('.jl-calendar');
    $calendars.each(function (index) {
        initCalendar($(this), index);
    });

    $('.jl-calendar-body').on('click', function () {
        return false;
    });
    $calendars.on('click', function () {
        return false;
    });

    $(document).on('click', function () {
        //alert('body');
        $('.jl-calendar-body').css('display', 'none');
    });

});


function initCalendar(input, index) {

    var frame = $('<span class="jl-calendar-wrap"></span>');
    input.wrap(frame);

    var img = $('<img class="jl-calendar-img" src="./img/calendar-icon.png"/>');
    input.after(img);

    var calendar_div = $('<div id="jl-calendar-body' + index + '" class="jl-calendar-body"></div>');
    calendar_div.css('display', 'none');

    // 生成日历主体面板
    if ($(img).prev().hasClass('month')) month(calendar_div);
    if ($(img).prev().hasClass('quarter')) quarter(calendar_div);
    if ($(img).prev().hasClass('half')) half(calendar_div);
    if ($(img).prev().hasClass('day')) day(calendar_div);

    img.after(calendar_div);

    // 打开关闭面板
    $(img).on('click', function () {
        var display = $(img).next().css('display');
        $('.jl-calendar-body').not($(img)).css('display', 'none');
        $(img).next().css({
            'display': display === 'none' ? 'block' : 'none',
            left: $(img).prev().offset().left - 2
        });
        $(img).prev().focus();
        return false;
    });

}

function day(div) {
    var title = commonTitleForMQH();

    // 选择日期的部分
    var dayBody = $('<div class="jl-dayBody"></div>');
    var dayBodyTable = '';

    dayBodyTable += '<div class="jl-calendar-title">请选择季度</div>';
    dayBodyTable += '<div style="overflow-y: auto;height: 120px;width: 175px;">';
    dayBodyTable += '<table style="height: 120px;width: 100%">';

    dayBodyTable += '<tbody style="text-align: center;font-size: 13px;line-height: 20px;">';

    for (var i = 1; i <= 4; i++) {
        dayBodyTable += '<tr class="jl-day" quarter="' + i + '" calendarBody="' + ($(div).attr('id')) + '" onclick="getSelectedDate(this)"><td>' + ('第' + i + '季度') + '</td></tr>'
    }

    dayBodyTable += '</tbody>';
    dayBodyTable += '</table>';
    dayBodyTable += '</div>';
    dayBody.html(dayBodyTable);

    // 右下方的按钮
    var selectThisDay = $('<button class="jl-calendar-button">选择本季</button>');
    selectThisDay.on('click', function () {
        showDate($(div).attr('id'), currYear, undefined, undefined, currDay);
    });

    $(div).append(title).append(dayBody).append(selectThisDay);
}

function quarter(div) {
    var title = commonTitleForMQH();

    // 选择季度的部分
    var quarterBody = $('<div class="jl-quarterBody"></div>');
    var quarterBodyTable = '';

    quarterBodyTable += '<div class="jl-calendar-title">请选择季度</div>';
    quarterBodyTable += '<div style="overflow-y: auto;height: 120px;width: 175px;">';
    quarterBodyTable += '<table style="height: 120px;width: 100%">';

    quarterBodyTable += '<tbody style="text-align: center;font-size: 13px;line-height: 20px;">';

    for (var i = 1; i <= 4; i++) {
        quarterBodyTable += '<tr class="jl-quarter" quarter="' + i + '" calendarBody="' + ($(div).attr('id')) + '" onclick="getSelectedDate(this)"><td>' + ('第' + i + '季度') + '</td></tr>'
    }

    quarterBodyTable += '</tbody>';
    quarterBodyTable += '</table>';
    quarterBodyTable += '</div>';
    quarterBody.html(quarterBodyTable);

    // 右下方的按钮
    var selectThisQuarter = $('<button class="jl-calendar-button">选择本季</button>');
    selectThisQuarter.on('click', function () {
        showDate($(div).attr('id'), currYear, undefined, undefined, currQuarter);
    });

    $(div).append(title).append(quarterBody).append(selectThisQuarter);
}

function half(div) {
    var title = commonTitleForMQH();

    // 选择年度的部分
    var halfBody = $('<div class="jl-halfBody"></div>');
    var halfBodyTable = '';

    halfBodyTable += '<div class="jl-calendar-title">请选择季度</div>';
    halfBodyTable += '<div style="overflow-y: auto;height: 120px;width: 175px;">';
    halfBodyTable += '<table style="height: 55px;width: 100%">';

    halfBodyTable += '<tbody style="text-align: center;font-size: 13px;line-height: 20px;">';

    halfBodyTable += '<tr class="jl-half" half="1" calendarBody="' + ($(div).attr('id')) + '" onclick="getSelectedDate(this)"><td>上半年</td></tr>';
    halfBodyTable += '<tr class="jl-half" half="2" calendarBody="' + ($(div).attr('id')) + '" onclick="getSelectedDate(this)"><td>下半年</td></tr>';

    halfBodyTable += '</tbody>';
    halfBodyTable += '</table>';
    halfBodyTable += '</div>';
    halfBody.html(halfBodyTable);

    // 右下方的按钮
    var selectThisHalf = $('<button class="jl-calendar-button">选择本年度</button>');
    selectThisHalf.on('click', function () {
        showDate($(div).attr('id'), currYear, undefined, undefined, undefined, currHalf);
    });

    $(div).append(title).append(halfBody).append(selectThisHalf);
}

function month(div) {
    var title = commonTitleForMQH();

    // 选择月份的部分
    var monthBody = $('<div class="jl-monthBody"></div>');
    var monthBodyTable = '';

    monthBodyTable += '<div class="jl-calendar-title">请选择月份</div>';
    monthBodyTable += '<div style="overflow-y: auto;height: 120px;width: 175px;">';
    monthBodyTable += '<table style="height: 120px;width: 100%">';

    monthBodyTable += '<tbody style="text-align: center;font-size: 13px;line-height: 20px;">';

    for (var i = 1; i <= 12; i++) {
        var month = i >= 10 ? i : ('0' + i);
        monthBodyTable += '<tr class="jl-month" month="' + month + '" calendarBody="' + ($(div).attr('id')) + '" onclick="getSelectedDate(this)"><td>' + (month + '月') + '</td></tr>'
    }

    monthBodyTable += '</tbody>';
    monthBodyTable += '</table>';
    monthBodyTable += '</div>';
    monthBody.html(monthBodyTable);

    // 右下方的按钮
    var selectThisMonth = $('<button>选择本月</button>');
    selectThisMonth.css({
        position: 'absolute',
        bottom: '1px',
        right: '1px'
    });
    selectThisMonth.on('click', function () {
        showDate($(div).attr('id'), currYear, currMonth);
    });

    $(div).append(title).append(monthBody).append(selectThisMonth);
    // title.append(leftArrow).append(titleInput).append(rightArrow);
}

// 月 季度 半年日历面板的公共部分
function commonTitleForMQH() {
    var title = $('<div style="display:table-cell; vertical-align:middle;"></div>');
    title.css({
        width: '174px',
        height: '24px',
        padding: '1px'
    });

    // 选择年份的部分
    var leftArrow = $('<img class="jl-arrow leftArrow" style="float: left;display: table-cell;vertical-align: middle;margin-top: 3px;margin-left: 3px;" src="./img/left.png"/>');
    var rightArrow = $('<img class="jl-arrow rightArrow" style="float: right;display: table-cell;vertical-align: middle;margin-top: 3px;margin-right: 3px;" src="./img/right.png"/>');
    var titleInput = $('<input class="jl-select" style="width: 70px;margin-left: 30px;text-align: center"/>');
    titleInput.val(currYear);

    leftArrow.on('click', function () {
        if (titleInput.val() > 0) {
            titleInput.val(titleInput.val() - 1);
        }
    });
    rightArrow.on('click', function () {
        if (titleInput.val() < 9999) {
            titleInput.val(parseInt(titleInput.val()) + 1);
        }
    });
    title.append(leftArrow).append(titleInput).append(rightArrow);
    return title;
}

function getSelectedDate(tr) {
    var id = $(tr).attr('calendarBody');
    var year = $(tr).attr('year') === undefined ? ($('#' + id).find('.jl-select').val()) : $(tr).attr('year');
    var month = $(tr).attr('month');
    var day = $(tr).attr('day');
    var quarter = $(tr).attr('quarter');
    var half = $(tr).attr('half');

    showDate(id, year, month, day, quarter, half);

}

// 最终展示日期
function showDate(id, year, month, day, quarter, half) {
    var dateStr = year;
    if (quarter === undefined) {
        if (month !== undefined) dateStr += '-' + month;
        if (day !== undefined) dateStr += '-' + day;
    } else {
        dateStr += '-' + quarter;
    }

    var input = $('#' + id).prev().prev();
    var format = $(input).attr('format');

    // 日期格式化功能不支持季度和半年度
    if (format === undefined || format === '') {
        if (quarter !== undefined) {
            $(input).val(year + '-Q' + quarter);
        } else if (half !== undefined) {
            $(input).val(year + '-H' + half);
        } else {
            $(input).val(dateStr);
        }
    } else {
        var arr = dateStr.split('-');

        var date = new Date(arr[0], arr[1], arr[2] === undefined ? '' : arr[2]);
        $(input).val(format.replace('yyyy', date.getFullYear())
            .replace('MM', (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))
            .replace('dd', date.getDate()));
    }
    $('#' + id).css('display', 'none');
}
