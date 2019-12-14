document.getElementById("body").style.margin = "0px";
document.getElementById("body").style.padding = "0px";

let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1,
});

app.renderer.backgroundColor = 0x061639;

document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function(event) {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

let baseTexture = null;
let texture = null;
let sprite = null;

class BaseTexture {
  constructor(fileName, baseTextureID) {
    this.baseTexture = new PIXI.BaseTexture.from(fileName);
    this.baseTextureID = baseTextureID;
  }
};

class AttributeSet {
  constructor(attributeSet) {
    this.x = attributeSet.x;
    this.y = attributeSet.y;
    this.w = attributeSet.w;
    this.h = attributeSet.h;
  }
  setAttributeSet(attributeSet) {
    this.x = attributeSet.x;
    this.y = attributeSet.y;
    this.w = attributeSet.w;
    this.h = attributeSet.h;
  }
};

class Texture {
  constructor(baseTextureID, attributeSet) {
    this.baseTextureID = baseTextureID;
    this.attributeSet = new AttributeSet(attributeSet);
    this.texture = null;
    for(let a = 0; a < texture.length; ++a) {
      if(baseTextureID == baseTexture[a].baseTextureID) {
        this.texture = new PIXI.Texture(baseTexture[a], new PIXI.Rectangle(attributeSet.x, attributeSet.y, attributeSet.w, attributeSet.h));
        break;
      }
    }
  }
  clear() {
    this.texture.destroy(false);
  }
};

class Sprite {
  constructor(textureID, attributeSet, hasParent, spriteID, parentSpriteID, isText, textMessage, textStyle, isUI, isHidden) {
    this.sprite = null;
    this.text = null;
    this.spriteID = spriteID;
    this.hasParent = hasParent;
    this.parentSpriteID = parentSpriteID;
    this.isText = isText;
    this.isUI = isUI;
    this.isHidden = isHidden;
    if(this.isText) {
       text = new PIXI.Text(textMessage, textStyle);
       if(this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            this.text.x = sprite[a].getX(true) + attributeSet.x;
            this.text.y = sprite[a].getY(true) + attributeSet.y;
          }
        }
       }
       else { //has no parent sprite
        this.text.x = attributeSet.x;
        this.text.y = attributeSet.y;
       }
       this.text.w = attributeSet.w;
       this.text.h = attributeSet.h;
    }
    else { //is sprite
      for(let a = 0; a < texture.length; ++a) {
        if(textureID == texture[a].textureID) {
          this.sprte = new PIXI.Sprite(texture[a]);
          break;
        }
      }
      if(this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            this.sprite.x = sprite[a].getX(true) + attributeSet.x;
            this.sprite.y = sprite[a].getY(true) + attributeSet.y;
            break;
          }
        }
      }
      else{ //no parent sprite
        this.sprite.x = attributeSet.x;
        this.sprite.y = attributeSet.y;
      }
      this.sprite.w = attributeSet.w;
      this.sprite.h = attributeSet.h;
    }
  }
  setAttributeSet(attributeSet) {
    if(this.isText) {
      if(this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            this.text.x = sprite[a].getX(true) + attributeSet.x;
            this.text.y = sprite[a].getY(true) + attributeSet.y;
            break;
          }
        }
      }
      else { //has no parent
        this.text.x = attributeSet.x;
        this.text.y = attributeSet.y;
      }
      this.text.w = attributeSet.w;
      this.text.h = attributeSet.h;
    }
    else { //is sprite
      if(this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            this.sprite.x = sprite[a].getX(true) + attributeSet.x;
            this.sprite.y = sprite[a].getY(true) + attributeSet.y;
            break;
          }
        }
      }
      else { //no parent sprite
        this.sprite.x = attributeSet.x;
        this.sprite.y = attributeSet.y;
      }
      this.sprite.w = attributeSet.w;
      this.sprite.h = attributeSet.h;
    }
  }
  setX(x) {
    if(this.isText) {
      if(this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            this.text.x = sprite[a].getX(true) + x;
            break;
          }
        }
      }
      else //has no parent
        this.text.x = x;
    }
    else { //is sprite
      if(this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            this.sprite.x = sprite[a].getX(true) + x;
            break;
          }
        }
      }
      else //no parent sprite
        this.sprite.x = x;
    }
  }
  setY(y) {
    if(this.isText) {
      if(this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            this.text.y = sprite[a].getY(true) + y;
            break;
          }
        }
      }
      else //has no parent
        this.text.y = y;
    }
    else { //is sprite
      if(this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            this.sprite.y = sprite[a].getY(true) + y;
            break;
          }
        }
      }
      else //no parent sprite
        this.sprite.y = y;
    }
  }
  setW(w) {
    if(this.isText)
      this.text.w = w;
    else
      this.sprite.w = w;
  }
  setH(h) {
    if(this.isText)
      this.text.h = h;
    else
      this.sprite.h = h;
  }
  getX(getWorldCoordinate) {
    if(this.isText) {
      if(getWorldCoordinate && this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            return sprite[a].getX(true) + this.text.x;
          }
        }
      }
      else //has no parent
        return this.text.x;
    }
    else { //is sprite
      if(getWorldCoordinate && this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            return sprite[a].getX(true) + this.sprite.x;
          }
        }
      }
      else //no parent sprite
        return this.sprite.x;
    }
  }
  getY(getWorldCoordinate) {
    if(this.isText) {
      if(getWorldCoordinate && this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            return sprite[a].getY(true) + this.text.y;
          }
        }
      }
      else //has no parent
        return this.text.y;
    }
    else { //is sprite
      if(getWorldCoordinate && this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            return sprite[a].getY(true) + this.sprite.y;
          }
        }
      }
      else //no parent sprite
        return this.sprite.y;
    }
  }
  getW() {
    if(this.isText)
      return this.text.w;
    else
      return this.sprite.w;
  }
  getH() {
    if(this.isText)
      return this.text.h;
    else
      return this.sprite.h;
  }
  getAttributeSet(getWorldCoordinate) {
    let returnValue = new AttributeSet();
    if(this.isText) {
      if(getWorldCoordinate && this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            returnValue.x = sprite[a].getX(true) + this.text.x;
            returnValue.y = sprite[a].getY(true) + this.text.y;
            break;
          }
        }
      }
      else { //has no parent
        returnValue.x = this.text.x;
        returnValue.y = this.text.y;
      }
      returnValue.w = this.text.w;
      returnValue.h = this.text.h;
    }
    else { //is sprite
      if(getWorldCoordinate && this.hasParent) {
        for(let a = 0; a < sprite.length; ++a) {
          if(this.parentSpriteID == sprite[a].spriteID) {
            returnValue.x = sprite[a].getX(true) + this.sprite.x;
            returnValue.y = sprite[a].getY(true) + this.sprite.y;
            break;
          }
        }
      }
      else { //no parent sprite
        returnValue.x = this.sprite.x;
        returnValue.y = this.sprite.y;
      }
      returnValue.w = this.sprite.w;
      returnValue.h = this.sprite.h;
    }
    return returnValue;
  }
  clear() {
    if(this.isText)
      this.text.destroy();
    else
      this.sprite.destroy(false);
  }
}



/*function setup() {
  let baseTexture = PIXI.BaseTexture.from('pixiAssets/img/tileset.png');
  let texture = new Array(
    new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, 200, 150)), 
    new PIXI.Texture(baseTexture, new PIXI.Rectangle(200, 0, 150, 200)),
    new PIXI.Texture(baseTexture, new PIXI.Rectangle(200, 200, 200, 250))
  );
  let sprite = new Array(null, null, null);
  sprite[0] = new PIXI.Sprite(texture[0]);
  //sprite[0].x = 96;
  //sprite[0].y = 96;
  //sprite.width = 80;
  //sprite.height = 120;
  //sprite.scale.x = 0.5;
  //sprite.scale.y = 0.5;
  sprite[0].anchor.x = 0.5;
  sprite[0].anchor.y = 0.5;
  sprite[0].rotation = 0.5;
  app.stage.addChild(sprite[0]);
  sprite[1] = new PIXI.Sprite(texture[1]);
  sprite[1].x = 500;
  sprite[1].y = 0;
  app.stage.addChild(sprite[1]);
  sprite[2] = new PIXI.Sprite(texture[2]);
  sprite[2].x = 0;
  sprite[2].y = 500;
  app.stage.addChild(sprite[2]);
  app.renderer.render(app.stage);
}*/

function setup() {

}

setup();

/*changing message of text shouldn't need me to change anything
change w and h code for text to reflect that that's automatically
  determined by program
remove setW and setH for text
create worldBackground.png
create 50 area#.png files
example for tinting those images 
http://scottmcdonnell.github.io/pixi-examples/index.html?s=demos&f=tinting.js&title=Tinting
create a number of sets of worldPlayer.png
create a number of sets for local (different colours as well as types)
create a number of flags

work on animations
  time per frame
  default/idle frame
  movement

pick fonts
  main menu text
  main menu button text
  main menu name text
  other menu heading text
  other menu normal text
  event text

options menu ui
  hamburger open
  hamburger closed
  menu background
  quit button
  retire button (may be greyed out)

starting ui
  background image that's pretty
  title
  create character heading
  character first name sub heading
  character name text box
  character last name sub heading
  character last name text box
  character image sub heading
  character image box
  character select up arrow
  character select down arrow
  character flag sub heading
  reuse box and arrows
  back button
  continue button

world ui (check notes)

local ui (check notes)

4 different spritesheets
  main menu
  world
  local
  options menu (loaded at all times)
*/