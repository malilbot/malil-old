import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { red, blue, yellow, green, magenta, whiteBright, bgWhite, bgBlack, greenBright, cyanBright, white, cyan, bold, black, hex, reset } from "chalk";
function replace(msg: string) {
	return msg
		.replace("[ SHARD ]", magenta("[ STARTING SHARD ]"))
		.replace("[ MAXSHARDS ]", blue("[ SHARDING DONE ]"))
}
export const logger = createLogger({
	format: format.combine(
		format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
		format.printf((info: any): string => {
			const { timestamp, label, level, message, ...rest } = info;
			return replace(message)
		})
	),

	transports: [
		new transports.Console({
			format: format.colorize({ level: true }),
			level: "info"
		}),
		new DailyRotateFile({
			format: format.combine(format.timestamp(), format.json()),
			level: "debug",
			filename: "./Logs/listen-%DATE%.log",
			maxFiles: "10d"
		})
	]
});
