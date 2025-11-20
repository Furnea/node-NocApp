import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fsLogRepository = new LogRepositoryImplementation(
   new FileSystemDataSource()
);
const postgresLogRepository = new LogRepositoryImplementation(
   new PostgresLogDatasource(),
);
const mongoLogRepository = new LogRepositoryImplementation(
   new MongoLogDataSource()
);

const emailService = new EmailService();

export class Server {

    public static start(){

        const url = 'http://google.com';

        console.log('Server started');
        CronService.createJob('*/2 * * * * *', () => {
        new CheckServiceMultiple(
            [fsLogRepository, mongoLogRepository, postgresLogRepository],
            () => console.log('Success callback executed:', url),
            ( error : string ) => console.log('Failure callback executed with error:', error, url)
        ).execute(url);
        });

    }

}