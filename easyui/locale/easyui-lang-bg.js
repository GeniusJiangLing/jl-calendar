if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '§³§ä§â§Ñ§ß§Ú§è§Ñ';
	$.fn.pagination.defaults.afterPageText = '§à§ä {pages}';
	$.fn.pagination.defaults.displayMsg = '§±§à§Ü§Ñ§Ù§Ñ§ß§Ú {from} §Ù§Ñ {to} §à§ä {total} §á§â§à§Õ§å§Ü§ä§Ú';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '§°§Ò§â§Ñ§Ò§à§ä§Ü§Ñ, §Þ§à§Ý§ñ §Ú§Ù§é§Ñ§Ü§Ñ§Û§ä§Ö ...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '§¥§à§Ò§â§Ö';
	$.messager.defaults.cancel = '§©§Ñ§Õ§â§Ñ§ã§Ü§Ó§Ñ§Þ';
}
$.map(['validatebox','textbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '§´§à§Ó§Ñ §á§à§Ý§Ö §Ö §Ù§Ñ§Õ§ì§Ý§Ø§Ú§ä§Ö§Ý§ß§à.';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '§®§à§Ý§ñ, §Ó§ì§Ó§Ö§Õ§Ö§ä§Ö §Ó§Ñ§Ý§Ú§Õ§Ö§ß §Ú§Þ§Ö§Û§Ý §Ñ§Õ§â§Ö§ã.';
	$.fn.validatebox.defaults.rules.url.message = '§®§à§Ý§ñ §Ó§ì§Ó§Ö§Õ§Ö§ä§Ö §Ó§Ñ§Ý§Ú§Õ§Ö§ß URL.';
	$.fn.validatebox.defaults.rules.length.message = '§®§à§Ý§ñ, §Ó§ì§Ó§Ö§Õ§Ö§ä§Ö §ã§ä§à§Û§ß§à§ã§ä §Þ§Ö§Ø§Õ§å {0} §Ú {1}.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['S','M','T','W','T','F','S'];
	$.fn.calendar.defaults.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '§¥§ß§Ö§ã';
	$.fn.datebox.defaults.closeText = '§¢§Ý§Ú§Ù§à';
	$.fn.datebox.defaults.okText = '§¥§à§Ò§â§Ö';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
