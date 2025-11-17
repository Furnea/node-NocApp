import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//abstract class representing the log data
export abstract class LogDataSource {
    abstract saveLogs( log: LogEntity) : Promise<void>;
    abstract getLogs(severity: LogSeverityLevel): Promise<LogEntity[]>; 
}