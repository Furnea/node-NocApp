import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDataSource()
);
const emailService = new EmailService();

export class Server {

    public static start(){

        // const url = 'http://localhost:3000/posts';

        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        )
        .execute('to_email@gmail.com')

        // 
        // emailService.sendEmailWithFileSystemLogs([
        //     'furnearoberto@gmail.com'
        // ]);


        // console.log('Server started');
        // CronService.createJob('*/2 * * * * *', () => {

        // new CheckService(
        //     fileSystemLogRepository,
        //     () => console.log('Success callback executed:', url),
        //     ( error : string ) => console.log('Failure callback executed with error:', error, url)
        // ).execute(url);
        //});

    }

}