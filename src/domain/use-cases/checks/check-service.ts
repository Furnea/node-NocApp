import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute( url : string ) : Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type FailureCallback = (( error: string ) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly failureCallback: FailureCallback
    ){}

    public async execute( url : string ): Promise<boolean> {

        try {
            const request = await fetch( url );
            if( !request.ok ) throw new Error('Service not reachable');

            const log = new LogEntity( `Service at ${ url } is reachable.`, LogSeverityLevel.low);
            this.logRepository.saveLogs( log);
            this.successCallback && this.successCallback();

        } catch (error) {
            const log = new LogEntity( `Service at ${ url } is NOT reachable. Error: ${ String(error) }`, LogSeverityLevel.high);
            this.logRepository.saveLogs( log);
            this.failureCallback && this.failureCallback( String(error) );
            return false;
        }

        return true;
    }
}
