function GameData() {
    GameData.instance = this, this.client = new ClientJS(), this.playerInfo = null, 
    this.data = null, this.users = {}, this.gameType = 0, this.colls = 9, this.rows = 9, 
    this.bombs = 10, this.customColls = 9, this.customRows = 9, this.customBombs = 10;
}

function PlayerInfo(id, name, url) {
    PlayerInfo.instance = this, this.id = id, this.name = name, this.url = url, this.token = null, 
    this.coins = 0, this.hasData = !1, this.stats = {
        beginner: {
            played: 0,
            won: 0,
            fastestTime: 999999,
            totalTime: 0,
            winStreak: 0,
            loseStreak: 0,
            curWinStreak: 0,
            curLoseStreak: 0
        },
        medium: {
            played: 0,
            won: 0,
            fastestTime: 999999,
            totalTime: 0,
            winStreak: 0,
            loseStreak: 0,
            curWinStreak: 0,
            curLoseStreak: 0
        },
        difficult: {
            played: 0,
            won: 0,
            fastestTime: 999999,
            totalTime: 0,
            winStreak: 0,
            loseStreak: 0,
            curWinStreak: 0,
            curLoseStreak: 0
        },
        custom: {
            played: 0,
            won: 0,
            fastestTime: 999999,
            totalTime: 0,
            winStreak: 0,
            loseStreak: 0,
            curWinStreak: 0,
            curLoseStreak: 0
        }
    };
}

function Board(game) {
    PIXI.Container.call(this), this.game = game, this.cellSize = 128, this.board = [], 
    this.bombStack = {}, this.mark = !1, this.touch = !1, this.lastTouch = null, this.canMove = !1, 
    this.playing = !1;
}

function Cell(x, y, isBomb) {
    PIXI.Sprite.call(this), this.posx = x, this.posy = y, this.isBomb = isBomb, this.activeNeighbours = 0, 
    this.neighbours = [], this.revealed = !1, this.flagged = !1;
}

function Game() {
    PIXI.Container.call(this), this.over = !1, this.board = new Board(this), this.addChild(this.board), 
    this.moves = 0, this.bombs = 0, this.time = 0, this.active = !1, this.lastX = 0, 
    this.lastY = 0, this.lost = !1, this.gameType = 0;
}

function GameAdManager() {
    JCAdManager.instance = this, this.adSpaceCodes = {};
}

function Config() {
    Config.instance = this, this.ScreenWidth = 640, this.ScreenHeight = 1070;
}

function TopUI(game) {
    PIXI.Container.call(this), this.game = game, this.image = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.image.tint = 10526880, this.image.anchor.x = 0, this.image.anchor.y = 0, this.image.width = Config.instance.ScreenWidth, 
    this.image.height = 64, this.image.interactive = !0, this.addChild(this.image), 
    this.black = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), this.black.tint = 0, 
    this.black.anchor.x = .5, this.black.anchor.y = .5, this.black.position.x = Config.instance.ScreenWidth / 2, 
    this.black.position.y = 32, this.black.width = 256, this.black.height = 48, this.addChild(this.black), 
    this.movesText = new PIXI.Text("000", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.movesText.position.x = Config.instance.ScreenWidth / 2 + 76, this.movesText.position.y = 32, 
    this.movesText.anchor.set(.5, .5), this.movesText.scale.set(1, 1), this.addChild(this.movesText), 
    this.bombsText = new PIXI.Text("000", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.bombsText.position.x = Config.instance.ScreenWidth / 2 - 76, this.bombsText.position.y = 32, 
    this.bombsText.anchor.set(.5, .5), this.bombsText.scale.set(1, 1), this.addChild(this.bombsText), 
    this.newGame = new PIXI.Sprite(PIXI.Texture.fromImage("std_game.png")), this.newGame.anchor.x = .5, 
    this.newGame.anchor.y = .5, this.newGame.position.x = Config.instance.ScreenWidth / 2, 
    this.newGame.position.y = 32, this.newGame.width = 48, this.newGame.height = 48, 
    this.newGame.interactive = !0, this.newGame.on("pointerup", this.onNewGame), this.addChild(this.newGame), 
    this.options = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), this.options.tint = 6316128, 
    this.options.anchor.x = 0, this.options.anchor.y = .5, this.options.position.x = 8, 
    this.options.position.y = 32, this.options.width = 128, this.options.height = 48, 
    this.options.interactive = !0, this.options.on("pointerup", this.onOptions), this.addChild(this.options), 
    this.optionsText = new PIXI.Text("Menu", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.optionsText.position.x = 72, this.optionsText.position.y = 32, this.optionsText.anchor.set(.5, .5), 
    this.optionsText.scale.set(1, 1), this.addChild(this.optionsText), this.flag = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.flag.tint = 6316128, this.flag.anchor.x = 1, this.flag.anchor.y = .5, this.flag.position.x = Config.instance.ScreenWidth - 8, 
    this.flag.position.y = 32, this.flag.width = 128, this.flag.height = 48, this.flag.interactive = !0, 
    this.flag.on("pointerup", this.onFlag), this.addChild(this.flag), this.flagText = new PIXI.Text("Flag", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.flagText.position.x = Config.instance.ScreenWidth - 8 - 64, this.flagText.position.y = 32, 
    this.flagText.anchor.set(.5, .5), this.flagText.scale.set(1, 1), this.addChild(this.flagText);
}

function GameOverUI(game) {
    PIXI.Container.call(this), this.game = game, this.back = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.back.tint = 0, this.back.anchor.x = .5, this.back.anchor.y = .5, this.back.width = 308, 
    this.back.height = 308, this.addChild(this.back), this.image = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.image.tint = 15790320, this.image.anchor.x = .5, this.image.anchor.y = .5, 
    this.image.width = 300, this.image.height = 300, this.addChild(this.image), this.winText = new PIXI.Text("You Win", {
        fontFamily: "Arial",
        fontSize: 60,
        fill: "green",
        align: "center"
    }), this.winText.position.x = 0, this.winText.position.y = -110, this.winText.anchor.set(.5, .5), 
    this.winText.scale.set(1, 1), this.addChild(this.winText), this.happy = new PIXI.Sprite(PIXI.Texture.fromImage("happy.png")), 
    this.happy.anchor.x = .5, this.happy.anchor.y = .5, this.happy.position.x = 0, this.happy.position.y = -10, 
    this.addChild(this.happy), this.newGame = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.newGame.tint = 6316128, this.newGame.anchor.x = .5, this.newGame.anchor.y = .5, 
    this.newGame.position.x = 0, this.newGame.position.y = 100, this.newGame.width = 200, 
    this.newGame.height = 48, this.newGame.interactive = !0, this.newGame.on("pointerup", this.onNewGame), 
    this.addChild(this.newGame), this.newGameText = new PIXI.Text("New Game", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.newGameText.position.x = 0, this.newGameText.position.y = 100, this.newGameText.anchor.set(.5, .5), 
    this.newGameText.scale.set(1, 1), this.addChild(this.newGameText);
}

function OptionsUI(game) {
    PIXI.Container.call(this), this.game = game, this.image = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.image.tint = 14540253, this.image.anchor.x = 0, this.image.anchor.y = 0, this.image.width = Config.instance.ScreenWidth, 
    this.image.height = Config.instance.ScreenHeight, this.addChild(this.image), this.image = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.image.tint = 10526880, this.image.anchor.x = 0, this.image.anchor.y = 0, this.image.width = Config.instance.ScreenWidth, 
    this.image.height = 64, this.addChild(this.image), this.done = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.done.tint = 6316128, this.done.anchor.x = 0, this.done.anchor.y = .5, this.done.position.x = 10, 
    this.done.position.y = 32, this.done.width = 128, this.done.height = 48, this.done.interactive = !0, 
    this.done.on("pointerup", this.onDone), this.addChild(this.done), this.doneText = new PIXI.Text("Done", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.doneText.position.x = 74, this.doneText.position.y = 32, this.doneText.anchor.set(.5, .5), 
    this.doneText.scale.set(1, 1), this.addChild(this.doneText), this.settings = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.settings.tint = 6316128, this.settings.anchor.x = 1, this.settings.anchor.y = .5, 
    this.settings.position.x = 300, this.settings.position.y = 32, this.settings.width = 140, 
    this.settings.height = 48, this.settings.interactive = !0, this.settings.on("pointerup", this.onSettings.bind(this)), 
    this.addChild(this.settings), this.settingText = new PIXI.Text("Settings", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.settingText.position.x = 230, this.settingText.position.y = 32, this.settingText.anchor.set(.5, .5), 
    this.settingText.scale.set(1, 1), this.addChild(this.settingText), this.stats = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.stats.tint = 6316128, this.stats.anchor.x = 1, this.stats.anchor.y = .5, this.stats.position.x = 460, 
    this.stats.position.y = 32, this.stats.width = 140, this.stats.height = 48, this.stats.interactive = !0, 
    this.stats.on("pointerup", this.onStats.bind(this)), this.addChild(this.stats), 
    this.statsText = new PIXI.Text("Stats", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.statsText.position.x = 390, this.statsText.position.y = 32, this.statsText.anchor.set(.5, .5), 
    this.statsText.scale.set(1, 1), this.addChild(this.statsText), this.leaderBoard = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.leaderBoard.tint = 6316128, this.leaderBoard.anchor.x = 1, this.leaderBoard.anchor.y = .5, 
    this.leaderBoard.position.x = 630, this.leaderBoard.position.y = 32, this.leaderBoard.width = 150, 
    this.leaderBoard.height = 48, this.leaderBoard.interactive = !0, this.leaderBoard.on("pointerup", this.onLeaderBoard.bind(this)), 
    this.addChild(this.leaderBoard), this.leaderBoardText = new PIXI.Text("Leader Boards", {
        fontFamily: "Arial",
        fontSize: 22,
        fill: "white",
        align: "center"
    }), this.leaderBoardText.position.x = 555, this.leaderBoardText.position.y = 32, 
    this.leaderBoardText.anchor.set(.5, .5), this.leaderBoardText.scale.set(1, 1), this.addChild(this.leaderBoardText), 
    this.settingsContainer = new PIXI.Container(), this.settingsContainer.renderable = this.settingsContainer.interactiveChildren = !0, 
    this.addChild(this.settingsContainer), this.gameSizeText = new PIXI.Text("Difficulty", {
        fontFamily: "Arial",
        fontSize: 40,
        fill: "black",
        align: "left"
    }), this.gameSizeText.position.x = 20, this.gameSizeText.position.y = 100, this.gameSizeText.anchor.set(0, .5), 
    this.gameSizeText.scale.set(1, 1), this.settingsContainer.addChild(this.gameSizeText), 
    this.gameSmallText = new PIXI.Text("Small 9 x 9, 10 Bombs", {
        fontFamily: "Arial",
        fontSize: 34,
        fill: "black",
        align: "left"
    }), this.gameSmallText.position.x = 50, this.gameSmallText.position.y = 155, this.gameSmallText.anchor.set(0, .5), 
    this.gameSmallText.scale.set(1, 1), this.settingsContainer.addChild(this.gameSmallText), 
    this.smallSelect = new PIXI.Sprite(PIXI.Texture.fromImage("std_blank.png")), this.smallSelect.anchor.set(.5, .5), 
    this.smallSelect.position.set(600, 155), this.smallSelect.width = 50, this.smallSelect.height = 50, 
    this.smallSelect.interactive = !0, this.smallSelect.on("pointerup", this.onSmallGame.bind(this)), 
    this.settingsContainer.addChild(this.smallSelect), this.gameMediumText = new PIXI.Text("Meduim 16 x 16, 40 Bombs", {
        fontFamily: "Arial",
        fontSize: 34,
        fill: "black",
        align: "left"
    }), this.gameMediumText.position.x = 50, this.gameMediumText.position.y = 215, this.gameMediumText.anchor.set(0, .5), 
    this.gameMediumText.scale.set(1, 1), this.settingsContainer.addChild(this.gameMediumText), 
    this.mediumSelect = new PIXI.Sprite(PIXI.Texture.fromImage("std_blank.png")), this.mediumSelect.anchor.set(.5, .5), 
    this.mediumSelect.position.set(600, 215), this.mediumSelect.width = 50, this.mediumSelect.height = 50, 
    this.mediumSelect.interactive = !0, this.mediumSelect.on("pointerup", this.onMediumGame.bind(this)), 
    this.settingsContainer.addChild(this.mediumSelect), this.gameHardText = new PIXI.Text("Hard 16 x 30, 99 Bombs", {
        fontFamily: "Arial",
        fontSize: 34,
        fill: "black",
        align: "left"
    }), this.gameHardText.position.x = 50, this.gameHardText.position.y = 275, this.gameHardText.anchor.set(0, .5), 
    this.gameHardText.scale.set(1, 1), this.settingsContainer.addChild(this.gameHardText), 
    this.hardSelect = new PIXI.Sprite(PIXI.Texture.fromImage("std_blank.png")), this.hardSelect.anchor.set(.5, .5), 
    this.hardSelect.position.set(600, 275), this.hardSelect.width = 50, this.hardSelect.height = 50, 
    this.hardSelect.interactive = !0, this.hardSelect.on("pointerup", this.onHardGame.bind(this)), 
    this.settingsContainer.addChild(this.hardSelect), this.gameCustomText = new PIXI.Text("Custom", {
        fontFamily: "Arial",
        fontSize: 34,
        fill: "black",
        align: "left"
    }), this.gameCustomText.position.x = 50, this.gameCustomText.position.y = 335, this.gameCustomText.anchor.set(0, .5), 
    this.gameCustomText.scale.set(1, 1), this.settingsContainer.addChild(this.gameCustomText), 
    this.customSelect = new PIXI.Sprite(PIXI.Texture.fromImage("std_blank.png")), this.customSelect.anchor.set(.5, .5), 
    this.customSelect.position.set(600, 335), this.customSelect.width = 50, this.customSelect.height = 50, 
    this.customSelect.interactive = !0, this.customSelect.on("pointerup", this.onCustomGame.bind(this)), 
    this.settingsContainer.addChild(this.customSelect), this.rowsText = new PIXI.Text("Rows 9", {
        fontFamily: "Arial",
        fontSize: 34,
        fill: "black",
        align: "center"
    }), this.rowsText.position.x = 320, this.rowsText.position.y = 395, this.rowsText.anchor.set(.5, .5), 
    this.rowsText.scale.set(1, 1), this.settingsContainer.addChild(this.rowsText), this.rowsDown = new PIXI.Sprite(PIXI.Texture.fromImage("std_right.png")), 
    this.rowsDown.anchor.set(.5, .5), this.rowsDown.position.set(180, 395), this.rowsDown.width = -50, 
    this.rowsDown.height = 50, this.rowsDown.interactive = !0, this.rowsDown.on("pointerup", this.onRowsDown.bind(this)), 
    this.settingsContainer.addChild(this.rowsDown), this.rowsUp = new PIXI.Sprite(PIXI.Texture.fromImage("std_right.png")), 
    this.rowsUp.anchor.set(.5, .5), this.rowsUp.position.set(460, 395), this.rowsUp.width = 50, 
    this.rowsUp.height = 50, this.rowsUp.interactive = !0, this.rowsUp.on("pointerup", this.onRowsUp.bind(this)), 
    this.settingsContainer.addChild(this.rowsUp), this.collsText = new PIXI.Text("Columns 9", {
        fontFamily: "Arial",
        fontSize: 34,
        fill: "black",
        align: "center"
    }), this.collsText.position.x = 320, this.collsText.position.y = 455, this.collsText.anchor.set(.5, .5), 
    this.collsText.scale.set(1, 1), this.settingsContainer.addChild(this.collsText), 
    this.collsDown = new PIXI.Sprite(PIXI.Texture.fromImage("std_right.png")), this.collsDown.anchor.set(.5, .5), 
    this.collsDown.position.set(180, 455), this.collsDown.width = -50, this.collsDown.height = 50, 
    this.collsDown.interactive = !0, this.collsDown.on("pointerup", this.onCollsDown.bind(this)), 
    this.settingsContainer.addChild(this.collsDown), this.collsUp = new PIXI.Sprite(PIXI.Texture.fromImage("std_right.png")), 
    this.collsUp.anchor.set(.5, .5), this.collsUp.position.set(460, 455), this.collsUp.width = 50, 
    this.collsUp.height = 50, this.collsUp.interactive = !0, this.collsUp.on("pointerup", this.onCollsUp.bind(this)), 
    this.settingsContainer.addChild(this.collsUp), this.bombsText = new PIXI.Text("Bombs 10", {
        fontFamily: "Arial",
        fontSize: 34,
        fill: "black",
        align: "center"
    }), this.bombsText.position.x = 320, this.bombsText.position.y = 515, this.bombsText.anchor.set(.5, .5), 
    this.bombsText.scale.set(1, 1), this.settingsContainer.addChild(this.bombsText), 
    this.bombsDown = new PIXI.Sprite(PIXI.Texture.fromImage("std_right.png")), this.bombsDown.anchor.set(.5, .5), 
    this.bombsDown.position.set(180, 515), this.bombsDown.width = -50, this.bombsDown.height = 50, 
    this.bombsDown.interactive = !0, this.bombsDown.on("pointerup", this.onBombsDown.bind(this)), 
    this.settingsContainer.addChild(this.bombsDown), this.bombsUp = new PIXI.Sprite(PIXI.Texture.fromImage("std_right.png")), 
    this.bombsUp.anchor.set(.5, .5), this.bombsUp.position.set(460, 515), this.bombsUp.width = 50, 
    this.bombsUp.height = 50, this.bombsUp.interactive = !0, this.bombsUp.on("pointerup", this.onBombsUp.bind(this)), 
    this.settingsContainer.addChild(this.bombsUp), this.newGame = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.newGame.tint = 6316128, this.newGame.anchor.x = .5, this.newGame.anchor.y = .5, 
    this.newGame.position.x = 320, this.newGame.position.y = 600, this.newGame.width = 180, 
    this.newGame.height = 48, this.newGame.interactive = !0, this.newGame.on("pointerup", this.onNewGame.bind(this)), 
    this.settingsContainer.addChild(this.newGame), this.newGameText = new PIXI.Text("New Game", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: "white",
        align: "center"
    }), this.newGameText.position.x = 320, this.newGameText.position.y = 600, this.newGameText.anchor.set(.5, .5), 
    this.newGameText.scale.set(1, 1), this.settingsContainer.addChild(this.newGameText), 
    this.statsContainer = new PIXI.Container(), this.statsContainer.renderable = this.statsContainer.interactiveChildren = !1, 
    this.addChild(this.statsContainer), this.gamesPlayedText = new PIXI.Text("Total Games Played: 0", {
        fontFamily: "Arial",
        fontSize: 24,
        fill: "black",
        align: "center"
    }), this.gamesPlayedText.position.x = 320, this.gamesPlayedText.position.y = 100, 
    this.gamesPlayedText.anchor.set(.5, .5), this.gamesPlayedText.scale.set(1, 1), this.statsContainer.addChild(this.gamesPlayedText), 
    this.gamesWonText = new PIXI.Text("Total Games Won: 0", {
        fontFamily: "Arial",
        fontSize: 24,
        fill: "black",
        align: "center"
    }), this.gamesWonText.position.x = 320, this.gamesWonText.position.y = 130, this.gamesWonText.anchor.set(.5, .5), 
    this.gamesWonText.scale.set(1, 1), this.statsContainer.addChild(this.gamesWonText), 
    this.gamesRatioText = new PIXI.Text("Total Win Ratio: 0", {
        fontFamily: "Arial",
        fontSize: 24,
        fill: "black",
        align: "center"
    }), this.gamesRatioText.position.x = 320, this.gamesRatioText.position.y = 160, 
    this.gamesRatioText.anchor.set(.5, .5), this.statsContainer.addChild(this.gamesRatioText), 
    this.beginner = new PIXI.Container(), this.beginner.position.x = 0, this.beginner.position.y = 200, 
    this.statsContainer.addChild(this.beginner), this.beginnerImage = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.beginnerImage.tint = 11579568, this.beginnerImage.position.set(0, 0), this.beginnerImage.width = Config.instance.ScreenWidth, 
    this.beginnerImage.height = 40, this.beginner.addChild(this.beginnerImage), this.beginnerImageText = new PIXI.Text("Beginner", {
        fontFamily: "Arial",
        fontSize: 30,
        fill: "black",
        align: "left"
    }), this.beginnerImageText.position.x = 20, this.beginnerImageText.position.y = 20, 
    this.beginnerImageText.anchor.set(0, .5), this.beginner.addChild(this.beginnerImageText), 
    this.beginnerPlayedText = new PIXI.Text("Games Played: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.beginnerPlayedText.position.x = 20, this.beginnerPlayedText.position.y = 60, 
    this.beginnerPlayedText.anchor.set(0, .5), this.beginnerPlayedText.scale.set(1, 1), 
    this.beginner.addChild(this.beginnerPlayedText), this.beginnerWonText = new PIXI.Text("Games Won: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.beginnerWonText.position.x = 20, this.beginnerWonText.position.y = 90, 
    this.beginnerWonText.anchor.set(0, .5), this.beginnerWonText.scale.set(1, 1), this.beginner.addChild(this.beginnerWonText), 
    this.beginnerRatioText = new PIXI.Text("Win Ratio: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.beginnerRatioText.position.x = 20, this.beginnerRatioText.position.y = 120, 
    this.beginnerRatioText.anchor.set(0, .5), this.beginner.addChild(this.beginnerRatioText), 
    this.beginnerFastestText = new PIXI.Text("Fastest Time: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.beginnerFastestText.position.x = 20, this.beginnerFastestText.position.y = 150, 
    this.beginnerFastestText.anchor.set(0, .5), this.beginner.addChild(this.beginnerFastestText), 
    this.beginnerAverageText = new PIXI.Text("Average Time: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.beginnerAverageText.position.x = 620, this.beginnerAverageText.position.y = 60, 
    this.beginnerAverageText.anchor.set(1, .5), this.beginnerAverageText.scale.set(1, 1), 
    this.beginner.addChild(this.beginnerAverageText), this.beginnerWinStreakText = new PIXI.Text("Longest Win Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.beginnerWinStreakText.position.x = 620, this.beginnerWinStreakText.position.y = 90, 
    this.beginnerWinStreakText.anchor.set(1, .5), this.beginnerWinStreakText.scale.set(1, 1), 
    this.beginner.addChild(this.beginnerWinStreakText), this.beginnerLoseStreakText = new PIXI.Text("Longest Lose Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.beginnerLoseStreakText.position.x = 620, this.beginnerLoseStreakText.position.y = 120, 
    this.beginnerLoseStreakText.anchor.set(1, .5), this.beginnerLoseStreakText.scale.set(1, 1), 
    this.beginner.addChild(this.beginnerLoseStreakText), this.beginnerCurStreakText = new PIXI.Text("Current Win Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.beginnerCurStreakText.position.x = 620, this.beginnerCurStreakText.position.y = 150, 
    this.beginnerCurStreakText.anchor.set(1, .5), this.beginnerCurStreakText.scale.set(1, 1), 
    this.beginner.addChild(this.beginnerCurStreakText), this.medium = new PIXI.Container(), 
    this.medium.position.x = 0, this.medium.position.y = 380, this.statsContainer.addChild(this.medium), 
    this.mediumImage = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), 
    this.mediumImage.tint = 11579568, this.mediumImage.width = Config.instance.ScreenWidth, 
    this.mediumImage.height = 40, this.medium.addChild(this.mediumImage), this.mediumImageText = new PIXI.Text("Medium", {
        fontFamily: "Arial",
        fontSize: 30,
        fill: "black",
        align: "left"
    }), this.mediumImageText.position.x = 20, this.mediumImageText.position.y = 20, 
    this.mediumImageText.anchor.set(0, .5), this.medium.addChild(this.mediumImageText), 
    this.mediumPlayedText = new PIXI.Text("Games Played: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.mediumPlayedText.position.x = 20, this.mediumPlayedText.position.y = 60, 
    this.mediumPlayedText.anchor.set(0, .5), this.mediumPlayedText.scale.set(1, 1), 
    this.medium.addChild(this.mediumPlayedText), this.mediumWonText = new PIXI.Text("Games Won: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.mediumWonText.position.x = 20, this.mediumWonText.position.y = 90, this.mediumWonText.anchor.set(0, .5), 
    this.mediumWonText.scale.set(1, 1), this.medium.addChild(this.mediumWonText), this.mediumRatioText = new PIXI.Text("Win Ratio: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.mediumRatioText.position.x = 20, this.mediumRatioText.position.y = 120, 
    this.mediumRatioText.anchor.set(0, .5), this.medium.addChild(this.mediumRatioText), 
    this.mediumFastestText = new PIXI.Text("Fastest Time: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.mediumFastestText.position.x = 20, this.mediumFastestText.position.y = 150, 
    this.mediumFastestText.anchor.set(0, .5), this.medium.addChild(this.mediumFastestText), 
    this.mediumAverageText = new PIXI.Text("Average Time: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.mediumAverageText.position.x = 620, this.mediumAverageText.position.y = 60, 
    this.mediumAverageText.anchor.set(1, .5), this.mediumAverageText.scale.set(1, 1), 
    this.medium.addChild(this.mediumAverageText), this.mediumWinStreakText = new PIXI.Text("Longest Win Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.mediumWinStreakText.position.x = 620, this.mediumWinStreakText.position.y = 90, 
    this.mediumWinStreakText.anchor.set(1, .5), this.mediumWinStreakText.scale.set(1, 1), 
    this.medium.addChild(this.mediumWinStreakText), this.mediumLoseStreakText = new PIXI.Text("Longest Lose Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.mediumLoseStreakText.position.x = 620, this.mediumLoseStreakText.position.y = 120, 
    this.mediumLoseStreakText.anchor.set(1, .5), this.mediumLoseStreakText.scale.set(1, 1), 
    this.medium.addChild(this.mediumLoseStreakText), this.mediumCurStreakText = new PIXI.Text("Current Win Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.mediumCurStreakText.position.x = 620, this.mediumCurStreakText.position.y = 150, 
    this.mediumCurStreakText.anchor.set(1, .5), this.mediumCurStreakText.scale.set(1, 1), 
    this.medium.addChild(this.mediumCurStreakText), this.hard = new PIXI.Container(), 
    this.hard.position.x = 0, this.hard.position.y = 560, this.statsContainer.addChild(this.hard), 
    this.hardImage = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), this.hardImage.tint = 11579568, 
    this.hardImage.width = Config.instance.ScreenWidth, this.hardImage.height = 40, 
    this.hard.addChild(this.hardImage), this.hardImageText = new PIXI.Text("Hard", {
        fontFamily: "Arial",
        fontSize: 30,
        fill: "black",
        align: "left"
    }), this.hardImageText.position.x = 20, this.hardImageText.position.y = 20, this.hardImageText.anchor.set(0, .5), 
    this.hard.addChild(this.hardImageText), this.hardPlayedText = new PIXI.Text("Games Played: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.hardPlayedText.position.x = 20, this.hardPlayedText.position.y = 60, this.hardPlayedText.anchor.set(0, .5), 
    this.hardPlayedText.scale.set(1, 1), this.hard.addChild(this.hardPlayedText), this.hardWonText = new PIXI.Text("Games Won: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.hardWonText.position.x = 20, this.hardWonText.position.y = 90, this.hardWonText.anchor.set(0, .5), 
    this.hardWonText.scale.set(1, 1), this.hard.addChild(this.hardWonText), this.hardRatioText = new PIXI.Text("Win Ratio: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.hardRatioText.position.x = 20, this.hardRatioText.position.y = 120, this.hardRatioText.anchor.set(0, .5), 
    this.hard.addChild(this.hardRatioText), this.hardFastestText = new PIXI.Text("Fastest Time: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "left"
    }), this.hardFastestText.position.x = 20, this.hardFastestText.position.y = 150, 
    this.hardFastestText.anchor.set(0, .5), this.hard.addChild(this.hardFastestText), 
    this.hardAverageText = new PIXI.Text("Average Time: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.hardAverageText.position.x = 620, this.hardAverageText.position.y = 60, 
    this.hardAverageText.anchor.set(1, .5), this.hardAverageText.scale.set(1, 1), this.hard.addChild(this.hardAverageText), 
    this.hardWinStreakText = new PIXI.Text("Longest Win Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.hardWinStreakText.position.x = 620, this.hardWinStreakText.position.y = 90, 
    this.hardWinStreakText.anchor.set(1, .5), this.hardWinStreakText.scale.set(1, 1), 
    this.hard.addChild(this.hardWinStreakText), this.hardLoseStreakText = new PIXI.Text("Longest Lose Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.hardLoseStreakText.position.x = 620, this.hardLoseStreakText.position.y = 120, 
    this.hardLoseStreakText.anchor.set(1, .5), this.hardLoseStreakText.scale.set(1, 1), 
    this.hard.addChild(this.hardLoseStreakText), this.hardCurStreakText = new PIXI.Text("Current Win Streak: 0", {
        fontFamily: "Arial",
        fontSize: 20,
        fill: "black",
        align: "right"
    }), this.hardCurStreakText.position.x = 620, this.hardCurStreakText.position.y = 150, 
    this.hardCurStreakText.anchor.set(1, .5), this.hardCurStreakText.scale.set(1, 1), 
    this.hard.addChild(this.hardCurStreakText), this.leaderboardContainer = new PIXI.Container(), 
    this.leaderboardContainer.renderable = this.leaderboardContainer.interactiveChildren = !1, 
    this.addChild(this.leaderboardContainer), this.showSettings = !0, this.bindUI();
}

function MainGame() {
    PIXI.Container.call(this), new Server(), new Config(), MainGame.instance = this, 
    this.gameData = new GameData(), this.iTimer = 0;
}

function App() {
    function loadAssets() {
        PIXI.loader.add("assets/font/font.fnt").add("assets/blank.png").add("assets/sprite_sheet.json").on("progress", onAssetProgress).load(onAssetsLoaded);
    }
    function onAssetProgress(loader, resource) {
        loadFB && FBInstant.setLoadingProgress(loader.progress);
    }
    function onAssetsLoaded() {
        loadFB && FBInstant.setLoadingProgress(100), MainGame.instance.loadAssets(), document.body.appendChild(MainGame.instance.renderer.view), 
        doStartGame();
    }
    function doStartGame() {
        MainGame.instance.connected && PlayerInfo.instance.hasData ? loadFB ? FBInstant.startGameAsync().then(function() {
            startGame();
        }) : startGame() : setTimeout(function() {
            doStartGame();
        }, 500);
    }
    function startGame() {
        MainGame.instance.startGame(), requestAnimationFrame(animate), lastTime = 0;
    }
    function animate(time) {
        var dt = time - lastTime;
        lastTime = time, requestAnimationFrame(animate), TWEEN.update(time), MainGame.instance.gameData.pause || (MainGame.instance.update(dt), 
        MainGame.instance.renderer.render(stage));
    }
    var loadFB = !1, stage = new PIXI.Container();
    new MainGame(), GameAnalytics("initialize", "b9111a5c76b2e42f852c1a894c26f99e", "ff0ac7f95be87760ddbed0a4328b51e8a97cc48b"), 
    width = window.innerWidth, height = window.innerHeight, MainGame.instance.renderer = new PIXI.autoDetectRenderer(width, height, {
        backgroundColor: 0,
        preserveDrawingBuffer: !0
    }), stage.addChild(MainGame.instance), loadFB ? FBInstant.initializeAsync().then(function() {
        FBInstant.getLocale(), FBInstant.getPlatform(), FBInstant.getSDKVersion();
        var playerID = FBInstant.player.getID(), playerName = FBInstant.player.getName(), playerUrl = FBInstant.player.getPhoto(), contextID = FBInstant.context.getID();
        const entryPointData = FBInstant.getEntryPointData();
        console.log("playerID:" + playerID), console.log("playerName:" + playerName), console.log("playerUrl:" + playerUrl), 
        console.log("contextID:" + contextID), console.log(entryPointData), loadAssets(), 
        GameAnalytics("setFacebookId", playerID), MainGame.instance.gameData.playerInfo = new PlayerInfo(playerID, playerName, playerUrl), 
        Server.instance.login(MainGame.instance.handleLogin.bind(MainGame.instance)), PlayerInfo.instance.getUserData(), 
        PlayerInfo.instance.loadImage();
    }) : (MainGame.instance.gameData.playerInfo = new PlayerInfo("1", "Phil"), loadAssets());
    var lastTime = 0;
}

GameData.instance = null, GameData.constructor = GameData, GameData.prototype.init = function() {
    this.baseWidth = this.width = window.innerWidth, this.baseHeight = this.height = window.innerHeight, 
    this.width = Config.instance.ScreenWidth, this.height = Config.instance.ScreenHeight, 
    this.baseWidth <= Config.instance.ScreenWidth ? this.gameScale = this.baseWidth / Config.instance.ScreenWidth : this.baseHeight <= Config.instance.ScreenHeight && (this.gameScale = this.baseHeight / Config.instance.ScreenHeight), 
    console.log(this.width + " x " + this.height), console.log("screenScale: " + this.gameScale);
}, PlayerInfo.instance = null, PlayerInfo.constructor = PlayerInfo, PlayerInfo.prototype.getUserData = function() {
    FBInstant.player.getDataAsync([ "stats", "config" ]).then(function(data) {
        console.log("data is loaded", data.stats, data.config), data.stats && (PlayerInfo.instance.stats = data.stats), 
        data.config && (GameData.instance.colls = data.config.colls, GameData.instance.rows = data.config.rows, 
        GameData.instance.bombs = data.config.bombs, GameData.instance.gameType = data.config.gameType, 
        GameData.instance.customColls = data.config.customColls, GameData.instance.customRows = data.config.customRows, 
        GameData.instance.customBombs = data.config.customBombs), PlayerInfo.instance.hasData = !0;
    }), FBInstant.player.getConnectedPlayersAsync().then(function(players) {
        PlayerInfo.instance.friends = players.map(function(player) {
            return {
                id: player.getID(),
                name: player.getName()
            };
        }), console.log(PlayerInfo.instance.friends), MainGame.instance.connected && Server.instance.friends(PlayerInfo.instance.friends, MainGame.instance.handleFriends.bind(MainGame.instance));
    });
}, PlayerInfo.prototype.loadImage = function() {
    this.playerImage = new Image(), this.playerImage.crossOrigin = "anonymous", this.playerImage.onload = this.onLoadBgImg.bind(this), 
    this.playerImage.src = this.url;
}, PlayerInfo.prototype.onLoadBgImg = function(event) {
    this.urlLoaded = !0, console.log("User image loaded");
}, PlayerInfo.prototype.save = function() {
    FBInstant.player.setDataAsync({
        stats: this.stats,
        config: {
            colls: GameData.instance.colls,
            rows: GameData.instance.rows,
            bombs: GameData.instance.bombs,
            gameType: GameData.instance.gameType,
            customColls: GameData.instance.customColls,
            customRows: GameData.instance.customRows,
            customBombs: GameData.instance.customBombs
        }
    }).then(function() {
        console.log("data is saved");
    });
}, PlayerInfo.prototype.update = function(user) {}, PlayerInfo.prototype.updateGameData = function(gameData) {}, 
PlayerInfo.prototype.updateStats = function(gameType, win, time) {
    switch (GameData.instance.gameType) {
      case 0:
        data = this.stats.beginner;
        break;

      case 1:
        data = this.stats.medium;
        break;

      case 2:
        data = this.stats.difficult;
    }
    win ? (data.won++, data.winStreak++, data.curWinStreak++, data.loseStreak = 0, data.curWinStreak > data.winStreak && (data.winStreak = data.curWinStreak), 
    data.fastestTime > time && (data.fastestTime = time), data.totalTime += time) : (data.curWinStreak = 0, 
    data.curLoseStreak++, data.curLoseStreak > data.loseStreak && (data.loseStreak = data.curLoseStreak)), 
    this.save();
    var data = {
        stats: this.stats
    };
    Server.instance.update(data, MainGame.instance.handleUpdate.bind(MainGame.instance));
}, PlayerInfo.prototype.startGame = function() {
    switch (GameData.instance.gameType) {
      case 0:
        this.stats.beginner.played++;
        break;

      case 1:
        this.stats.medium.played++;
        break;

      case 2:
        this.stats.difficult.played++;
    }
    this.save();
}, Board.constructor = Board, Board.prototype = Object.create(PIXI.Container.prototype), 
Board.prototype.reset = function(rows, colls, numBombs) {
    var x, y, row;
    for (void 0 == rows && (rows = 9), void 0 == colls && (colls = 9), void 0 == numBombs && (numBombs = 10), 
    this.colls = colls, this.rows = rows, this.mark = !1, this.touch = !1, this.lastTouch = null, 
    this.canMove = !1, this.zoomed = !1, this.playing = !1; this.board.length > 0; ) for (row = this.board[0], 
    this.board.splice(0, 1); row.length > 0; ) cell = row[0], row.splice(0, 1), cell.destroy();
    for (this.board = [], this.bombStack = {}, this.generateBombs(numBombs), y = 0; y < this.rows; y++) for (row = [], 
    this.board.push(row), x = 0; x < this.colls; x++) {
        var cell = new Cell(x, y, this.bombStack[y] && this.bombStack[y][x]);
        this.addChild(cell), cell.position.x = (x - colls / 2) * this.cellSize, cell.position.y = (y - rows / 2) * this.cellSize, 
        row.push(cell);
    }
    this.checkCells(), this.scale.x = this.scale.y = 1;
    for (var width = this.colls * this.cellSize * this.scale.x, height = this.rows * this.cellSize * this.scale.y; (width > 600 || height > 800) && this.scale.x > .4; ) this.scale.x = this.scale.y -= .01, 
    width = this.colls * this.cellSize * this.scale.x, height = this.rows * this.cellSize * this.scale.y;
    return this.position.x = 0, this.position.y = 25, this.colls > 10 || this.rows > 15 ? this.canMove = !0 : this.canMove = !1, 
    this.game.moves = 0, this.game.bombs = numBombs, this;
}, Board.prototype.traversCells = function(fn) {
    var x, y;
    for (y = 0; y < this.rows; y++) for (x = 0; x < this.colls; x++) fn(this.getCell(x, y));
}, Board.prototype.checkCells = function() {
    var x, y;
    for (y = 0; y < this.rows; y++) for (x = 0; x < this.colls; x++) {
        var cell = this.getCell(x, y), neighbours = this.calcNeighbours(cell);
        for (var c in neighbours) cell.addNeighbour(neighbours[c]);
    }
}, Board.prototype.draw = function() {
    var x, y;
    for (y = 0; y < this.rows; y++) for (x = 0; x < this.colls; x++) this.board[y][x].draw();
    return this.game.over = !1, this;
}, Board.prototype.validate = function() {
    var numActive = 0;
    this.traversCells(function(cell) {
        numActive += cell.isRevealed() ? 0 : 1;
    }), numActive || this.game.complete(!0);
}, Board.prototype.reveal = function(cell, passive) {
    0 == this.playing && (this.playing = !0, PlayerInfo.instance.startGame()), cell.reveal(this.validate, this), 
    cell.isBomb && this.game.complete();
}, Board.prototype.getCell = function(x, y) {
    return this.board[y][x];
}, Board.prototype.generateBombs = function(numBombs) {
    var i;
    for (i = 0; i < numBombs; i++) this.generateBomb();
}, Board.prototype.generateBomb = function() {
    var x = Math.floor(Math.random() * this.colls), y = Math.floor(Math.random() * this.rows);
    if (this.bombStack[y] && this.bombStack[y][x]) return this.generateBomb();
    this.bombStack[y] = this.bombStack[y] || {}, this.bombStack[y][x] = !0;
}, Board.prototype.pointerDown = function(e) {
    0 == this.touch && (this.moved = !1, this.zoomed = !1, this.lastTouch = e.data.global.clone()), 
    this.touch = !0;
}, Board.prototype.pointerUp = function(e) {
    if (0 == this.moved && 0 == this.zoomed) {
        var global = e.data.global.clone(), local = this.toLocal(global);
        if (local.x += this.colls * this.cellSize / 2, local.y += this.rows * this.cellSize / 2, 
        local.x = Math.floor(local.x / this.cellSize), local.y = Math.floor(local.y / this.cellSize), 
        local.x >= 0 && local.x < this.colls && local.y >= 0 && local.y < this.rows) {
            var cell = this.getCell(local.x, local.y);
            this.game.active = !0, this.game.lastX = local.x, this.game.lastY = local.y, 0 == this.mark ? this.reveal(cell) : (cell.mark(), 
            cell.flagged ? this.game.bombs-- : this.game.bombs++), this.game.moves++, this.game.topUI.bindUI();
        }
    }
    var t = e.data.originalEvent.targetTouches;
    (!t || t && 0 == t.length) && (this.touch = !1, this.moved = !1, this.zoomed = !1, 
    this.lastDistance = null);
}, Board.prototype.pointerMove = function(e) {
    if (this.touch && this.canMove) {
        var t = e.data.originalEvent.targetTouches;
        if (t && t.length >= 2) {
            var dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY, distance = Math.sqrt(dx * dx + dy * dy);
            this.lastDistance || (this.lastDistance = distance);
            t[0].clientX, t[1].clientX, t[0].clientY, t[1].clientY;
            var scale = distance / this.lastDistance;
            this.lastDistance = distance, this.scale.x = this.scale.y = Math.max(.2, this.scale.x * scale), 
            this.scale.x = this.scale.y = Math.min(.9, this.scale.y * scale), this.zoomed = !0;
        } else if (!this.zoomed) {
            var global = e.data.global.clone(), x = this.lastTouch.x - global.x, y = this.lastTouch.y - global.y;
            this.moved = !0, this.position.x -= x, this.position.y -= y;
            var width = this.colls * this.cellSize * this.scale.x, height = this.rows * this.cellSize * this.scale.y, height2 = height / 2 > 475 ? height / 2 - 475 : 0;
            this.position.x > width / 2 - 300 && (this.position.x = width / 2 - 300), this.position.x < -width / 2 + 300 && (this.position.x = -width / 2 + 300), 
            this.position.y - 25 > height2 && (this.position.y = 25 + height2), this.position.y - 25 < -height2 && (this.position.y = 25 - height2);
        }
        this.lastTouch = e.data.global.clone();
    }
}, Board.prototype.calcNeighbours = function(cell) {
    var i, j, data = [], x = cell.posx, y = cell.posy;
    for (i = y - 1; i <= y + 1; i++) if (!(i < 0 || i >= this.rows)) for (j = x - 1; j <= x + 1; j++) j < 0 || j >= this.colls || x === j && y === i || data.push(this.getCell(j, i));
    return data;
}, Board.prototype.onPinchStart = function(e) {}, Board.prototype.onPinchMove = function(e) {
    this.scale.x = this.scale.y = Math.min(.3, this.scale.y * e.scale), this.scale.x = this.scale.y = Math.min(.9, this.scale.y * e.scale);
}, Board.prototype.onPinchEnd = function(e) {}, Cell.constructor = Cell, Cell.prototype = Object.create(PIXI.Sprite.prototype), 
Cell.prototype.setValue = function(value) {
    return this;
}, Cell.prototype.mark = function() {
    this.revealed || (this.flagged = !this.flagged, this.draw());
}, Cell.prototype.showBomb = function(isBomb) {
    this.texture = isBomb ? PIXI.Texture.fromImage("std_bomb_sel.png") : PIXI.Texture.fromImage("std_bomb.png");
}, Cell.prototype.draw = function(neighbour) {
    this.revealed ? this.isBomb ? this.texture = PIXI.Texture.fromImage("std_bomb.png") : 0 === this.activeNeighbours ? this.texture = PIXI.Texture.fromImage("std_empty.png") : this.texture = PIXI.Texture.fromImage("std_" + this.activeNeighbours + ".png") : this.flagged ? this.texture = PIXI.Texture.fromImage("std_mine.png") : this.texture = PIXI.Texture.fromImage("std_blank.png");
}, Cell.prototype.addNeighbour = function(neighbour) {
    return this.neighbours.push(neighbour), this.activeNeighbours += neighbour.isBomb ? 1 : 0, 
    this;
}, Cell.prototype.getNeighbours = function(neighbour) {
    return this.neighbours;
}, Cell.prototype.isRevealed = function(neighbour) {
    return this.revealed || this.isBomb;
}, Cell.prototype.reveal = function(fn, context) {
    if (!this.isBomb) {
        if (this.revealed = !0, this.draw(), 0 === this.activeNeighbours) {
            var neighbours = this.getNeighbours();
            for (var n in neighbours) neighbours[n].isRevealed() || neighbours[n].reveal(fn, context);
        }
        fn.call(context);
    }
}, Game.constructor = Game, Game.prototype = Object.create(PIXI.Container.prototype), 
Game.prototype.complete = function(win) {
    this.lost = !win, this.active = !1;
    var time = Math.floor(this.time / 1e3);
    if (PlayerInfo.instance.updateStats(this.gameType, win, time), win) MainGame.instance.showGameOver(!0), 
    GameAnalytics("addProgressionEvent", "Complete", "0", "0", "0", time); else {
        GameAnalytics("addProgressionEvent", "Fail", "0", "0", "0", time);
        var x, y;
        for (y = 0; y < this.board.rows; y++) for (x = 0; x < this.board.colls; x++) {
            var cell = this.board.board[y][x];
            cell.isBomb && (x == this.lastX && y == this.lastY ? cell.showBomb(!0) : cell.showBomb(!1));
        }
    }
}, Game.prototype.update = function(dt) {
    this.active && (this.time += dt, this.topUI.bindUI());
}, Game.prototype.start = function(rows, colls, numBombs) {
    MainGame.instance.showGameOver(!1), this.board.reset(rows, colls, numBombs).draw(), 
    this.gameType = GameData.instance.gameType, this.time = 0, this.lost = !1, this.active = !1, 
    this.topUI.bindUI(), GameAnalytics("addProgressionEvent", "Start", "0", "0", "0", 0);
}, Game.prototype.pointerDown = function(e) {
    this.lost || this.board.pointerDown(e);
}, Game.prototype.pointerUp = function(e) {
    this.lost || this.board.pointerUp(e);
}, Game.prototype.pointerMove = function(e) {
    this.lost || this.board.pointerMove(e);
}, Game.prototype.onPinchStart = function(e) {
    this.lost || this.board.onPinchStart(e);
}, Game.prototype.onPinchMove = function(e) {
    this.lost || this.board.onPinchMove(e);
}, Game.prototype.onPinchEnd = function(e) {
    this.lost || this.board.onPinchEnd(e);
};

class Server {
    constructor() {
        Server.instance = this, this.baseUrl = "https://games.mp2x.io/";
    }
    login(callback) {
        var params = {
            id: PlayerInfo.instance.id,
            name: PlayerInfo.instance.name,
            url: PlayerInfo.instance.url
        };
        new ServerCall(this.baseUrl + "login", params, callback);
    }
    update(data, callback) {
        var params = {
            id: PlayerInfo.instance.id,
            data: data
        };
        new ServerCall(this.baseUrl + "update", params, callback);
    }
    bot(callback) {
        var params = {
            id: PlayerInfo.instance.id,
            cmd: "bot"
        };
        new ServerCall(this.baseUrl + "game", params, callback);
    }
    friends(friends, callback) {
        var params = {
            id: PlayerInfo.instance.id,
            cmd: "friends",
            friends: friends
        };
        new ServerCall(this.baseUrl + "game", params, callback);
    }
}

class ServerCall {
    constructor(url, params, callback) {
        this.callback = callback, this.xhr = new XMLHttpRequest(), this.xhr.open("POST", url, !0), 
        this.xhr.setRequestHeader("Content-type", "application/json"), PlayerInfo.instance.token && this.xhr.setRequestHeader("fbig-token", PlayerInfo.instance.token), 
        this.xhr.setRequestHeader("fbig-game", MainGame.GameName), this.xhr.onreadystatechange = this.processXHRRequest.bind(this), 
        this.xhr.send(JSON.stringify(params)), console.log(url, "\n", JSON.stringify(params));
    }
    processXHRRequest(e) {
        if (4 == this.xhr.readyState) if (this.waitingForResponse = !1, 200 == this.xhr.status) {
            this.timeOutTimer = 0;
            response = JSON.parse(this.xhr.responseText);
            this.callback && this.callback(response);
        } else {
            var response = JSON.parse(this.xhr.responseText);
            this.callback && this.callback(null, response);
        }
    }
}

GameAdManager.instance = null, GameAdManager.constructor = GameAdManager, GameAdManager.prototype.registerAd = function(name, adSpaceCode, isVideo) {
    console.log("Register Ad: " + name + " - " + adSpaceCode), this.adSpaceCodes[name] = {
        code: adSpaceCode,
        ad: null,
        isVideo: isVideo
    }, this.getAd(name);
}, GameAdManager.prototype.getAd = function(adSpace) {
    if (this.adSpaceCodes.hasOwnProperty(adSpace)) {
        console.log("Get Ad: " + adSpace), Analytics.instance.trackEvent("APP_ITEMLOAD_START", {
            event_unix_tm: new Date().getTime() / 1e3,
            item_id: adSpace,
            item_type: "sdk_request",
            ad_network: "FAN"
        });
        var ad = null;
        this.adSpaceCodes[adSpace].isVideo ? FBInstant.getRewardedVideoAsync(this.adSpaceCodes[adSpace].code).then(function(newAd) {
            return console.log("got Video Ad: ", adSpace, JSON.stringify(newAd)), (ad = newAd).loadAsync();
        }).then(function() {
            console.log("Ad loaded: ", adSpace, JSON.stringify(ad)), JCAdManager.instance.adSpaceCodes[adSpace].ad = ad;
        }).catch(function(ex) {
            console.log("Ad Failed: ", adSpace, JSON.stringify(ex)), self.adSpaces[adSpace] = null;
        }) : FBInstant.getInterstitialAdAsync(this.adSpaceCodes[adSpace].code).then(function(newAd) {
            return console.log("got Ad: ", adSpace, JSON.stringify(newAd)), (ad = newAd).loadAsync();
        }).then(function() {
            console.log("Ad loaded: ", adSpace, JSON.stringify(ad)), JCAdManager.instance.adSpaceCodes[adSpace].ad = ad;
        }).catch(function(ex) {
            console.log("Ad Failed: ", adSpace, JSON.stringify(ex)), self.adSpaces[adSpace] = null;
        });
    }
}, GameAdManager.prototype.showAd = function(adSpace, callback) {
    console.log("show Ad: ", adSpace, this.adSpaceCodes[adSpace]), this.adSpaceCodes.hasOwnProperty(adSpace) && this.adSpaceCodes[adSpace].ad ? (this.adSpaceCodes[adSpace].ad.showAsync().then(function() {
        console.log("Ad shown: ", adSpace), Analytics.instance.trackEvent("APP_ITEMLOAD_END", {
            event_unix_tm: new Date().getTime() / 1e3,
            item_id: adSpace,
            item_type: "sdk_request",
            ad_network: "FAN",
            response: "y"
        }), callback && callback(!0);
    }).catch(function(ex) {
        ex && (console.log("Ad Failed: ", adSpace, JSON.stringify(ex)), callback && callback(!1));
    }), this.adSpaceCodes[adSpace].ad = null) : callback && callback(!1), this.getAd(adSpace);
}, GameAdManager.prototype.onClick = function(result) {
    console.log("onClick", result);
}, GameAdManager.prototype.hasAd = function(adSpace) {
    return !(!this.adSpaceCodes.hasOwnProperty(adSpace) || !this.adSpaceCodes[adSpace].ad) && this.adSpaceCodes[adSpace].ad;
}, Config.instance = null, Config.constructor = Config, TopUI.constructor = TopUI, 
TopUI.prototype = Object.create(PIXI.Container.prototype), TopUI.prototype.onFlag = function(e) {
    MainGame.instance.game.board.mark = !MainGame.instance.game.board.mark, MainGame.instance.game.board.mark ? MainGame.instance.topUI.flag.tint = 3158064 : MainGame.instance.topUI.flag.tint = 6316128;
}, TopUI.prototype.onOptions = function(e) {
    MainGame.instance.showOptions(!0);
}, TopUI.prototype.onNewGame = function(e) {
    MainGame.instance.game.start(GameData.instance.rows, GameData.instance.colls, GameData.instance.bombs);
}, TopUI.prototype.bindUI = function() {
    var time = "000000000" + Math.floor(this.game.time / 1e3);
    this.movesText.text = time.substr(time.length - 3), this.bombsText.text = this.game.bombs.toString(), 
    this.game.lost ? this.newGame.texture = PIXI.Texture.fromImage("std_game_sad.png") : this.newGame.texture = PIXI.Texture.fromImage("std_game.png");
}, GameOverUI.constructor = GameOverUI, GameOverUI.prototype = Object.create(PIXI.Container.prototype), 
GameOverUI.prototype.onNewGame = function(e) {
    MainGame.instance.game.start(GameData.instance.rows, GameData.instance.colls, GameData.instance.bombs);
}, OptionsUI.constructor = OptionsUI, OptionsUI.prototype = Object.create(PIXI.Container.prototype), 
OptionsUI.prototype.bindUI = function() {
    if (this.showLeaderboard) ; else if (this.showSettings) {
        switch (this.settings.tint = 3158064, this.stats.tint = 6316128, GameData.instance.gameType) {
          case 0:
            this.smallSelect.texture = PIXI.Texture.fromImage("std_select.png"), this.mediumSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
            this.hardSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.customSelect.texture = PIXI.Texture.fromImage("std_blank.png");
            break;

          case 1:
            this.smallSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.mediumSelect.texture = PIXI.Texture.fromImage("std_select.png"), 
            this.hardSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.customSelect.texture = PIXI.Texture.fromImage("std_blank.png");
            break;

          case 2:
            this.smallSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.mediumSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
            this.hardSelect.texture = PIXI.Texture.fromImage("std_select.png"), this.customSelect.texture = PIXI.Texture.fromImage("std_blank.png");
            break;

          case 3:
            this.smallSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.mediumSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
            this.hardSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.customSelect.texture = PIXI.Texture.fromImage("std_select.png");
        }
        this.rowsText.text = "Rows " + GameData.instance.customRows.toString(), this.collsText.text = "Columns " + GameData.instance.customColls.toString(), 
        this.bombsText.text = "Bombs " + GameData.instance.customBombs.toString();
    } else {
        this.settings.tint = 6316128, this.stats.tint = 3158064;
        var ratio = 0, average = 0, fastest = 0;
        PlayerInfo.instance.stats.beginner.played && (ratio = PlayerInfo.instance.stats.beginner.won / PlayerInfo.instance.stats.beginner.played, 
        PlayerInfo.instance.stats.beginner.won && (average = PlayerInfo.instance.stats.beginner.totalTime / PlayerInfo.instance.stats.beginner.won), 
        PlayerInfo.instance.stats.beginner.fastestTime < 999999 && (fastest = PlayerInfo.instance.stats.beginner.fastestTime)), 
        this.beginnerPlayedText.text = "Games Played: " + PlayerInfo.instance.stats.beginner.played, 
        this.beginnerWonText.text = "Games Won: " + PlayerInfo.instance.stats.beginner.won, 
        this.beginnerRatioText.text = "Win Ratio: " + ratio, this.beginnerFastestText.text = "Fastest Time: " + this.toTime(fastest), 
        this.beginnerAverageText.text = "Average Time: " + this.toTime(average), this.beginnerWinStreakText.text = "Longest Win Streak: " + PlayerInfo.instance.stats.beginner.winStreak, 
        this.beginnerLoseStreakText.text = "Longest Lose Streak: " + PlayerInfo.instance.stats.beginner.loseStreak, 
        this.beginnerCurStreakText.text = "Current Win Streak: " + PlayerInfo.instance.stats.beginner.curWinStreak, 
        ratio = 0, average = 0, fastest = 0, PlayerInfo.instance.stats.medium.played && (ratio = PlayerInfo.instance.stats.medium.won / PlayerInfo.instance.stats.medium.played, 
        PlayerInfo.instance.stats.medium.won && (average = PlayerInfo.instance.stats.medium.totalTime / PlayerInfo.instance.stats.medium.won), 
        PlayerInfo.instance.stats.medium.fastestTime < 999999 && (fastest = PlayerInfo.instance.stats.medium.fastestTime)), 
        this.mediumPlayedText.text = "Games Played: " + PlayerInfo.instance.stats.medium.played, 
        this.mediumWonText.text = "Games Won: " + PlayerInfo.instance.stats.medium.won, 
        this.mediumRatioText.text = "Win Ratio: " + ratio, this.mediumFastestText.text = "Fastest Time: " + this.toTime(fastest), 
        this.mediumAverageText.text = "Average Time: " + this.toTime(average), this.mediumWinStreakText.text = "Longest Win Streak: " + PlayerInfo.instance.stats.medium.winStreak, 
        this.mediumLoseStreakText.text = "Longest Lose Streak: " + PlayerInfo.instance.stats.medium.loseStreak, 
        this.mediumCurStreakText.text = "Current Win Streak: " + PlayerInfo.instance.stats.medium.curWinStreak, 
        ratio = 0, average = 0, fastest = 0, PlayerInfo.instance.stats.difficult.played && (ratio = PlayerInfo.instance.stats.difficult.won / PlayerInfo.instance.stats.difficult.played, 
        PlayerInfo.instance.stats.difficult.won && (average = PlayerInfo.instance.stats.difficult.totalTime / PlayerInfo.instance.stats.difficult.won), 
        PlayerInfo.instance.stats.difficult.fastestTime < 999999 && (fastest = PlayerInfo.instance.stats.difficult.fastestTime)), 
        this.hardPlayedText.text = "Games Played: " + PlayerInfo.instance.stats.difficult.played, 
        this.hardWonText.text = "Games Won: " + PlayerInfo.instance.stats.difficult.won, 
        this.hardRatioText.text = "Win Ratio: " + ratio, this.hardFastestText.text = "Fastest Time: " + this.toTime(fastest), 
        this.hardAverageText.text = "Average Time: " + this.toTime(average), this.hardWinStreakText.text = "Longest Win Streak: " + PlayerInfo.instance.stats.difficult.winStreak, 
        this.hardLoseStreakText.text = "Longest Lose Streak: " + PlayerInfo.instance.stats.difficult.loseStreak, 
        this.hardCurStreakText.text = "Current Win Streak: " + PlayerInfo.instance.stats.difficult.curWinStreak;
    }
}, OptionsUI.prototype.toTime = function(seconds) {
    var mins = Math.floor(seconds / 60), hours = Math.floor(mins / 60);
    seconds %= 60;
    var time = "";
    return hours > 0 && (time = hours.toString() + ":"), time += mins < 10 ? "0" + mins.toString() + ":" : mins.toString() + ":", 
    time += seconds < 10 ? "0" + seconds.toString() : seconds.toString();
}, OptionsUI.prototype.onDone = function() {
    MainGame.instance.showOptions(!1);
}, OptionsUI.prototype.onSettings = function() {
    this.statsContainer.renderable = this.statsContainer.interactiveChildren = !1, this.settingsContainer.renderable = this.settingsContainer.interactiveChildren = !0, 
    this.leaderboardContainer.renderable = this.leaderboardContainer.interactiveChildren = !1, 
    this.showSettings = !0, this.showLeaderboard = !1, this.bindUI();
}, OptionsUI.prototype.onStats = function() {
    this.showSettings = !1, this.showLeaderboard = !1, this.settingsContainer.renderable = this.settingsContainer.interactiveChildren = !1, 
    this.statsContainer.renderable = this.statsContainer.interactiveChildren = !0, this.leaderboardContainer.renderable = this.leaderboardContainer.interactiveChildren = !1, 
    this.bindUI();
}, OptionsUI.prototype.onLeaderBoard = function() {
    this.showSettings = !1, this.showLeaderboard = !1, this.settingsContainer.renderable = this.settingsContainer.interactiveChildren = !1, 
    this.statsContainer.renderable = this.statsContainer.interactiveChildren = !1, this.leaderboardContainer.renderable = this.leaderboardContainer.interactiveChildren = !0, 
    this.bindUI();
}, OptionsUI.prototype.onSmallGame = function() {
    GameData.instance.gameType = 0, GameData.instance.colls = 9, GameData.instance.rows = 9, 
    GameData.instance.bombs = 10, this.smallSelect.texture = PIXI.Texture.fromImage("std_select.png"), 
    this.mediumSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.hardSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
    this.customSelect.texture = PIXI.Texture.fromImage("std_blank.png"), MainGame.prototype.startGame();
}, OptionsUI.prototype.onMediumGame = function() {
    GameData.instance.gameType = 1, GameData.instance.colls = 16, GameData.instance.rows = 16, 
    GameData.instance.bombs = 40, this.smallSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
    this.mediumSelect.texture = PIXI.Texture.fromImage("std_select.png"), this.hardSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
    this.customSelect.texture = PIXI.Texture.fromImage("std_blank.png");
}, OptionsUI.prototype.onHardGame = function() {
    GameData.instance.gameType = 2, GameData.instance.colls = 16, GameData.instance.rows = 30, 
    GameData.instance.bombs = 99, this.smallSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
    this.mediumSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.hardSelect.texture = PIXI.Texture.fromImage("std_select.png"), 
    this.customSelect.texture = PIXI.Texture.fromImage("std_blank.png");
}, OptionsUI.prototype.onCustomGame = function() {
    GameData.instance.gameType = 3, this.smallSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
    this.mediumSelect.texture = PIXI.Texture.fromImage("std_blank.png"), this.hardSelect.texture = PIXI.Texture.fromImage("std_blank.png"), 
    this.customSelect.texture = PIXI.Texture.fromImage("std_select.png");
}, OptionsUI.prototype.onRowsDown = function() {
    GameData.instance.customRows = Math.max(9, --GameData.instance.customRows), this.rowsText.text = "Rows " + GameData.instance.customRows.toString();
}, OptionsUI.prototype.onRowsUp = function() {
    GameData.instance.customRows = Math.min(50, ++GameData.instance.customRows), this.rowsText.text = "Rows " + GameData.instance.customRows.toString();
}, OptionsUI.prototype.onCollsDown = function() {
    GameData.instance.customColls = Math.max(9, --GameData.instance.customColls), this.collsText.text = "Columns " + GameData.instance.customColls.toString();
}, OptionsUI.prototype.onCollsUp = function() {
    GameData.instance.customColls = Math.min(50, ++GameData.instance.customColls), this.collsText.text = "Columns " + GameData.instance.customColls.toString();
}, OptionsUI.prototype.onBombsDown = function() {
    GameData.instance.customBombs = Math.max(10, --GameData.instance.customBombs), this.bombsText.text = "Bombs " + GameData.instance.customBombs.toString();
}, OptionsUI.prototype.onBombsUp = function() {
    GameData.instance.customBombs = Math.min(200, ++GameData.instance.customBombs), 
    this.bombsText.text = "Bombs " + GameData.instance.customBombs.toString();
}, OptionsUI.prototype.onNewGame = function() {
    MainGame.instance.newGame(), MainGame.instance.showOptions(!1);
}, MainGame.instance = null, MainGame.VERSION = "0.1.0", MainGame.GameName = "Mines", 
MainGame.constructor = MainGame, MainGame.prototype = Object.create(PIXI.Container.prototype), 
MainGame.prototype.onTick = function(event) {
    this.iTimerDelta = this.Ticker.elapsedMS, this.iTimer = this.Ticker.lastTime;
}, MainGame.prototype.loadAssets = function() {
    this.gameData.init(), this.position.x = (this.gameData.baseWidth - this.gameData.width * this.gameData.gameScale) / 2, 
    this.position.y = this.gameData.baseHeight - (this.gameData.baseHeight - this.gameData.height * this.gameData.gameScale) / 2, 
    this.scale.x = this.gameData.gameScale, this.scale.y = this.gameData.gameScale, 
    this.image = new PIXI.Sprite(PIXI.Texture.fromImage("assets/blank.png")), this.image.tint = 12632256, 
    this.image.anchor.x = 0, this.image.anchor.y = 1, this.image.width = Config.instance.ScreenWidth, 
    this.image.height = Config.instance.ScreenHeight, this.image.interactive = !0, this.image.on("pointerdown", this.onPointerDown), 
    this.image.on("pointerup", this.onPointerUp), this.image.on("pointermove", this.onPointerMove), 
    this.addChild(this.image), this.game = new Game(), this.game.position.x = Config.instance.ScreenWidth / 2, 
    this.game.position.y = -Config.instance.ScreenHeight / 2, this.game.interactiveChildren = !1, 
    this.optionsUI = new OptionsUI(this.game), this.optionsUI.position.x = 0, this.optionsUI.position.y = -Config.instance.ScreenHeight, 
    this.optionsUI.renderable = this.optionsUI.interactiveChildren = !1, this.gameOverUI = new GameOverUI(this.game), 
    this.gameOverUI.position.x = Config.instance.ScreenWidth / 2, this.gameOverUI.position.y = -Config.instance.ScreenHeight / 2, 
    this.gameOverUI.renderable = this.gameOverUI.interactiveChildren = !1, this.topUI = new TopUI(this.game), 
    this.topUI.position.x = 0, this.topUI.position.y = -Config.instance.ScreenHeight, 
    this.addChild(this.game), this.addChild(this.gameOverUI), this.addChild(this.topUI), 
    this.addChild(this.optionsUI), this.game.topUI = this.topUI, this.game.gameOverUI = this.gameOverUI;
}, MainGame.prototype.startGame = function() {
    this.Ticker = PIXI.ticker.shared.add(this.onTick.bind(this)), this.Ticker.speed = 1, 
    this.newGame();
}, MainGame.prototype.newGame = function() {
    switch (GameData.instance.gameType) {
      case 0:
        GameData.instance.colls = 9, GameData.instance.rows = 9, GameData.instance.bombs = 10;
        break;

      case 1:
        GameData.instance.colls = 16, GameData.instance.rows = 16, GameData.instance.bombs = 40;
        break;

      case 2:
        GameData.instance.colls = 16, GameData.instance.rows = 30, GameData.instance.bombs = 99;
        break;

      case 3:
        GameData.instance.colls = GameData.instance.customColls, GameData.instance.rows = GameData.instance.customRows, 
        GameData.instance.bombs = GameData.instance.customBombs;
    }
    this.game.start(this.gameData.rows, this.gameData.colls, this.gameData.bombs);
}, MainGame.prototype.update = function(dt) {
    this.game.update(dt);
}, MainGame.prototype.onPointerDown = function(e) {
    MainGame.instance.game.pointerDown(e);
}, MainGame.prototype.onPointerUp = function(e) {
    MainGame.instance.game.pointerUp(e);
}, MainGame.prototype.onPointerMove = function(e) {
    MainGame.instance.game.pointerMove(e);
}, MainGame.prototype.onPinchStart = function(e) {
    MainGame.instance.game.onPinchStart(e);
}, MainGame.prototype.onPinchMove = function(e) {
    MainGame.instance.game.onPinchMove(e);
}, MainGame.prototype.onPinchEnd = function(e) {
    MainGame.instance.game.onPinchEnd(e);
}, MainGame.prototype.showGameOver = function(state) {
    this.gameOverUI.renderable = this.gameOverUI.interactiveChildren = state;
}, MainGame.prototype.showOptions = function(state) {
    this.optionsUI.renderable = this.optionsUI.interactiveChildren = state, this.optionsUI.onSettings(), 
    this.optionsUI.bindUI();
}, MainGame.prototype.handleLogin = function(response, error) {
    console.log(response), !error && response.success ? (PlayerInfo.instance.token = response.data.token, 
    response.data.user && PlayerInfo.instance.update(response.data.user), response.data.gameData && PlayerInfo.instance.updateGameData(response.data.gameData), 
    PlayerInfo.instance.friends && Server.instance.friends(PlayerInfo.instance.friends, MainGame.instance.handleFriends.bind(MainGame.instance)), 
    MainGame.instance.connected = !0) : setTimeout(function() {
        Server.instance.login(MainGame.instance.handleLogin.bind(MainGame.instance));
    }, 500);
}, MainGame.prototype.handleFriends = function(response, error) {
    console.log(response), !error && response.success;
}, MainGame.prototype.handleUpdate = function(response, error) {
    console.log(response);
};