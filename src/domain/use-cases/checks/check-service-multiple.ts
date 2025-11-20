import { LogEntity, LogSeverityLevel, LogEntityOptions} from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute( url : string ) : Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type FailureCallback = (( error: string ) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly failureCallback: FailureCallback
    ){}

    private callLogs( log: LogEntity){
        this.logRepository.forEach( logRepository => {
            logRepository.saveLogs(log);
        });
    }

    public async execute( url : string ): Promise<boolean> {

        try {
            const request = await fetch( url );
            if( !request.ok ) throw new Error('Service not reachable');

            const options: LogEntityOptions = {
                message: `Service at ${ url } is reachable.`,
                level: LogSeverityLevel.low,
                origin: 'CheckService'
            };
            const log = new LogEntity( options );
            this.callLogs(log);
            this.successCallback && this.successCallback();

        } catch (error) {
            const options: LogEntityOptions = {
                message: `Service at ${ url } is NOT reachable. Error: ${ String(error) }`,
                level: LogSeverityLevel.high,
                origin: 'CheckService'
            };
            const log = new LogEntity( options );
            this.callLogs(log);
            this.failureCallback && this.failureCallback( String(error) );
            return false;
        }

        return true;
    }
}
