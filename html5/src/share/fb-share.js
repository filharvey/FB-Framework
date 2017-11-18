function FBShare ()
{
    this.BG_WIDTH  = 625;
    this.BG_HEIGHT = 325;
//    this.ICON_SIZE = 69;
    this.ICON_SIZE = 140;
    this.ICON_GAP  = 150;

    this.shareType = "";

    this.postCanvas = null;
    this.context = null;
    this.postBase64 = null;
    this.imgBg = null;
    this.imgRank = null;
    this.imgP1 = null;
    this.shareData = null;

    this.entryPointData = null;
    this.score = 0;
    this.deck = "";

    this.assetFolder = "assets/";
}

FBShare.constructor = FBShare;

// ------------------------------------------------------------------------
FBShare.prototype.init = function () 
{
    this.entryPointData = FBInstant.getEntryPointData();
    console.log("FBShare->entryPointData:",this.entryPointData);
}

// ------------------------------------------------------------------------
FBShare.prototype.share = function (type, score, deck) 
{
    this.shareType = type;

    console.log("FBShare.share:", type, score, deck);

    this.score = score;
    this.deck = deck;

    this.destroy();

    this.postCanvas = document.createElement('canvas');
    this.context = this.postCanvas.getContext('2d');
    this.context.canvas.width  = this.BG_WIDTH;
    this.context.canvas.height = this.BG_HEIGHT;
    this.imgBg = new Image();
    this.imgBg.onload = this.onLoadBgImg.bind(this);
    this.imgBg.src = this.assetFolder + "sharescreen.png";

    //console.log("FBShare->load image",this.imgBg.src);
}

// ------------------------------------------------------------------------
FBShare.prototype.onLoadBgImg = function () 
{
    //console.log("FBShare.onLoadBgImg");

    // players image
    this.context.drawImage(MainGame.instance.gameData.playerInfo.image, 46, 82, this.ICON_SIZE, this.ICON_SIZE);

    // background
    this.context.drawImage(this.imgBg, 0, 0, this.BG_WIDTH, this.BG_HEIGHT, 0, 0, this.BG_WIDTH, this.BG_HEIGHT);

    this.shareData = {score: this.score, deck: this.deck};

/*    if (this.shareType == "share") {

        // first player to share?
        var loadPlayer1Image = false;
        if (this.entryPointData == null || this.entryPointData.p1Id == null || this.entryPointData.p1Id == MainGame.instance.gameData.playerInfo.id) {
            this.shareData.p1Id    = MainGame.instance.gameData.playerInfo.id;
            this.shareData.p1Name  = MainGame.instance.gameData.playerInfo.name;
            this.shareData.p1URL   = MainGame.instance.gameData.playerInfo.url;
            this.shareData.p1Score = this.score;
        } else {
            this.shareData.p1Id    = this.entryPointData.p1Id;
            this.shareData.p1Name  = this.entryPointData.p1Name;
            this.shareData.p1URL   = this.entryPointData.p1URL;
            this.shareData.p1Score = this.entryPointData.p1Score;
            loadPlayer1Image = true;
            this.shareData.p2Id    = MainGame.instance.gameData.playerInfo.id;
            this.shareData.p2Name  = MainGame.instance.gameData.playerInfo.name;
            this.shareData.p2URL   = MainGame.instance.gameData.playerInfo.url;
            this.shareData.p2Score = this.score;
        }

        if (loadPlayer1Image && this.entryPointData.p1URL != null) {
            this.imgP1 = new Image();
            this.imgP1.crossOrigin = 'anonymous';
            this.imgP1.onload = this.completeShare.bind(this);
            this.imgP1.src =  this.entryPointData.p1URL;
        }
        else {
            this.completeShare();
        }
    }
    else 
*/    {

        this.completeShare();
    }
}

// ------------------------------------------------------------------------
FBShare.prototype.completeShare = function () 
{
    //console.log("FBShare.completeShare->shareData:",this.shareData);

    this.context.font = "bold 42px Arial";
    this.context.textAlign = "center"; 

    var rightGap = this.BG_WIDTH - (this.ICON_GAP + this.ICON_SIZE);
    var center = this.BG_WIDTH  / 2;

    var caption = MainGame.instance.gameData.score.toLocaleString();
    this.context.fillStyle = "white";
    this.context.fillText(caption, 115, 265);

    this.context.strokeStyle = "black";
    this.context.lineWidth = 3;
    this.context.strokeText(caption, 115, 265);
    
/*    if (this.shareType == "update") {
        var caption = MainGame.instance.gameData.score.toLocaleString() + "!";
        this.context.fillStyle = "white";
//        this.context.drawImage(MainGame.instance.gameData.playerInfo.image, 0, 0, MainGame.instance.gameData.playerInfo.image.width, MainGame.instance.gameData.playerInfo.image.height, center - (this.ICON_SIZE/2), 100, this.ICON_SIZE, this.ICON_SIZE);
        this.context.fillText(caption, 120, 250);
    }
    else {

        if (this.imgP1 != null) { // 2 players
            if (this.shareData.p2Score >= this.shareData.p1Score) {
                this.context.fillStyle = "white";
                this.context.fillText(MainGame.instance.gameData.playerInfo.name, this.ICON_GAP+(this.ICON_SIZE / 2), 115);
                this.context.drawImage(MainGame.instance.gameData.playerInfo.image, 0, 0, MainGame.instance.gameData.playerInfo.image.width, MainGame.instance.gameData.playerInfo.image.height, this.ICON_GAP, 125, this.ICON_SIZE, this.ICON_SIZE);
                this.context.fillText(this.score.toLocaleString() + " Points!", this.ICON_GAP+(this.ICON_SIZE / 2), 220);
                this.context.fillStyle = "black";
                this.context.fillText(this.shareData.p1Name, rightGap+(this.ICON_SIZE / 2), 115);
                this.context.drawImage(this.imgP1, 0, 0, this.imgP1.width, this.imgP1.height, rightGap, 125, this.ICON_SIZE, this.ICON_SIZE);
                this.context.fillText(this.shareData.p1Score.toLocaleString() + " Points!", rightGap+(this.ICON_SIZE / 2), 220);
            }
            else {
                this.context.fillStyle = "white";
                this.context.fillText(this.shareData.p1Name, this.ICON_GAP+(this.ICON_SIZE / 2), 115);
                this.context.drawImage(this.imgP1, 0, 0, this.imgP1.width, this.imgP1.height, this.ICON_GAP, 125, this.ICON_SIZE, this.ICON_SIZE);
                this.context.fillText(this.shareData.p1Score.toLocaleString() + " Points!", this.ICON_GAP+(this.ICON_SIZE / 2), 220);
                this.context.fillStyle = "black";
                this.context.fillText(MainGame.instance.gameData.playerInfo.name, rightGap+(this.ICON_SIZE / 2), 115);
                this.context.drawImage(MainGame.instance.gameData.playerInfo.image, 0, 0, MainGame.instance.gameData.playerInfo.image.width, MainGame.instance.gameData.playerInfo.image.height, rightGap, 125, this.ICON_SIZE, this.ICON_SIZE);
                this.context.fillText(this.score.toLocaleString() + " Points!", rightGap+(this.ICON_SIZE / 2), 220);
            }
        }
        else { // 1 player
            this.context.fillStyle = "white";
            this.context.fillText(MainGame.instance.gameData.playerInfo.name, center, 115);
            this.context.drawImage(MainGame.instance.gameData.playerInfo.image, 0, 0, MainGame.instance.gameData.playerInfo.image.width, MainGame.instance.gameData.playerInfo.image.height, center - (this.ICON_SIZE/2), 125, this.ICON_SIZE, this.ICON_SIZE);
            this.context.fillText(this.score.toLocaleString() + " Points!", center, 220);
        }
    }
*/
    this.postBase64 = this.postCanvas.toDataURL();

    if (this.shareType == "share") {

        FBInstant.shareAsync({
            intent: 'REQUEST',
            image: this.postBase64,
            text: "Let's play!",
            data: this.shareData,
        }).then(function() {
            MainGame.instance.newGame();
        });
    }
    else {

        FBInstant.updateAsync({
            action: 'CUSTOM',
            template: 'beat_my_score',
            cta: 'Play Solitaire',
            image: this.postBase64,
            text: 'Can you beat my score?',
            data: this.shareData,
            strategy: 'IMMEDIATE',
            notification: 'NO_PUSH',
        }).then(function() {
            MainGame.instance.newGame();
        });
    }
}

// ------------------------------------------------------------------------
FBShare.prototype.destroy = function () 
{
    this.postCanvas = null;
    this.context = null;
    this.postBase64 = null;
    this.imgBg = null;
    this.imgP1 = null;
    this.shareData = null;
}
