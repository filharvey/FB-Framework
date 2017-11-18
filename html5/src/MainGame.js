MainGame.instance = null;
MainGame.VERSION = "0.1.0";
MainGame.GameName = "Base";

function MainGame ()
{
    PIXI.Container.call (this);

    new Server ();
    new Config ();

    MainGame.instance = this;

    this.gameData = new GameData ();

    this.iTimer = 0;
}

MainGame.constructor = MainGame;
MainGame.prototype = Object.create(PIXI.Container.prototype);

MainGame.prototype.onTick = function (event) 
{
    this.iTimerDelta = this.Ticker.elapsedMS;
    this.iTimer = this.Ticker.lastTime;
}

MainGame.prototype.loadAssets = function ()
{
    this.gameData.init ();
    
    // center
    this.position.x = (this.gameData.baseWidth - this.gameData.width * this.gameData.gameScale) / 2;
    this.position.y = this.gameData.baseHeight - (this.gameData.baseHeight - this.gameData.height * this.gameData.gameScale) / 2;
    this.scale.x = this.gameData.gameScale; 
    this.scale.y = this.gameData.gameScale;

    this.image = new PIXI.Sprite (PIXI.Texture.fromImage ("assets/blank.png"));
    this.image.tint = 0xC0C0C0;
    this.image.anchor.x = 0;
    this.image.anchor.y = 1;
    this.image.width = Config.instance.ScreenWidth;
    this.image.height = Config.instance.ScreenHeight;
    this.image.interactive = true;
    this.image.on ('pointerdown', this.onPointerDown);
    this.image.on ('pointerup', this.onPointerUp);
    this.image.on ('pointermove', this.onPointerMove);

    this.addChild (this.image);

    // add game later here

}

MainGame.prototype.startGame = function () 
{
    this.Ticker = PIXI.ticker.shared.add(this.onTick.bind(this));
    this.Ticker.speed = 1;

    this.newGame ();
}

MainGame.prototype.newGame = function () 
{

}

MainGame.prototype.update = function (dt) 
{
}

MainGame.prototype.onPointerDown = function (e)
{
}

MainGame.prototype.onPointerUp = function (e)
{
}

MainGame.prototype.onPointerMove = function (e)
{
}

MainGame.prototype.handleLogin = function (response, error)
{
    console.log (response);

    if (!error && response.success)
    {
        PlayerInfo.instance.token = response.data.token;

        if (response.data.user)
        {
            PlayerInfo.instance.update (response.data.user);
        }

        if (response.data.gameData)
        {
            PlayerInfo.instance.updateGameData (response.data.gameData);   
        }

        if (PlayerInfo.instance.friends)
        {
//            Server.instance.friends (PlayerInfo.instance.friends, MainGame.instance.handleFriends.bind (MainGame.instance))
        }

        MainGame.instance.connected = true;
    }
    else
    {
// retry??
        setTimeout (function (){
            Server.instance.login (MainGame.instance.handleLogin.bind (MainGame.instance));
        }, 500);
    }
}

MainGame.prototype.handleFriends = function (response, error)
{
    console.log (response);

    if (!error && response.success)
    {

    }
    else
    {
    }
}

MainGame.prototype.handleUpdate = function (response, error)
{
    console.log (response);
}