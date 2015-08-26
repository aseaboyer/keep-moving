function GameObject() {
    var obj;
    
    obj = {
        "position": {
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
        }
    };
    
    return obj;
}