"use strict";

function game() {
    return {
        "players": []
    };
}

function player() {
    return {
        "id": 0,
        "name": {
            "get": function () {
                return this.name;
            },
            "set": function (newName) {
                this.name = newName;
            }
        },
        "position": {
            "x": 0,
            "y": 0,
            "get": function () {
                return this;
            },
            "set": function (nx, ny) {
                this.x = nx;
                this.y = ny;
            }
        }
    };
}