const fs = require('fs');
const path = require('path');

/**
 * Recursively search for HTML files from the specified directory
 * @param {string} dir - Directory path to search
 * @param {string[]} htmlFiles - Array to store HTML file paths
 * @returns {string[]} Array of HTML file paths
 */
function findHtmlFiles(dir, htmlFiles = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search if the entry is a directory
      findHtmlFiles(filePath, htmlFiles);
    } else if (stat.isFile() && path.extname(file).toLowerCase() === '.html') {
      // Add to the array if the entry is an HTML file
      htmlFiles.push(filePath);
    }
  }
  
  return htmlFiles;
}

/**
 * Load HTML file
 * @param {string} filePath - Path to the HTML file
 * @returns {Object|null} Object containing { filePath, content }
 */
function loadHtmlFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    return {
      filePath,
      content
    };
  } catch (error) {
    process.exit(1);
  }
}

/**
 * Inject an analytics script into an HTML file (string replacement)
 * @param {Object} loadedFile - File object loaded by loadHtmlFile()
 * @returns {string} Updated HTML content
 */
function injectAnalyticsScript(loadedFile) {
  const { filePath, content } = loadedFile;

  if (!process.env.PA_ANALYTICS_ID) {
    return content;
  }
  const paAnalyticsId = process.env.PA_ANALYTICS_ID;
  if (!/^pa\-[a-zA-Z0-9]+$/.test(paAnalyticsId)) {
    throw new Error('Invalid PA_ANALYTICS_ID format');
  }

  // Script tag to inject
  const analyticsScript = `<!-- Privacy-friendly analytics by Plausible -->
    <script async src="https://plausible.io/js/${paAnalyticsId}.js"></script>
    <script>
      window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
      plausible.init()
    </script>`;
  
  // Search for the comment placeholder
  const placeholder = '<!-- Inject analytics tags -->';
  
  if (!content.includes(placeholder)) {
    return content;
  }
  
  // Check for an existing analytics script
  if (content.includes('<!-- Privacy-friendly analytics by Plausible -->')) {
    return content;
  }
  
  // Replace the placeholder with the script tag
  const updatedContent = content.replace(placeholder, analyticsScript);
  
  return updatedContent;
}

/**
 * Overwrite the HTML file
 * @param {string} filePath - File path
 * @param {string} content - New HTML content
 */
function saveHtmlFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    process.exit(1);
  }
}

/**
 * Recursively load HTML files from the specified directory
 * @param {string} targetDir - Target directory
 * @returns {Object[]} Array of loaded HTML files
 */
function loadHtmlFilesRecursively(targetDir) {
  if (!fs.existsSync(targetDir)) {
    return [];
  }
  
  const htmlFiles = findHtmlFiles(targetDir);
  const loadedFiles = [];
  
  for (const filePath of htmlFiles) {
    const loadedFile = loadHtmlFile(filePath);
    if (loadedFile) {
      loadedFiles.push(loadedFile);
    }
  }
  
  return loadedFiles;
}

/**
 * Main process
 */
function main() {
  const targetDirectories = ['ja', 'en-US'];
  const allLoadedFiles = [];
  
  // Process the top-level index.html
  const topLevelIndexPath = 'index.html';
  if (fs.existsSync(topLevelIndexPath)) {
    const loadedFile = loadHtmlFile(topLevelIndexPath);
    if (loadedFile) {
      allLoadedFiles.push(loadedFile);
    }
  }
  
  // Load HTML files
  for (const dir of targetDirectories) {
    const loadedFiles = loadHtmlFilesRecursively(dir);
    allLoadedFiles.push(...loadedFiles);
  }
  
  // Inject the analytics script and save
  for (const loadedFile of allLoadedFiles) {
    const originalContent = loadedFile.content;
    const updatedContent = injectAnalyticsScript(loadedFile);
    
    if (originalContent !== updatedContent) {
      saveHtmlFile(loadedFile.filePath, updatedContent);
    }
  }
}

// Execute the script
main();
