class AwardList{
	constructor(){
        this.enabled = false;
		this.x = 0.65;
		this.y = -1;
		this.w = 0.35;
		this.h = 0;
        this.targetx = this.x;  // For animating changes
		this.targety = 0.05;
		this.targetw = 0.325;
		this.targeth = 0.75;
        this.bounties = [];
        
        this.eventTriggers = [];

        //Add bounty list
        this.eventTriggers.push(new EventTrigger( 
            function(){
                if(btc >= 0.000000001){
                    cmdline.setTargetSize(-1,-1,0.625,-1);
                    bounty.enabled = true;
                    bounty.addBounty(targets[Math.floor(Math.random() * targets.length)], 25, 13);
                    return true;
                }
                return false;
            }));
    }
	
	update(){
        if(cmdline.keyClicked){
            for(let x = 0; x < this.bounties.length; x++){
                if(this.bounties[x].progress < this.bounties[x].maxProgress){
                    this.bounties[x].progress++;
                    if(this.bounties[x].progress >= this.bounties[x].maxProgress){
                        this.bounties[x].progress = this.bounties[x].maxProgress;
                        btc *= this.bounties[x].reward;
                        cmdline.shake += 10;
			            header.flash();
                        this.bounties.splice(0,1);
                        this.addBounty(targets[Math.floor(Math.random() * targets.length)], Math.floor(btc * 1000000000), 1.2);
                    }
                }
            }
        }
        this.checkEvents();
		this.draw();
	}

    checkEvents(){
        for(let i=0; i < this.eventTriggers.length; i++){
            if(this.eventTriggers[i].checkCondition()){
                this.eventTriggers.splice(i,1);
                break;
            }
        }
    }

    draw(){
        if(!this.enabled) return;

        this.x = lerp(this.x, this.targetx, 0.05);
		this.y = lerp(this.y, this.targety, 0.05);
		this.w = lerp(this.w, this.targetw, 0.05);
		this.h = lerp(this.h, this.targeth, 0.05);

        ctx.fillStyle = 'rgb(9, 8, 15)';
		ctx.fillRect(scaled(this.x) - 4, scaled(this.y) -4, scaled(this.w)+8, this.h * height+8);
        ctx.fillStyle = 'rgb(19, 19, 33)';
		ctx.fillRect(scaled(this.x), scaled(this.y) , scaled(this.w), this.h * height);
        ctx.fillStyle = 'rgb(127, 255, 15)';
        ctx.font = Math.round(0.02 * height) + 'pt "CMD"';
        var space = 0;
        for(let i = this.bounties.length-1; i >= 0; i--){
            if(((scaled(this.y)) + (i - (this.bounties.length -1)) * width * -0.002 + space * width * 0.020) > (scaled(this.y)) + (this.h * width)){
                break;
            }
            // Color code
            if(i == this.bounties.length - 1){
                ctx.fillStyle = 'rgb(127, 255, 15)';
                ctx.font = Math.round(0.025 * height) + 'pt "CMD"';
                var fills = "[";
                var perc = this.bounties[i].progress / this.bounties[i].maxProgress;
                for(let x = 0; x < Math.floor(perc * 30); x++){
                    fills += "#";
                }
                fills = fills.padEnd(30,"_");
                fills += "]" + ` (${Math.floor(perc * 100)}%)`;
                var s = `ACTIVE TARGETS \n \n ${this.bounties[i].title} \n \n ${fills}`;
                space += splitText(ctx, s, scaled(this.x) + 5, (scaled(this.y)) + ((i - (this.bounties.length -1)) * width * -0.02) + space * width * 0.004, scaled(this.w) - 5)
            }
            else{
                // ctx.fillStyle = 'rgb(99, 132, 71)';
                // ctx.font = Math.round(0.0175 * height) + 'pt "CMD"';
                // var s = `${new Date(this.bounties[i].time).toLocaleTimeString("en-US")} : ${this.bounties[i].detail} \n ${this.bounties[i].title}`;
                // space += splitText(ctx, s, scaled(this.x) + 5, (scaled(this.y)) + ((i - (this.bounties.length -1)) * width * -0.02) + space * width * 0.004, scaled(this.w) - 5)
            
            }
            // var s = `${new Date(this.bounties[i].time).toLocaleTimeString("en-US")} : ${this.bounties[i].detail} \n ${this.bounties[i].title}`;
            // space += splitText(ctx, s, scaled(this.x) + 5, (scaled(this.y)) + ((i - (this.bounties.length -1)) * width * -0.02) + space * width * 0.004, scaled(this.w) - 5)
            //ctx.fillText(this.bounties[i].title,scaled(this.x) + 5, (scaled(this.y)) + (i - (this.bounties.length -1)) * width * -0.02);
        }
    }

    addBounty(title, detail, reward){
        this.bounties.push(new Bounty(title, detail, reward));
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
}

class Bounty{
    constructor(title, max, reward){
        this.title = title;
        this.reward = reward;
        this.time = Date.now();
        this.progress = 0;
        this.maxProgress = max;
    }
}

///Events contains a condition and a function to be called when condition met
class EventTrigger{
    constructor(conditionEval, onConditionMet){
        this.checkCondition = conditionEval;
        this.onConditionMet = onConditionMet;
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
        
        if (word == "\n" || (testWidth > maxWidth && line.length) > 0) {
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

targets = [
    "Pentagon's Defense Network",
    "CIA Headquarters' Classified Files",
    "FBI's Criminal Database",
    "NSA's Surveillance Servers",
    "International Space Station's Communication System",
    "Bank of America's Central Database",
    "Fort Knox's Gold Vault Security System",
    "New York Stock Exchange Trading Platform",
    "Facebook's User Data Servers",
    "National Electric Power Grid Control Center",
    "Los Angeles Water Supply System",
    "JFK Airport's Air Traffic Control System",
    "Johns Hopkins Hospital Network",
    "Military Drone Control Center at Creech Air Force Base",
    "Satellite Communication System at NASA",
    "Apple's Corporate Headquarters Network",
    "US Government Voting Systems Database",
    "Three Mile Island Nuclear Power Plant Control Room",
    "Pfizer's Pharmaceutical Research Labs",
    "Google's Artificial Intelligence Research Facility",
    "Oculus VR Network",
    "Cheyenne Mountain Complex",
    "Alcatraz High-Security Prison",
    "Luxury Yacht 'Eclipse' Navigation System",
    "Bellagio Casino Security System",
    "Coinbase Cryptocurrency Exchange",
    "Silk Road Dark Web Marketplace",
    "Five Eyes Global Intelligence Network",
    "Alien Spaceship 'The Odyssey'",
    "Time Travel Device at CERN",
    "Avengers Tower Headquarters",
    "Lex Luthor's Lair",
    "Magic Portal at Stonehenge",
    "Interdimensional Gateway at Area 51",
    "Ancient Artifact Repository at the British Museum",
    "Illuminati Secret Society's Database",
    "Mystical Library of Alexandria",
    "Haunted Mansion's Security System at Winchester Mystery House",
    "Underwater Research Facility 'Aquarius'",
    "Space Colony 'Mars One'",
    "Robot Army Command Center at DARPA",
    "World of Warcraft Game Server",
    "CRISPR Genetic Engineering Lab",
    "HAARP Weather Control Station",
    "Mind Control Device at MKUltra Facility",
    "Parallel Universe Communication Hub at MIT",
    "Dragon's Treasure Vault at Gringotts Bank",
    "Wizard's Spellbook Database at Hogwarts",
    "Supercomputer 'Deep Thought' with Sentient AI",
    "Interpol's International Crime Database",
    "Tesla's Autonomous Vehicle Control System",
    "Amazon's Global Distribution Network",
    "Netflix's Content Recommendation Algorithm",
    "SpaceX's Rocket Launch Control Center",
    "Vatican Secret Archives",
    "United Nations Security Council Database",
    "World Health Organization's Disease Surveillance System",
    "European Central Bank's Financial Network",
    "British Secret Intelligence Service (MI6) Database",
    "Tokyo Stock Exchange Trading Platform",
    "Dubai International Airport's Security System",
    "Shanghai Maglev Train Control System",
    "Sydney Opera House's Ticketing System",
    "Hollywood Studio's Film Archive",
    "Las Vegas Strip's Surveillance Network",
    "Mount Everest Base Camp Communication System",
    "Antarctica Research Station Network",
    "International Olympic Committee's Athlete Database",
    "Formula 1 Racing Team's Telemetry Data",
    "World Wildlife Fund's Conservation Database",
    "Greenpeace's Environmental Campaign Network",
    "National Geographic's Exploration Records",
    "Smithsonian Institution's Artifact Database",
    "Royal Navy's Submarine Command Center",
    "European Space Agency's Mars Rover Control System",
    "Harvard University's Research Database",
    "Stanford University's AI Research Center",
    "Oxford University's Historical Manuscripts Archive",
    "Cambridge University's Genetic Research Lab",
    "Yale University's Medical Research Facility",
    "Princeton University's Astrophysics Lab",
    "Columbia University's Climate Research Center",
    "University of Tokyo's Robotics Lab",
    "Seoul National University's Cybersecurity Research Center",
]
