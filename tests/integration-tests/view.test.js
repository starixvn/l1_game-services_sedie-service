import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { viewSocketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";

export const viewTest = () => {
    describe("when view only player joins game", () => {
        let driver;
        let id = 123;
        beforeAll(async () => {
            driver = new GameClientDriver(viewSocketOptions, initUserSession(normalUser));
            driver.emit(eventTypes.inGame, { id });
        });

        afterAll(() => {
            driver.close();
        });

        it("should return game configs", async () => {
            // Arrange

            // Act
            const result = await driver.handleGameEvent((data) => data[id] && data[id].gameConfigs);
            console.log("result", result);
            const { gameConfigs } = result[id];

            // Assert
            expect(gameConfigs.originalOdds).toStrictEqual({
                even: 1.97,
                odd: 1.97,
                red2: 2.5,
                red3: 3.76,
                red4: 14.5,
                white3: 3.76,
                white4: 14.5,
            });
        });

        it("should return settled finish data", async () => {
            // Arrange

            // Act
            const result = await driver.handleGameEvent((data) => data.finish);
            console.log("finish", result);

            // Assert
            expect(result.resultHash.rawValue).not.toBeNull();
        });
    });
};
