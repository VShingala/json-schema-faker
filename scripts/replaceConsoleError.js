let fs = require('fs');

fs.readFile('dist/bundle.js', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  fs.writeFile('dist/bundle.js', data.replace(/console.error/g, 'console.warn'), 'utf8', saveErr => {
     if (saveErr) return console.log(saveErr);
  });
});
