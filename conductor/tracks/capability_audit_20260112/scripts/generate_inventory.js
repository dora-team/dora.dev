const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outputDir = path.join(__dirname, '../artifacts');
const outputPath = path.join(outputDir, 'inventory.json');

try {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Find files
  const cmd = 'find hugo/content/capabilities -name "*.md"';
  const output = execSync(cmd).toString();
  
  const files = output.trim().split('\n').filter(f => f);

  fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
  console.log(`Generated inventory with ${files.length} files.`);

} catch (error) {
  console.error('Error generating inventory:', error);
  process.exit(1);
}
