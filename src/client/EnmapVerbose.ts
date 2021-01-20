import chalk from 'chalk';
/**
 * Called on every query to the Enmap internal database.
 * @param query The SQL query ran
 */
export default function EnmapVerbose(dbname: string, query: string): void {
    this.client.logger.info('i', `${chalk.blue('[')}${chalk.blue.bold('DatabaseQuery')}${chalk.blue(']')} ${chalk.underline('Query')} ${chalk.red(dbname)}: ${query}`);
}