
// Enemy constructor function
let Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 100 + 50);
};

// update the Enemy's position
// parameter dt, a time delta between ticks (will ensure the game runs at the same speed for all computers)
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x>510) {
    	this.x = -50;
    }

    this.checkCollision();
}

// check if Player collided with Enemy
Enemy.prototype.checkCollision = function() {
	if ((this.x > player.x - 75 && this.x < player.x + 75) && (this.y == player.y)) {
		player.score -= 10;
		player.resetPlayer();
	}
}


// draw the Enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor function
let Player = function(x, y) {
	this.sprite = 'images/char-princess.png';
	this.score = 0;
	this.x = x;
	this.y = y;
}

// enable Players moves
Player.prototype.movePlayer = function(pressedKey) {
	if (pressedKey ==='left' &&  this.x > 2) {
		this.x -= 100;
	}
	else if (pressedKey === 'up' && this.y > 0) {
		if (this.y <= 70) {
			this.score += 10;
			setTimeout(player.resetPlayer(), 2000);
		}

		else {
			this.y -= 80;
		}
	}
	else if (pressedKey ==='right' && this.x < 402) {
		this.x += 100;
	}
	else if (pressedKey ==='down' && this.y < 405) {
		this.y += 80;
	}
}

Player.prototype.update = function() {

}

// when Player reaches water block, his position in restarted and score is updated
Player.prototype.resetPlayer = function() {
	this.x = 202;
	this.y = 405;
	setGameScore();
}

// draw the Player on the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// instantine objects
let player  = new Player(202, 405);
let enemy1 = new Enemy(-50, 85);
let enemy2 = new Enemy(-50, 165);
let enemy3 = new Enemy(-50, 245);
let allEnemies = [enemy1, enemy2, enemy3];

// listen for key press events and send them to Player.movePlayer() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.movePlayer(allowedKeys[e.keyCode]);
});

// update element showing Players score
function setGameScore() {
	let score = document.getElementById("score");
   	return score.textContent = "Your score: " + player.score;
}