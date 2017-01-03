EXOTouch.prototype.core.version = {

	init: function(softwareUpdateViewModel) {
		var self = this;

		$("<span></span>").appendTo("#terminal-output");

		if(softwareUpdateViewModel) {

			softwareUpdateViewModel.versions.items.subscribe(function(changes) {

				EXOTouch = softwareUpdateViewModel.versions.getItem(function(elm) {
					return (elm.key === "EXOTouch");
				}, true) || false;

				if( EXOTouch !== false && EXOTouch.information !== null ) {
					var remote = Number(EXOTouch.information.remote.value.split('.').join('')),
						local = Number(EXOTouch.information.local.value.split('.').join(''));

					if(remote > local) {
						$("#touch_updates_css").remove();
						$('head').append('<style id="touch_updates_css">#term pre span:first-child:before{ content: "v'+EXOTouch.information.local.value+" outdated, new version: v"+EXOTouch.information.remote.value+'" !important; }</style>');
					} else {
						if( $("#touch_updates_css").length === 0 ) {
							$('head').append('<style id="touch_updates_css">#term pre span:first-child:before{ content: "v'+EXOTouch.information.local.value+'" !important; }</style>');
						}
					}
				}

			});

		}

	}

}
