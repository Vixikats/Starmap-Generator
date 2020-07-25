function rad2deg(rad) {
	return rad*180/Math.PI;
}

function deg2rad(deg) {
	return deg*Math.PI/180;
}

function getHyp(x, y) {
	return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
}

function getCoords(angle, dist) {
	angle %= 360;
	var tan = Math.tan(deg2rad(angle));
	var coords = null;
	var mod = 0;
	if(angle==0) coords = new Vertex(-dist,0);
	else if(angle==90) coords = new Vertex(0,-dist);
	else if(angle==180) coords = new Vertex(dist,0);
	else if(angle==270) coords = new Vertex(0,dist);
	else if(angle>0&&angle<90) {
		mod = dist/getHyp(1, tan);
		coords = new Vertex(-mod, -tan*mod);
	}
	else if(angle>90&&angle<180) {
		mod = dist/getHyp(1, tan);
		coords = new Vertex(mod, tan*mod);
	}
	else if(angle>180&&angle<270) {
		mod = dist/getHyp(1, tan);
		coords = new Vertex(mod, tan*mod);
	}
	else {
		mod = dist/getHyp(1, tan);
		coords = new Vertex(-mod, -tan*mod);
	}
	return coords;
}