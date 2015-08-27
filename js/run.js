var canvas, context, GAME, playerColors;

// Make a damn keys object?
var keys = new Array();

document.body.addEventListener("keydown", function (e) {
    if (e.keyCode === 38 || e.keyCode === 87) {
        keys[38] = true;
    } else if (e.keyCode === 40 || e.keyCode === 83) {
        keys[40] = true;
    } else if (e.keyCode === 39 || e.keyCode === 68) {
        keys[39] = true;
    } else if (e.keyCode === 37 || e.keyCode === 65) {
        keys[37] = true;
    }
});
document.body.addEventListener("keyup", function (e) {
    if (e.keyCode === 38 || e.keyCode === 87) {
        keys[38] = false;
    } else if (e.keyCode === 40 || e.keyCode === 83) {
        keys[40] = false;
    } else if (e.keyCode === 39 || e.keyCode === 68) {
        keys[39] = false;
    } else if (e.keyCode === 37 || e.keyCode === 65) {
        keys[37] = false;
    }
});

function getKeys() {
    var v2 = {x:0,y:0};
    
    if (keys[38]) {
        v2.y++;
    }
    if (keys[40]) {
        v2.y--;
    }
    if (keys[39]) {
        v2.x++;
    }
    if (keys[37]) {
        v2.x--;
    }
    
    //console.log(v2);
    
    return v2;
}

playerColors = ["rgba(128,253,188, 0.7)"];

(function () {
    canvas = document.getElementById('game');
    
    // create the game
    GAME = new Game();
    //console.log(GAME);
    
    // open websockets to get other players
    
    // run game.init()
    GAME.init(game);
    
    // Wait for the modal, which asks for a name and should create a player and call run
    // add new player
    var localPlayerID = GAME.createPlayer(document.getElementById("roster"));
    //console.log(GAME.players[localPlayerID]);
    GAME.players[localPlayerID].transform.position.set(canvas.width * 0.5, canvas.height * 0.5);
    GAME.players[localPlayerID].color.set(playerColors[0], GAME.players[localPlayerID]);
    // Players can change name
    var nameInput = document.getElementById("setName");
    nameInput.value = GAME.players[localPlayerID].name.get();
    nameInput.addEventListener("keyup", function (e) {
        GAME.players[localPlayerID].name.set(e.target.value, GAME.players[localPlayerID].id);
    });
    
    
    function run() {
        window.requestAnimationFrame(run);
        var keys = getKeys();
        
        if (!GAME.paused) {
            GAME.update(GAME, keys);
            GAME.players[localPlayerID].transform.position.move(keys, 2);
        }
        GAME.draw(canvas, GAME.drawList);
    }
    
    run();
})();