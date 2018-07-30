if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '�����ѧߧڧ��';
	$.fn.pagination.defaults.afterPageText = '�ڧ� {pages}';
	$.fn.pagination.defaults.displayMsg = '������ާ��� {from} �է� {to} �ڧ� {total} �٧ѧ�ڧ�֧�';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '���ҧ�ѧҧѧ��ӧѧ֧���, ���اѧݧ�ۧ��� �اէڧ�� ...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '����';
	$.messager.defaults.cancel = '���ѧܧ����';
}
$.map(['validatebox','textbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '����� ���ݧ� �ߧ֧�ҧ��էڧާ�.';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '����اѧݧ�ۧ��� �ӧӧ֧էڧ�� �ܧ���֧ܧ�ߧ�� e-mail �ѧէ�֧�.';
	$.fn.validatebox.defaults.rules.url.message = '����اѧݧ�ۧ��� �ӧӧ֧էڧ�� �ܧ���֧ܧ�ߧ�� URL.';
	$.fn.validatebox.defaults.rules.length.message = '����اѧݧ�ۧ��� �ӧӧ֧էڧ�� �٧ѧ�֧ߧڧ� �ާ֧اէ� {0} �� {1}.';
	$.fn.validatebox.defaults.rules.remote.message = '����اѧݧ�ۧ��� �ڧ���ѧӧ�� ���� ���ݧ�.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.firstDay = 1;
	$.fn.calendar.defaults.weeks  = ['��','��','��','��','��','��','��'];
	$.fn.calendar.defaults.months = ['���ߧ�', '���֧�', '���ѧ�', '�����', '���ѧ�', '�����', '�����', '���ӧ�', '���֧�', '���ܧ�', '�����', '���֧�'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '���֧ԧ�էߧ�';
	$.fn.datebox.defaults.closeText = '���ѧܧ����';
	$.fn.datebox.defaults.okText = '����';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
