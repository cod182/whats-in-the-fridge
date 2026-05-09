PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  firstName TEXT,
  lastName TEXT,
  image TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appliances (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ownerid TEXT NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sharing (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  applianceId INTEGER NOT NULL,
  email TEXT NOT NULL,
  accepted TEXT NOT NULL DEFAULT 'false',
  sharedUserId INTEGER,
  ownerEmail TEXT,
  ownerName TEXT,
  ownerId INTEGER,
  applianceName TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applianceId) REFERENCES appliances(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS applianceItems (
  id TEXT PRIMARY KEY,
  ownerid TEXT NOT NULL,
  applianceid INTEGER NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  cookedFromFrozen TEXT,
  addedDate TEXT,
  expiryDate TEXT,
  itemMainType TEXT,
  itemType TEXT,
  itemSubType TEXT,
  compartment TEXT,
  level INTEGER,
  locationType TEXT,
  position INTEGER,
  comment TEXT,
  image TEXT,
  sharedUserId INTEGER,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applianceid) REFERENCES appliances(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS availableItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  itemMainType TEXT,
  itemType TEXT,
  itemSubType TEXT,
  image TEXT
);

CREATE TABLE IF NOT EXISTS customAvailableItems (
  id TEXT PRIMARY KEY,
  creatorId TEXT NOT NULL,
  name TEXT NOT NULL,
  itemMainType TEXT,
  itemType TEXT,
  itemSubType TEXT,
  image TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_email ON user(email);
CREATE INDEX IF NOT EXISTS idx_appliances_ownerid ON appliances(ownerid);
CREATE INDEX IF NOT EXISTS idx_sharing_applianceId ON sharing(applianceId);
CREATE INDEX IF NOT EXISTS idx_sharing_email ON sharing(email);
CREATE INDEX IF NOT EXISTS idx_sharing_sharedUserId ON sharing(sharedUserId);
CREATE INDEX IF NOT EXISTS idx_applianceItems_ownerid ON applianceItems(ownerid);
CREATE INDEX IF NOT EXISTS idx_applianceItems_applianceid ON applianceItems(applianceid);
CREATE INDEX IF NOT EXISTS idx_customAvailableItems_creatorId ON customAvailableItems(creatorId);

INSERT OR IGNORE INTO availableItems (name, itemMainType, itemType, itemSubType, image)
VALUES
  ('Carrot', 'vegetables', 'Vegetable', '', 'carrot.webp'),
  ('Chicken Breast', 'meats', 'Poultry', '', 'chicken_breast.webp'),
  ('Milk', 'drinks', 'Dairy', '', 'milk.webp'),
  ('Peas', 'vegetables', 'Vegetable', '', 'peas.webp');
