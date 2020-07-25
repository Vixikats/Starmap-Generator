function generateCatalogueName() {
	var type = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var num = ['1','2','3','4','5','6','7','8','9','0'];
	var word = '';
	if(rand(0,1)) word = type.pick()+num.pick()+num.pick()+num.pick()+'-'+num.pick();
	else word = type.pick()+type.pick()+'-'+num.pick()+num.pick()+num.pick()+num.pick();

	switch(rand(0,3)) {
		case 1: {
			word = type.pick()+num.pick()+num.pick()+num.pick()+'-'+num.pick();
			break;
		}
		case 2: {
			word = type.pick()+type.pick()+'-'+num.pick()+num.pick()+num.pick()+num.pick();
			break;
		}
		case 3: {
			word = type.pick()+num.pick()+num.pick()+num.pick()+'-'+type.pick();
			break;
		}
		default: {
			word = type.pick()+num.pick()+num.pick()+'-'+num.pick()+type.pick();
			break;
		}
	}
	
	return word;
}

function generateClusterName() {
	var begin_onset = ['t','t','m','g','v','r','r','r','d','s','s','s','p','l','h','k','q','w','n','y','z','f','j','x','cr','b','wr'];
	var onset = ['t','t','m','g','r','r','d','s','s','l','v','v','tr','n','z'];
	var vowel = ['a','a','e','e','e','i','i','o','o','u'];
	var coda = ['l','l','r','r','k','k','n','n','n','s','s','s','th','d'];
	var title = ['Front','Fold','Advance','Abyss','Expanse','Void','Depths','Forge','Region','Zone','Realm','Domain','Space','Reach','Span'];
	var adjective = ['Endless','Scarred','Hypnotic','Gaping','Broken','Mighty','Fearless','Empty','Shining','Blackened','Wandering','Vicious','Elusive','Illustrious','Violent','Venerable'];
	var syl_roll = rand(1,100);
	var syllables = 0;
	if(syl_roll<=45) syllables = 3; //35%
	else if(syl_roll<=90) syllables = 2; //25%
	else syllables = 1; //10%
	var end_in_vowel = false;
	var word = '';
	for(var i=0; i<syllables; i++) {
		if(syllables==1) {
			word = begin_onset.pick()+vowel.pick()+coda.pick()+'ian';
			break;
		}
		if(i==0) { //beginning of the word;
			//45% CV; 45% CVC; 10% VC
			syl_roll = rand(1,100);
			if(syl_roll<=50) { //cv
				if(rand(1,10)==10) word += vowel.pick();
				word += begin_onset.pick()+vowel.pick();
				end_in_vowel = true;
			}
			else{ //cvc
				if(rand(1,10)==10) word += vowel.pick();
				word += begin_onset.pick()+vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
		}
		else if(i==syllables-1) { //end of the word
			//35% CV; 40% CVC; 25% VC;
			syl_roll = rand(1,100);
			if(syl_roll<=35) { //cv
				word += onset.pick()+vowel.pick();
				end_in_vowel = true;
			}
			else if(syl_roll<=75) { //cvc
				word += onset.pick()+vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
			else { //vc
				if(end_in_vowel) word += onset.pick();
				word += vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
		}
		else { //middle of the word
			//90% CV; 10% CVC;
			syl_roll = rand(1,100);
			if(syl_roll<=90) { //cv
				word += onset.pick()+vowel.pick();
				end_in_vowel = true;
			}
			else { //cvc
				word += onset.pick()+vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
		}
	}
	var capital = word[0];
	capital = capital.toUpperCase();
	if(rand(0,2)) {
		if(rand(0,1)) {
			if(!end_in_vowel&&rand(1,10)<=7&&word.slice(-3)!='ian'&&syllables<=2) word += 'ian';
			word = capital+word.slice(1)+' '+title.pick();
		}
		else word = title.pick()+' of '+capital+word.slice(1);
	}
	else word = adjective.pick()+' '+title.pick();
	return word;
}

function generateProperName() {
	var begin_onset = ['t','t','m','g','v','r','r','r','d','s','s','s','p','l','h','k','q','w','n','y','z','f','j','x','cr','b','wr'];
	var onset = ['t','t','m','g','r','r','d','s','s','l','v','v','tr','n','z'];
	var vowel = ['a','a','e','e','e','i','i','o','o','u'];
	var coda = ['l','l','r','r','k','k','n','n','n','s','s','s','th','d'];
	//pick the number of syllables
	var syl_roll = rand(1,100);
	var syllables = 0;
	if(syl_roll<=55) syllables = 3;
	else if(syl_roll<=90) syllables = 2;
	else if(syl_roll<=98) syllables = 4;
	else syllables = 1;
	var end_in_vowel = false;
	var struct = null;
	var cvc_chance = 40;
	var vc_chance = 20;
	var word = '';
	for(var i=0; i<syllables; i++) {
		if(syllables==1) {
			word = begin_onset.pick()+vowel.pick()+coda.pick();
			break;
		}
		if(i==0) { //beginning of the word;
			//45% CV; 45% CVC; 10% VC
			syl_roll = rand(1,100);
			if(syl_roll<=45) { //cv
				if(rand(1,10)==10) word += vowel.pick();
				word += begin_onset.pick()+vowel.pick();
				end_in_vowel = true;
			}
			else if(syl_roll<=90) { //cvc
				if(rand(1,10)==10) word += vowel.pick();
				word += begin_onset.pick()+vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
			else { //vc
				if(end_in_vowel) word += begin_onset.pick();
				word += vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
		}
		else if(i==syllables-1) { //end of the word
			//35% CV; 40% CVC; 25% VC;
			syl_roll = rand(1,100);
			if(syl_roll<=35) { //cv
				word += onset.pick()+vowel.pick();
				end_in_vowel = true;
			}
			else if(syl_roll<=75) { //cvc
				word += onset.pick()+vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
			else { //vc
				if(end_in_vowel) word += onset.pick();
				word += vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
		}
		else { //middle of the word
			//90% CV; 10% CVC;
			syl_roll = rand(1,100);
			if(syl_roll<=90) { //cv
				word += onset.pick()+vowel.pick();
				end_in_vowel = true;
			}
			else { //cvc
				word += onset.pick()+vowel.pick()+coda.pick();
				end_in_vowel = false;
			}
		}
	}
	if(word.slice(-2)=='in') {
		//30% chance of -e append
		syl_roll = rand(1,100);
		if(syl_roll<=30) { //Add -e
			word += 'e';
		}
	}
	var capital = word[0];
	capital = capital.toUpperCase();
	word = capital+word.slice(1);
	return word;
}