const fs = require('fs');
const path = require('path');

module.exports = Array.from(Array(20), (_, index) => {
  const id = index + 1;
  const fileName = `Game_${String(id).padStart(3, 0)}.sgf`;
  const filePath = path.resolve(__dirname, fileName);
  const sgf = fs.readFileSync(filePath, 'utf8');

  return {
    id,
    name: `Alpha Go Master vs Alpha Go Zero #${id}`,
    sgf,
    status: 'completed',
    config: {
      size: 19
    }
  };
});
