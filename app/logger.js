/**
 * Exports the getLogger function, so this module can be used like:
 *
 * {@example var logger = require('./logger')('context name')}
 *
 * Then the typical trace, debug, info, warn, error and fatal can be used on it.
 *
 */
var log4js = require('log4js');
var config = require('./config');

var levels = log4js.levels;
var log_level =
		{
			'all': levels.ALL,
			'trace': levels.TRACE,
			'info': levels.INFO,
			'debug': levels.DEBUG,
			'warn': levels.WARN,
			'off': levels.OFF
		}[config.log_level] || levels.ALL;
log4js.setGlobalLogLevel(log_level);

module.exports = log4js.getLogger;
