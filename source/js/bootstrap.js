!function() {

	var Touch = new EXOTouch();
	Touch.domLoading();

	$(function() {
		Touch.domReady();

		OCTOPRINT_VIEWMODELS.push([
			Touch.koStartup,
			Touch.EXOTouch_REQUIRED_VIEWMODELS,
			Touch.EXOTouch_ELEMENTS,
			Touch.EXOTouch_REQUIRED_VIEWMODELS
		]);
	});

}();
