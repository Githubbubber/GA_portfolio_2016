"use strict";

(function(){
	// Most of the variables used
	var pokemon = [ // http://pldh.net/guides/typechart
    ['Voltorb','images/voltorb.png',100, "Electric", .5],
    ['Charizard','images/charizard.png',200, "Fire/Flying", 2],
    ['Gyarados','images/gyarados.png',125, "Water/Flying", 4],
    ['Mew','images/mew.png',75, "Psychic",1],
    ['Geodude','images/geodude.png',90, "Rock/Ground", 0],
    ['Snorlax','images/snorlax.png',110, "Normal", 1],
    ['Kabutops','images/kabutops.png',95, "Rock/Water", 2],
    ['Eevee','images/eevee.png',60, "Normal",1],
    ['Beedrill','images/beedrill.png',70, "Bug/Poison",1],
    ['Magikarp','images/magikarp.gif',40, "Water",2],
    ['Gastly','images/gastly.png',50, "Ghost/Poison",1]
  ];
  var randEnemy = Math.round(Math.random()*10);
  var enemyName = pokemon[randEnemy][0];
  var enemyPic = pokemon[randEnemy][1];
  var enemyHealth = pokemon[randEnemy][2];
  var enemyType = pokemon[randEnemy][3];
  var enemyDM = pokemon[randEnemy][4];
  var typeSmallText = $("<small><em> - " + enemyType + "</em></small>");
      typeSmallText.css("font-size", ".6em");
  var damageMultiplier = 1;
  var health = 100;
  var divPikachuHealth = $("div#pikachu p.health");
  var divEnemyName = $("div#enemy p.name");
  var divEnemyHealth = $("div#enemy p.health");
  var imgEnemyImg = $("img#enemy_img");
  var imgPikachuImg = $("img#pikachu_img");
  var spanStatusText = $("span#status_text");
  var pHealBtn = $("p#heal_btn");
  var pAttackBtn = $("p#attack_btn");
  var gameContainer = $('div#bg_image');
  var pDamageXBtn = $("<div id='dm_btn'><span>Damage<br />x</span></div>");
      pDamageXBtn.css({
        "padding-top": "30px",
        "font-size": "10px",
        "color": "white",
        "width": "50px",
        "height": "50px",
        "background-repeat": "no-repeat",
        "text-align": "center",
        "transform": "rotate(30deg)",
        "background-image":"url('images/starburst.png')",
        "background-position": "center",
        "background-size": "contain",
        "position": "absolute",
        "bottom": "60px",
        "right": "-20px"
    });
      gameContainer.append(pDamageXBtn);


	var chooseEnemy = function(){
	//picks random enemy from pokemon array. populates initial page with their data.
    divEnemyName.text(enemyName).append(typeSmallText);
    divEnemyHealth.text("Health: " + enemyHealth);
    imgEnemyImg.attr("src", enemyPic);
    spanStatusText.text("A " + enemyName + " appeared!");
	}
	var enemy = chooseEnemy();


	var doHeal = function(){
	//heals your character with a random ammount from 25-50
    var healAmount = Math.round(Math.random()*25 + 25);

    if ((health + healAmount) <=  100) {
      health += healAmount;
      divPikachuHealth.text("Health: "+health);
      spanStatusText.text("Your health is increased! \nEnemy will strike in 3 seconds...");
      btnHide();
      setTimeout(enemyAttack, 3000);
    } else {
      health = 100;
      divPikachuHealth.text("Health: 100");
      spanStatusText.text("Your health is now maxed out! \nEnemy will strike in 3 seconds...");
      btnHide();
      setTimeout(enemyAttack, 3000);
    }
	}

	var enemyAttack = function(){
	//10% chance to miss.
	//90% chance to do between 5-30 damage.
	//after completed, if you aren't dead... buttons reappear.
	//check if your health <= 0.
    var missHit = Math.round(Math.random()*10);
    var attackStrength = Math.round(Math.random()*25 + 5);
    var repeat = 0;

    if (missHit === 10) {
      while (repeat < 1) {
        imgPikachuImg.animate({"left": "+=50px"},1000);
        imgPikachuImg.animate({"left": "-=50px"},1000);
        repeat++;
      }
      spanStatusText.text(enemyName + " missed!");
      btnShow();
      return;
    }

    health -= attackStrength;
    if (health < 0) {
      divPikachuHealth.text("Health: "+health);
      spanStatusText.text(enemyName + " did " + attackStrength + ". \nGame over.");
      imgPikachuImg.css({
          "-webkit-transform": "rotate(90deg)",
          "-moz-transform": "rotate(90deg)",
          "transform": "rotate(90deg)"
        }).delay(1000);
      imgPikachuImg.animate({"opacity": "toggle"}, 2000);
      btnHide();
      return;
    } else {
      divPikachuHealth.text("Health: "+health);

      while (repeat < 3) {
        imgPikachuImg.animate({"left": "+=50px"},85);
        imgPikachuImg.animate({"left": "-=50px"},85);
        repeat++;
      }
      spanStatusText.text(enemyName + " did " + attackStrength + " damage!");
      btnShow();
    }
	}

	var youAttack = function(){
	//10% chance to miss.
	//90% chance to do between 5-30 damage.
	//after completed, says 'enemy will attack in 3 seconds' (buttons hidden during this time)
	//check if enemy health is <= 0.
    var missHit = Math.round(Math.random()*10);
    var attackStrength = Math.round(Math.random()*25 + 5);
    var repeat = 0;

    if (missHit === 10) {
      while (repeat < 1) {
        imgEnemyImg.animate({"left": "+=30px"} ,1000);
        imgEnemyImg.animate({"left": "-=30px"} ,1000);
        repeat++;
      }
      spanStatusText.text("You missed!");
      btnHide();
      setTimeout(enemyAttack, 3000);
      return;
    }

    enemyHealth -= attackStrength;

    if (enemyHealth < 0) {
      divEnemyHealth.text("Health: "+enemyHealth);
      spanStatusText.text("You killed " + enemyName + "!");
      imgEnemyImg.css({
          "-webkit-transform": "rotate(90deg)",
          "-moz-transform": "rotate(90deg)",
          "transform": "rotate(90deg)"
        }).delay(1000);
      imgEnemyImg.animate({"opacity": "toggle"}, 2000);
      btnHide();
      return;
    } else {
      divEnemyHealth.text("Health: "+enemyHealth);
      while (repeat < 3) {
        imgEnemyImg.animate({"left": "+=30px"} ,85);
        imgEnemyImg.animate({"left": "-=30px"} ,85);
        repeat++;
      }
      spanStatusText.text("You did " + attackStrength + " damage! \nEnemy will strike in 3 seconds...");
      btnHide();
      setTimeout(enemyAttack, 3000);
    }
	}

  var youAttackMultiplier = function(){
    var missHit = Math.round(Math.random()*10);
    var attackStrength = Math.round(Math.random()*25 + 5);
    var repeat = 0;

    var addMsg = "Damage multiplier: \n" + ((enemyDM === 0)? "none. ":enemyDM + "x. ");

    if (missHit === 10) {
      while (repeat < 1) {
        imgEnemyImg.animate({"left": "+=30px"} ,1000);
        imgEnemyImg.animate({"left": "-=30px"} ,1000);
        repeat++;
      }
      spanStatusText.text("You missed!");
      btnHide();
      setTimeout(enemyAttack, 3000);
      return;
    }

      enemyHealth = enemyHealth - (attackStrength * enemyDM);

    if (enemyHealth < 0) {
      divEnemyHealth.text("Health: "+enemyHealth);
      spanStatusText.text("You killed " + enemyName + "with a damage multiplier of " + enemyDM + "!");
      imgEnemyImg.css({
          "-webkit-transform": "rotate(90deg)",
          "-moz-transform": "rotate(90deg)",
          "transform": "rotate(90deg)"
        }).delay(1000);
      imgEnemyImg.animate({"opacity": "toggle"}, 2000);
      btnHide();
      return;
    } else {
      divEnemyHealth.text("Health: "+enemyHealth);
      while (repeat < 3) {
        imgEnemyImg.animate({"left": "+=30px"} ,85);
        imgEnemyImg.animate({"left": "-=30px"} ,85);
        repeat++;
      }
      spanStatusText.text(addMsg + "You did " + attackStrength + " damage! \nEnemy will strike in 3 seconds...");
      btnHide();
      setTimeout(enemyAttack, 3000);
    }
  }


  var btnHide = function() {
    pHealBtn.hide();
    pAttackBtn.hide();
    pDamageXBtn.hide();
  }

  var btnShow = function() {
    pHealBtn.show("fast");
    pAttackBtn.show("fast");
    pDamageXBtn.show("fast");
  }

	var addEventListeners = function(){
	//add the click events on the attack and heal buttons.
    pAttackBtn.on("mouseover", function() {
      $(this).css({"color": "yellow", "background-color": "red"});
    });
    pAttackBtn.on("mouseout", function() {
      $(this).css({"color": "white", "background-color": "inherit"});
    });
    pHealBtn.on("mouseover", function() {
      $(this).css({"color": "lightblue", "background-color": "green"});
    });
    pHealBtn.on("mouseout", function() {
      $(this).css({"color": "white", "background-color": "inherit"});
    });
    pAttackBtn.click(youAttack);
    pHealBtn.click(doHeal);
    pDamageXBtn.on("click", function() {
      youAttackMultiplier();
    });
	}

	$(document).ready(function(){
		addEventListeners();
	})

})();
