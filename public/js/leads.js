$('#popup-contact, #popup-request-call, #contactForm').submit(function (e) {
	e.preventDefault();

	const form = $(this);
	const url = form.attr('action');

	const onResult = function (modalOpener, modalCloser) {
		return function () {
			closeForm();
			closeCallForm();
			modalOpener();
			setTimeout(modalCloser, 3000);
		};
	};

	$.ajax({
		type: 'POST',
		url: url,
		data: form.serialize(),
		success: onResult(openThanksModal, closeThanksModal),
		error: onResult(openFailModal, closeFailModal)
	});
});
