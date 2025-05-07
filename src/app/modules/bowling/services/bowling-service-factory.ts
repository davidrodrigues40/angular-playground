import { BowlingState } from "../bowling.state";
import { BowlingServiceAbstract } from "./bowling-service.abstract";
import { OfflineBowlingService } from "./offline/offline-bowling.service";
import { BowlingService } from "./online/bowling/bowling.service";


const bowlingServiceFactory = () => {
    if (BowlingState.status() === 'online')
        return new BowlingService();

    return new OfflineBowlingService();
};

export const bowlingServiceProvider = {
    provide: BowlingServiceAbstract,
    useFactory: bowlingServiceFactory,
    deps: []
};