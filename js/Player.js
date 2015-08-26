function Player(rosterList) {
    var obj, tempName, startTime, rosterItem, tumbleWeedImage;
    tempName = parseInt((Math.random() * 100000000), 10); // useful as a uid
    startTime = Date.now();
    
    // create the li for the roster
    rosterItem = document.createElement("li");
    rosterItem.setAttribute("id", "player" + tempName);
    rosterItem.dataset.player = tempName;
    rosterItem.innerHTML = "<span class='icon' data-player"+tempName+"-icon='normal'>icon</span><span class='name'>"+tempName+"</span><span class='status' data-player"+tempName+"-status='normal'>waiting</span>";
    // create the icon
    //var rosterIcon = document.createElement("span").classList.add("icon");
    //create the status holder
    //var rosterIcon = document.createElement("span").classList.add("status");
    rosterList.appendChild(rosterItem);
    
    tumbleWeedImage = document.createElement("img");
    tumbleWeedImage.src = "img/tumbleweed_icon.png";
    tumbleWeedImage.width = 50;
    tumbleWeedImage.height = 50;
    
    obj = {
        "id": tempName,
        "order": 0,
        "playing": false,
        "created": startTime,
        "color": {
            value: "rgba(128,188,253, 0.7)",
            get: function() {
                return this.value;
            },
            set: function (newColor, thisObj) {
                this.value = newColor;
                var playerIcon = document.querySelectorAll('[data-player' + this.id + '-icon]');
                console.log(thisObj);
                var thisChildren = thisObj.name.rosterObject.getElementsByClassName("icon")[0].style.backgroundColor = this.get();
            }
        },
        "playerIcon": tumbleWeedImage,
        "name": {
            "value": tempName,
            "get": function () {
                return this.value;
            },
            "set": function (newName) {
                this.name = newName;
                this.rosterObject.getElementsByClassName("name")[0].innerHTML = newName;
            },
            "rosterObject": rosterItem
        },
        "GameObject": new GameObject(),
        "transform": {
            "position": { // this is part of the GO later....I think
                "x": 0,
                "y": 0,
                "velocity": new Vector2(),
                "get": function () {
                    return { "x" : this.x, "y" : this.y };
                },
                "set": function (nx, ny) {
                    this.x = nx;
                    this.y = ny;
                },
                "move": function (v2, speed) {

                }
            },
            "rotation": {
                "value": 0,
                "rotate": function (rotVal) {
                
                }
            }
        },
        "active": true,
        "update": function () {
            
        },
        "draw": function (context) {
            console.log("draw player: " + this.name.get());
            context.beginPath();
            context.arc(this.transform.position.x, this.transform.position.y, this.playerIcon.width, 0, 2 * Math.PI, false);
            context.fillStyle = this.color.get();
            context.fill();
            
            context.drawImage(this.playerIcon, this.transform.position.x - (this.playerIcon.width * 0.5),
                              this.transform.position.y - (this.playerIcon.height * 0.5), this.playerIcon.width, this.playerIcon.height);
        }
    };
    return obj;
}
