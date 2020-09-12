$('#popup-contact').submit(function (e) {
	e.preventDefault();

	const form = $(this);
	const url = form.attr('action');

	$.ajax({
		type: 'POST',
		url: url,
		data: form.serialize(),
		success: function (data) {
			closeForm();
			closeCallForm();
			openThanksModal();
		}
	});
});
