function formSubmit(event) {
    name = content.children[0].children[0].children[1].value;
    for(let a = 0; a < 3; ++a) {
        if(content.children[0].children[0].children[5].children[a].children[0].checked)
            portrait = a;
    }
    if(name !== null && portrait !== null) {
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
        const playerImage = document.createElement('img');
        playerImage.src = "autoCrawlerAssets/portrait" + portrait + ".png";
        playerImage.setAttribute('id', 'playerImage');
        const playerLevel = document.createElement('p');
        playerLevel.setAttribute('id', 'playerLevel');
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
        potionContainer.setAttribute('id', 'shoesContainer');
        potionContainer.style.display = "flex";
        const potion = document.createElement('p');
        shoes.setAttribute('id', 'potion');
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
    }
}

const content = document.getElementById("content");
content.children[0].children[0].children[8].addEventListener("click", formSubmit);
var name = null;
var portrait = null;
