class CMDLine{
	constructor(){
		this.x = 0.01;
		this.y = 0.10;
		this.w = 0.75;
		this.h = 0.5;
		this.cursorDelay = 0;
		this.cursor = '|';
		this.hackText = "test";
		this.hackTxtIndex = 0;
		this.cmdText = "Init hack protocol: 0-1.x/ready...;";
		this.keyPressed = false;
		this.shake = 0;
		this.upg_hackMulti = 5;  // x hacks per hack
		this.upg_autoHackLevel = 10;  // Level of autohack upgrade
		this.upg_autoHackBonus = 0.0005;  // Added to autohackvalue per update, hack rewarded for 1+
		this.autoHackValue = 0;
	}
	
	update(){
		this.autoHack();
		this.draw();
	}

	autoHack(){
		if(this.upg_autoHackLevel > 0){
			this.autoHackValue += this.upg_autoHackBonus * this.upg_autoHackLevel * deltaTime;
			if(this.autoHackValue >= 1){
				while(this.autoHackValue >= 1){
					this.autoHackValue -= 1;
					cmdline.keyInput(true);
					cmdline.keyInput(false);
				}
			}
		}
	}
	
	draw(){
		if(this.shake > 0.01){
			this.shake *= 0.7;
			if(this.shake <= 0.01){
				this.shake = 0;
			}
		}
		ctx.fillStyle = 'rgb(5, 5, 10)';
		ctx.fillRect(this.x * width + Math.random() * this.shake, this.y * width + Math.random() * this.shake, this.w * width + Math.random() * this.shake, this.h * height);
		ctx.fillStyle = 'rgb(1, 50, 1)';
		ctx.fillRect(this.x * width + Math.random() * this.shake, this.y * width + Math.random() * this.shake, this.w * width + Math.random() * this.shake, this.h * 0.05 * height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgb(25, 100, 25)';
		ctx.strokeRect(this.x * width+ Math.random() * this.shake, this.y * width+ Math.random() * this.shake, this.w * width, this.h * 0.05 * height);
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
				ctx.fillText(t,(this.x * width) + 15+ Math.random() * this.shake, (this.y * width) + y + (this.y * width * 0.2)+ Math.random() * this.shake);
				t = "";
				y+=25;
			}
			else{
				ctx.fillText(t,(this.x * width) + 15+ Math.random() * this.shake, (this.y * width) + y + (this.y * width * 0.2)+ Math.random() * this.shake);
			}
		}
		
	}
	
	keyInput(pressed, ovr = false){
		if((pressed && !this.keyPressed) || ovr){
			var step = 1 * this.upg_hackMulti;
			for(var i = 0; i < step; i++){
				if(this.hackTxtIndex + i >= this.hackText.length){
					this.hackTxtIndex = 0;
				}
				this.cmdText += this.hackText[this.hackTxtIndex + i];
			}
			this.hackTxtIndex += step;
			btc += 0.00000001 * this.upg_hackMulti;
			this.keyPressed = true;
			this.shake += 1;
			header.flash();
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