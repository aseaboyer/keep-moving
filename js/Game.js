function Game() {
    return {
        "players": [],
        "baseMoveSpeed": 1,
        "time": new Time(),
        "paused": false,
        "localPlayerID": 0,
        "init": function (g) {
            console.log("init");
            
            // get other players
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
            for (var x=0; x<this.players.length; x++) {
                this.players[x].draw(c);
            }
            
            // then, foreach item, call it's GUI draw
        }
    };
}
