class Sidebar{
	constructor(){
		this.x = 0.01;
		this.y = 0.10;
		this.w = 0.175;
		this.h = 0.5;
		
	}
	
	update(){
		this.draw();
	}
	
	draw(){
		ctx.fillStyle = 'rgb(0, 0, 20)';
		ctx.fillRect(this.x * width, this.y * width, this.w * width, this.h * height);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgb(50, 50, 200)';
		ctx.strokeRect(this.x * width, this.y * width, this.w * width, this.h * height);
		
		var today = new Date();
		ctx.font = Math.round(0.015 * width) + 'pt "Time"';
		ctx.fillStyle = 'rgb(150, 150, 250)';
		ctx.fillText( ('0' + today.getHours()).slice(-2) + " : " + ('0' + today.getMinutes()).slice(-2) + " : " + ('0' + today.getSeconds()).slice(-2), ((this.x + 0.02) * width), ((this.y + 0.01) * width));
	}
}