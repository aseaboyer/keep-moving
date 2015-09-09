function Game() {
    return {
        "players": [],
        "baseMoveSpeed": 1,
        "time": new Time(),
        "paused": false,
        "localPlayerID": 0,
        "init": function (g) {
            console.log("init");
            
            //this.inventory.import( this.inventory.urls.hats, this.inventory.hats )
            // skip this import for now, till the local server is set up
            
            // get other players
        },
        "inventory": {
            "import": function (url, obj) {
                var itemList, itemCount;
                var fetcher = new XMLHttpRequest();
                
                console.log("Opening: " + url);
                fetcher.onreadystatechange=function() {
                    if (fetcher.readyState==4 && fetcher.status==200) {
                        console.log("Opened: " + url);
                    }
                }
                fetcher.open("GET", url, true);
                fetcher.send();
                
                obj = itemList;
                
                return itemCount;
            },
            "urls": {
                "hats": "img/hats.png"
            },
            "lookup": function (slot, idNum) {
                var items = this[slot];
                for (var x = 0; x < items.length; x++) {
                    if (items[x].id == idNum) {
                        return items[x];
                    }
                }
                return undefined;
            },
            "hats": [
                {
                    "id": 0,
                    "name": "Cowboy Hat",
                    "x": 0,
                    "y": 0,
                    "width": 36,
                    "height": 22,
                    "url": "img/hats.png"
                },
                {
                    "id": 1,
                    "name": "Pink Bow",
                    "x": 67,
                    "y": 9,
                    "width": 33,
                    "height": 23,
                    "url": "img/hats.png"
                },
                {
                    "id": 2,
                    "name": "'merica!",
                    "x": 122,
                    "y": 11,
                    "width": 38,
                    "height": 21,
                    "url": "img/hats.png"
                }
            ]
        },
        "createPlayer": function (rosterEle) {
            var thisPlayer = new Player(rosterEle);
            this.players.push(thisPlayer);
            thisPlayer.order = this.players.length - 1;
            
            return thisPlayer.order;
        },
        "update": function (g, keys) {
            g.time.update();
            
            //this.players[this.localPlayerID].
            
            for (var x=0; x<this.players.length; x++) {
                this.players[x].update (this.time.delta);
            }
            
            //console.log(keys);
        },
        "drawList": {
            list: [],
            add: function (newItem) {
                this.list.push(newItem);
            },
            remove: function (item) {
                var found = this.list.indexOf(item);
                if (found > -1) {
                    this.list.splice(found, 1);
                }
            }
        },
        "draw": function (canvas, items) {
            var c = canvas.getContext('2d');
            c.clearRect(0, 0, canvas.width, canvas.height); // reset canvas
            
            // foreach item, call it's draw
            for (var x = 0; x < this.players.length; x++) {
                this.players[x].draw(c);
            }
            
            // then, foreach item, call it's GUI draw
        }
    };
}
