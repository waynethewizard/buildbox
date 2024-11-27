// Game dimensions
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

// Tile and map properties
export const TILE_SIZE = 16;
export const MAP_WIDTH = 50;
export const MAP_HEIGHT = 50;

// Player properties
export const PLAYER_SPEED = 16;
export const PLAYER_INITIAL_X = 0;
export const PLAYER_INITIAL_Y = 0;

// Camera settings
export const CAMERA_ZOOM = 5;

// Game modes
export const MODE_NORMAL = 'NORMAL';
export const MODE_INSERT = 'INSERT';
export const MODE_VISUAL = 'VISUAL';

// Animation properties
export const ANIMATION_FRAME_RATE = 10;

// UI properties
export const UI_FONT = 'Arial';
export const UI_FONT_SIZE = '16px';
export const UI_TEXT_COLOR = '#ffffff';

// Asset keys
export const TILESET_KEY = 'tiles';
export const PLAYER_SPRITE_KEY = 'player';

// Player sprite properties
export const PLAYER_SPRITE_WIDTH = 32;
export const PLAYER_SPRITE_HEIGHT = 32;

// Game physics properties
export const PHYSICS_GRAVITY_Y = 0;

// Debug mode
export const DEBUG_MODE = false;

// Vim-inspired movement constants
export const VIM_MOVE_LEFT = 'h';
export const VIM_MOVE_DOWN = 'j';
export const VIM_MOVE_UP = 'k';
export const VIM_MOVE_RIGHT = 'l';
export const VIM_INSERT_MODE = 'i';
export const VIM_NORMAL_MODE = 'Escape';

// Add more constants as needed for your game mechanics
export const WORD_JUMP_DISTANCE = 5; // For 'w' and 'b' commands
export const LINE_JUMP_DISTANCE = 10; // For '0' and '$' commands

// Game state constants
export const GAME_STATE_PLAYING = 'PLAYING';
export const GAME_STATE_PAUSED = 'PAUSED';
export const GAME_STATE_GAME_OVER = 'GAME_OVER';

// Level constants
export const MAX_LEVEL = 10;
export const POINTS_PER_LEVEL = 1000;

// Power-up constants
export const POWERUP_DURATION = 10000; // in milliseconds

// Enemy constants
export const ENEMY_SPEED = 100;
export const ENEMY_SPAWN_RATE = 5000; // in milliseconds

// Scoring
export const POINTS_PER_ENEMY_DEFEAT = 100;
export const POINTS_PER_ITEM_COLLECT = 50;

// Time-related constants
export const GAME_TIMER_DURATION = 300000; // 5 minutes in milliseconds