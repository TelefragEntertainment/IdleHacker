class hudElement{
    constructor(){
        this.enabled = false;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
        this.flashTime = 0;
        this.flashTimeReset = 500;
    }

    setTargetSize(x,y,w,h){
		if(x >= 0)
			this.targetx = x;
		if(y >= 0)
			this.targety = y;
		if(w >= 0)
			this.targetw = w;
		if(h >= 0)
			this.targeth = h;
	}

    update(){
        this.draw();
        this.flash();
    }

    draw(){
        if(!this.enabled) return;

        this.x = lerp(this.x, this.targetx, 0.05);
		this.y = lerp(this.y, this.targety, 0.05);
		this.w = lerp(this.w, this.targetw, 0.05);
		this.h = lerp(this.h, this.targeth, 0.05);
    }

    flash(){
        if(this.flashTime > 0){
            this.flashTime -= deltaTime;
            ctx.fillStyle = `rgb(179, 255, 141, ${this.flashTime/this.flashTimeReset * 0.5})`;
            ctx.fillRect(scaled(this.x), scaled(this.y), scaled(this.w), this.h * height);
        }
    }

    flashBG(){
        this.flashTime = this.flashTimeReset;
    }

    splitText(ctx, text, x, y, maxWidth) {
        const words = text.split(' ');
        let line = '';
        let lines = [];
        let lineHeight = ctx.measureText('M').width * 1.25; // Approximate line height
        
        words.forEach(word => {
            let testLine = line + word + ' ';
            let testWidth = ctx.measureText(testLine).width;
            
            if (word == "\n" || (testWidth > maxWidth && line.length) > 0) {
                lines.push(line);
                line = word + '';
            } else {
                line = testLine;
        }
        });
        
        lines.push(line); // Add the last line
            
        lines.forEach((line, index) => {
            ctx.fillText(line, x, y + index * lineHeight);
        });
        return lines.length;
    }
}