const fs = require('fs');
const path = require('path');

/**
 * 指定されたディレクトリからHTMLファイルを再帰的に検索する
 * @param {string} dir - 検索するディレクトリパス
 * @param {string[]} htmlFiles - HTMLファイルパスを格納する配列
 * @returns {string[]} HTMLファイルパスの配列
 */
function findHtmlFiles(dir, htmlFiles = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // ディレクトリの場合は再帰的に検索
      findHtmlFiles(filePath, htmlFiles);
    } else if (stat.isFile() && path.extname(file).toLowerCase() === '.html') {
      // HTMLファイルの場合は配列に追加
      htmlFiles.push(filePath);
    }
  }
  
  return htmlFiles;
}

/**
 * HTMLファイルを読み込む
 * @param {string} filePath - HTMLファイルのパス
 * @returns {Object|null} { filePath, content } を含むオブジェクト
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
 * HTMLファイルにアナリティクススクリプトを注入する（文字列置換）
 * @param {Object} loadedFile - loadHtmlFile()で読み込まれたファイルオブジェクト
 * @returns {string} 更新されたHTMLコンテンツ
 */
function injectAnalyticsScript(loadedFile) {
  const { filePath, content } = loadedFile;
  
  // 注入するスクリプトタグ
  const analyticsScript = '<script defer data-domain="hotel-example-site.takeyaqa.dev" src="https://plausible.io/js/script.js"></script>';
  
  // コメントプレースホルダーを検索
  const placeholder = '<!-- Inject analytics tags -->';
  
  if (!content.includes(placeholder)) {
    return content;
  }
  
  // 既存のアナリティクススクリプトがあるかチェック
  if (content.includes('data-domain="hotel-example-site.takeyaqa.dev"')) {
    return content;
  }
  
  // プレースホルダーをスクリプトタグに置換
  const updatedContent = content.replace(placeholder, analyticsScript);
  
  return updatedContent;
}

/**
 * HTMLファイルを上書き保存する
 * @param {string} filePath - ファイルパス
 * @param {string} content - 新しいHTMLコンテンツ
 */
function saveHtmlFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    process.exit(1);
  }
}

/**
 * 指定されたディレクトリからHTMLファイルを再帰的に読み込む
 * @param {string} targetDir - 対象ディレクトリ
 * @returns {Object[]} 読み込まれたHTMLファイルの配列
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
 * メイン処理
 */
function main() {
  const targetDirectories = ['ja', 'en-US'];
  const allLoadedFiles = [];
  
  // トップレベルのindex.htmlを処理
  const topLevelIndexPath = 'index.html';
  if (fs.existsSync(topLevelIndexPath)) {
    const loadedFile = loadHtmlFile(topLevelIndexPath);
    if (loadedFile) {
      allLoadedFiles.push(loadedFile);
    }
  }
  
  // HTMLファイルを読み込み
  for (const dir of targetDirectories) {
    const loadedFiles = loadHtmlFilesRecursively(dir);
    allLoadedFiles.push(...loadedFiles);
  }
  
  // アナリティクススクリプトを注入して保存
  for (const loadedFile of allLoadedFiles) {
    const originalContent = loadedFile.content;
    const updatedContent = injectAnalyticsScript(loadedFile);
    
    if (originalContent !== updatedContent) {
      saveHtmlFile(loadedFile.filePath, updatedContent);
    }
  }
}

// スクリプトを実行
main();
