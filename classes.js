function rand(min, max) {
	return Math.floor((LCG.random()*(max-min+1))+min);
}

function roll(num, min, max) {
	var sum = 0;
	for(var i=0; i<num; i++) {
		sum += rand(min,max);
	}
	return sum;
}

function Vertex(_x=0, _y=0) {
	this.x = Number(_x);
	this.y = Number(_y);
}

Array.prototype.find = function(item) {
	for(var i=0; i<this.length; i++) if(this[i]==item) return i;
	return -1;
}

Array.prototype.remove = function(item) {
	for(var i=0; i<this.length; i++) {
		if(this[i]==item) {
			this.splice(i,1);
			i--;
		}
	}
}

Array.prototype.copy = function() {
	return this.slice(0);
}

Array.prototype.pick = function() {
	return this[rand(0,this.length-1)];
}

function Camera() {
	this.pos = new Vertex();
	this.offset = new Vertex();
	this.zoom = 1;
	this.zoom_level = 1;
	this.getScreenPos = function(pos) {
		var true_pos = new Vertex();
		true_pos.x = ((pos.x+this.pos.x)*this.zoom)-WORLD_OFFSET.x;
		true_pos.y = ((pos.y+this.pos.y)*this.zoom)-WORLD_OFFSET.y;
		return true_pos;
	}
}

function connect(sysA, sysB) {
	var conn = new Connection(sysA, sysB);
	sysA.conns.push(conn);
	sysB.conns.push(conn);
	connections.push(conn);
	return conn;
}

function getDist(vertA, vertB) {
	return Math.sqrt(Math.pow(vertA.x-vertB.x,2)+Math.pow(vertA.y-vertB.y,2));
}

function System() {
	this.pos = new Vertex();
	this.name = '';
	this.conns = [];
	this.color = new Color();
	this.class = '';
	this.type = '';
	this.size = 1;
	this.paths = [];
	this.traffic = 0;
	this.max_traffic_conn = 0;
	this.cluster = null;
	this.threshold = Math.pow(rand(27,343),1/3);
	this.getConnection = function(trg) {
		for(var i=0; i<this.conns.length; i++) {
			var c = this.conns[i];
			if(c.sysA==trg||c.sysB==trg) return c;
		}
	};
	this.connectedSystems = function() {
		var sys_list = [];
		for(var i=0; i<this.conns.length; i++) {
			if(this==this.conns[i].sysA) sys_list.push(this.conns[i].sysB);
			else sys_list.push(this.conns[i].sysA);
		}
		return sys_list;
	};
	this.getTraffic = function() {
		this.traffic = 0;
		for(var i=0; i<this.conns.length; i++) {
			var c = this.conns[i];
			this.traffic += c.traffic;
			if(c.traffic>this.max_traffic_conn) this.max_traffic_conn = c.traffic;
		}
		return this.traffic;
	}
	this.classifyStar = function() {
		var temp = rand(1,100);
		var subtemp = rand(0,9);
		//Get Color
		if(temp<=2) { //O Deep Blue 2% 100/100/200
			this.type = 'O'+subtemp;
			this.class = 'Blue';
			this.color.r = 100+(45*(subtemp/9));
			this.color.g = 100+(45*(subtemp/9));
			this.color.b = 200+(15*(subtemp/9));
		}
		else if(temp<=7) { //B Blue White 5% 150/150/220
			this.type = 'B'+subtemp;
			this.class = 'Blue';
			this.color.r = 150+(45*(subtemp/9));
			this.color.g = 150+(45*(subtemp/9));
			this.color.b = 220+(5*(subtemp/9));
		}
		else if(temp<=15) { //A Light Blue White 8% 200/200/230
			this.type = 'A'+subtemp;
			this.class = 'Blue';
			this.color.r = 200+(50*(subtemp/9));
			this.color.g = 200+(50*(subtemp/9));
			this.color.b = 230+(20*(subtemp/9));
		}
		else if(temp<=30) { //F White 15% 255/255/255
			this.type = 'F'+subtemp;
			this.class = 'White';
			this.color.r = 255;
			this.color.g = 255;
			this.color.b = 255-(200*(subtemp/9));
		}
		else if(temp<=60) { //G Yellow White 30% 255/255/50
			this.type = 'G'+subtemp;
			this.class = 'White';
			this.color.r = 255;
			this.color.g = 255-(130*(subtemp/9));
			this.color.b = 50-(15*(subtemp/9));
		}
		else if(temp<=85) { //K Orange 25% 255/120/30
			this.type = 'K'+subtemp;
			this.class = 'Red';
			this.color.r = 255;
			this.color.g = 120-(35*(subtemp/9));
			this.color.b = 30+(45*(subtemp/9));
		}
		else { //M Red 15% 255/80/80 - 180/0/0
			this.type = 'M'+subtemp;
			this.class = 'Red';
			this.color.r = 255-(75*(subtemp/9));
			this.color.g = 80-(80*(subtemp/9));
			this.color.b = 80-(80*(subtemp/9));
		}
		//Get Size
		var category = rand(1,100);
		if(category<=2) {
			this.size = rand(71,100)*0.1; //Hypergiant 2%
			this.class += ' Hypergiant';
			this.type += 'I';
		}
		else if(category<=7) {
			this.size = rand(41,70)*0.1; //Supergiant 5%
			this.class += ' Supergiant';
			this.type += 'II';
		}
		else if(category<=15) {
			this.size = rand(31,40)*0.1; //Bright Giant 8%
			this.class += ' Bright Giant';
			this.type += 'III';
		}
		else if(category<=25) {
			this.size = rand(16,30)*0.1; //Giant 10%
			this.class += ' Giant';
			this.type += 'IV';
		}
		else if(category<60) {
			this.size = rand(8,15)*0.1; //Main Sequence 35%
			this.class = 'Main Sequence';
			this.type += 'V';
		}
		else if(category<=70) {
			this.size = rand(4,7)*0.1; //Subdwarf 10%
			this.class += ' Subdwarf';
			this.type += 'VI';
		}
		else {
			this.size = rand(10,25)*0.01; //White dwarf 30%
			this.class += ' Dwarf';
			this.type += 'VII';
		}
	}
	this.classifyStar();
}

function Color(_r=0,_g=0,_b=0,_a=1) {
	this.r = _r;
	this.g = _g;
	this.b = _b;
	this.a = _a;
}

function Cluster() {
	this.systems = [];
	this.color = new Color();
	this.mean = new Vertex();
	this.name = '';
	this.getMeanPos = function() {
		var sum = new Vertex();
		for(var i=0; i<this.systems.length; i++) {
			sum.x += this.systems[i].pos.x;
			sum.y += this.systems[i].pos.y;
		}
		this.mean.x = sum.x/this.systems.length;
		this.mean.y = sum.y/this.systems.length;
		return this.mean;
	}
}

function Connection(_sysA=null,_sysB=null) {
	this.sysA = _sysA;
	this.sysB = _sysB;
	this.dist = getDist(this.sysA.pos, this.sysB.pos);
	this.traffic = 0;
	this.getOtherSys = function(sys) {
		if(sys == this.sysA) return this.sysB;
		else return this.sysA;
	}
}

function getURIVar(trg) {
	var uri = window.location.href;
	if(uri.indexOf(trg+'=')==-1) return;
	var vars = uri.slice(uri.indexOf('?')+1);
	if(vars.indexOf(trg+'=')==-1) return null;
	var find = vars.slice(vars.indexOf(trg+'=')+trg.length+1);
	var next = find.indexOf('&');
	if(next==-1) return find;
	else return find.slice(0, next);
}

function sortSystemsByDistAsc(zero) {
	systems.sort(function(a,b){return getDist(zero,a.pos)-getDist(zero,b.pos);});
}

function getSystemsWithinDist(zero, distance) {
	sortSystemsByDistAsc(zero);
	var valid = [];
	for(var i=0; i<systems.length; i++) {
		var sys = systems[i];
		if(getDist(zero,sys.pos)<=distance) valid.push(sys);
		else break;
	}
	return valid;
}

function Node(sys) {
	this.system = sys;
	this.f = Infinity; //minimum path length
	this.g = 0; //current path length
	this.h = 0;
	this.parent = null;
}

function ConnPath(_conn=null, _length=0) {
	this.conn = _conn;
	this.length = _length;
	this.getThreshold = function() {
		if(this.conn.sysA.threshold<this.conn.sysB.threshold) return this.conn.sysA.threshold;
		else return this.conn.sysB.threshold;
	}
}

function APath() {
	this.path = [];
	this.length = 0;
	this.startSystem = function() {return this.path[this.path.length-1].system;}
	this.endSystem = function() {return this.path[0].system;}
}

function getNodeParentPath(node, path=[]) {
	path.push(node);
	if(node.parent) path = getNodeParentPath(node.parent, path);
	return path;
}

function getPath(sys, trg) { //A* pathfinding algorithm
	var open = [];
	var closed = [];
	var nodes_list = [];
	var start = new Node(sys);
	var end;
	open.push(start);
	nodes_list.push(start);
	while(open.length) {
		//get the node with the least f value;
		open.sort(function(a,b){return a.f-b.f;}); //sort the list from lowest to highest f value
		var q = open.shift();
		if(q.system==trg) {
			//we're done!
			end = q;
			break;
		}
		var successors = q.system.connectedSystems(); //returns a list of all systems connected to q
		for(var i=0; i<successors.length; i++) {
			var s = successors[i];
			var node = null;
			//check if a node object for the system already exists and pull it
			for(var j=0; j<nodes_list.length; j++) {
				if(nodes_list[j].system==s) {
					node = nodes_list[j];
					break;
				}
			}
			if(!node) { //if no node exists, create one and add it to nodes_list;
				node = new Node(s);
				nodes_list.push(node);
			}
			if(closed.find(node)>=0) continue; //ignore a node that's already been expanded
			if(open.find(node)>=0) { //if it's already been opened, see if the current path is shorter
				var path_length = q.g + getDist(node.system.pos, q.system.pos);
				if(path_length < node.g) {
					node.g = path_length;
					node.parent = q;
					node.f = node.g + node.h;
				}
			}
			else {
				node.parent = q;
				node.g = q.g + getDist(node.system.pos, q.system.pos);
				node.h = getDist(node.system.pos, trg.pos);
				node.f = node.g + node.h;
				open.push(node);
			}
			if(open.length>systems.length) { //Shut it down if it goes on for too long; Debug
				console.log(start.system);
				console.log(trg);
				console.log(getNodeParentPath(node));
				console.log(open);
				return;
			}
		}
		//close q when we're done with it
		closed.push(q);
	}
	var rtrn = null;
	if(end) {
		rtrn = new APath();
		rtrn.length = end.f;
		rtrn.path = getNodeParentPath(end);
	}
	else {
		console.log('No Path Available');
	}
	return rtrn;
}

function LCGRandom(seed=0) {
	this.state = 0x4d595df4d0f33173;
	this.mod = Math.pow(2,61)-1;
	this.mult = 4827107;
	this.inc = 13;
	this.seed;
	this.random = function() {
		this.state = (this.state*this.mult+this.inc)%this.mod;
		return this.state/this.mod;
	}
	this.setSeed = function(seed) {
		this.seed = seed;
		this.state = seed + this.inc;
		this.random();
	}
	this.getSeed = function() {return this.seed;}
	this.setSeed(seed);
}

function Mouse() {
	this.pos = new Vertex();
	this.leftdown = false;
	this.rightdown = false;
}

function Player() {
	this.selection = null;
	this.mouse = new Mouse();
}