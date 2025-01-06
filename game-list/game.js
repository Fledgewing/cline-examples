// Debug mode flag
const DEBUG = false;

// Word pair database
const wordPairs = [
    // Nature & Animals
    { first: "rain", second: "bow", category: "nature" },
    { first: "rain", second: "coat", category: "clothing" },
    { first: "bow", second: "tie", category: "clothing" },
    { first: "bow", second: "arrow", category: "weapons" },
    { first: "sun", second: "light", category: "nature" },
    { first: "sun", second: "set", category: "nature" },
    { first: "light", second: "house", category: "buildings" },
    { first: "light", second: "bulb", category: "objects" },
    { first: "tree", second: "house", category: "buildings" },
    { first: "tree", second: "top", category: "nature" },
    { first: "house", second: "work", category: "activities" },
    { first: "bird", second: "song", category: "nature" },
    { first: "bird", second: "house", category: "nature" },
    { first: "song", second: "book", category: "music" },
    { first: "bee", second: "hive", category: "nature" },
    { first: "bee", second: "keeper", category: "jobs" },
    { first: "hive", second: "mind", category: "concepts" },
    { first: "fish", second: "tank", category: "pets" },
    { first: "fish", second: "bowl", category: "pets" },
    { first: "tank", second: "car", category: "military" },
    { first: "sea", second: "shell", category: "nature" },
    { first: "sea", second: "weed", category: "nature" },
    { first: "shell", second: "fish", category: "nature" },
    { first: "shell", second: "shock", category: "military" },
    
    // Food & Cooking
    { first: "pan", second: "cake", category: "food" },
    { first: "pan", second: "handle", category: "tools" },
    { first: "cake", second: "walk", category: "activities" },
    { first: "cake", second: "mix", category: "food" },
    { first: "hot", second: "dog", category: "food" },
    { first: "hot", second: "plate", category: "kitchen" },
    { first: "dog", second: "house", category: "buildings" },
    { first: "dog", second: "park", category: "places" },
    { first: "ice", second: "cream", category: "food" },
    { first: "ice", second: "cube", category: "food" },
    { first: "cream", second: "pie", category: "food" },
    { first: "cream", second: "cake", category: "food" },
    { first: "pie", second: "chart", category: "business" },
    { first: "tea", second: "pot", category: "kitchen" },
    { first: "tea", second: "cup", category: "kitchen" },
    { first: "pot", second: "luck", category: "concepts" },
    { first: "pot", second: "hole", category: "garden" },
    
    // Sports & Games
    { first: "foot", second: "ball", category: "sports" },
    { first: "foot", second: "step", category: "movement" },
    { first: "ball", second: "game", category: "sports" },
    { first: "ball", second: "room", category: "buildings" },
    { first: "game", second: "boy", category: "gaming" },
    { first: "game", second: "plan", category: "strategy" },
    { first: "base", second: "ball", category: "sports" },
    { first: "basket", second: "ball", category: "sports" },
    { first: "tennis", second: "court", category: "sports" },
    { first: "court", second: "room", category: "buildings" },
    
    // Technology
    { first: "key", second: "board", category: "tech" },
    { first: "key", second: "chain", category: "accessories" },
    { first: "board", second: "game", category: "gaming" },
    { first: "board", second: "walk", category: "infrastructure" },
    { first: "mouse", second: "trap", category: "household" },
    { first: "mouse", second: "pad", category: "tech" },
    { first: "trap", second: "door", category: "buildings" },
    { first: "web", second: "site", category: "tech" },
    { first: "web", second: "page", category: "tech" },
    { first: "site", second: "map", category: "navigation" },
    { first: "data", second: "base", category: "tech" },
    { first: "net", second: "work", category: "tech" },
    { first: "work", second: "shop", category: "business" },
    
    // Home & Building
    { first: "door", second: "way", category: "buildings" },
    { first: "door", second: "bell", category: "household" },
    { first: "way", second: "side", category: "location" },
    { first: "way", second: "point", category: "navigation" },
    { first: "side", second: "walk", category: "infrastructure" },
    { first: "walk", second: "way", category: "infrastructure" },
    { first: "wall", second: "paper", category: "decoration" },
    { first: "wall", second: "clock", category: "decoration" },
    { first: "paper", second: "work", category: "office" },
    { first: "paper", second: "clip", category: "office" },
    { first: "book", second: "shelf", category: "furniture" },
    { first: "shelf", second: "life", category: "concepts" },
    
    // Clothing & Fashion
    { first: "neck", second: "tie", category: "clothing" },
    { first: "neck", second: "lace", category: "clothing" },
    { first: "tie", second: "dye", category: "crafts" },
    { first: "tie", second: "pin", category: "accessories" },
    { first: "shoe", second: "lace", category: "clothing" },
    { first: "lace", second: "work", category: "crafts" },
    { first: "hat", second: "box", category: "containers" },
    { first: "box", second: "car", category: "vehicles" },
    
    // Transportation
    { first: "car", second: "park", category: "vehicles" },
    { first: "car", second: "pool", category: "transport" },
    { first: "park", second: "way", category: "location" },
    { first: "park", second: "land", category: "places" },
    { first: "train", second: "station", category: "transport" },
    { first: "station", second: "master", category: "jobs" },
    { first: "bus", second: "stop", category: "transport" },
    { first: "stop", second: "light", category: "infrastructure" },
    
    // Music & Entertainment
    { first: "music", second: "box", category: "entertainment" },
    { first: "music", second: "note", category: "music" },
    { first: "box", second: "set", category: "containers" },
    { first: "drum", second: "stick", category: "music" },
    { first: "drum", second: "beat", category: "music" },
    { first: "stick", second: "man", category: "concepts" },
    { first: "band", second: "aid", category: "health" },
    { first: "radio", second: "wave", category: "tech" },
    { first: "wave", second: "length", category: "science" },
    
    // Business & Work
    { first: "office", second: "work", category: "business" },
    { first: "work", second: "force", category: "business" },
    { first: "force", second: "field", category: "science" },
    { first: "field", second: "trip", category: "activities" },
    { first: "trip", second: "wire", category: "safety" },
    { first: "wire", second: "tap", category: "tech" },
    
    // Health & Medical
    { first: "health", second: "care", category: "medical" },
    { first: "health", second: "plan", category: "medical" },
    { first: "care", second: "free", category: "concepts" },
    { first: "care", second: "taker", category: "jobs" },
    { first: "free", second: "way", category: "concepts" },
    { first: "eye", second: "drop", category: "medical" },
    { first: "drop", second: "box", category: "containers" },
    
    // Education
    { first: "school", second: "book", category: "education" },
    { first: "book", second: "mark", category: "reading" },
    { first: "mark", second: "down", category: "direction" },
    { first: "down", second: "time", category: "concepts" },
    { first: "time", second: "piece", category: "objects" },
    
    // Weather
    { first: "rain", second: "drop", category: "weather" },
    { first: "snow", second: "ball", category: "weather" },
    { first: "wind", second: "mill", category: "buildings" },
    { first: "mill", second: "stone", category: "objects" },
    { first: "stone", second: "wall", category: "construction" },
    
    // Colors
    { first: "red", second: "light", category: "colors" },
    { first: "blue", second: "bird", category: "nature" },
    { first: "blue", second: "print", category: "tech" },
    { first: "bird", second: "bath", category: "garden" },
    { first: "green", second: "house", category: "buildings" },
    { first: "green", second: "back", category: "nature" },
    { first: "black", second: "board", category: "education" },
    { first: "white", second: "wash", category: "activities" },
    
    // Time
    { first: "day", second: "light", category: "time" },
    { first: "night", second: "fall", category: "time" },
    { first: "fall", second: "back", category: "direction" },
    { first: "back", second: "pack", category: "accessories" },
    { first: "pack", second: "rat", category: "animals" },
    
    // Emotions
    { first: "heart", second: "break", category: "emotions" },
    { first: "heart", second: "beat", category: "body" },
    { first: "break", second: "fast", category: "meals" },
    { first: "break", second: "down", category: "problems" },
    { first: "fast", second: "food", category: "dining" },
    { first: "love", second: "bird", category: "emotions" },
    { first: "joy", second: "stick", category: "emotions" },
    
    // Numbers & Math
    { first: "number", second: "line", category: "math" },
    { first: "number", second: "plate", category: "vehicles" },
    { first: "line", second: "up", category: "direction" },
    { first: "line", second: "man", category: "jobs" },
    { first: "up", second: "grade", category: "direction" },
    { first: "grade", second: "school", category: "education" },
    { first: "count", second: "down", category: "math" },
    
    // Communication
    { first: "mail", second: "box", category: "communication" },
    { first: "phone", second: "book", category: "communication" },
    { first: "text", second: "book", category: "communication" },
    { first: "news", second: "paper", category: "media" },
    { first: "chat", second: "room", category: "communication" },
    
    // Tools & Equipment
    { first: "tool", second: "box", category: "tools" },
    { first: "tool", second: "kit", category: "tools" },
    { first: "box", second: "top", category: "containers" },
    { first: "saw", second: "dust", category: "tools" },
    { first: "saw", second: "mill", category: "buildings" },
    { first: "dust", second: "bin", category: "cleaning" },
    { first: "drill", second: "bit", category: "tools" },
    { first: "bit", second: "coin", category: "currency" },
    
    // Kitchen & Cooking
    { first: "cook", second: "book", category: "kitchen" },
    { first: "dish", second: "wash", category: "kitchen" },
    { first: "wash", second: "room", category: "home" },
    { first: "kitchen", second: "sink", category: "home" },
    { first: "sink", second: "hole", category: "plumbing" },
    
    // Garden & Plants
    { first: "flower", second: "pot", category: "garden" },
    { first: "flower", second: "bed", category: "garden" },
    { first: "pot", second: "head", category: "slang" },
    { first: "garden", second: "hose", category: "tools" },
    { first: "garden", second: "gate", category: "buildings" },
    { first: "hose", second: "pipe", category: "plumbing" },
    { first: "pipe", second: "line", category: "infrastructure" },
    { first: "seed", second: "pod", category: "plants" },
    
    // Art & Creativity
    { first: "paint", second: "brush", category: "art" },
    { first: "paint", second: "box", category: "art" },
    { first: "brush", second: "fire", category: "nature" },
    { first: "brush", second: "cut", category: "hair" },
    { first: "fire", second: "place", category: "home" },
    { first: "place", second: "mat", category: "home" },
    { first: "art", second: "work", category: "creativity" },
    
    // Space & Science
    { first: "star", second: "light", category: "space" },
    { first: "star", second: "dust", category: "space" },
    { first: "moon", second: "light", category: "space" },
    { first: "moon", second: "beam", category: "space" },
    { first: "space", second: "ship", category: "transport" },
    { first: "ship", second: "yard", category: "maritime" },
    { first: "yard", second: "stick", category: "measurement" },
    
    // Body Parts
    { first: "hand", second: "book", category: "body" },
    { first: "hand", second: "shake", category: "gestures" },
    { first: "book", second: "case", category: "furniture" },
    { first: "foot", second: "print", category: "body" },
    { first: "foot", second: "note", category: "music" },
    { first: "print", second: "shop", category: "business" },
    { first: "eye", second: "ball", category: "body" },
    { first: "head", second: "light", category: "body" },
    
    // Furniture
    { first: "chair", second: "man", category: "furniture" },
    { first: "chair", second: "lift", category: "sports" },
    { first: "man", second: "hole", category: "places" },
    { first: "table", second: "top", category: "furniture" },
    { first: "table", second: "cloth", category: "household" },
    { first: "top", second: "hat", category: "clothing" },
    { first: "bed", second: "room", category: "furniture" },
    { first: "room", second: "mate", category: "relationships" },
    
    // Buildings
    { first: "house", second: "boat", category: "buildings" },
    { first: "boat", second: "house", category: "buildings" },
    { first: "sky", second: "light", category: "nature" },
    { first: "tower", second: "block", category: "buildings" },
    { first: "block", second: "head", category: "body" },
    
    // Jobs & Professions
    { first: "fire", second: "man", category: "jobs" },
    { first: "police", second: "man", category: "jobs" },
    { first: "mail", second: "man", category: "jobs" },
    { first: "work", second: "man", category: "jobs" },
    { first: "sales", second: "man", category: "jobs" },
    
    // Writing & Literature
    { first: "pen", second: "name", category: "writing" },
    { first: "pen", second: "pal", category: "relationships" },
    { first: "name", second: "tag", category: "identification" },
    { first: "name", second: "plate", category: "objects" },
    { first: "book", second: "worm", category: "reading" },
    { first: "worm", second: "hole", category: "nature" },
    { first: "story", second: "book", category: "literature" },
    { first: "page", second: "boy", category: "jobs" },
    { first: "note", second: "book", category: "writing" },
    { first: "word", second: "smith", category: "writing" },
    { first: "type", second: "writer", category: "tools" },
    { first: "writer", second: "block", category: "challenges" },
    
    // Money & Finance
    { first: "bank", second: "roll", category: "finance" },
    { first: "bank", second: "note", category: "finance" },
    { first: "roll", second: "call", category: "actions" },
    { first: "roll", second: "play", category: "actions" },
    { first: "money", second: "bag", category: "finance" },
    { first: "bag", second: "pipe", category: "objects" },
    { first: "coin", second: "flip", category: "games" },
    { first: "flip", second: "side", category: "direction" },
    { first: "cash", second: "flow", category: "finance" },
    { first: "flow", second: "chart", category: "business" },
    { first: "credit", second: "card", category: "finance" },
    { first: "card", second: "game", category: "entertainment" },
    
    // Ocean & Water
    { first: "wave", second: "pool", category: "water" },
    { first: "wave", second: "band", category: "music" },
    { first: "pool", second: "side", category: "location" },
    { first: "pool", second: "hall", category: "places" },
    { first: "beach", second: "ball", category: "sports" },
    { first: "sand", second: "box", category: "play" },
    { first: "salt", second: "water", category: "nature" },
    { first: "water", second: "way", category: "navigation" },
    { first: "sea", second: "side", category: "location" },
    { first: "ocean", second: "view", category: "scenery" },
    { first: "tide", second: "pool", category: "nature" },
    { first: "deep", second: "sea", category: "nature" },
    
    // Shopping & Retail
    { first: "shop", second: "keeper", category: "jobs" },
    { first: "shop", second: "lift", category: "crime" },
    { first: "keeper", second: "gate", category: "sports" },
    { first: "store", second: "front", category: "business" },
    { first: "store", second: "room", category: "buildings" },
    { first: "front", second: "door", category: "buildings" },
    { first: "mall", second: "rat", category: "slang" },
    { first: "price", second: "cut", category: "business" },
    { first: "cut", second: "back", category: "actions" },
    { first: "sale", second: "time", category: "business" },
    { first: "cart", second: "wheel", category: "objects" },
    { first: "check", second: "out", category: "shopping" },
    { first: "out", second: "side", category: "location" },
    
    // Military & Defense
    { first: "war", second: "ship", category: "military" },
    { first: "war", second: "game", category: "military" },
    { first: "ship", second: "mate", category: "maritime" },
    { first: "gun", second: "fire", category: "weapons" },
    { first: "gun", second: "shot", category: "weapons" },
    { first: "fire", second: "work", category: "actions" },
    { first: "tank", second: "top", category: "military" },
    { first: "army", second: "man", category: "military" },
    { first: "air", second: "force", category: "military" },
    { first: "force", second: "feed", category: "actions" },
    { first: "feed", second: "back", category: "communication" },
    { first: "guard", second: "dog", category: "security" },
    { first: "watch", second: "man", category: "security" },
    
    // Law & Order
    { first: "law", second: "book", category: "legal" },
    { first: "court", second: "house", category: "buildings" },
    { first: "case", second: "work", category: "legal" },
    { first: "judge", second: "mental", category: "concepts" },
    { first: "rule", second: "book", category: "guidelines" },
    { first: "order", second: "form", category: "business" },
    { first: "form", second: "work", category: "office" },
    { first: "legal", second: "pad", category: "office" },
    { first: "pad", second: "lock", category: "security" },
    { first: "lock", second: "down", category: "security" },
    
    // Science & Research
    { first: "lab", second: "work", category: "science" },
    { first: "lab", second: "coat", category: "science" },
    { first: "work", second: "load", category: "business" },
    { first: "test", second: "tube", category: "science" },
    { first: "test", second: "case", category: "tech" },
    { first: "tube", second: "light", category: "objects" },
    { first: "research", second: "paper", category: "academic" },
    { first: "study", second: "group", category: "education" },
    { first: "group", second: "work", category: "collaboration" },
    { first: "brain", second: "storm", category: "thinking" },
    { first: "storm", second: "cloud", category: "weather" },
    { first: "cloud", second: "nine", category: "expressions" },
    { first: "nine", second: "teen", category: "numbers" },
    
    // Religion & Spirituality
    { first: "church", second: "bell", category: "religion" },
    { first: "church", second: "yard", category: "places" },
    { first: "bell", second: "boy", category: "jobs" },
    { first: "bell", second: "hop", category: "movement" },
    { first: "prayer", second: "book", category: "religion" },
    { first: "holy", second: "water", category: "religion" },
    { first: "spirit", second: "level", category: "tools" },
    { first: "faith", second: "full", category: "concepts" },
    { first: "soul", second: "mate", category: "relationships" },
    { first: "temple", second: "run", category: "games" },
    { first: "run", second: "time", category: "concepts" },
    { first: "time", second: "keeper", category: "jobs" },
    
    // Additional pairs to complete word chains
    { first: "arrow", second: "head", category: "objects" },
    { first: "beam", second: "light", category: "tech" },
    { first: "beat", second: "box", category: "music" },
    { first: "bowl", second: "cut", category: "hair" },
    { first: "chain", second: "link", category: "objects" },
    { first: "chart", second: "room", category: "business" },
    { first: "cloth", second: "line", category: "household" },
    { first: "cup", second: "cake", category: "food" },
    { first: "gate", second: "way", category: "infrastructure" },
    { first: "hall", second: "way", category: "buildings" },
    { first: "handle", second: "bar", category: "tools" },
    { first: "kit", second: "bag", category: "containers" },
    { first: "length", second: "wise", category: "direction" },
    { first: "level", second: "up", category: "gaming" },
    { first: "lift", second: "off", category: "movement" },
    { first: "load", second: "star", category: "tech" },
    { first: "map", second: "book", category: "navigation" },
    { first: "mate", second: "ship", category: "relationships" },
    { first: "pin", second: "head", category: "tools" },
    { first: "plate", second: "glass", category: "kitchen" },
    { first: "point", second: "less", category: "concepts" },
    { first: "set", second: "back", category: "problems" },
    { first: "shot", second: "gun", category: "weapons" },
    { first: "step", second: "up", category: "movement" },
    { first: "tag", second: "line", category: "writing" },
    { first: "tap", second: "dance", category: "arts" },
    { first: "view", second: "point", category: "concepts" },
    { first: "wheel", second: "chair", category: "mobility" },
    
    // Additional pairs for remaining words
    { first: "bar", second: "stool", category: "furniture" },
    { first: "bath", second: "room", category: "home" },
    { first: "bin", second: "bag", category: "containers" },
    { first: "boy", second: "hood", category: "life" },
    { first: "bulb", second: "light", category: "objects" },
    { first: "call", second: "sign", category: "communication" },
    { first: "clip", second: "board", category: "office" },
    { first: "clock", second: "work", category: "time" },
    { first: "coat", second: "rack", category: "furniture" },
    { first: "cube", second: "root", category: "math" },
    { first: "dance", second: "hall", category: "entertainment" },
    { first: "food", second: "court", category: "dining" },
    { first: "glass", second: "work", category: "crafts" },
    { first: "hole", second: "shot", category: "sports" },
    { first: "land", second: "mark", category: "places" },
    { first: "less", second: "time", category: "concepts" },
    { first: "life", second: "time", category: "concepts" },
    { first: "link", second: "way", category: "tech" },
    { first: "luck", second: "charm", category: "objects" },
    { first: "master", second: "mind", category: "skills" },
    { first: "mat", second: "board", category: "sports" },
    { first: "mind", second: "set", category: "concepts" },
    { first: "mix", second: "tape", category: "music" },
    { first: "play", second: "time", category: "activities" },
    { first: "pod", second: "cast", category: "media" },
    { first: "rat", second: "trap", category: "tools" },
    { first: "shake", second: "down", category: "actions" },
    { first: "shock", second: "wave", category: "science" },
    { first: "smith", second: "work", category: "crafts" },
    
    // Final pairs for remaining words
    { first: "cast", second: "iron", category: "materials" },
    { first: "charm", second: "school", category: "magic" },
    { first: "dye", second: "work", category: "crafts" },
    { first: "hood", second: "wink", category: "gestures" },
    { first: "hop", second: "scotch", category: "games" },
    { first: "mental", second: "block", category: "psychology" },
    { first: "off", second: "hand", category: "concepts" },
    { first: "piece", second: "work", category: "art" },
    { first: "rack", second: "space", category: "storage" },
    { first: "root", second: "ball", category: "sports" },
    { first: "sign", second: "post", category: "infrastructure" },
    { first: "stool", second: "top", category: "furniture" },
    { first: "tape", second: "deck", category: "music" },
    { first: "teen", second: "age", category: "life" },
    { first: "weed", second: "eater", category: "garden" },
    { first: "wise", second: "man", category: "people" },
    
    // Final remaining pairs
    { first: "age", second: "old", category: "concepts" },
    { first: "aid", second: "worker", category: "medical" },
    { first: "deck", second: "hand", category: "games" },
    { first: "full", second: "time", category: "work" },
    { first: "iron", second: "man", category: "heroes" },
    { first: "patch", second: "work", category: "maintenance" },
    { first: "post", second: "box", category: "mail" },
    { first: "scotch", second: "tape", category: "office" },
    { first: "old", second: "school", category: "concepts" }
];

// Game state class
class GameState {
    constructor() {
        this.players = {
            player1: {
                sequence: [],
                currentIndex: 0,
                score: 0,
                revealedLetters: []
            },
            player2: {
                sequence: [],
                currentIndex: 0,
                score: 0,
                revealedLetters: []
            }
        };
        this.currentPlayer = "player1";
        this.gameOver = false;
    }
}

let gameState = null;

// Generate sequence of word pairs
function generateSequence(length = 5) {
    function tryGenerateSequence(currentSequence, remainingPairs, targetLength) {
        // If we've reached our target length, we're done
        if (currentSequence.length === targetLength) {
            return currentSequence;
        }

        // Get the last word of our current sequence
        const currentWord = currentSequence[currentSequence.length - 1].second;
        
        // Get all words used in the sequence so far (both first and second words)
        const usedWords = new Set();
        currentSequence.forEach(pair => {
            usedWords.add(pair.first.toLowerCase());
            usedWords.add(pair.second.toLowerCase());
        });
        
        // Filter pairs where:
        // 1. The first word matches our current word
        // 2. The second word hasn't been used yet
        const nextPairs = remainingPairs.filter(pair => 
            pair.first === currentWord && 
            !usedWords.has(pair.second.toLowerCase())
        );

        // Try each possible next pair
        for (let i = 0; i < nextPairs.length; i++) {
            const nextPair = nextPairs[i];
            // Remove the used pair from remaining pairs
            const newRemainingPairs = remainingPairs.filter(pair => 
                pair.first !== nextPair.first || 
                pair.second !== nextPair.second
            );

            const result = tryGenerateSequence(
                [...currentSequence, nextPair],
                newRemainingPairs,
                targetLength
            );

            if (result) {
                return result;
            }
        }

        // If no valid sequence found, return null to trigger backtracking
        return null;
    }

    // Keep trying with different starting pairs until we find a valid sequence
    let availablePairs = [...wordPairs];
    while (availablePairs.length > 0) {
        const startPairIndex = Math.floor(Math.random() * availablePairs.length);
        const startPair = availablePairs[startPairIndex];
        
        // Check if either word in the start pair is already used in any existing sequence
        const usedWords = new Set();
        usedWords.add(startPair.first.toLowerCase());
        usedWords.add(startPair.second.toLowerCase());
        
        // Filter remaining pairs to exclude those with words we've already used
        const remainingPairs = availablePairs.filter(pair => 
            (pair.first !== startPair.first || pair.second !== startPair.second) &&
            !usedWords.has(pair.second.toLowerCase())
        );

        const sequence = tryGenerateSequence([startPair], remainingPairs, length);
        if (sequence) {
            if (DEBUG) {
                // Debug log to show the sequence details
                console.log("Generated sequence pairs:", sequence.map(pair => `${pair.first}->${pair.second}`));
                // The chain we want is: first word of first pair + second words of all pairs
                const chain = sequence.map((pair, index) => index === 0 ? pair.first : sequence[index-1].second);
                console.log("Actual 5-word chain:", chain, "Length:", chain.length);
            }
            return sequence;
        }

        // If this starting pair didn't work, remove it and try another
        availablePairs = availablePairs.filter(pair => 
            pair.first !== startPair.first || 
            pair.second !== startPair.second
        );
    }

    // If we somehow can't generate a valid sequence (shouldn't happen with our word pairs),
    // return a sequence of random pairs as a fallback
    if (DEBUG) {
        console.warn("Could not generate connected sequence, using random pairs");
    }
    return Array(length).fill(null).map(() => wordPairs[Math.floor(Math.random() * wordPairs.length)]);
}

// Update input states based on current player
function updateInputStates() {
    const player1Input = document.getElementById("player1-guess");
    const player1Button = player1Input.nextElementSibling;
    const player2Input = document.getElementById("player2-guess");
    const player2Button = player2Input.nextElementSibling;

    // Disable all inputs first
    player1Input.disabled = true;
    player1Button.disabled = true;
    player2Input.disabled = true;
    player2Button.disabled = true;

    // Enable only current player's input if game is not over
    if (!gameState.gameOver) {
        if (gameState.currentPlayer === "player1") {
            player1Input.disabled = false;
            player1Button.disabled = false;
        } else {
            player2Input.disabled = false;
            player2Button.disabled = false;
        }
    }
}

// Handle player guess
function handleGuess(player, guess) {
    if (!gameState || gameState.gameOver) {
        showMessage("Please start a new game first!", "error");
        return;
    }

    if (player !== gameState.currentPlayer) {
        showMessage("It's not your turn!", "error");
        return;
    }

    const playerState = gameState.players[player];
    const currentPair = playerState.sequence[playerState.currentIndex];
    const correctWord = currentPair.second;

    if (DEBUG) {
        console.log(`Player ${player} guessed: ${guess}`);
        console.log(`Correct word is: ${correctWord}`);
    }

    if (!guess.trim()) {
        showMessage("Please enter a guess!", "error");
        return;
    }

    if (guess.toLowerCase() === correctWord.toLowerCase()) {
        // Correct guess
        playerState.score += 10;
        playerState.currentIndex++;
        playerState.revealedLetters = [];
        
        // Update score display
        document.getElementById(`${player}-score`).textContent = playerState.score;
        
        // Update progress display
        document.getElementById(`${player}-progress`).textContent = playerState.currentIndex;
        
        if (playerState.currentIndex >= playerState.sequence.length) {
            gameState.gameOver = true;
            showMessage(`Game Over! ${player} wins by completing their 5-word chain! Final score: ${playerState.score} points`, "success");
            // Update both players' displays to show the losing player's remaining words
            updateWordDisplay("player1");
            updateWordDisplay("player2");
            updateInputStates();
        } else {
            showMessage("Correct guess! Your turn continues!", "success");
            updateWordDisplay(player);
        }
    } else {
        // Incorrect guess
        // Reveal a new letter if available
        if (playerState.revealedLetters.length < correctWord.length) {
            let newReveal;
            do {
                newReveal = Math.floor(Math.random() * correctWord.length);
            } while (playerState.revealedLetters.includes(newReveal));
            
            playerState.revealedLetters.push(newReveal);
        }
        
        // Switch turns
        gameState.currentPlayer = player === "player1" ? "player2" : "player1";
        showMessage(`Incorrect! ${gameState.currentPlayer}'s turn`, "error");
        
        // Update both players' displays
        updateWordDisplay("player1");
        updateWordDisplay("player2");
        updateInputStates();
    }

    // Clear input field
    document.getElementById(`${player}-guess`).value = "";
}

// Update word display for a player
function updateWordDisplay(player) {
    const playerState = gameState.players[player];
    const currentPair = playerState.sequence[playerState.currentIndex];
    const playerElement = document.querySelector(`.player-${player.slice(-1)}`);
    
    if (!currentPair) return;

    // Update first word
    const firstWordElement = playerElement.querySelector('.first-word');
    firstWordElement.textContent = `First Word: ${currentPair.first}`;

    // Update second word with revealed letters
    const secondWordElement = playerElement.querySelector('.second-word');
    const secondWord = currentPair.second;
    let displayWord = '';
    
    for (let i = 0; i < secondWord.length; i++) {
        if (playerState.revealedLetters.includes(i)) {
            displayWord += secondWord[i];
        } else {
            displayWord += '_';
        }
        displayWord += ' ';
    }
    
    secondWordElement.textContent = `Second Word: ${displayWord.trim()}`;

    // Update chain display
    const chainElement = playerElement.querySelector('.chain');
    if (chainElement) {
        chainElement.innerHTML = '';
        
        // Build chain
        const chain = [];
        const firstPair = playerState.sequence[0];
        chain.push(firstPair.first);
        
        // If game is over and this is the losing player (i.e., not the player who completed their sequence), show all remaining words in red
        const otherPlayer = player === "player1" ? "player2" : "player1";
        const isLoser = gameState.gameOver && gameState.players[otherPlayer].currentIndex >= gameState.players[otherPlayer].sequence.length;
        const wordsToShow = isLoser ? playerState.sequence.length : playerState.currentIndex;
        
        for (let i = 0; i < wordsToShow; i++) {
            chain.push(playerState.sequence[i].second);
        }
        
        // Display chain
        chain.forEach((word, index) => {
            if (index > 0) {
                const arrow = document.createElement('span');
                arrow.className = 'chain-arrow';
                arrow.textContent = '→';
                chainElement.appendChild(arrow);
            }
            
            const wordSpan = document.createElement('span');
            wordSpan.className = 'chain-item';
            // Add losing class to unguessed words in losing player's chain
            if (isLoser && index >= playerState.currentIndex + (index === 0 ? 0 : 1)) {
                wordSpan.className += ' losing';
            }
            wordSpan.textContent = word;
            chainElement.appendChild(wordSpan);
        });
    }
}

// Show message to users
function showMessage(text, type = "success") {
    const messageElement = document.getElementById("message");
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
}

// Start new game
function startNewGame() {
    // Clear chain displays
    document.querySelectorAll('.chain').forEach(chain => {
        chain.innerHTML = '';
    });
    
    gameState = new GameState();
    
    // Generate sequences for both players
    gameState.players.player1.sequence = generateSequence(5);
    gameState.players.player2.sequence = generateSequence(5);
    
    // Reset scores and progress
    document.getElementById("player1-score").textContent = "0";
    document.getElementById("player2-score").textContent = "0";
    document.getElementById("player1-progress").textContent = "0";
    document.getElementById("player2-progress").textContent = "0";
    
    // Clear input fields
    document.getElementById("player1-guess").value = "";
    document.getElementById("player2-guess").value = "";
    
    // Update displays
    updateWordDisplay("player1");
    updateWordDisplay("player2");
    
    // Update input states
    updateInputStates();
    
    showMessage("First player to complete their 5-word chain wins! Player 1's turn", "success");
}

// Handle guess button clicks
function makeGuess(player) {
    const guess = document.getElementById(`${player}-guess`).value;
    handleGuess(player, guess);
}

// Add keyboard event listeners for Enter key
document.getElementById("player1-guess").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        makeGuess("player1");
    }
});

document.getElementById("player2-guess").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        makeGuess("player2");
    }
});

// Initialize game when page loads
document.addEventListener("DOMContentLoaded", () => {
    startNewGame();
});
