import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { startTrace } from "sc-instrument";

startTrace(appConfigs.otel?.enabled, appConfigs.otel?.endpoint, appConfigs.otel?.system, appConfigs.sentry.env, gameSettings.name);

import { Core, Table } from "sc-game-base";

import constants from "./constants";
import { generateResult, getSettlementResult, generateRawResultForHash } from "./helpers/result-helper";
import SeDieContainerRegistry from "./sedie-container-registry";
import SeDieDefinition from "./sedie-definition";
import { registerViewModule } from "./register-view-module";
import GameData from "./game-data";

const run = async () => {
    const definition = new SeDieDefinition(gameSettings, generateResult, getSettlementResult, generateRawResultForHash);
    const gameData = new GameData(gameSettings.durations.wholeRound, constants.resetTotalBets);
    gameData.viewPlayers = {};
    const container = new SeDieContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("SeDie", appConfigs);
    await app.run();
    await app.startGame(container);
    registerViewModule(app, container, definition);
};

run();
