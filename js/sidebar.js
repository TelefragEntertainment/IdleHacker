class Sidebar{
	constructor(){
		this.x = 0.01;
		this.y = 0.10;
		this.w = 0.125;
		this.h = 0.5;
		this.startTime = new Date();
		this.col1 = 'rgb(150, 150, 250)';
		this.col2 = 'rgb(150, 150, 250)';
	}
	
	update(){
		this.draw();
	}
	
	draw(){
		//BG
		ctx.fillStyle = 'rgb(0, 0, 20)';
		ctx.fillRect(this.x * width, this.y * width, this.w * width, this.h * height);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgb(100, 100, 200)';
		ctx.strokeRect(this.x * width, this.y * width, this.w * width, this.h * height);
		
		//Time
		var today = new Date();
		ctx.shadowColor = this.col1;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 15;
		
		ctx.textAlign = "center";
		ctx.fillStyle = this.col1;
		ctx.font = Math.round(0.01 * width) + 'pt "Time"';
		ctx.fillText('TIME', ((this.x * 8) * width), ((this.y + 0.01) * width));
		ctx.font = Math.round(0.01 * width) + 'pt "Time"';
		ctx.fillText( ('0' + today.getHours()).slice(-2) + " : " + ('0' + today.getMinutes()).slice(-2) + " : " + ('0' + today.getSeconds()).slice(-2), ((this.x * 8) * width), ((this.y + 0.025) * width));
		ctx.fillRect(((this.x * 5) * width), ((this.y + 0.055) * width), this.w * width * 0.5, 1);
		
		ctx.font = Math.round(0.01 * width) + 'pt "Time"';
		ctx.fillText('SESSION', ((this.x * 8) * width), ((this.y + 0.065) * width));
		ctx.font = Math.round(0.01 * width) + 'pt "Time"';
		
		var dif =  Math.abs(this.startTime - today)/1000;
		var hours = Math.floor(dif / 3600) % 24;
		dif -= hours * 3600;
		var minutes = Math.floor(dif / 60) % 60;
		dif -= minutes * 60;
		//var seconds = Math.floor(dif / 60) % 60;
		//dif -= seconds * 60;
		var s = ('0' + hours).slice(-2) + " : " + ('0' + minutes).slice(-2) + " : " + (('0' + Math.floor(dif))).slice(-2);

		ctx.fillText(s, ((this.x * 8) * width), ((this.y + 0.08) * width));
		ctx.fillRect(((this.x * 5) * width), ((this.y + 0.11) * width), this.w * width * 0.5, 1);
	}
}