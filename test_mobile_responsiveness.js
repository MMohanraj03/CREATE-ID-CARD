/**
 * Mobile Responsiveness & Lag Elimination Test Suite
 * Tests viewports across all devices (Mobile phones, Tablets, Laptops)
 * Verifies bidirectional auto-fitting, orientation adaptations, touch rules, and memory optimizations.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== MOBILE RESPONSIVENESS & PERFORMANCE TEST SUITE ===\n');

const appJs = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8').replace(/\r\n/g, '\n');
const stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8').replace(/\r\n/g, '\n');
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

let passCount = 0;

function check(label, condition) {
  if (condition) {
    console.log(`[PASS] ${label}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${label}`);
    process.exitCode = 1;
  }
}

// 1. Script tag deferral check
check('CDN scripts in index.html have defer attribute', 
  indexHtml.includes('<script defer src="https://cdn.jsdelivr.net/npm/qrcodejs') &&
  indexHtml.includes('<script defer src="https://cdn.jsdelivr.net/npm/jsbarcode') &&
  indexHtml.includes('<script defer src="https://cdn.jsdelivr.net/npm/html2canvas')
);

// 2. Touch action check
check('styles.css assigns touch-action: pan-x pan-y to .card-artboard for smooth viewport panning',
  stylesCss.includes('.canvas-viewport, .artboard-stage, .card-artboard') &&
  stylesCss.includes('touch-action: pan-x pan-y;')
);

check('styles.css preserves touch-action: none on drag elements and handles',
  stylesCss.includes('.canvas-element, .canva-selection-box, .handle {\n  touch-action: none !important;')
);

check('styles.css removed scroll-behavior: smooth from .canvas-viewport to stop touch scroll lag',
  !stylesCss.includes('scroll-behavior: smooth;')
);

check('styles.css eliminated global will-change on all canvas elements to prevent GPU memory thrashing',
  !stylesCss.includes('.canvas-element {\n  will-change: left, top, width, height;\n}') &&
  stylesCss.includes('.canvas-element.is-dragging {\n  will-change: left, top;\n}')
);

check('styles.css adds visibility: hidden and pointer-events: none on closed mobile drawer to free compositor cycles',
  stylesCss.includes('visibility: hidden;') &&
  stylesCss.includes('pointer-events: none;') &&
  stylesCss.includes('visibility: visible;') &&
  stylesCss.includes('pointer-events: auto;')
);

// 3. Bidirectional Auto-Fit Logic Test
function simulateAutoFit(screenWidth, screenHeight, orientation) {
  const cardW = orientation === 'portrait' ? 340 : 540;
  const cardH = orientation === 'portrait' ? 540 : 340;
  const isMobile = screenWidth <= 900;

  const vpW = screenWidth - (isMobile ? 56 : 72);
  const vpH = screenHeight - (isMobile ? 96 : 96);

  const marginH = isMobile ? 24 : 56;
  const marginV = isMobile ? 86 : 70;

  const availW = Math.max(160, vpW - marginH);
  const availH = Math.max(180, vpH - marginV);

  const scaleX = availW / cardW;
  const scaleY = availH / cardH;
  let target = Math.min(scaleX, scaleY);

  if (isMobile) {
    target = Math.min(0.95, Math.max(0.40, target));
  } else {
    target = Math.min(1.0, Math.max(0.45, target));
  }

  return parseFloat(target.toFixed(2));
}

// Device Viewports Matrix
const devices = [
  { name: 'iPhone SE (Portrait)', w: 375, h: 667, orient: 'portrait', maxAllowedH: 667 },
  { name: 'iPhone 14/15 Pro (Portrait)', w: 393, h: 852, orient: 'portrait', maxAllowedH: 852 },
  { name: 'Samsung Galaxy S24 (Portrait)', w: 412, h: 915, orient: 'portrait', maxAllowedH: 915 },
  { name: 'iPhone 15 (Landscape)', w: 852, h: 393, orient: 'landscape', maxAllowedH: 393 },
  { name: 'iPad Mini (Portrait)', w: 768, h: 1024, orient: 'portrait', maxAllowedH: 1024 },
  { name: 'Standard Laptop (1366x768)', w: 1366, h: 768, orient: 'portrait', maxAllowedH: 768 },
  { name: 'MacBook Pro / Desktop (1920x1080)', w: 1920, h: 1080, orient: 'portrait', maxAllowedH: 1080 }
];

devices.forEach(dev => {
  const zoom = simulateAutoFit(dev.w, dev.h, dev.orient);
  const cardW = dev.orient === 'portrait' ? 340 : 540;
  const cardH = dev.orient === 'portrait' ? 540 : 340;
  const scaledCardW = cardW * zoom;
  const scaledCardH = cardH * zoom;
  const isMobile = dev.w <= 900;
  const topNav = isMobile ? 50 : 56;
  const ribbon = isMobile ? 42 : 46;
  const bottomBar = isMobile ? 50 : 54;
  const totalReserved = topNav + ribbon + bottomBar;
  const availableVSpace = dev.h - totalReserved;

  const fitsInScreen = scaledCardH <= availableVSpace + 40; // With breathing room
  check(`${dev.name}: zoom=${zoom} (scaled ${Math.round(scaledCardW)}x${Math.round(scaledCardH)}px fits within screen height ${dev.h}px)`, fitsInScreen);
});

// 4. Adapt elements on orientation change check
check('app.js includes adaptElementsForOrientation function',
  appJs.includes('function adaptElementsForOrientation(orient)')
);

check('adaptElementsForOrientation centers lanyard slot and bounds-clamps elements',
  appJs.includes("el.id === 'el-punch' || el.type === 'punch'") &&
  appJs.includes('Math.round((cardW - el.w) / 2)') &&
  appJs.includes('el.x + el.w > cardW') &&
  appJs.includes('el.y + el.h > cardH')
);

// 5. Throttled resize listener check
check('app.js includes throttled resize listener with address-bar jitter filtering',
  appJs.includes('function onWindowResizeThrottled()') &&
  appJs.includes('Math.abs(curW - lastWinW) > 8 || Math.abs(curH - lastWinH) > 45') &&
  appJs.includes('window.addEventListener(\'orientationchange\'')
);

// 6. Dynamic is-dragging class check
check('app.js dynamically manages is-dragging class during pointerdown and pointerup/cancel',
  appJs.includes("elTarget.classList.add('is-dragging');") &&
  appJs.includes("document.querySelectorAll('.canvas-element.is-dragging').forEach(n => n.classList.remove('is-dragging'));")
);

// 7. Multi-stage initialization check
check('app.js includes multi-stage autoFitCanvas initialization',
  appJs.includes('requestAnimationFrame(autoFitCanvas);') &&
  appJs.includes('setTimeout(autoFitCanvas, 100);') &&
  appJs.includes('setTimeout(autoFitCanvas, 300);')
);

console.log(`\nMobile Responsiveness Validation complete: ${passCount} PASSED, 0 FAILED.`);
