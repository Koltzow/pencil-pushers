# Change Log

Here is the change log for Pencil Pushers.

## 0.0.2

### Added
* Dead state to player
* Zero players centers camera
* Collider class under physics
* Sprite class
* Weapons class
* weapon rotation
* weapon pickup
* Stapler class under weapons
* Pistol class under weapons
* Energyball class under ammo
* Bullet class under ammo
* Bouncelazer class under ammo
* Unique id (UID) class under utils
* Remove body function to engine class
* Room generation
* Dynamic running speed
* Tinyexplosion class under effects
* Explosion class under effects
* Global handling of effect particles
* Add/remove functions for effect particles
* Demo textures for rooms
* Firing state to weapons
* Menu class
* Ability to pause game

### Updated
* Camera follow player regardless of player count
* Ui to be rendered globally in the ui class for proper sorting
* Replaced colliders with new collider class
* Replaced sprites with new sprite class
* Check for and run onTrigger instead of isTrigger if it exists
* Single effects to comply with global effect handling
* Splashscreen background for testing
* Some classes til classic constructor classes to clean up some code
* Some tilesheet updates

### Fixed
* Camera shake
* Missing variable causing player to disappear on death
* All players require ready state to start game
* Bug where ammo where not removed on hit, causing memory issues
* Hit marker for effects to center on impact coordinate
* Weapons position relative to player
* Ammo position relative to weapon

### Removed
* Minified files to avoid clutter, for now
* Trap class from objects
* Portal class from objects

## 0.0.1

### Added
* Copied library from Explorer
* Coordinate focus to camera class
* Camera shake to camera class
* Boss class
* Data class
* Characters to data class
* Ammo class
* Staple class under ammo
* Hit class under effects
* Startscreen class
* Splashscreen class under startscreen
* Selectplayer class under startscreen
* Selectboss class under startscreen
* New sounds
* New player sprite
* Death animation to player
* Boss sprite
* Aim to player class
* Aim zoom to player class
* Click handling for gamepad class
* Stick event handling for gamepad class
* Ready state to gamepad class
* Character link to gamepad class
* Camera follow average position for groups of player

### Fixed
* Camera follow for single targets