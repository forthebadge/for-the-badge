$(document).ready(function() {
	$('.js-search-toggle').click(function() {
  	$('.search').toggleClass('expanded');
  	$('.js-search').focus();
	});
});