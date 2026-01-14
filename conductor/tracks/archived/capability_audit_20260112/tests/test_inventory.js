const fs = require('fs');
const path = require('path');

const inventoryPath = path.join(__dirname, '../artifacts/inventory.json');

try {
  if (!fs.existsSync(inventoryPath)) {
    console.error('FAIL: inventory.json does not exist');
    process.exit(1);
  }

  const content = fs.readFileSync(inventoryPath, 'utf8');
  const data = JSON.parse(content);

  if (!Array.isArray(data) || data.length === 0) {
    console.error('FAIL: inventory.json is empty or not an array');
    process.exit(1);
  }

  console.log('PASS: inventory.json exists and is valid');
} catch (error) {
  console.error('FAIL: Error reading inventory.json:', error);
  process.exit(1);
}
