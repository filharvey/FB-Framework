Config.instance = null;

function Config ()
{
    Config.instance = this;

    this.ScreenWidth = 640;
    this.ScreenHeight = 1070;
}

Config.constructor = Config;
