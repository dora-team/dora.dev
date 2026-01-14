const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../artifacts');
const outputPath = path.join(outputDir, 'inventory.json');
const targetDir = 'hugo/content/capabilities';

function findFiles(dir, extension, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, extension, fileList);
    } else {
      if (path.extname(file) === extension) {
        // Store relative path to match original script output style (e.g., hugo/content/...)
        // We assume the script is run from project root or paths resolve relative to it.
        // Using relative path from CWD is usually safest if we want consistency with 'find'.
        fileList.push(filePath.replace(/\\/g, '/'));
      }
    }
  });

  return fileList;
}

try {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Scanning directory: ${targetDir}`);
  const files = findFiles(targetDir, '.md');

  fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
  console.log(`Generated inventory with ${files.length} files.`);

} catch (error) {
  console.error('Error generating inventory:', error);
  process.exit(1);
}
