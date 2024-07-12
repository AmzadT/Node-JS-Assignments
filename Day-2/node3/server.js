const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;
const ROOT_DIR = path.join(__dirname, 'public');

const getIcon = (isDirectory) => {
  return isDirectory ? '📁' : '📄';
};


const generateDirectoryListing = (dirPath, relativePath) => {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  let html = `
    <style>
      ul { list-style-type: none; padding: 0; }
      li { margin: 5px 0; }
      a { text-decoration: none; color: #000; }
      a:hover { text-decoration: underline; }
    </style>
    <ul>
  `;

  items.forEach(item => {
    const itemPath = path.join(relativePath, item.name);
    const icon = getIcon(item.isDirectory());
    html += `<li>${icon} <a href="${itemPath}">${item.name}</a></li>`;
  });

  html += '</ul>';
  return html;
};


const requestHandler = (req, res) => {
  const requestedPath = path.join(ROOT_DIR, decodeURIComponent(req.url));

  if (!fs.existsSync(requestedPath)) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
    return;
  }

  if (fs.statSync(requestedPath).isDirectory()) {
    const directoryListing = generateDirectoryListing(requestedPath, req.url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Directory Listing</h1>${directoryListing}`);
  } else {
    const fileStream = fs.createReadStream(requestedPath);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fileStream.pipe(res);
  }
};


const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
