import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {

    public static start(){

        const url = 'http://localhost:3000/posts';

        console.log('Server started');
        CronService.createJob('*/2 * * * * *', () => {

        new CheckService(
            () => console.log('Success callback executed:', url),
            ( error : string ) => console.log('Failure callback executed with error:', error, url)
        ).execute(url);

        });

    }

}