class CMDLine{
	constructor(){
		this.x = 0.01;
		this.y = 0.05;
		this.w = 0.98;
		this.h = 0.75;
		this.targetx = this.x;  // For animating changes
		this.targety = this.y;
		this.targetw = this.w;
		this.targeth = this.h;
		this.cursorDelay = 0;
		this.cursor = '|';
		this.hackText = "test";
		this.hackTxtIndex = Math.floor(Math.random() * 1000);
		this.cmdText = "Init hack protocol: 0-1.x/ready...;";
		this.keyPressed = false;
		this.keyClicked = false;  // Cleared in index.html after used
		this.shake = 0;
		this.upg_hackMulti = 51;  // x hacks per hack
		this.upg_autoHackLevel = 5;  // Level of autohack upgrade
		this.upg_autoHackBonus = 0.0005;  // Added to autohackvalue per update, hack rewarded for 1+
		this.autoHackValue = 0;
		this.charsTyped = 0;	// Total characters typed
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

		this.x = lerp(this.x, this.targetx, 0.2);
		this.y = lerp(this.y, this.targety, 0.2);
		this.w = lerp(this.w, this.targetw, 0.2);
		this.h = lerp(this.h, this.targeth, 0.2);


		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgb(25, 100, 25)';
		ctx.strokeRect(scaled(this.x)+ Math.random() * this.shake, scaled(this.y)+ Math.random() * this.shake, scaled(this.w), this.h * 0.05 * height);
		ctx.lineWidth = 0;
		ctx.fillStyle = 'rgb(5, 5, 10)';
		ctx.fillRect(scaled(this.x) + Math.random() * this.shake, scaled(this.y) + Math.random() * this.shake, scaled(this.w) + Math.random() * this.shake, this.h * height);
		ctx.fillStyle = 'rgb(1, 50, 1)';
		ctx.fillRect(scaled(this.x) + Math.random() * this.shake, scaled(this.y) + Math.random() * this.shake, scaled(this.w) + Math.random() * this.shake, this.h * 0.05 * height);
		
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
			if(y > this.h * height - 50){
				this.cmdText = this.cmdText.substring(line1.length, this.cmdText.length - line1.length);
				break;
			}
			//Split into multiple lines
			else if(ctx.measureText(t).width + 30 > scaled(this.w) || s[i] == ';' || s[i] == '{' || s[i] == '};' || s[i]=='*/' || s[i] =='‎' || s[i]=='\n'){
				if(y == 0){
					line1 = t;
				}
				ctx.fillText(t,(scaled(this.x)) + 15+ Math.random() * this.shake, (scaled(this.y)) + y + (scaled(this.y) * 0.25)+ Math.random() * this.shake);
				t = "";
				y+=15;
			}
			else{
				ctx.fillText(t,(scaled(this.x)) + 15+ Math.random() * this.shake, (scaled(this.y)) + y + (scaled(this.y) * 0.25)+ Math.random() * this.shake);
			}
		}
		
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
			this.charsTyped += this.upg_hackMulti;
			//btc += 0.000000001 * this.upg_hackMulti;
			this.keyPressed = true;
			this.keyClicked = true;
			//this.shake += 1;
			//header.flash();
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