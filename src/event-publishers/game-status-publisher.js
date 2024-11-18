import { Core } from "sc-game-base";

export default class GameStatusPublisher extends Core.BaseEventPublishers.GameStatusPublisher {
    publishToAllUsers(payload) {
        super.publishToAllUsers(payload);

        Object.values(this.gameData.viewPlayers).forEach((socket) => {
            socket && socket.emit(this.gameName, payload);
        });
    }
}
