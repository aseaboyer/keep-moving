function Player(rosterList) {
    var obj, tempName, startTime, rosterItem, tumbleWeedImage;
    tempName = parseInt((Math.random() * 100000000), 10); // useful as a uid
    startTime = Date.now();
    
    // create the li for the roster
    rosterItem = document.createElement("li");
    rosterItem.setAttribute("id", "player" + tempName);
    rosterItem.dataset.player = tempName;
    rosterItem.innerHTML = "<span class='icon' data-player" + tempName + "-icon='normal'>icon</span><span class='name'>" +
        tempName + "</span><span class='status' data-player" + tempName + "-status='normal'>playing</span>";
    rosterList.appendChild(rosterItem);
    
    tumbleWeedImage = document.createElement("img");
    tumbleWeedImage.src = "img/tumbleweed.png";
    tumbleWeedImage.width = 50;
    tumbleWeedImage.height = 50;
    
    obj = {
        "id": tempName,
        "order": 0,
        "playing": false,
        "created": startTime,
        "color": {
            value: "rgba(128,188,253, 0.7)",
            get: function () {
                return this.value;
            },
            set: function (newColor, thisObj) {
                var playerIcon, thisChildren;
                
                this.value = newColor;
                playerIcon = document.querySelectorAll('[data-player' + this.id + '-icon]');
                thisChildren = thisObj.name.rosterObject.getElementsByClassName("icon")[0].style.backgroundColor = this.get();
            }
        },
        "playerIcon": tumbleWeedImage,
        "name": {
            "value": tempName,
            "get": function () {
                return this.value;
            },
            "set": function (newName, idCheck) {
                if (newName !== this.name && newName !== "") {
                    this.name = newName;
                    if (newName !== idCheck) {
                        newName += " (" + idCheck + ")";
                    }

                    this.rosterObject.getElementsByClassName("name")[0].innerHTML = newName;
                }
            },
            "rosterObject": rosterItem
        },
        "GameObject": new GameObject(),
        "transform": {
            "position": { // this is part of the GO later....I think
                "x": 0,
                "y": 0,
                "last": { // return them to hear if they end up in a bad place
                    "x": 0,
                    "y": 0
                },
                "friction": {
                    "base": 0.95,
                    "current": 0.97,
                    "get": function () {
                        return this.current;
                    },
                    "set": function (newFriction) {
                        this.current = newFriction;
                    },
                    "reset": function () {
                        this.current = this.base;
                    }
                },
                "velocity": {
                    "max": {
                        "x": 10,
                        "y": 10
                    },
                    "current": new Vector2()
                },
                "get": function () {
                    return { "x" : this.x, "y" : this.y };
                },
                "set": function (nx, ny) {
                    this.x = nx;
                    this.y = ny;
                },
                "move": function (v2, speed) { // don't hard code speed later
                    // store current
                    this.last.x = this.x;
                    this.last.y = this.y;
                    
                    this.velocity.current.x += v2.x * this.speed.current;
                    if (this.velocity.current.x > this.velocity.max.x) {
                        this.velocity.current.x = this.velocity.max.x;
                    }
                    if (this.velocity.current.x < -this.velocity.max.x) {
                        this.velocity.current.x = -this.velocity.max.x;
                    }
                    
                    this.velocity.current.y -= v2.y;
                    if (this.velocity.current.y > this.velocity.max.y) {
                        this.velocity.current.y = this.velocity.max.y;
                    }
                    if (this.velocity.current.y < -this.velocity.max.y) {
                        this.velocity.current.y = -this.velocity.max.y;
                    }
                    
                    this.x += this.velocity.current.x;
                    this.velocity.current.x *= this.friction.get();
                    this.y += this.velocity.current.y;
                    this.velocity.current.y *= this.friction.get();
                    
                    // keep it in screen - DON'T HARDCODE LATER!
                    if (this.x < 0) {
                        this.x = 0;
                        this.velocity.current.flipX();
                    }
                    if (this.y < 0) {
                        this.y = 0;
                        this.velocity.current.flipY();
                    }
                    if (this.x > 700) {
                        this.x = 700;
                        this.velocity.current.flipX();
                    }
                    if (this.y > 500) {
                        this.y = 500;
                        this.velocity.current.flipY();
                    }
                },
                "speed": { // this whole section might be a bit toooo messy! - MOVE IT TO position.move, for ease
                    "base": 1,
                    "current": 0.6,
                    "get": function () {
                        return this.current;
                    },
                    "set": function (newSpeed) {
                        this.speed = newSpeed;
                    },
                    "reset": function () {
                        this.current = this.base;
                    }
                }
            },
            "rotation": {
                "value": 0,
                "speed": 1,
                "rotate": function (rotVal) {
                    this.value += rotVal;
                },
                get: function () {
                    return this.value;
                }
            }
        },
        "active": true,
        "update": function (timeDelta) {
            var normVelocity = this.transform.position.velocity.current.x + this.transform.position.velocity.current.y;
            
            this.transform.rotation.rotate(timeDelta * normVelocity * this.transform.rotation.speed); // probably only rotate if the velocity isn't {0,0}
            //console.log("Change: "+timeDelta);
        },
        "wardrobe": {
            "hat": false,
            "equip": function (slot, item) {
                if(typeof item !== undefined) {
                    item.img = document.createElement("img");
                    item.img.src = item.url;
                    
                    this[slot] = item;
                    console.log("Created:");
                    console.log(item);
                } else {
                    this.unequip(slot);
                }
            },
            "unequip": function (slot) {
                this[slot] = false;
            }
        },
        "draw": function (context) {
            //console.log("draw player: " + this.name.get());
            //move to position
            
            // Draw player color
            context.save();
            context.translate(this.transform.position.x, this.transform.position.y);
            context.rotate(this.transform.rotation.get());
            context.beginPath();
            context.arc(0, 0, this.playerIcon.width * 0.53, 0, 2 * Math.PI, false);
            context.fillStyle = this.color.get();
            context.fill();
            context.restore();
            
            // Draw shadow
            context.save();
            context.translate(this.transform.position.x, this.transform.position.y);
            context.scale(2,0.4);
            context.beginPath();
            context.arc(0, this.playerIcon.height * 1, this.playerIcon.width * 0.2, 0, 2 * Math.PI, false);
            context.fillStyle =  "rgba(0,0,0, 0.3)";
            context.fill();
            context.restore();
            
            // Draw tumbleweed
            context.save();
            context.translate(this.transform.position.x, this.transform.position.y);
            context.rotate(this.transform.rotation.get());
            context.drawImage(this.playerIcon, -(this.playerIcon.width * 0.5),
                              -(this.playerIcon.height * 0.5), this.playerIcon.width, this.playerIcon.height);
            context.restore();
            
            // Draw hat
            if (typeof this.wardrobe.hat !== undefined && this.wardrobe.hat !== false) {
                //console.log("Wearing hat: " + this.wardrobe.hat.name);
                context.save();
                context.translate(this.transform.position.x, this.transform.position.y - (this.playerIcon.height * 0.3));
                context.drawImage(this.wardrobe.hat.img, 
                                this.wardrobe.hat.x,
                                this.wardrobe.hat.y,
                                this.wardrobe.hat.width,
                                this.wardrobe.hat.height,
                                -(this.wardrobe.hat.width * 0.4),
                                -(this.wardrobe.hat.height * 0.2),
                                this.wardrobe.hat.width,
                                this.wardrobe.hat.height);
                context.restore();
            }
            
        }
    };
    return obj;
}
