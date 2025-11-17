import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImplementation implements LogRepository {



    constructor(
        private logDataSource: LogDataSource,
    ){}

    async saveLogs(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLogs(log);
    }
    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severity);
        
    }

}