import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../constants.js';

export default class LevelSystem {
    constructor(scene) {
        this.scene = scene;
        this.currentLevel = null;
        this.goalArea = null;
        this.goalReached = false;
    }

    loadLevel(levelData) {
        console.log('Loading level:', levelData);
        this.currentLevel = levelData;
        this.createTilemap();
        this.placeObjects();
        this.scene.events.emit('levelLoaded', levelData);
    }

    createTilemap() {
        console.log('Creating tilemap');
        // Create a blank tilemap
        const map = this.scene.make.tilemap({
            data: this.currentLevel.tiles,
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
            width: this.currentLevel.tiles[0].length,
            height: this.currentLevel.tiles.length
        });

        // Add the tileset image
        const tiles = map.addTilesetImage('tiles', 'tiles', TILE_SIZE, TILE_SIZE, 0, 0, 0);

        if (!tiles) {
            console.error('Failed to add tileset image');
            return;
        }

        // Create the ground layer
        const groundLayer = map.createLayer(0, tiles, 0, 0);
        
        if (!groundLayer) {
            console.error('Failed to create ground layer');
            return;
        }

        groundLayer.setDepth(0);

        // Set collision for specific tiles (adjust as needed)
        groundLayer.setCollisionByExclusion([0, 1, 2]); // Assuming 0, 1, 2 are walkable tiles

        // Set world bounds
        this.scene.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        console.log('Tilemap created successfully');
    }

    placeObjects() {
        console.log('Placing objects');
        this.currentLevel.objects.forEach(obj => {
            switch(obj.type) {
                case 'start':
                    if (this.scene.player) {
                        this.scene.player.setPosition(obj.x * TILE_SIZE + TILE_SIZE / 2, obj.y * TILE_SIZE + TILE_SIZE / 2);
                        console.log('Player positioned at', obj.x * TILE_SIZE + TILE_SIZE / 2, obj.y * TILE_SIZE + TILE_SIZE / 2);
                    }
                    break;
                case 'goal':
                    this.createGoalArea(obj.x, obj.y, obj.width, obj.height);
                    console.log('Goal area placed at', obj.x * TILE_SIZE, obj.y * TILE_SIZE);
                    break;
            }
        });
    }

    createGoalArea(x, y, width, height) {
        this.goalArea = this.scene.add.rectangle(
            x * TILE_SIZE + (width * TILE_SIZE) / 2,
            y * TILE_SIZE + (height * TILE_SIZE) / 2,
            width * TILE_SIZE,
            height * TILE_SIZE,
            0x00ff00,
            0.3
        );
        this.scene.physics.add.existing(this.goalArea, true);
        if (this.scene.player) {
            this.scene.physics.add.overlap(this.scene.player, this.goalArea, this.reachGoal, null, this);
        } else {
            console.error('Player not found when creating goal area');
        }
    }

    reachGoal() {
        if (this.goalReached) return;
        this.goalReached = true;
        console.log('Goal reached!');
        
        // Display "You Won" message
        const winText = this.scene.add.text(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY,
            'You Won!',
            { fontSize: '64px', fill: '#ffffff' }
        );
        winText.setOrigin(0.5);
        winText.setScrollFactor(0);

        // Optional: Stop player movement
        if (this.scene.player) {
            this.scene.player.setVelocity(0);
        } else {
            console.error('Player not found when reaching goal');
        }
    }
}