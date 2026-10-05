const fs = require('fs');
const path = require('path');

console.log('=== BADGECRAFT STUDIO PRO VALIDATION SUITE ===\n');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Verify 31 Fonts in index.html
const fontMatches = html.match(/<option value="[^"]+">([^<]+)<\/option>/g) || [];
const fontOptions = fontMatches.filter(opt => opt.includes("'"));
assert(fontOptions.length >= 30, `Contains 30+ typography fonts in ribbon selector (Found: ${fontOptions.length})`);

// 2. Verify 24 Templates in index.html and app.js
const templateCardMatches = [...html.matchAll(/data-template="([^"]+)"/g)].map(m => m[1]);
assert(templateCardMatches.length >= 24, `24 template cards present in index.html (Found: ${templateCardMatches.length})`);

// Check each template key exists in app.js templatesDatabase
let allTemplatesInJs = true;
templateCardMatches.forEach(tKey => {
  if (!js.includes(`'${tKey}':`)) {
    console.error(`Missing template definition in app.js: ${tKey}`);
    allTemplatesInJs = false;
  }
});
assert(allTemplatesInJs, 'All 24 template IDs in index.html have definitions in templatesDatabase');

// 3. Verify Company Quick-Brander
const quickBranderIds = [
  'drawerCompany',
  'companyBrandNameInput',
  'companyTaglineInput',
  'companyPrimaryColorPicker',
  'companyPrimaryColorHex',
  'companyEmpNameInput',
  'companyEmpRoleInput',
  'companyEmpDeptInput',
  'companyEmpIdInput',
  'companyBloodGroupInput',
  'companyClearanceInput',
  'companyExpiryInput',
  'btnApplyCompanyBrand'
];
quickBranderIds.forEach(id => {
  assert(html.includes(`id="${id}"`), `Company Quick-Brander element #${id} exists in index.html`);
});

// 4. Verify Web Presets & Extractor
const webPresetsMatches = [...html.matchAll(/data-web-preset="([^"]+)"/g)].map(m => m[1]);
assert(webPresetsMatches.length === 10, `10 Corporate Web Presets present in index.html (Found: ${webPresetsMatches.length})`);

let allPresetsInJs = true;
webPresetsMatches.forEach(pKey => {
  if (!js.includes(`'${pKey}':`)) {
    console.error(`Missing preset definition in app.js: ${pKey}`);
    allPresetsInJs = false;
  }
});
assert(allPresetsInJs, 'All 10 web preset IDs in index.html have definitions in webPresetsDatabase');

assert(html.includes('id="importWebsiteDomainInput"'), 'Website extractor input #importWebsiteDomainInput exists');
assert(html.includes('id="btnExtractWebsite"'), 'Website extractor button #btnExtractWebsite exists');

// 5. Verify Background Swatches, Gradients & Security Patterns
const bgSwatches = [...html.matchAll(/class="bg-swatch"/g)];
assert(bgSwatches.length >= 16, `16 solid color swatches exist in background drawer (Found: ${bgSwatches.length})`);

const bgGradients = [...html.matchAll(/class="bg-grad-card"/g)];
assert(bgGradients.length >= 12, `12 luxury gradient cards exist in background drawer (Found: ${bgGradients.length})`);

const patterns = [...html.matchAll(/data-pattern="([^"]+)"/g)].map(m => m[1]);
const uniquePatterns = [...new Set(patterns)];
assert(uniquePatterns.length >= 8, `8 security patterns present (Found: ${uniquePatterns.length}: ${uniquePatterns.join(', ')})`);

// Check CSS classes for all patterns
uniquePatterns.forEach(pat => {
  if (pat !== 'none') {
    assert(css.includes(`.pattern-${pat}`), `CSS class .pattern-${pat} defined in styles.css`);
  }
});

// 6. Verify 3D Simulation Elements
const elements3D = [
  'modal3DView',
  'modal3DViewport',
  'card3DFlipper',
  'btnFlip3DModal',
  'btnClose3DModal',
  'm3dFrontContent',
  'm3dBackContent',
  'm3dLanyardText',
  'm3dPatternFront',
  'm3dPatternBack'
];
elements3D.forEach(id => {
  assert(html.includes(`id="${id}"`), `3D Simulation element #${id} exists in index.html`);
});

// 7. Verify Synchronous Vector Barcode & QR Code Functions in app.js
assert(js.includes('function renderBarcodeDirect('), 'app.js includes synchronous renderBarcodeDirect function');
assert(js.includes('function generateQRSvg('), 'app.js includes synchronous generateQRSvg function');
assert(!js.includes('setTimeout(() => { if (window.JsBarcode)'), 'Eliminated delayed setTimeout race condition for barcode');

// 8. Verify ContentEditable Keydown Fix
assert(js.includes('e.target.isContentEditable'), 'app.js checks e.target.isContentEditable to protect text editing');

// 9. Summary
console.log(`\nValidation complete: ${passed} PASSED, ${failed} FAILED.`);
if (failed === 0) {
  console.log('ALL AUDIT CHECKS PASSED PERFECTLY!\n');
  process.exit(0);
} else {
  process.exit(1);
}
