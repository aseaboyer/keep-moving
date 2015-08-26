function Time() {
    var startTime = Date.now();
    
    return {
        "start": startTime,
        "delta": 0,
        "last": startTime,
        "current": startTime,
        "rate": 1,
        "fps": 0,
        "update": function () {
            var dateObj = Date.now();
            this.last = this.current;
            this.current = dateObj;
            this.delta = (this.current - this.last) * 0.001;
            this.fps = 60/this.delta;
            
            var fpsEle = document.getElementById("fps");
            if (fpsEle !== undefined) {
                fpsEle.innerHTML = parseInt(this.fps);
            }
        }
    };
}
