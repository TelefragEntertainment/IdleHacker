class CMDLine{
	constructor(){
		this.x = 0.2;
		this.y = 0.10;
		this.w = 0.4;
		this.h = 0.5;
		this.cursorDelay = 0;
		this.cursor = '|';
		this.hackText = "test";
		this.hackTxtIndex = 0;
		this.cmdText = "Init hack protocol: 0-1.x/ready...;";
		this.keyPressed = false;
	}
	
	update(){
		this.draw();
	}
	
	draw(){
		ctx.fillStyle = 'rgb(5, 5, 10)';
		ctx.fillRect(this.x * width, this.y * width, this.w * width, this.h * height);
		ctx.fillStyle = 'rgb(1, 50, 1)';
		ctx.fillRect(this.x * width, this.y * width, this.w * width, this.h * 0.05 * height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgb(25, 100, 25)';
		ctx.strokeRect(this.x * width, this.y * width, this.w * width, this.h * 0.05 * height);
		ctx.lineWidth = 0;
		this.cursorDelay -= deltaTime;
		if(this.cursorDelay <= 0){
			this.cursor = this.cursor == '|' ? '' : '|';
			this.cursorDelay = 200;
		}
		ctx.font = Math.round(0.025 * height) + 'pt "CMD"';
		ctx.fillStyle = 'rgb(200,255,200)';
		
		var s = this.cmdText;
		var t = "";
		var y = 0;
		var line1 = "";
		for(var i = 0; i < s.length; i++){
			t += s[i];
			if(i == s.length-1){
				t += this.cursor;
			}
			//Clear first line.
			if(y > (this.h * height) - 50){
				this.cmdText = this.cmdText.substring(line1.length, this.cmdText.length - line1.length);
				break;
			}
			//Split into multiple lines
			else if(ctx.measureText(t).width + 30 > this.w * width || s[i] == ';' || s[i] == '{' || s[i] == '};'){
				if(y == 0){
					line1 = t;
				}
				ctx.fillText(t,(this.x * width) + 15, (this.y * width) + y + (this.y * width * 0.2));
				t = "";
				y+=25;
			}
			else{
				ctx.fillText(t,(this.x * width) + 15, (this.y * width) + y + (this.y * width * 0.2));
			}
		}
		
	}
	
	keyInput(pressed, ovr = false){
		if((pressed && !this.keyPressed) || ovr){
			var step = 1;
			for(var i = 0; i < step; i++){
				if(this.hackTxtIndex + i >= this.hackText.length){
					this.hackTxtIndex = 0;
				}
				this.cmdText += this.hackText[this.hackTxtIndex + i];
			}
			this.hackTxtIndex += step;
			btc += 0.00000001;
			this.keyPressed = true;
		}
		else if (!pressed && this.keyPressed){
			this.keyPressed = false;
		}
	}
}

window.addEventListener("keydown", function (event) {
	cmdline.keyInput(true);
	event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
	cmdline.keyInput(false);
	event.preventDefault();
}, true);