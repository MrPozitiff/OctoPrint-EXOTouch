EXOTouch.prototype.core.bridge = function() {
	var self = this;

	this.core.bridge = {

		allViewModels: {},
		EXOTouch_REQUIRED_VIEWMODELS: [
			"terminalViewModel",
			"connectionViewModel",
			"settingsViewModel",
			"softwareUpdateViewModel",
			"controlViewModel",
			"gcodeFilesViewModel",
			"navigationViewModel",
			"pluginManagerViewModel",
			"temperatureViewModel",
			"loginStateViewModel"
		],
		EXOTouch_ELEMENTS: [
			"#EXOTouch_settings_dialog",
			"#settings_plugin_EXOTouch",
			"#navbar_plugin_EXOTouch"
		],

		domLoading: function() {
			if (self.isActive()) {
				self.scroll.beforeLoad.call(self);
				self.DOM.init.call(self);
			}
		},

		domReady: function() {
			if (self.isActive()) {

				if(_.some(self.core.bridge.OCTOPRINT_VIEWMODELS, function(v) { return v[2] === "#gcode"; })) {
					self.core.bridge.EXOTouch_REQUIRED_VIEWMODELS = self.core.bridge.EXOTouch_REQUIRED_VIEWMODELS.concat(["gcodeViewModel"]);
				}

				self.components.dropdown.init.call(self);
				self.components.fullscreen.init.call(self);
				self.components.keyboard.init.call(self);
				self.components.modal.init.call(self);
				self.components.touchList.init.call(self);
				self.components.slider.init.call(self);

				self.scroll.init.call(self);
			}
		},

		koStartup: function EXOTouchViewModel(viewModels) {
			self.core.bridge.allViewModels = _.object(self.core.bridge.EXOTouch_REQUIRED_VIEWMODELS, viewModels);
			self.knockout.isLoading.call(self, self.core.bridge.allViewModels);
			return self;
		}
	}

	return this.core.bridge;
}
