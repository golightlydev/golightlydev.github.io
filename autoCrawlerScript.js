"use strict";

var data = null;
var timer = null;

function startTimer() {
    timer = setInterval(function() {
        data.update();
    }, 3000);
}

function endTimer() {
    clearInterval(timer);
}

class SendData {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }
    getName() { return this.name; }
    setName(name) { this.name = name; }
    getNumber() { return this.number; }
    setNumber(number) { this.number = number; }
};

class Data {
    constructor() {
        this.enemyNum = (Math.floor(Math.random() * 6) + 1) * 4; //decrement by 1 each time enemy defeated, reset when dungeonLevel incremented
        this.enemyName = "";
        this.dungeonLevel = 1; //increment when enemyNum === 0
        this.enemyHP = (Math.floor(Math.random() * 6) + 1) * 1;
        this.enemyStrength = (Math.floor(Math.random() * 6) + 1) * 1;
        this.enemyAgility = (Math.floor(Math.random() * 6) + 1) * 1;
        this.enemyToughness = (Math.floor(Math.random() * 6) + 1) * 1;
        this.enemySpeed = (Math.floor(Math.random() * 6) + 1) * 1;
        this.enemyEXP = (Math.floor(Math.random() * 6) + 1) * 1;
        this.enemyGold = (Math.floor(Math.random() * 6) + 1) * 1;
        this.enemyNum = (Math.floor(Math.random() * 6) + 1) * 4; //decrement by 1 when enemy defeated
        
        this.playerLevel = 1;
        this.playerPoints = 0;
        this.playerMaxHP = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
        this.playerCurrentHP = 0;
        this.playerGold = 0;
        this.strength = 1;
        this.agility = 1;
        this.toughness = 1;
        this.speed = 1;
        this.intelligence = 1;
        this.weapon = 1;
        this.armour = 1;
        this.shoes = 1;
        this.potionLevel = 1;
        this.potionAmount = 5;
        this.playerEXP = 0;
        this.levelUpAmount = 10; //increment by 10 every level, then add to next level
        this.nextLevel = 10;

        this.enemyNameHandle = document.getElementById("enemyName");
        this.dungeonLevelHandle = document.getElementById("dungeonLevel");
        this.statusHandle = document.getElementById("status");
        this.playerLevelHandle = document.getElementById("playerLevel");
        this.playerPointsHandle = document.getElementById("playerPoints");
        this.playerHPHandle = document.getElementById("playerHP");
        this.playerGoldHandle = document.getElementById("playerGold");
        this.strengthHandle = document.getElementById("strength");
        this.strengthButtonHandle = document.getElementById("strengthButton");
        this.agilityHandle = document.getElementById("agility");
        this.agilityButtonHandle = document.getElementById("agilityButton");
        this.toughnessHandle = document.getElementById("toughness");
        this.toughnessButtonHandle = document.getElementById("toughnessButton");
        this.speedHandle = document.getElementById("speed");
        this.speedButtonHandle = document.getElementById("speedButton");
        this.intelligenceHandle = document.getElementById("intelligence");
        this.intelligenceButtonHandle = document.getElementById("intelligenceButton");
        this.weaponHandle = document.getElementById("weapon");
        this.weaponButtonHandle = document.getElementById("weaponButton");
        this.armourHandle = document.getElementById("armour");
        this.armourButtonHandle = document.getElementById("armourButton");
        this.shoesHandle = document.getElementById("shoes");
        this.shoesButtonHandle = document.getElementById("shoesButton");
        this.potionHandle = document.getElementById("potion");
        this.potionButtonHandle = document.getElementById("potionButton");
        this.potionDrinkButtonHandle = document.getElementById("potionDrinkButton");

        this.statusMessage = "";
    }

    playerTurn(status) {
        if(status != 0)
            return status; 
        let toHit = Math.floor(Math.random() * 6) + 1;
        let toHitNum = Math.floor(this.agility / 5);
        for(let a = 0; a < toHitNum; ++a) {
            toHit += Math.floor(Math.random() * 6) + 1;
        }
        let enemyResist = 0;
        let enemyResistNum = Math.floor(this.enemyToughness / 5);
        for(let a = 0; a < enemyResistNum; ++a) {
            enemyResist += Math.floor(Math.random() * 6) + 1;
        }
        if(toHit > enemyResist) {
            let damage = 0;
            let damageNum = Math.floor(this.strength / 5);
            for(let a = 0; a < damageNum; ++a) {
                damage += Math.floor(Math.random() * 6) + 1;
            }
            damage += ((Math.floor(Math.random() * 3) + 1) * 2) * this.weapon;
            this.statusMessage += "your attack did " + damage + " damage <br />";
            this.enemyHP -= damage;
            if(this.enemyHP <= 0)
                return 1;
        }
        else
            this.statusMessage += "your attack missed: " + toHit + " vs " + enemyResist + "<br />";
        return 0;
    }

    enemyTurn(status) {
        if(status != 0)
            return status;
        let toHit = Math.floor(Math.random() * 6) + 1;
        let toHitNum = Math.floor(this.enemyAgility / 5);
        for(let a = 0; a < toHitNum; ++a) {
            toHit += Math.floor(Math.random() * 6) + 1;
        }
        let playerResist = 0;
        let playerResistNum = Math.floor(this.toughness / 5);
        for(let a = 0; a < playerResistNum; ++a) {
            playerResist += Math.floor(Math.random() * 6) + 1;
        }
        playerResist += ((Math.floor(Math.random() * 3) + 1) * 2) * this.armour;
        if(toHit > playerResist) {
            let damage = 0;
            let damageNum = Math.floor(this.enemyStrength / 5);
            for(let a = 0; a < damageNum; ++a) {
                damage += Math.floor(Math.random() * 6) + 1;
            }
            this.statusMessage += "enemy attack did " + damage + " damage <br />";
            this.playerCurrentHP -= damage;
            this.playerHPHandle.innerText = "HP: " + this.playerCurrentHP + "/" + this.playerMaxHP;
            if(this.playerCurrentHP <= 0)
                return 2;
        }
        else
        this.statusMessage += "enemy attack missed: " + toHit + " vs " + playerResist + "<br />";
        return 0;
    }

    createEnemy() {
        this.enemyName = "goblin " + this.enemyNum;
        this.enemyNameHandle.innerText = "Enemy: " + this.enemyName;
        this.enemyHP = (Math.floor(Math.random() * 6) + 1) * this.dungeonLevel;
        this.enemyStrength = (Math.floor(Math.random() * 6) + 1) * this.dungeonLevel;
        this.enemyAgility = (Math.floor(Math.random() * 6) + 1) * this.dungeonLevel;
        this.enemyToughness = (Math.floor(Math.random() * 6) + 1) * this.dungeonLevel;
        this.enemySpeed = (Math.floor(Math.random() * 6) + 1) * this.dungeonLevel;
        this.enemyEXP = (Math.floor(Math.random() * 6) + 1) * this.dungeonLevel;
        this.enemyGold = (Math.floor(Math.random() * 6) + 1) * this.dungeonLevel;
    }

    levelUp() {
        ++this.playerLevel;
        this.playerLevelHandle.innerText = "Level: " + this.playerLevel;
        this.nextLevel += this.levelUpAmount;
        this.levelUpAmount += 10;
        let pointsGain = Math.floor(this.playerIntelligence / 10);
        for(let a = 0; a < pointsGain; ++a) {
            this.playerPoints += Math.floor(Math.random() * 6) + 1;
        }
        this.playerPoints += 5;
        let playerPointsNum = Math.floor(this.intelligence / 10);
        for(let a = 0; a < playerPointsNum; ++a) {
            this.playerPoints += Math.floor(Math.random() * 6) + 1;
        }
        this.playerPointsHandle.innerText = "Points: " + this.playerPoints;
        this.playerMaxHP += Math.floor(Math.random() * 6) + 1;
        let playerMaxHPNum = Math.floor(this.toughness / 10);
        for(let a = 0; a < playerMaxHPNum; ++a) {
            this.playerMaxHP += Math.floor(Math.random() * 6) + 1;
        }
        playerMaxHPNum = Math.floor(this.strength / 10);
        for(let a = 0; a < playerMaxHPNum; ++a) {
            this.playerMaxHP += Math.floor(Math.random() * 6) + 1;
        }
        this.playerCurrentHP = this.playerMaxHP;
        this.playerHPHandle.innerText = "HP: " + this.playerCurrentHP + "/" + this.playerMaxHP;
    }

    calculateReward() {
        this.playerGold += this.enemyGold;
        this.playerGoldHandle.innerText = "Gold: " + this.playerGold;
        let expModifier = ((Math.floor(this.intelligence / 10)) * 5) * 0.01;
        let expGain = this.enemyEXP + Math.floor(this.enemyEXP * expModifier);
        this.playerEXP += expGain;
        if(this.playerEXP >= this.nextLevel) {
            this.statusMessage += "levelled up! defeated enemy. got " + this.enemyGold + " gold, " + expGain + " exp";
            this.levelUp();
        }
        else
            this.statusMessage += "defeated enemy. got " + this.enemyGold + " gold, " + expGain + " exp";
    }

    gameOver() {
        endTimer();
        this.statusMessage += "game over";
        data = new SendData(name, (data.dungeonLevel));
        fetch('https://damp-brook-48872.herokuapp.com/autoCrawlerHighScores', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data}),
        }).then(response => response.json())
            .then(data => {
                console.log("post: ");
                console.log(data);
            });
    }

    adjustEnemyLevel() {
        --this.enemyNum;
        if(this.enemyNum === 0) {
            ++this.dungeonLevel;
            this.dungeonLevelHandle.innerText = "Dungeon Level: " + this.dungeonLevel;
            this.enemyNum = (Math.floor(Math.random() * 6) + 1) * 4;
        }
    }

    update() {
        let status = 0; //0 continue, 1 player won, 2 player dead
        this.statusMessage = "";
        //calculate attack numbers
        let playerAttackNum = (Math.floor(data.speed / 10)) + (Math.floor(data.shoes / 5)) + 1;
        let enemyAttackNum = (Math.floor(data.enemySpeed / 10)) + 1;

        //calculate initiatives
        let playerInitiative = 0;
        for(let a = 0; a < (Math.floor(data.speed / 5)); ++a) {
            playerInitiative += (Math.floor(Math.random() * 6) + 1)
        }
        playerInitiative += ((Math.floor(Math.random() * 3) + 1) * 2) * this.shoes;
        let enemyInitiative = 0;
        for(let a = 0; a < (Math.floor(data.enemySpeed / 5)); ++a) {
            enemyInitiative += (Math.floor(Math.random() * 6) + 1)
        }
        if(enemyInitiative === playerInitiative)
            ++enemyInitiative;
        
        //perform turns
        for(let a = 0; (a < playerAttackNum || a < enemyAttackNum) && status === 0; ++a) {
            if(a < playerAttackNum) {
                if(playerInitiative > enemyInitiative) {
                    status = this.playerTurn(status);
                    if(a < enemyAttackNum)
                        status = this.enemyTurn(status);
                }
                else if(enemyInitiative > playerInitiative) {
                    if(a < enemyAttackNum)
                        status = this.enemyTurn(status);
                    status = this.playerTurn(status);
                }
            }
            else if(a < enemyAttackNum) {
                if(enemyInitiative > playerInitiative) {
                    status = this.enemyTurn(status);
                    if(a < playerAttackNum)
                        status = this.playerTurn(status);
                }
                else if(playerInitiative > enemyInitiative) {
                    if(a < playerAttackNum)
                        status = this.playerTurn(status);
                    status = this.enemyTurn(status);
                }
            }
        }

        //post-combat
        if(status === 1) {
            this.calculateReward();
            this.adjustEnemyLevel();
            this.createEnemy();
        }
        else if(status === 2)
            this.gameOver();
        this.statusHandle.innerHTML = this.statusMessage;
    }

    updateAttribute(attribute) {
        if(this.playerPoints > 0) {
            --this.playerPoints;
            this.playerPointsHandle.innerText = "Points: " + this.playerPoints;
            switch(attribute) {
                case 'strength':
                    ++this.strength;
                    this.strengthHandle.innerText = "Strength: " + this.strength;
                    break;
                case 'agility':
                    ++this.agility;
                    this.agilityHandle.innerText = "Agility: " + this.agility;
                    break;
                case 'toughness':
                    ++this.toughness;
                    this.toughnessHandle.innerText = "Toughness: " + this.toughness;
                    break;
                case 'speed':
                    ++this.speed;
                    this.speedHandle.innerText = "Speed: " + this.speed;
                    break;
                case 'intelligence':
                    ++this.intelligence;
                    this.intelligenceHandle.innerText = "Intelligence: " + this.intelligence;
                    break;
            }
        }
        else {
            this.statusHandle.innerText = "not enough points to increase " + attribute;
        }
    }

    updateItem(item) {
        switch(item) {
            case 'weapon':
                if(this.playerGold >= (this.weapon * 20)) {
                    this.playerGold -= (this.weapon * 20);
                    this.playerGoldHandle.innerText = "Gold: " + this.playerGold;
                    ++this.weapon;
                    this.weaponHandle.innerText = "Weapon: " + this.weapon;
                }
                else
                    this.statusHandle.innerText = "not enough gold to increase " + item;
                break;
            case 'armour':
                if(this.playerGold >= (this.armour * 20)) {
                    this.playerGold -= (this.armour * 20);
                    this.playerGoldHandle.innerText = "Gold: " + this.playerGold;
                    ++this.armour;
                    this.armourHandle.innerText = "Armour: " + this.armour;
                }
                else
                    this.statusHandle.innerText = "not enough gold to increase " + item;
                break;
            case 'shoes':
                if(this.playerGold >= (this.shoes * 20)) {
                    this.playerGold -= (this.shoes * 20);
                    this.playerGoldHandle.innerText = "Gold: " + this.playerGold;
                    ++this.shoes;
                    this.shoesHandle.innerText = "Shoes: " + this.shoes;
                }
                else
                    this.statusHandle.innerText = "not enough gold to increase " + item;
                break;
            case 'potion':
                if(this.playerGold >= (this.potionLevel * 20)) {
                    this.playerGold -= (this.potionLevel * 20);
                    this.playerGoldHandle.innerText = "Gold: " + this.playerGold;
                    ++this.potionLevel;
                    this.potionAmount = 5;
                    this.potionHandle.innerText = "Potion lvl: " + this.potionLevel + ", Remaining: " + this.potionAmount;
                }
                else
                    this.statusHandle.innerText = "not enough gold to increase " + item;
                break;
        }
    }

    drinkPotion() {
        if(this.potionAmount > 0) {
            --this.potionAmount;
            this.playerCurrentHP += (Math.floor(Math.random() * 6) + 1) * this.potionLevel;
            if(this.playerCurrentHP > this.playerMaxHP)
                this.playerCurrentHP = this.playerMaxHP;
            this.potionHandle.innerText = "Potion lvl: " + this.potionLevel + ", Remaining: " + this.potionAmount;
            this.statusHandle.innerText = "you took a swig of healing potion";
            this.playerHPHandle.innerText = "HP: " + this.playerCurrentHP + "/" + this.playerMaxHP;
        }
        else
            this.statusHandle.innerText = "your potion bottle is empty";
    }

    start() {
        this.enemyName = "goblin " + this.enemyNum;
        this.playerCurrentHP = this.playerMaxHP;

        this.enemyNameHandle.innerText = "Enemy: " + this.enemyName;
        this.dungeonLevelHandle.innerText = "Dungeon Level: " + this.dungeonLevel;
        this.dungeonLevelHandle.title = "enemies drop more gold depending on dungeon level, which is the level of all the enemies on that level also.  there are 4d6 enemies per level";
        this.playerLevelHandle.innerText = "Level: " + this.playerLevel;
        this.playerLevelHandle.title = "level up at ie. 10, 30, 60, 100, 150, 210, add 10 to previous level up amount";
        this.playerPointsHandle.innerText = "Points: " + this.playerPoints;
        this.playerHPHandle.innerText = "HP: " + this.playerCurrentHP + "/" + this.playerMaxHP;
        this.playerGoldHandle.innerText = "Currency: " + this.playerGold;
        this.playerGoldHandle.title = "gold = 1d10 * level, level up item cost = 20 * level of item";
        this.strengthHandle.innerText = "Strength: " + this.strength;
        this.strengthHandle.title = "strength (+1d6 dmg every 5 lvl, 1d6 to hp every 10 lvl)";
        this.agilityHandle.innerText = "Agility: " + this.agility;
        this.agilityHandle.title = "agility (+1d6 to hit every 5 lvl, 1d6 to initiative every 5 lvl)";
        this.toughnessHandle.innerText = "Toughness: " + this.toughness;
        this.toughnessHandle.title = "toughness (+1d6 to resist every 5 lvl, 1d6 to hp every 10 lvl)";
        this.speedHandle.innerText = "Speed: " + this.speed;
        this.speedHandle.title = "speed (+1 attack every 10 lvl, 1d6 to initiative every 5 lvl)";
        this.intelligenceHandle.innerText = "Intelligence: " + this.intelligence;
        this.intelligenceHandle.title = "intelligence (+1d6 points per levelup every 10 lvl, +5% exp gain every 10 lvl)";
        this.weaponHandle.innerText = "Weapon: " + this.weapon;
        this.weaponHandle.title = "weapon: +2d3 to attack, per level";
        this.armourHandle.innerText = "Armour: " + this.armour;
        this.armourHandle.title = "armour: +2d3 to resist, per level";
        this.shoesHandle.innerText = "Shoes: " + this.shoes;
        this.shoesHandle.title = "shoes: +2d3 to initiative per level, +1 attack every 5 levels";
        this.potionHandle.innerText = "Potion lvl: " + this.potionLevel + ", Remaining: " + this.potionAmount;
        this.potionHandle.title = "level up potion cost = 10 * item level, potion: +1d6 heal, per level";

        this.strengthButtonHandle.addEventListener("click", function() {
            data.updateAttribute("strength");
        });
        this.agilityButtonHandle.addEventListener("click", function() {
            data.updateAttribute("agility");
        });
        this.toughnessButtonHandle.addEventListener("click", function() {
            data.updateAttribute("toughness");
        });
        this.speedButtonHandle.addEventListener("click", function() {
            data.updateAttribute("speed");
        });
        this.intelligenceButtonHandle.addEventListener("click", function() {
            data.updateAttribute("intelligence");
        });
        this.weaponButtonHandle.addEventListener("click", function() {
            data.updateItem("weapon");
        });
        this.armourButtonHandle.addEventListener("click", function() {
            data.updateItem("armour");
        });
        this.shoesButtonHandle.addEventListener("click", function() {
            data.updateItem("shoes");
        });
        this.potionButtonHandle.addEventListener("click", function() {
            data.updateItem("potion");
        });
        this.potionDrinkButtonHandle.addEventListener("click", function() {
            data.drinkPotion();
        });
        startTimer();
    }
};

function formSubmit(event) {
    name = content.children[0].children[0].children[1].value;
    for(let a = 0; a < 3; ++a) {
        if(content.children[0].children[0].children[5].children[a].children[0].checked)
            portrait = a;
    }
    if(name !== null && (name.length < 17) &&  portrait !== null) {
        content.children[0].children[0].children[8].removeEventListener("click", formSubmit);
        content.removeChild(content.children[0]);

        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        container.style.display = "flex";

        const subContainerA = document.createElement('div');
        subContainerA.setAttribute('id', 'subContainerA');
        const enemyName = document.createElement('p');
        enemyName.setAttribute('id', 'enemyName');
        const dungeonLevel = document.createElement('p');
        dungeonLevel.setAttribute('id', 'dungeonLevel');
        const enemyImage = document.createElement('img');
        enemyImage.setAttribute('id', 'enemyImage');
        enemyImage.src = "autoCrawlerAssets/enemyPortrait.png";
        const status = document.createElement('p');
        status.setAttribute('id', 'status');
        subContainerA.appendChild(enemyName);
        subContainerA.appendChild(dungeonLevel);
        subContainerA.appendChild(enemyImage);
        subContainerA.appendChild(status);

        const subContainerB = document.createElement('div');
        subContainerB.setAttribute('id', 'subContainerB');
        const playerName = document.createElement('p');
        playerName.setAttribute('id', 'playerName');
        playerName.innerText = "Name: " + name;
        const playerImage = document.createElement('img');
        playerImage.src = "autoCrawlerAssets/portrait" + portrait + ".png";
        playerImage.setAttribute('id', 'playerImage');
        const playerLevel = document.createElement('p');
        playerLevel.setAttribute('id', 'playerLevel');
        const playerPoints = document.createElement('p');
        playerPoints.setAttribute('id', 'playerPoints');
        const playerHP = document.createElement('p');
        playerHP.setAttribute('id', 'playerHP');
        const playerGold = document.createElement('p');
        playerGold.setAttribute('id', 'playerGold');
        
        const strengthContainer = document.createElement('div');
        strengthContainer.setAttribute('id', 'strengthContainer');
        strengthContainer.style.display = "flex";
        const strength = document.createElement('p');
        strength.setAttribute('id', 'strength');
        const strengthButton = document.createElement('button');
        strengthButton.setAttribute('id', 'strengthButton');
        strengthButton.innerHTML = "+";
        strengthContainer.appendChild(strength);
        strengthContainer.appendChild(strengthButton);

        const agilityContainer = document.createElement('div');
        agilityContainer.setAttribute('id', 'agilityContainer');
        agilityContainer.style.display = "flex";
        const agility = document.createElement('p');
        agility.setAttribute('id', 'agility');
        const agilityButton = document.createElement('button');
        agilityButton.setAttribute('id', 'agilityButton');
        agilityButton.innerHTML = "+";
        agilityContainer.appendChild(agility);
        agilityContainer.appendChild(agilityButton);

        const toughnessContainer = document.createElement('div');
        toughnessContainer.setAttribute('id', 'toughnessContainer');
        toughnessContainer.style.display = "flex";
        const toughness = document.createElement('p');
        toughness.setAttribute('id', 'toughness');
        const toughnessButton = document.createElement('button');
        toughnessButton.setAttribute('id', 'toughnessButton');
        toughnessButton.innerHTML = "+";
        toughnessContainer.appendChild(toughness);
        toughnessContainer.appendChild(toughnessButton);

        const speedContainer = document.createElement('div');
        speedContainer.setAttribute('id', 'speedContainer');
        speedContainer.style.display = "flex";
        const speed = document.createElement('p');
        speed.setAttribute('id', 'speed');
        const speedButton = document.createElement('button');
        speedButton.setAttribute('id', 'speedButton');
        speedButton.innerHTML = "+";
        speedContainer.appendChild(speed);
        speedContainer.appendChild(speedButton);

        const intelligenceContainer = document.createElement('div');
        intelligenceContainer.setAttribute('id', 'intelligenceContainer');
        intelligenceContainer.style.display = "flex";
        const intelligence = document.createElement('p');
        intelligence.setAttribute('id', 'intelligence');
        const intelligenceButton = document.createElement('button');
        intelligenceButton.setAttribute('id', 'intelligenceButton');
        intelligenceButton.innerHTML = "+";
        intelligenceContainer.appendChild(intelligence);
        intelligenceContainer.appendChild(intelligenceButton);

        const weaponContainer = document.createElement('div');
        weaponContainer.setAttribute('id', 'weaponContainer');
        weaponContainer.style.display = "flex";
        const weapon = document.createElement('p');
        weapon.setAttribute('id', 'weapon');
        const weaponButton = document.createElement('button');
        weaponButton.setAttribute('id', 'weaponButton');
        weaponButton.innerHTML = "+";
        weaponContainer.appendChild(weapon);
        weaponContainer.appendChild(weaponButton);

        const armourContainer = document.createElement('div');
        armourContainer.setAttribute('id', 'armourContainer');
        armourContainer.style.display = "flex";
        const armour = document.createElement('p');
        armour.setAttribute('id', 'armour');
        const armourButton = document.createElement('button');
        armourButton.setAttribute('id', 'armourButton');
        armourButton.innerHTML = "+";
        armourContainer.appendChild(armour);
        armourContainer.appendChild(armourButton);

        const shoesContainer = document.createElement('div');
        shoesContainer.setAttribute('id', 'shoesContainer');
        shoesContainer.style.display = "flex";
        const shoes = document.createElement('p');
        shoes.setAttribute('id', 'shoes');
        const shoesButton = document.createElement('button');
        shoesButton.setAttribute('id', 'shoesButton');
        shoesButton.innerHTML = "+";
        shoesContainer.appendChild(shoes);
        shoesContainer.appendChild(shoesButton);

        const potionContainer = document.createElement('div');
        potionContainer.setAttribute('id', 'potionContainer');
        potionContainer.style.display = "flex";
        const potion = document.createElement('p');
        potion.setAttribute('id', 'potion');
        const potionButton = document.createElement('button');
        potionButton.setAttribute('id', 'potionButton');
        potionButton.innerHTML = "+";
        const potionDrinkButton = document.createElement('button');
        potionDrinkButton.setAttribute('id', 'potionDrinkButton');
        potionDrinkButton.innerHTML = "drink";
        potionContainer.appendChild(potion);
        potionContainer.appendChild(potionButton);
        potionContainer.appendChild(potionDrinkButton);

        subContainerB.appendChild(playerName);
        subContainerB.appendChild(playerImage);
        subContainerB.appendChild(playerLevel);
        subContainerB.appendChild(playerPoints);
        subContainerB.appendChild(playerHP);
        subContainerB.appendChild(playerGold);
        subContainerB.appendChild(strengthContainer);
        subContainerB.appendChild(agilityContainer);
        subContainerB.appendChild(toughnessContainer);
        subContainerB.appendChild(speedContainer);
        subContainerB.appendChild(intelligenceContainer);
        subContainerB.appendChild(weaponContainer);
        subContainerB.appendChild(armourContainer);
        subContainerB.appendChild(shoesContainer);
        subContainerB.appendChild(potionContainer);
        
        container.appendChild(subContainerA);
        container.appendChild(subContainerB);
        content.appendChild(container);

        data = new Data();
        data.start();
    }
}

const content = document.getElementById("content");
content.children[0].children[0].children[8].addEventListener("click", formSubmit);
var name = null;
var portrait = null;

