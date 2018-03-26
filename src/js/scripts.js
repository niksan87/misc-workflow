bootstrap = require('bootstrap');
mustache = require('mustache');



jQuery(document).ready(function(){
	let jqxhr = $.get("data.json", {data: "value"}, function(json) {
		console.log(json.gallery);
		let template = $('#template').html();
		console.log(template);
		let showTemplate = mustache.render(template, json);
		$('#gallery').html(showTemplate);
	}, "json")
});