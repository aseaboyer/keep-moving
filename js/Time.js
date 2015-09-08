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
            this.fps = 60 / this.delta;
            this.frameCount += 1;
            
            var fpsEle = document.getElementById("fps");
            if (fpsEle !== undefined) {
                fpsEle.innerHTML = this.getFPS();
            }
        },
        "frameCount" : 0,
        getFPS : function () {
            var currentTime = (new Date().getTime() - this.start) / 1000;
            var result = Math.floor((this.frameCount / currentTime));
            
            if (currentTime > 1) {
                this.start = new Date().getTime();
                this.frameCount = 0;
            }
            
            return result;
        }
    };
}
