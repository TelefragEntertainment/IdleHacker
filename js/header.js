class Header{
	constructor(){
		this.x = 2;
		this.y = 2;
		this.logoOffset = 2;
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
		ctx.font = Math.round(0.02 * width) + 'pt "Logo"';
		ctx.fillStyle = 'rgba(100,255,100,.3)';
		ctx.fillText('Idle Hacker', this.x + this.logoOffset, this.y + this.logoOffset);
		ctx.fillStyle = 'green';
		ctx.fillText('Idle Hacker', 5, 5);
		
		//Detail
		
		
		var btcOutput = btc.toFixed(9).replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
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
		// BTC
		ctx.fillStyle = 'rgb(5, 5, 10)';
		ctx.fillRect(this.x + (width * 0.74), 2, this.x + (width * 0.25), this.y + (width * 0.03) );
		if(this.flashTime > 0.1){
			ctx.font = Math.round(0.0205 * width) + 'pt "BTC"';
			ctx.fillStyle = 'rgba(164, 255, 164, 0.83)';
		}
		else{
			ctx.font = Math.round(0.02 * width) + 'pt "BTC"';
			ctx.fillStyle = 'rgba(100,255,100,0.5)';
		}
		ctx.textAlign = "center";
		ctx.fillText('฿ ' + btcOutput, this.x + (width * 0.86), 5);
		ctx.textAlign = "left";
		//ctx.font = Math.round(0.01 * width) + 'pt "Norm2"';
		//ctx.fillStyle = 'rgba(150,150,255,0.7)';
		//var s = this.detail.substring(this.detailOffset) + this.detail.substring(0, this.detailOffset);
		//ctx.fillText(s.substring(0,12), this.x + (width * 0.6), this.y);
		ctx.font = Math.round(0.01 * width) + 'pt "Norm2"';
		ctx.fillStyle = 'rgba(100,255,100,.7)';
		ctx.fillText("==============================================================================================================================================================", 0, this.y + (width * 0.03));
	}

	flash(){
		this.flashTime = 1;
	}
}