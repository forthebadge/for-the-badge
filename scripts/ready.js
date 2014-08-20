$(document).ready(function() {
  initSearch();
  initCopy();
});

function initSearch() {
  $('.js-search-toggle').click(function() {
  	$('.search').toggleClass('expanded');
  	$('.js-search').focus();
	});
}

function initCopy() {
  ZeroClipboard.config({ swfPath: 'scripts/ZeroClipboard.swf' });
  var client = new ZeroClipboard($('.copy'));
}