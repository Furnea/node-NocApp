interface CheckServiceUseCase {
    execute( url : string ) : Promise<boolean>;
}

type SuccessCallback = () => void;
type FailureCallback = ( error: string ) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly failureCallback: FailureCallback
    ){}

    public async execute( url : string ): Promise<boolean> {

        try {
            const request = await fetch( url );
            if( !request.ok ) throw new Error('Service not reachable');

            this.successCallback();
        } catch (error) {
            this.failureCallback( String(error) );
            return false;
        }

        return true;
    }
}
