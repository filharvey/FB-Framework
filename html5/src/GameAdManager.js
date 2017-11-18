GameAdManager.instance = null;

function GameAdManager()
{
    JCAdManager.instance = this;

    this.adSpaceCodes = {

    };
}   

GameAdManager.constructor = GameAdManager;

GameAdManager.prototype.registerAd = function (name, adSpaceCode, isVideo)
{
    console.log ("Register Ad: " + name + " - " + adSpaceCode);
    this.adSpaceCodes[name] = {
        code: adSpaceCode,
        ad: null,
        isVideo: isVideo
    };
    this.getAd (name);
}

GameAdManager.prototype.getAd = function (adSpace)
{
    if (this.adSpaceCodes.hasOwnProperty(adSpace))
    {
        console.log ("Get Ad: " + adSpace);
        Analytics.instance.trackEvent ("APP_ITEMLOAD_START", {
            event_unix_tm: new Date().getTime () / 1000,
            item_id: adSpace,
            item_type: "sdk_request",
            ad_network:"FAN"
        });

        var ad = null;
        if (this.adSpaceCodes[adSpace].isVideo)
        {
            FBInstant.getRewardedVideoAsync(this.adSpaceCodes[adSpace].code).then(function (newAd) {
                console.log ("got Video Ad: ", adSpace, JSON.stringify (newAd));
                ad = newAd;
                return ad.loadAsync();
            }).then(function () {
                console.log('Ad loaded: ', adSpace, JSON.stringify (ad));
                JCAdManager.instance.adSpaceCodes[adSpace].ad = ad;
//                    return ad;
            }).catch(function(ex) {
                console.log ("Ad Failed: ", adSpace, JSON.stringify (ex));
                self.adSpaces[adSpace] = null;
            });
        }
        else
        {
            FBInstant.getInterstitialAdAsync(this.adSpaceCodes[adSpace].code).then(function (newAd) {
                console.log ("got Ad: ", adSpace, JSON.stringify (newAd));
                ad = newAd;
                return ad.loadAsync();
            }).then(function () {
                console.log('Ad loaded: ', adSpace, JSON.stringify (ad));
                JCAdManager.instance.adSpaceCodes[adSpace].ad = ad;
            }).catch(function(ex) {
                console.log ("Ad Failed: ", adSpace, JSON.stringify (ex));
                self.adSpaces[adSpace] = null;
            });
        }
    }
}

GameAdManager.prototype.showAd = function (adSpace, callback)
{
    console.log ("show Ad: ", adSpace, this.adSpaceCodes[adSpace]);
    if (this.adSpaceCodes.hasOwnProperty (adSpace) &&  this.adSpaceCodes[adSpace].ad)
    {
//            this.adSpaceCodes[adSpace].ad.onClick (this.onClick);
        this.adSpaceCodes[adSpace].ad.showAsync ().then(function () {
            console.log('Ad shown: ', adSpace);

            Analytics.instance.trackEvent ("APP_ITEMLOAD_END", {
                event_unix_tm: new Date().getTime () / 1000,
                item_id: adSpace,
                item_type: "sdk_request",
                ad_network:"FAN",
                response:"y"
            });

            if (callback)
            {
                callback (true);
            }
        }).catch(function(ex) {
            if (ex)
            {
                console.log ("Ad Failed: ", adSpace, JSON.stringify(ex));
                
                if (callback)
                {
                    callback (false);
                }
            }
        });

        this.adSpaceCodes[adSpace].ad = null;
    }
    else
    {
        if (callback)
        {
            callback (false);
        }
    }

    this.getAd (adSpace);
}

GameAdManager.prototype.onClick = function (result)
{
    console.log ("onClick", result);
}

GameAdManager.prototype.hasAd = function (adSpace)
{
    if (this.adSpaceCodes.hasOwnProperty (adSpace) && 
        this.adSpaceCodes[adSpace].ad)
    {
        return this.adSpaceCodes[adSpace].ad;
    }

    return false;
}
