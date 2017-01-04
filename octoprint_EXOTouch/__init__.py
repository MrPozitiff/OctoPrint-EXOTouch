# coding=utf-8
from __future__ import absolute_import

from .api import EXOTouch_api
from .customization import EXOTouch_customization

import octoprint.plugin
import octoprint.settings
import octoprint.util
import os

class EXOTouch_core(	EXOTouch_api,
					EXOTouch_customization,
					octoprint.plugin.SettingsPlugin,
					octoprint.plugin.AssetPlugin,
					octoprint.plugin.TemplatePlugin,
					octoprint.plugin.StartupPlugin):

	def __init__(self):
		super(EXOTouch_core, self).__init__()
		self._whatsNewPath = os.path.dirname(__file__) + "/WHATSNEW.md"

	def on_settings_load(self):
		return self._load_custom_settings()
		
	def on_settings_save(self, data):
		self._save_custom_settings(data)

	def on_after_startup(self):
		self._check_customization()

	def get_template_vars(self):
		if os.path.isfile(self._customCssPath) and self._settings.get(["useCustomization"]):
			return dict(cssPath="./plugin/EXOTouch/static/css/EXOTouch.custom.css")
		else:
			return dict(cssPath="./plugin/EXOTouch/static/css/EXOTouch.css")

	def get_assets(self):
		return dict(
			js=["js/EXOTouch.libraries.js", "js/EXOTouch.bundled.js", "js/EXOTouch.bootstrap.js"]
		)

	def get_template_configs(self):
		files = [
			dict(type="generic", template="EXOTouch_modal.jinja2", custom_bindings=True),
			dict(type="settings", template="EXOTouch_settings.jinja2", custom_bindings=True),
			dict(type="navbar", template="EXOTouch_menu_item.jinja2", custom_bindings=True),
			dict(type="generic", template="EXOTouch_load_css.jinja2", custom_bindings=False)
		]

		if self._settings.get(["automaticallyLoad"]):
			files.append(
				dict(type="generic", template="EXOTouch_auto_load.jinja2", custom_bindings=False)
			)

		return files

	def get_settings_defaults(self):
		return dict(
			hasVisibleSettings=True,
			automaticallyLoad=True,
			useCustomization=False,
			colors=dict(
				mainColor="#00B0FF",
				termColor="#0F0",
				bgColor="#000",
				textColor="#FFF",
				customPath="",
				useLocalFile=False
			)
		)

	def get_version(self):
		return self._plugin_version

	def get_update_information(self):
		return dict(
			EXOTouch=dict(
				displayName="EXOTouch",
				displayVersion=self._plugin_version,
				type="github_release",
				user="BillyBlaze",
				repo="OctoPrint-EXOTouch",
				current=self._plugin_version,
				pip="https://github.com/BillyBlaze/OctoPrint-EXOTouch/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "EXOTouch"
def __plugin_load__():
	EXOTouch = EXOTouch_core()

	global __plugin_implementation__
	__plugin_implementation__ = EXOTouch

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information,
		"octoprint.server.http.bodysize": __plugin_implementation__.increase_upload_bodysize
	}
