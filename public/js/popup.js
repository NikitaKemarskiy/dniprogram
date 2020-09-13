function openForm() {
	//$('#popup-wrapper').css('display', 'flex');
	$('#popup-wrapper').css('visibility', 'visible');
	$('#popup-wrapper').css('opacity', 1);
}

function closeForm() {
	//$('#popup-wrapper').css('display', 'none');
	$('#popup-wrapper').css('opacity', 0);
	$('#popup-wrapper').css('visibility', 'hidden');
}

function openThanksModal() {
	//$('#popup-wrapper').css('display', 'flex');
	$('#thanks-popup-wrapper').css('visibility', 'visible');
	$('#thanks-popup-wrapper').css('opacity', 1);
}

function closeThanksModal() {
	$('#thanks-popup-wrapper').css('opacity', 0);
	$('#thanks-popup-wrapper').css('visibility', 'hidden');
}

function openFailModal() {
	//$('#popup-wrapper').css('display', 'flex');
	$('#fail-popup-wrapper').css('visibility', 'visible');
	$('#fail-popup-wrapper').css('opacity', 1);
}

function closeFailModal() {
	$('#fail-popup-wrapper').css('opacity', 0);
	$('#fail-popup-wrapper').css('visibility', 'hidden');
}
