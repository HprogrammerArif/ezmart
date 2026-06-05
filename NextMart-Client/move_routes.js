const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app');
const targetDir = path.join(baseDir, '[locale]');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

const itemsToMove = [
  '(WithCommonLayout)',
  '(WithDashboardLayout)',
  'login',
  'register',
  'success',
  'layout.tsx'
];

itemsToMove.forEach(item => {
  const oldPath = path.join(baseDir, item);
  const newPath = path.join(targetDir, item);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${item} to [locale]`);
  }
});
