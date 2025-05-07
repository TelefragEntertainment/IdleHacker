class HackProgressBox{
	constructor(x, y, title){
		this.x = x;
        this.xpos = x * width;
		this.y = y;
        this.ypos = y * width;
		this.w = 0.2;
		this.h = 0.1;
        this.title = title;
	}

	update(){
		this.autoHack();
		this.draw();
	}
	
	draw(){
		if(this.shake > 0.01){
			this.shake *= 0.7;
			if(this.shake <= 0.01){
				this.shake = 0;
			}
		}
    }
}