'use strict';

$(document).ready(function() {
  initSearch();
  initAbout();
  initRecent();
  initViewAll();
  initCopy();
  initMobile();
});

function initSearch() {
  // cache vars
  var homepageBadges = $('.badges');
  var menu = $('.menu');

  var search = $('.search');
  var searchInput = $('.search-input');
  var searchResults = $('.search-results');

  var searchClosed = true;
  var firstCallback = true;

  $('.search-toggle').click(function(e) {
    // if search is closed
    if(searchClosed) {
      $('html, body').animate({ scrollTop: menu.offset().top }, 500, function() {
        // only on first callback
        if(firstCallback) {
          search.toggleClass('expanded');
          // give container max-size based on content
          searchResults.css( 'max-height', searchResults.get(0).scrollHeight );
          searchResults.toggleClass('expanded');
          homepageBadges.addClass('collapsed');
          searchInput.focus();



          firstCallback = false;
          searchClosed = false;
        }
      });
    }
    // if search is open
    else {
      search.toggleClass('expanded');
      // set container max-height back to 0
      searchResults.css( 'max-height', 0 );
      searchResults.removeClass('expanded');
      homepageBadges.toggleClass('collapsed');

      firstCallback = true;
      searchClosed = true;
    }
	});

	// cache vars
	var searchText;
	var searchItems = $('.search-list li');

	$('.search-input').keyup(function() {
	  // get search text, all lowercase
  	searchText = $(this).val().toLowerCase();

  	// remove match/not-match classes
  	searchItems.removeAttr('class');

  	if(searchText !== '') {
    	// find matches
      $('.search-list li[data-search*="' + searchText + '"]').addClass('match');

      // find not-matches
      $('.search-list li:not([data-search*="' + searchText + '"])').addClass('not-match');
  	}
	});
}

function initAbout() {
  $('.about-toggle').click(function(e) {
    e.preventDefault();
    $('.about').toggleClass('expanded');
    $('.badges').removeClass('collapsed');
  });
}

function initRecent() {
  $('.recent-toggle').click(function(e) {
    e.preventDefault();
    $('.badges').removeClass('collapsed');
    $('html, body').animate({ scrollTop: $('.badges').offset().top }, 500);
  });
}

function initViewAll() {
  $('.view-all, .view-all-toggle').click(function(e) {
    e.preventDefault();
    $('.search-toggle').click();
  });
}

function initCopy() {
  var clientCopy = new Clipboard('.copy');
  var clientInline = new Clipboard('.inline-copy');
}

function initMobile() {
  $('.mobile-about').click(function(e) {
    e.preventDefault();
    $('.about').toggleClass('expanded-mobile');
  });
}
