'use strict';
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';

const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleString();

module.exports.logger = new (winston.Logger)({
	transports: [
		// colorize the output to the console
		new (winston.transports.Console)({
			timestamp: tsFormat,
			colorize: true,
			level: 'info'
		}),
		new (require('winston-daily-rotate-file'))({
			filename: `${logDir}/log`,
			timestamp: tsFormat,
			datePattern: 'YYYY-MM',
			prepend: true,
			level: env === 'development' ? 'verbose' : 'info'
		})
	]
});