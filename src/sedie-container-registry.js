import awilix from "awilix";
import { Table } from "sc-game-base";
import { SmartBotContainerRegistry } from "sc-smart-bot";

import PlaceBetConsumer from "./consumers/sedie-place-bet-consumer";
import SeDieSettleGameRoundConsumer from "./consumers/sedie-settle-game-round-consumer";
import { SedieBot, SedieGameCron } from "./crons";
import {
    SedieBets,
    SeDieRounds,
    SeDieSmartBotBetActions,
    SeDieSmartBotBetLogs,
    SeDieSmartBotPatterns,
    SedieTmpBets,
    SedieResults,
} from "./models";
import ViewConsumer from "./consumers/view-consumer";
import BaseViewRouter from "./routers/base-view-router";
import GameStatusPublisher from "./event-publishers/game-status-publisher";
import RoundResultPublisher from "./event-publishers/round-result-publisher";

const { asClass, asValue } = awilix;

export default class SeDieContainerRegistry extends Table.TableContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(SeDieRounds),
            betsRepository: asValue(SedieBets),
            tempBetsRepository: asValue(SedieTmpBets),
            betPatternRepository: asValue(SeDieSmartBotPatterns),
            betActionRepository: asValue(SeDieSmartBotBetActions),
            smartBotBetLogsRepository: asValue(SeDieSmartBotBetLogs),
            resultsRepository: asValue(SedieResults),
        });

        this.container.register(new SmartBotContainerRegistry().register());
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(PlaceBetConsumer).singleton(),
            settleGameRoundConsumer: asClass(SeDieSettleGameRoundConsumer).singleton().proxy(),
            viewConsumer: asClass(ViewConsumer).singleton(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(SedieBot).singleton(),
            gameCron: asClass(SedieGameCron).singleton().proxy(),
        });
    }

    registerRouters() {
        super.registerRouters();

        this.container.register({
            baseViewRouter: asClass(BaseViewRouter).proxy(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            gameStatusPublisher: asClass(GameStatusPublisher).singleton(),
            roundResultPublisher: asClass(RoundResultPublisher).singleton(),
        });
    }
}
