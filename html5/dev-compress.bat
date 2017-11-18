echo %Build%

uglifyjs ^
    src/data/GameData.js ^
    src/data/PlayerInfo.js ^
    src/game/board.js ^
    src/game/cell.js ^
    src/game/game.js ^
    src/server/server.js ^
    src/server/ServerCall.js ^
    src/GameAdManager.js ^
    src/Config.js ^
    src/topUI.js ^
    src/gameOverUI.js ^
    src/optionsUI.js ^
    src/MainGame.js ^
    src/app.js ^
	--beautify --source-map --verbose --define VERSION='%Build%' --output build/minesweeper.js
