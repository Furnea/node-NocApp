import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDataSource()
);
export class Server {

    public static start(){

        const url = 'http://localhost:3000/posts';

        console.log('Server started');
        CronService.createJob('*/2 * * * * *', () => {

        new CheckService(
            fileSystemLogRepository,
            () => console.log('Success callback executed:', url),
            ( error : string ) => console.log('Failure callback executed with error:', error, url)
        ).execute(url);

        });

    }

}