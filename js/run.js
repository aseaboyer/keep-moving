var canvas, context, GAME;

function getKeys() {
    
}

(function () {
    canvas = document.getElementById('game');
    
    // create the game
    GAME = new Game();
    console.log(GAME);
    
    // open websockets to get other players
    
    // run game.init()
    GAME.init(game);
    
    // Wait for the modal, which asks for a name and should create a player and call run
    // add new player
    var localPlayerID = GAME.createPlayer(document.getElementById("roster"));
    console.log(GAME.players[localPlayerID]);
    GAME.players[localPlayerID].transform.position.set(canvas.width * 0.5, canvas.height * 0.5);
    GAME.players[localPlayerID].color.set( "rgba(128,253,188, 0.7)", GAME.players[localPlayerID] );
    // Players can change name
    var nameInput = document.getElementById("setName");
    nameInput.value = GAME.players[localPlayerID].name.get();
    nameInput.addEventListener("keyup", function (e) {
        GAME.players[localPlayerID].name.set(e.target.value);
    });
    
    
    function run() {
        window.requestAnimationFrame(run);
        var keys = getKeys();
        
        if (!GAME.paused) {
            GAME.update(GAME, keys);
        }
        GAME.draw(canvas, GAME.drawList);
    }
    
    run();
})();