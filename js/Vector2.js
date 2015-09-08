function Vector2() { // pass an x/y or default each to 0
    var obj;
    
    obj = {
        "x": 0,
        "y": 0,
        "flip": function () {
            this.flipX();
            this.flipY();
        },
        "flipX": function () {
            this.x = -this.x;
        },
        "flipY": function () {
            this.y = -this.y;
        },
        "kill": function () {
            this.x = 0;
            this.y = 0;
        }
    };
    
    return obj;
}