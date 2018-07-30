if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '�ک`��';
	$.fn.pagination.defaults.afterPageText = '{pages} ��';
	$.fn.pagination.defaults.displayMsg = 'ȫ {total} �����ƥ��� {from} ���� {to} ���ʾ��';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '�I���ФǤ����١���������������...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'OK';
	$.messager.defaults.cancel = '����󥻥�';
}
$.map(['validatebox','textbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '�����ϱ�횤Ǥ���';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '��������`�륢�ɥ쥹���������Ƥ���������';
	$.fn.validatebox.defaults.rules.url.message = '������URL���������Ƥ���������';
	$.fn.validatebox.defaults.rules.length.message = '{0} ���� {1} �ι���������������������Ƥ���������';
	$.fn.validatebox.defaults.rules.remote.message = '���Υե��`��ɤ��������Ƥ���������';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['��','��','��','ˮ','ľ','��','��'];
	$.fn.calendar.defaults.months = ['1��', '2��', '3��', '4��', '5��', '6��', '7��', '8��', '9��', '10��', '11��', '12��'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '����';
	$.fn.datebox.defaults.closeText = '�]����';
	$.fn.datebox.defaults.okText = 'OK';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
