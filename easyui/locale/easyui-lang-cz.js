if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = 'Strana';
	$.fn.pagination.defaults.afterPageText = 'z {pages}';
	$.fn.pagination.defaults.displayMsg = 'Zobrazuji z¨¢znam {from} a? {to} z {total}.';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'Pracuji, ?ekejte pros¨ªm¡­';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'Ok';
	$.messager.defaults.cancel = 'Zru?it';
}
$.map(['validatebox','textbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = 'Toto pole je vy?adov¨¢no.';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = 'Zadejte, pros¨ªm, platnou e-mailovou adresu.';
	$.fn.validatebox.defaults.rules.url.message = 'Zadejte, pros¨ªm, platnou adresu URL.';
	$.fn.validatebox.defaults.rules.length.message = 'Zadejte, pros¨ªm, hodnotu mezi {0} a {1}.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['N','P','¨²','S','?','P','S']; //ned¨§le pond¨§l¨ª ¨²tery st?eda ?tvrtek p¨¢tek sobota
	$.fn.calendar.defaults.months = ['led', '¨²nr', 'b?e', 'dub', 'kv¨§', '?vn', '?vc', 'srp', 'z¨¢?', '?¨ªj', 'lis', 'pro']; //leden ¨²nor b?ezen duben kv¨§ten ?erven ?ervenec srpen z¨¢?¨ª ?¨ªjen listopad prosinec
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = 'Dnes';
	$.fn.datebox.defaults.closeText = 'Zav?¨ªt';
	$.fn.datebox.defaults.okText = 'Ok';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
