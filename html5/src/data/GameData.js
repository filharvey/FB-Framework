GameData.instance = null;

function GameData()
{
    GameData.instance = this;

    this.client = new ClientJS();

    this.playerInfo = null;

    this.data = null;

    this.users = {};

    // add game data here
}

GameData.constructor = GameData;

GameData.prototype.init = function ()
{
    // set up screen width etc.
    this.baseWidth = this.width = window.innerWidth;
    this.baseHeight = this.height = window.innerHeight;
    
    this.width = Config.instance.ScreenWidth;
    this.height = Config.instance.ScreenHeight;

    if (this.baseWidth <= Config.instance.ScreenWidth)
        this.gameScale = this.baseWidth / Config.instance.ScreenWidth;
    else if (this.baseHeight <= Config.instance.ScreenHeight)
        this.gameScale = this.baseHeight / Config.instance.ScreenHeight;

    console.log (this.width + " x " + this.height);
    console.log ("screenScale: " + this.gameScale);
}



