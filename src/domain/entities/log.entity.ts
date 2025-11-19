
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high' 
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ){
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = new Date();
    }

    static fromJSON( jsonString: string ): LogEntity {
        const { message, level, createdAt } = JSON.parse(jsonString);
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin: origin
        });
        return log;
    }

    static fromObject = ( object : { [key: string]: any}): LogEntity => {
        const { message, level, createdAt, origin} = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });
        return log;
    }
}