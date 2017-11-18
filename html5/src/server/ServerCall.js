class ServerCall
{
    constructor (url, params, callback) 
    {
        this.callback = callback
        this.xhr = new XMLHttpRequest();
        this.xhr.open("POST", url, true);
        this.xhr.setRequestHeader("Content-type", "application/json");

        if (PlayerInfo.instance.token)
            this.xhr.setRequestHeader("fbig-token", PlayerInfo.instance.token);

        this.xhr.setRequestHeader("fbig-game", MainGame.GameName);
            
        this.xhr.onreadystatechange = this.processXHRRequest.bind(this);
        this.xhr.send(JSON.stringify(params));

        console.log(url,"\n",JSON.stringify(params));
    }

    // ---------------------------------------------------------------------------    
    processXHRRequest(e) 
    {
        if (this.xhr.readyState == 4) 
        {
            this.waitingForResponse = false;

            if (this.xhr.status == 200) {

                this.timeOutTimer = 0;

                var response = JSON.parse(this.xhr.responseText);

                if (this.callback)
                {
                    this.callback (response);
                }
            }
            else 
            {
                var response = JSON.parse(this.xhr.responseText);

                if (this.callback)
                {
                    this.callback (null, response);
                }
            }
        }
    }
}