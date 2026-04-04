const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== '.next' && f !== 'build') {
                walkDir(dirPath, callback);
            }
        } else {
            callback(dirPath);
        }
    });
}

const dirs = [
    'd:\\WEB Dev\\Saree Shop\\Final Project\\frontend',
    'd:\\WEB Dev\\Saree Shop\\Final Project\\backend'
];

dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        walkDir(dir, (filePath) => {
            if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.json') || filePath.endsWith('.html') || filePath.endsWith('.css')) {
                let content = fs.readFileSync(filePath, 'utf-8');
                let newContent = content
                    .replace(/Syssaree/g, 'Tanvo')
                    .replace(/syssaree/g, 'tanvo')
                    .replace(/SYSSAREE/g, 'TANVO');
                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent, 'utf-8');
                    console.log('Updated', filePath);
                }
            }
        });
    }
});
