import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { third, sec, a1 } from "./colors"
function replace(msg: string) {
	return msg
		.replace("[ GOING OVER GUILDS ]", sec("[ GOING OVER GUILDS ]"))
		.replace("[ SHARD ]", sec("[ STARTING SHARD ]"))
		.replace("[ MAXSHARDS ]", third("[ SHARDING DONE ]"))
}
const { combine, timestamp, printf, json } = format
export const logger = createLogger({
	level: "info",
	format: combine(
		timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
		printf((info): string => {
			const { message } = info;
			return a1(replace(message))
		})
	),

	transports: [
		new transports.Console({
			level: "info"
		}),
		//replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "")
		//format.combine(format.timestamp(), format.json())
		new DailyRotateFile({
			format: combine(timestamp(), json()),
			level: "debug",
			zippedArchive: true,
			extension: ".log",
			filename: "./Logs/malil-%DATE%",
			maxFiles: "14d"
		})
	]
});
