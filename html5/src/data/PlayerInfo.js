PlayerInfo.instance = null;

function PlayerInfo (id, name, url)
{
    PlayerInfo.instance = this;

    this.id = id;
    this.name = name;
    this.url = url;
    this.token = null;

    this.coins = 0;
    this.hasData = false;

    this.stats = {
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

PlayerInfo.constructor = PlayerInfo;

PlayerInfo.prototype.getUserData = function ()
{
    FBInstant.player
        .getDataAsync(['stats', 'config'])
        .then(function(data) {
            console.log('data is loaded',data['stats'], data['config']);

            if (data['stats'])
            {
                PlayerInfo.instance.stats = data.stats;
            }

            if (data['config'])
            {
                GameData.instance.colls = data.config.colls;
                GameData.instance.rows = data.config.rows;
                GameData.instance.bombs = data.config.bombs;
                GameData.instance.gameType = data.config.gameType;
                
                GameData.instance.customColls = data.config.customColls;
                GameData.instance.customRows = data.config.customRows;
                GameData.instance.customBombs = data.config.customBombs;
            }

            PlayerInfo.instance.hasData = true;
        });

    FBInstant.player.getConnectedPlayersAsync()
        .then(function(players) {
            PlayerInfo.instance.friends = players.map(function(player) {
                return {
                    id: player.getID(),
                    name: player.getName(),
                }
            });
          
            console.log(PlayerInfo.instance.friends);

            if (MainGame.instance.connected)
            {
                Server.instance.friends (PlayerInfo.instance.friends, MainGame.instance.handleFriends.bind (MainGame.instance))
            }
        });        
        
}

PlayerInfo.prototype.loadImage = function ()
{
    this.playerImage = new Image();
    this.playerImage.crossOrigin = 'anonymous';
    this.playerImage.onload = this.onLoadBgImg.bind(this);
    this.playerImage.src = this.url;
}

PlayerInfo.prototype.onLoadBgImg = function (event) 
{
    this.urlLoaded = true;
    console.log ("User image loaded");
}

PlayerInfo.prototype.save = function () 
{
    FBInstant.player
        .setDataAsync({
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
        })
        .then(function() {
            console.log('data is saved');
        });
}

PlayerInfo.prototype.update = function (user)
{
// no extra data from backend
}

PlayerInfo.prototype.updateGameData = function (gameData)
{
// effectively getting stats back ignore
}

PlayerInfo.prototype.updateStats = function (gameType, win, time) 
{
    var data;

    switch (GameData.instance.gameType)
    {
        case    0:
            data = this.stats.beginner;
            break;
        case    1:
            data = this.stats.medium;
            break;
        case    2:
            data = this.stats.difficult;
            break;
    }

    if (win)
    {
        data.won++;
        data.winStreak++;
        data.curWinStreak++;
        data.loseStreak = 0;

        if (data.curWinStreak > data.winStreak)
        {
            data.winStreak = data.curWinStreak;
        }

        if (data.fastestTime > time)
        {
            data.fastestTime = time;
        }

        data.totalTime += time;
    }
    else
    {
        data.curWinStreak = 0;
        data.curLoseStreak++;

        if (data.curLoseStreak > data.loseStreak)
        {
            data.loseStreak = data.curLoseStreak;
        }
    }

    this.save ();

    var data = {
        stats: this.stats
    };

    Server.instance.update (data, MainGame.instance.handleUpdate.bind (MainGame.instance));    
}

PlayerInfo.prototype.startGame = function () 
{
    switch (GameData.instance.gameType)
    {
        case    0:
            this.stats.beginner.played++;
            break;
        case    1:
            this.stats.medium.played++;
            break;
        case    2:
            this.stats.difficult.played++;
            break;
    }

    this.save ();
}