import fs from 'fs';

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDataSource implements LogDataSource {

private readonly logPath: string = 'logs/';
private readonly AllLogsPath: string = 'logs/logs_low.log';
private readonly MediumLogsPath: string = 'logs/logs_medium.log';
private readonly HighLogsPath: string = 'logs/logs_high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath))
            fs.mkdirSync(this.logPath);
        [
            this.AllLogsPath,
            this.MediumLogsPath,
            this.HighLogsPath
        ].forEach( path => {
            if(!fs.existsSync(path))
                fs.writeFileSync(path, '');
        });

    }

    async saveLog( newLog: LogEntity ): Promise<void> {
        fs.appendFileSync( this.AllLogsPath, `${ JSON.stringify(newLog) }\n` );
        if( newLog.level == LogSeverityLevel.low ) return Promise.resolve();
        if( newLog.level == LogSeverityLevel.medium )
            fs.appendFileSync( this.MediumLogsPath, `${ JSON.stringify(newLog) }\n` );
        else
            fs.appendFileSync( this.HighLogsPath, `${ JSON.stringify(newLog) }\n` );
        return Promise.resolve();
        }

    saveLogs(log: LogEntity): Promise<void> {
        return this.saveLog(log);
    }

    private getLogsFromFile( path:string ): LogEntity[] {
        const content = fs.readFileSync( path, { encoding: 'utf-8' } );
        const logs = content.split('\n').map(LogEntity.fromJSON);

        return logs;
    }

    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch(severity){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.AllLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.MediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.HighLogsPath);
        }
    }
}