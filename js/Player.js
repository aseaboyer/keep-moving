function Player(rosterList) {
    var obj, tempName, startTime, rosterItem;
    tempName = parseInt((Math.random() * 1000000), 10); // useful as a uid
    startTime = Date.now();
    
    // create the li for the roster
    rosterItem = document.createElement("li");
    rosterItem.setAttribute("id", "player" + tempName);
    rosterItem.dataset.player = tempName;
    rosterItem.innerHTML = tempName;
    console.log(rosterList);
    rosterList.appendChild(rosterItem);
    
    obj = {
        "id": tempName,
        "order": 0,
        "playing": false,
        "created": startTime,
        "color": "rgba(128,188,253, 0.7)",
        "name": {
            "value": tempName,
            "get": function () {
                return this.value;
            },
            "set": function (newName) {
                this.name = newName;
                this.rosterObject.innerHTML = newName;
            },
            "rosterObject": rosterItem
        },
        "GameObject": new GameObject(),
        "position": { // this is part of the GO later....I think
            "x": 0,
            "y": 0,
            "velocity": new Vector2(),
            "get": function () {
                return this;
            },
            "set": function (nx, ny) {
                this.x = nx;
                this.y = ny;
            },
            "move": function (v2, speed) {
                
            }
        },
        "active": true,
        "update": function () {
            
        },
        "draw": function (context) {
            console.log("draw player: " + this.name.get());
            context.beginPath();
            context.arc(this.position.x, this.position.y, 15, 0, 2 * Math.PI, false);
            context.fillStyle = this.color;
            context.fill();
        }
    };
    return obj;
}
