function App() 
{
    var loadFB = true;
    var stage = new PIXI.Container();
    new MainGame ();

// initialize Game Analytics
//    GameAnalytics("initialize", 'b9111a5c76b2e42f852c1a894c26f99e', 'ff0ac7f95be87760ddbed0a4328b51e8a97cc48b');

    width = window.innerWidth;
    height = window.innerHeight;
    MainGame.instance.renderer = new PIXI.autoDetectRenderer(width, height, {backgroundColor : 0x000000, preserveDrawingBuffer:true});
    stage.addChild (MainGame.instance);

    if (loadFB)
    {
        FBInstant.initializeAsync ().then (function () {
            var locale = FBInstant.getLocale(); // 'en_US'
            var platform = FBInstant.getPlatform(); // 'iOS', 'android' or 'web'
            var sdkVersion = FBInstant.getSDKVersion(); // '1.1'
            var playerID = FBInstant.player.getID ();
            var playerName = FBInstant.player.getName();
            var playerUrl = FBInstant.player.getPhoto();
            var contextID = FBInstant.context.getID ();				
    
            const entryPointData = FBInstant.getEntryPointData();
            
            console.log ("playerID:" + playerID);
            console.log ("playerName:" + playerName);
            console.log ("playerUrl:" + playerUrl);
            console.log ("contextID:" + contextID);
            console.log (entryPointData);
    
            loadAssets ();
            
            GameAnalytics("setFacebookId", playerID);
            
            // load player Info
            MainGame.instance.gameData.playerInfo = new PlayerInfo (playerID, playerName, playerUrl);
            
            Server.instance.login (MainGame.instance.handleLogin.bind (MainGame.instance));
            
            PlayerInfo.instance.getUserData ();
            PlayerInfo.instance.loadImage ();
        });
    }
    else
    {
        // load player Info
        MainGame.instance.gameData.playerInfo = new PlayerInfo ("1", "Phil");
            
        Server.instance.login (MainGame.instance.handleLogin.bind (MainGame.instance));

        PlayerInfo.instance.hasData = true;
        
        loadAssets ();
    }

    // load assets
    function loadAssets ()
    {
        PIXI.loader
            .add('assets/font/font.fnt')
            .add('assets/blank.png')
            .add('assets/sprite_sheet.json')
            .on ('progress', onAssetProgress)
            .load(onAssetsLoaded);
    }

    // onAssetProgress
    //
    // update for loading progress
    function onAssetProgress(loader, resource) {
        //console.log("loading: " + resource.url); 

        //Display the precentage of files currently loaded
        if (loadFB)
            FBInstant.setLoadingProgress(loader.progress);
    }

    // onAssetsLoaded
    //      
    function onAssetsLoaded ()
    {
        if (loadFB)
            FBInstant.setLoadingProgress(100);

        MainGame.instance.loadAssets ();

        // add the renderer view element to the DOM
        document.body.appendChild(MainGame.instance.renderer.view);

        doStartGame ();
    }
        
    function doStartGame ()
    {
        if (MainGame.instance.connected && 
            PlayerInfo.instance.hasData)
        {
            if (loadFB)
            {
                FBInstant.startGameAsync ().then (function (){
                    startGame ();
                });
            }
            else
            {
                startGame ();
            }
        }
        else
        {
            setTimeout (function ()
            {
                doStartGame ();
            }, 500);
        }
    }

    // startGame
    // 
    function startGame ()
    {
        MainGame.instance.startGame ();

        requestAnimationFrame(animate);

        lastTime = 0;
    }

    var lastTime = 0;

    // animate
    // 
    // Frame Updater
    function animate(time) 
    {
        var dt = time - lastTime;
        lastTime = time;
        requestAnimationFrame(animate);

        // update tween manager
        TWEEN.update(time);

        if (!MainGame.instance.gameData.pause)
        {
            // update the game
            MainGame.instance.update(dt);

            // render the stage
            MainGame.instance.renderer.render(stage);
        }
    }   
};
