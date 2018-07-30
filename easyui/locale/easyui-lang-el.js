if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '���Ŧ�?�Ħ�';
	$.fn.pagination.defaults.afterPageText = '����? {pages}';
	$.fn.pagination.defaults.displayMsg = '���̦�?�ͦɦҦ� {from} ��?? {to} ����? {total} ���ͦӦɦʦ�?�̦Ŧͦ�';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '��?�ͦŦӦ��� ���ЦŦΦŦѦæ���?��, �����Ѧ��ʦ���? ���ŦѦɦ�?�ͦŦӦ� ...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '���ͦ�?�ΦŦ�';
	$.messager.defaults.cancel = '?�ʦԦѦ�';
}
$.map(['validatebox','textbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '���� �ЦŦ�?�� ��?�ͦ��� �ԦЦϦ֦ѦŦئӦɦ�?.';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '�����Ѧ��ʦ���? �Ŧɦ�?�æŦӦ� �ҦئҦ�? ����.���ɦ�?�ȦԦͦҦ�.';
	$.fn.validatebox.defaults.rules.url.message = '�����Ѧ��ʦ���? �Ŧɦ�?�æŦӦ� �ҦئҦ�? ��?�ͦĦŦҦ̦�.';
	$.fn.validatebox.defaults.rules.length.message = '�����Ѧ��ʦ���? �Ŧɦ�?�æŦӦ� �Ӧɦ�? �̦ŦӦ���? {0} �ʦ��� {1}.';
	$.fn.validatebox.defaults.rules.remote.message = '�����Ѧ��ʦ���? �ĦɦϦѦ�?�ҦӦ� ���Ԧ�? �Ӧ� �ЦŦ�?��.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['���Ԧ�','���Ŧ�','���Ѧ�','���Ŧ�','���Ŧ�','������','������'];
	$.fn.calendar.defaults.months = ['������', '���Ŧ�', '������', '���Ц�', '����?', '���Ϧ�', '���Ϧ�', '���Ԧ�', '���Ŧ�', '���ʦ�', '���Ϧ�', '���Ŧ�'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '��?�̦ŦѦ�';
	$.fn.datebox.defaults.closeText = '���˦�?�Ҧɦ̦�';
	$.fn.datebox.defaults.okText = '���ͦ�?�ΦŦ�';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
