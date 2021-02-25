import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { third, sec, a1 } from "./colors"
function replace(msg: string) {
	return msg
		.replace("[ GOING OVER GUILDS ]", sec("[ GOING OVER GUILDS ]"))
		.replace("[ SHARD ]", sec("[ STARTING SHARD ]"))
		.replace("[ MAXSHARDS ]", third("[ SHARDING DONE ]"))
}
export const logger = createLogger({
	format: format.combine(
		format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
		format.printf((info: any): string => {
			const { timestamp, message, ...rest } = info;
			return a1(replace(message))
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
