class AwardList{
	constructor(){
		this.x = 0.775;
		this.y = 0.10;
		this.w = 0.21;
		this.h = 0.5;
        this.bounties = [];
    }
	
	update(){
		this.draw();
	}

    draw(){
        ctx.fillStyle = 'rgb(9, 8, 15)';
		ctx.fillRect(this.x * width - 4, this.y * width -4, this.w * width+8, this.h * height+8);
        ctx.fillStyle = 'rgb(19, 19, 33)';
		ctx.fillRect(this.x * width, this.y * width , this.w * width, this.h * height);
        ctx.fillStyle = 'rgb(127, 255, 15)';
        ctx.font = Math.round(0.02 * height) + 'pt "CMD"';
        var space = 0;
        for(let i = this.bounties.length-1; i >= 0; i--){
            if(((this.y * width) + (i - (this.bounties.length -1)) * width * -0.002 + space * width * 0.020) > (this.y * width) + (this.h * width)){
                break;
            }
            // Color code
            if(i == this.bounties.length - 1){
                ctx.fillStyle = 'rgb(127, 255, 15)';
                ctx.font = Math.round(0.02 * height) + 'pt "CMD"';
            }
            else{
                ctx.fillStyle = 'rgb(99, 132, 71)';
                ctx.font = Math.round(0.0175 * height) + 'pt "CMD"';
            }
            var s = `${new Date(this.bounties[i].time).toLocaleTimeString("en-US")} \n ${this.bounties[i].title} \n `;
            space += splitText(ctx, s, this.x * width + 5, (this.y * width) + ((i - (this.bounties.length -1)) * width * -0.02) + space * width * 0.004, this.w * width - 5)
            //ctx.fillText(this.bounties[i].title,this.x * width + 5, (this.y * width) + (i - (this.bounties.length -1)) * width * -0.02);
        }
    }

    addBounty(title, detail, reward){
        this.bounties.push(new Bounty(title, detail, reward));
    }
}

class Bounty{
    constructor(title, detail, reward){
        this.title = title;
        this.detail = detail;
        this.reward = reward;
        this.time = Date.now();
    }
}


function splitText(ctx, text, x, y, maxWidth) {
        const words = text.split(' ');
        let line = '';
        let lines = [];
        let lineHeight = ctx.measureText('M').width * 1.25; // Approximate line height
    
        words.forEach(word => {
            let testLine = line + word + ' ';
            let testWidth = ctx.measureText(testLine).width;
    
            if (word =="\n" || (testWidth > maxWidth && line.length) > 0) {
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
    

bountyList = ["Fastest Typist: Broke the world record for typing speed while coding a complex algorithm in under a minute.",
    "Master of Encryption: Developed an unbreakable encryption method that even the most advanced quantum computers couldn't crack.",
    "Code Whisperer: Debugged a massive codebase by intuitively understanding and fixing errors without any documentation.",
    "Cyber Sleuth Extraordinaire: Solved a high-profile cybercrime case by tracing digital footprints across multiple continents.",
    "Firewall Destroyer: Penetrated the most secure firewalls of top-secret government agencies without leaving a trace.",
    "Ultimate Password Cracker: Cracked a 256-character password in seconds using a custom-built supercomputer.",
    "Network Ninja: Infiltrated and took control of a heavily guarded corporate network without triggering any alarms.",
    "Dark Web Dominator: Established and maintained the largest underground marketplace on the dark web.",
    "Data Phantom: Stole sensitive data from a major corporation and vanished without a single digital footprint.",
    "Virtual Ghost: Conducted cyber espionage operations while remaining completely invisible to all security systems.",
    "Script Kiddie Supreme: Created powerful scripts that automated complex hacking tasks, making them accessible to novices.",
    "Hacktivist Hero: Led a global movement to expose corruption by hacking into government databases and releasing classified information.",
    "Digital Phantom: Manipulated digital identities to create and erase personas at will, leaving no trace of their existence.",
    "Malware Maestro: Designed sophisticated malware that could evade detection by all known antivirus software.",
    "Quantum Codebreaker: Used quantum computing to decrypt the most secure communications in record time.",
    "Supreme Overlord of Cyberspace: Took control of the internet's infrastructure, redirecting global traffic at will.",
    "Untraceable Digital Shadow: Conducted high-profile hacks while remaining completely anonymous and untraceable.",
    "Mastermind of the Matrix: Created a virtual reality environment indistinguishable from the real world, used for covert operations.",
    "Invisible Cyber Samurai: Executed precision hacks with the skill and stealth of a samurai, leaving no evidence behind.",
    "Grand Architect of the Dark Web: Designed and built the most complex and secure networks on the dark web.",
    "Elite Cybernetic Sorcerer: Manipulated digital systems with seemingly magical abilities, bending the rules of cyberspace.",
    "Undisputed King of Code: Dominated coding competitions worldwide, consistently outperforming all other hackers.",
    "Legendary Firewall Annihilator: Developed techniques to bypass the most advanced firewalls effortlessly.",
    "Ultimate Cybersecurity Conqueror: Defeated the top cybersecurity experts in a global hacking challenge.",
    "Phantom of the Digital Realm: Operated in the digital world with such finesse that their presence was never detected.",
    "Grandmaster of Virtual Espionage: Conducted espionage missions in virtual environments, extracting critical information without detection.",
    "Sovereign of the Cyber Seas: Navigated the vast expanse of cyberspace with unparalleled expertise, uncovering hidden treasures.",
    "Architect of Anonymity: Created systems that ensured complete anonymity for users, protecting their identities from all threats.",
    "Commander of the Code: Led teams of hackers in coordinated attacks, achieving complex objectives with precision.",
    "Guardian of the Grid: Protected critical infrastructure from cyber threats, ensuring the safety of entire nations.",
    "Protector of the Protocols: Developed and enforced security protocols that safeguarded sensitive information.",
    "Virtuoso of Virtual Reality: Created immersive virtual reality experiences used for training and covert operations.",
    "Champion of Cyber Warfare: Led cyber warfare campaigns that disrupted enemy operations and secured strategic advantages.",
    "Sultan of the Server Room: Managed and optimized server farms to achieve maximum efficiency and security.",
    "Emperor of Encryption: Ruled the world of encryption, creating methods that were both secure and efficient.",
    "Wizard of the Web: Manipulated web technologies to achieve extraordinary feats, from creating dynamic content to hacking websites.",
    "Titan of the Terminal: Mastered command-line interfaces, executing complex tasks with speed and accuracy.",
    "Conqueror of the Cloud: Dominated cloud computing environments, optimizing resources and securing data.",
    "Maestro of the Mainframe: Controlled mainframe systems with expert precision, ensuring their reliability and security.",
    "Virtuoso of the Virtual Vault: Designed and managed virtual vaults that stored and protected the most valuable digital assets.",
    "Cybernetic Illusionist: Created illusions in cyberspace that fooled even the most advanced security systems.",
    "Digital Alchemist: Transformed ordinary data into valuable insights through advanced analytical techniques.",
    "Virtual Reality Virtuoso: Developed cutting-edge VR simulations used for training elite cyber operatives.",
    "Stealthy System Saboteur: Disrupted enemy systems with stealth and precision, leaving no trace of the attack.",
    "Cryptographic Conqueror: Broke through the toughest cryptographic defenses with ease.",
    "Data Diver: Extracted hidden data from the deepest layers of digital storage.",
    "Network Navigator: Mapped and explored complex network topologies to find vulnerabilities.",
    "Protocol Pioneer: Innovated new communication protocols that enhanced security and efficiency.",
    "Server Sorcerer: Managed server infrastructures with magical efficiency and reliability.",
    "Mainframe Magician: Controlled mainframe systems with unparalleled expertise.",
    "Cloud Commander: Optimized cloud resources to achieve maximum performance and security.",
    "Terminal Titan: Mastered command-line interfaces to execute complex tasks with speed and accuracy.",
    "Virtual Vault Virtuoso: Designed and managed virtual vaults that stored and protected the most valuable digital assets."
]

