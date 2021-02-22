/*
import { CommandOptions, Command } from "discord-akairo"
export enum Permissionlevel {
    Default,
    Superuser,
    Owner
}
export interface BotCommandOptions extends CommandOptions {
    permissionlevel?: Permissionlevel;
}
export class BotCommand extends Command {
    public permissionlevel: Permissionlevel
    public constructor(id: string, options?: BotCommandOptions) {
        super(id, options);
        if (!options.permissionlevel) {
            options.permissionlevel = Permissionlevel.Default
        }
        if (options.ownerOnly) {
            options.permissionlevel = Permissionlevel.Owner
        }
        if (options.permissionlevel == Permissionlevel.Owner) {
            options.ownerOnly = true
        }
        this.permissionlevel = options.permissionlevel
    }
}
*/