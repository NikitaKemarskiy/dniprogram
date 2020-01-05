function openCallForm() {
	$('#callback-popup-wrapper').css('visibility', 'visible');
	$('#callback-popup-wrapper').css('opacity', 1);
}

function closeCallForm() {
	$('#callback-popup-wrapper').css('opacity', 0);
	$('#callback-popup-wrapper').css('visibility', 'hidden');
}