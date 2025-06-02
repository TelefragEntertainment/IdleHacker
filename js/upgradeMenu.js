class upgradeMenu extends hudElement{
    constructor(){
        super();
        this.enabled = false;
		this.x = 0.65;
		this.y = -1;
		this.w = 0.35;
		this.h = 0;
        this.targetx = this.x;  // For animating changes
		this.targety = 0.5;
		this.targetw = 0.325;
		this.targeth = 0.35;
    }

    draw(){
        super.draw();
        ctx.fillStyle = 'rgb(9, 8, 15)';
		ctx.fillRect(scaled(this.x) - 4, scaled(this.y, true) -4, scaled(this.w)+8, scaled(this.h,true) + 8);
        ctx.fillStyle = 'rgb(19, 19, 33)';
		ctx.fillRect(scaled(this.x), scaled(this.y, true) , scaled(this.w), scaled(this.h,true));
    }
}