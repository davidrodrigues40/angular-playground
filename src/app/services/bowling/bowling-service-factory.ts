import { BowlingState } from "src/app/state/bowling.state";
import { BowlingService } from "./online/bowling/bowling.service";
import { OfflineBowlingService } from "./offline/offline-bowling.service";
import { BowlingServiceAbstract } from "./bowling-service.abstract";

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