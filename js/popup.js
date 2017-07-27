!function($) {

	var checkbox = document.getElementById('nico-responsive-mode');

	// Load
	chrome.storage.local.get( 'nico_responsive_checked', function(result) {
		if ( result.nico_responsive_checked == true ) {
			checkbox.checked = true;
		} else {
			checkbox.checked = false;
		}
	});

	// Save
	checkbox.addEventListener( 'click', function() {
		if ( checkbox.checked ) {
			chrome.storage.local.set( { 'nico_responsive_checked': true } , function() {} );
		} else {
			chrome.storage.local.set( { 'nico_responsive_checked': false } , function() {} );
		}
	});

}(jQuery);