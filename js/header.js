class Header{
	constructor(){
		this.x = 1;
		this.y = 1;
		this.logoOffset = 2;
		this.detailOffset = 0;
		this.detailOffsetDelay = 10;
		this.detailDelta = 0;
		this.flashTime = 0;
	}

	update(){
		if(Math.random() > 0.9){
			this.logoOffset = Math.random() * 4;
		}
		this.flashTime *= 0.5;
		this.draw();
	}
	
	draw(){
		//Logo
		ctx.font = Math.round(0.05 * width) + 'pt "Logo"';
		ctx.fillStyle = 'rgba(100,255,100,.3)';
		ctx.fillText('Idle Hacker', this.x + this.logoOffset, this.y + this.logoOffset);
		ctx.fillStyle = 'green';
		ctx.fillText('Idle Hacker', 5, 5);
		
		//Detail
		
		if(this.flashTime > 0.1){
			ctx.font = Math.round(0.021 * width) + 'pt "BTC"';
			ctx.fillStyle = 'rgba(164, 255, 164, 0.83)';
		}
		else{
			ctx.font = Math.round(0.02 * width) + 'pt "BTC"';
			ctx.fillStyle = 'rgba(100,255,100,0.5)';
		}
		var btcOutput = btc.toFixed(8).replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
		if(btc > 100000000000){
			btcOutput= btc.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		else if(btc > 1000000000){
			btcOutput= btc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		else if(btc > 10000000){
			btcOutput= btc.toFixed(4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		else if(btc > 100000){
			btcOutput= btc.toFixed(6).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		ctx.fillText('฿ ' + btcOutput, this.x + (width * 0.62), this.y + (width * 0.04));
		
		
		this.detail = "TELEFRAG ENTERTAINMENT ";
		this.detailOffsetDelay -= deltaTime;
		if(this.detailOffsetDelay <= 0){
			this.detailOffsetDelay = 200;
			this.detailOffset++;
			if(this.detailOffset >= this.detail.length){
				this.detailOffset = 0;
			}
		}
		ctx.font = Math.round(0.02 * width) + 'pt "Norm2"';
		ctx.fillStyle = 'rgba(150,150,255,0.7)';
		var s = this.detail.substring(this.detailOffset) + this.detail.substring(0, this.detailOffset);
		ctx.fillText(s.substring(0,12), this.x + (width * 0.6), this.y);
		
		ctx.fillStyle = 'rgba(100,255,100,.7)';
		ctx.fillText("======================================================================", 0, this.y + (width * 0.068));
	}

	flash(){
		this.flashTime = 1;
	}
}