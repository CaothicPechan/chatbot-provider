'use strict';

var _config = require('./libs/config');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _wrLuLib = require('./wrlu-lib/wrLuLib');

var _wrLuLib2 = _interopRequireDefault(_wrLuLib);

var _init = require('./libs/init');

var _init2 = _interopRequireDefault(_init);

var _settings = require('./libs/settings');

var _settings2 = _interopRequireDefault(_settings);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _settings2.default)(app, _config.constants);
(0, _index2.default)(app);

(0, _init2.default)(app);

var chatbot = new _wrLuLib2.default(app, _config.constants);

chatbot.start(app, function (res) {
	if (res.code === 200) {
		if (res.payload) {
			try {

				if (res.payload.type == 'action') {
					chatbot.handleDefault(res);
					var sender = chatbot.getSender();
					console.log('Sender id catched -->');
					console.log(sender);
					chatbot.fbService.sendTextMessage(sender, 'Hi, text message from me');
				}
			} catch (err) {
				console.log('An error ocurred on chatbot process. Error: ' + err);
			}
		}
	}
});
//# sourceMappingURL=app.js.map