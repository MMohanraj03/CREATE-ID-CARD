/**
 * BadgeCraft Studio Pro - Enterprise Canva-Style Engine
 * Direct Canvas Manipulation, Undo/Redo, 18+ Fonts, 12+ Templates,
 * Import/Export JSON Templates, and 3D Simulation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. App State & Default Card Schema
  // -------------------------------------------------------------------------
  const state = {
    projectName: 'Corporate_Employee_Badge_CR80',
    currentPage: 'front', // 'front' | 'back'
    orientation: 'portrait', // 'portrait' | 'landscape'
    zoom: 1,
    selectedId: null,
    isDragging: false,
    isResizing: false,
    resizeHandle: null,
    dragStart: { x: 0, y: 0 },
    elementStart: { x: 0, y: 0, w: 0, h: 0 },
    hasMovedDuringClick: false,
    lastTextTapTime: 0,
    lastTextTapId: null,
    activePattern: 'none',

    backgrounds: {
      front: 'radial-gradient(circle at 10% 10%, #1e293b 0%, #0a0f1d 75%)',
      back: 'radial-gradient(circle at 10% 10%, #1e293b 0%, #0a0f1d 75%)'
    },

    elements: {
      front: [
        {
          id: 'el-punch',
          type: 'punch',
          name: 'Lanyard Slot',
          x: 148, y: 8, w: 44, h: 8,
          styles: { zIndex: 10 }
        },
        {
          id: 'el-logo',
          type: 'logo',
          name: 'Company Logo',
          x: 20, y: 26, w: 34, h: 34,
          content: 'hexagon',
          styles: { color: '#06b6d4', zIndex: 5 }
        },
        {
          id: 'el-comp-name',
          type: 'text',
          name: 'Company Name',
          x: 62, y: 26, w: 170, h: 20,
          content: 'NEXUS DYNAMICS',
          styles: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13px',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '0.08em',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            zIndex: 5
          }
        },
        {
          id: 'el-comp-tag',
          type: 'text',
          name: 'Company Tagline',
          x: 62, y: 44, w: 170, h: 16,
          content: 'Advanced Artificial Intelligence',
          styles: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '8px',
            fontWeight: '500',
            color: '#94a3b8',
            letterSpacing: '0.02em',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            zIndex: 5
          }
        },
        {
          id: 'el-badge-clearance',
          type: 'badge',
          name: 'Clearance Badge',
          x: 236, y: 28, w: 84, h: 22,
          content: 'ALL ACCESS',
          badgeColor: 'emerald',
          styles: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '8.5px',
            fontWeight: '800',
            letterSpacing: '0.05em',
            zIndex: 5
          }
        },
        {
          id: 'el-chip',
          type: 'chip',
          name: 'Smart EMV Chip',
          x: 20, y: 86, w: 44, h: 34,
          chipFinish: 'gold',
          styles: { zIndex: 6 }
        },
        {
          id: 'el-photo',
          type: 'photo',
          name: 'Employee Portrait',
          x: 95, y: 82, w: 150, h: 175,
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          cropShape: 'rounded',
          styles: {
            borderRadius: '14px',
            zIndex: 5
          }
        },
        {
          id: 'el-holo-seal',
          type: 'seal',
          name: 'Hologram Seal',
          x: 260, y: 205, w: 48, h: 48,
          styles: { zIndex: 6 }
        },
        {
          id: 'el-emp-name',
          type: 'text',
          name: 'Employee Name',
          x: 20, y: 275, w: 300, h: 32,
          content: 'ALEXANDER VANCE',
          styles: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '19px',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '0.04em',
            textAlign: 'center',
            zIndex: 5
          }
        },
        {
          id: 'el-emp-role',
          type: 'text',
          name: 'Designation / Role',
          x: 20, y: 308, w: 300, h: 20,
          content: 'Chief Technology Officer',
          styles: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '11px',
            fontWeight: '600',
            color: '#06b6d4',
            textAlign: 'center',
            zIndex: 5
          }
        },
        {
          id: 'el-emp-dept',
          type: 'text',
          name: 'Department Pill',
          x: 50, y: 332, w: 240, h: 22,
          content: 'ENGINEERING & AI SYSTEMS',
          styles: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '9px',
            fontWeight: '700',
            color: '#cbd5e1',
            letterSpacing: '0.08em',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '3px 8px',
            zIndex: 5
          }
        },
        {
          id: 'el-divider-1',
          type: 'divider',
          name: 'Divider Line',
          x: 20, y: 450, w: 300, h: 1,
          styles: { background: 'rgba(255, 255, 255, 0.1)', zIndex: 4 }
        },
        {
          id: 'el-id-label',
          type: 'text',
          name: 'ID Label',
          x: 24, y: 462, w: 90, h: 14,
          content: 'EMPLOYEE ID',
          styles: {
            fontSize: '7.5px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            zIndex: 5
          }
        },
        {
          id: 'el-id-val',
          type: 'text',
          name: 'ID Code',
          x: 24, y: 476, w: 90, h: 20,
          content: 'NX-84920',
          styles: {
            fontFamily: "'Fira Code', monospace",
            fontSize: '12px',
            fontWeight: '700',
            color: '#06b6d4',
            zIndex: 5
          }
        },
        {
          id: 'el-blood-label',
          type: 'text',
          name: 'Blood Group Label',
          x: 130, y: 462, w: 80, h: 14,
          content: 'BLOOD GRP',
          styles: {
            fontSize: '7.5px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            zIndex: 5
          }
        },
        {
          id: 'el-blood-val',
          type: 'text',
          name: 'Blood Group',
          x: 130, y: 476, w: 80, h: 20,
          content: 'O+',
          styles: {
            fontSize: '12px',
            fontWeight: '700',
            color: '#ffffff',
            zIndex: 5
          }
        },
        {
          id: 'el-exp-label',
          type: 'text',
          name: 'Expiry Label',
          x: 226, y: 462, w: 90, h: 14,
          content: 'EXPIRATION',
          styles: {
            fontSize: '7.5px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            zIndex: 5
          }
        },
        {
          id: 'el-exp-val',
          type: 'text',
          name: 'Expiry Date',
          x: 226, y: 476, w: 90, h: 20,
          content: '12 / 2029',
          styles: {
            fontSize: '12px',
            fontWeight: '700',
            color: '#ffffff',
            zIndex: 5
          }
        },
        {
          id: 'el-microtext',
          type: 'text',
          name: 'Security Microtext',
          x: 10, y: 518, w: 320, h: 14,
          content: 'NEXUS DYNAMICS OFFICIAL CREDENTIAL • NOT TRANSFERABLE • PROPERTY OF CORP',
          styles: {
            fontSize: '5.5px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.35)',
            letterSpacing: '0.1em',
            textAlign: 'center',
            zIndex: 5
          }
        }
      ],
      back: [
        {
          id: 'el-back-punch',
          type: 'punch',
          name: 'Lanyard Slot',
          x: 148, y: 8, w: 44, h: 8,
          styles: { zIndex: 10 }
        },
        {
          id: 'el-magstripe',
          type: 'magstripe',
          name: 'Magnetic Stripe',
          x: 0, y: 28, w: 340, h: 48,
          styles: { zIndex: 5 }
        },
        {
          id: 'el-terms-box',
          type: 'shape',
          name: 'Terms Container',
          x: 16, y: 92, w: 308, h: 80,
          styles: {
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            zIndex: 4
          }
        },
        {
          id: 'el-terms-title',
          type: 'text',
          name: 'Terms Title',
          x: 26, y: 98, w: 288, h: 16,
          content: 'TERMS & ACCESS CONDITIONS',
          styles: {
            fontSize: '8px',
            fontWeight: '800',
            color: '#94a3b8',
            letterSpacing: '0.06em',
            zIndex: 5
          }
        },
        {
          id: 'el-terms-body',
          type: 'text',
          name: 'Terms Body',
          x: 26, y: 114, w: 288, h: 50,
          content: 'This security credential remains the property of the issuing organization. Bearer agrees to display badge at all times. If found, return to Corporate Security Command or drop in postal mailbox.',
          styles: {
            fontSize: '7.5px',
            color: '#64748b',
            lineHeight: '1.3',
            zIndex: 5
          }
        },
        {
          id: 'el-qr',
          type: 'qr',
          name: 'vCard QR Code',
          x: 24, y: 190, w: 84, h: 84,
          qrValue: 'BEGIN:VCARD\nVERSION:3.0\nFN:Alexander Vance\nORG:Nexus Dynamics\nTITLE:CTO\nEND:VCARD',
          styles: { zIndex: 5 }
        },
        {
          id: 'el-sig-label',
          type: 'text',
          name: 'Signature Label',
          x: 126, y: 190, w: 180, h: 14,
          content: 'AUTHORIZED SIGNATURE',
          styles: {
            fontSize: '7.5px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            zIndex: 5
          }
        },
        {
          id: 'el-sig-val',
          type: 'text',
          name: 'Cardholder Signature',
          x: 126, y: 206, w: 180, h: 36,
          content: 'Alexander Vance',
          styles: {
            fontFamily: "'Alex Brush', cursive",
            fontSize: '24px',
            color: '#38bdf8',
            zIndex: 5
          }
        },
        {
          id: 'el-sig-line',
          type: 'divider',
          name: 'Signature Line',
          x: 126, y: 244, w: 180, h: 1,
          styles: { background: 'rgba(255, 255, 255, 0.25)', zIndex: 4 }
        },
        {
          id: 'el-emg-label',
          type: 'text',
          name: 'Emergency Label',
          x: 126, y: 254, w: 180, h: 14,
          content: 'EMERGENCY: +1 (555) 928-4011',
          styles: {
            fontSize: '8px',
            fontWeight: '700',
            color: '#f1f5f9',
            zIndex: 5
          }
        },
        {
          id: 'el-barcode',
          type: 'barcode',
          name: 'Industrial Barcode',
          x: 20, y: 380, w: 300, h: 64,
          barcodeValue: 'NX-84920',
          styles: { zIndex: 5 }
        },
        {
          id: 'el-back-footer',
          type: 'text',
          name: 'Back Footer Note',
          x: 20, y: 500, w: 300, h: 18,
          content: 'NEXUS DYNAMICS GLOBAL SECURITY • SN: 8841-NX992',
          styles: {
            fontFamily: "'Fira Code', monospace",
            fontSize: '7.5px',
            fontWeight: '600',
            color: '#64748b',
            textAlign: 'center',
            zIndex: 5
          }
        }
      ]
    }
  };

  // -------------------------------------------------------------------------
  // 2. Undo / Redo History Stack & LocalStorage Auto-Save
  // -------------------------------------------------------------------------
  const history = {
    past: [],
    future: []
  };

  function pushHistoryState() {
    const snapshot = JSON.stringify({
      projectName: state.projectName,
      elements: state.elements,
      backgrounds: state.backgrounds,
      orientation: state.orientation,
      activePattern: state.activePattern
    });

    history.past.push(snapshot);
    if (history.past.length > 30) history.past.shift();
    history.future = [];
    updateUndoRedoUI();

    // Auto-save to localStorage
    try {
      localStorage.setItem('badgecraft_project_data', snapshot);
      if (dom.saveStatus) dom.saveStatus.textContent = '✓ Saved to browser';
    } catch (e) {}
  }

  function undo() {
    if (history.past.length === 0) return;
    const current = JSON.stringify({
      projectName: state.projectName,
      elements: state.elements,
      backgrounds: state.backgrounds,
      orientation: state.orientation,
      activePattern: state.activePattern
    });
    history.future.push(current);

    const prev = JSON.parse(history.past.pop());
    applySnapshot(prev);
    updateUndoRedoUI();
    showToast('Undo performed', 'info');
  }

  function redo() {
    if (history.future.length === 0) return;
    const current = JSON.stringify({
      projectName: state.projectName,
      elements: state.elements,
      backgrounds: state.backgrounds,
      orientation: state.orientation,
      activePattern: state.activePattern
    });
    history.past.push(current);

    const next = JSON.parse(history.future.pop());
    applySnapshot(next);
    updateUndoRedoUI();
    showToast('Redo performed', 'info');
  }

  function applySnapshot(snap) {
    state.projectName = snap.projectName || state.projectName;
    state.elements = snap.elements;
    state.backgrounds = snap.backgrounds;
    state.orientation = snap.orientation || 'portrait';
    state.activePattern = snap.activePattern || 'none';

    dom.projectTitleInput.value = state.projectName;
    dom.btnOrientPortrait.classList.toggle('active', state.orientation === 'portrait');
    dom.btnOrientLandscape.classList.toggle('active', state.orientation === 'landscape');

    renderCanvas();
  }

  function updateUndoRedoUI() {
    dom.btnUndo.disabled = history.past.length === 0;
    dom.btnRedo.disabled = history.future.length === 0;
  }

  // -------------------------------------------------------------------------
  // 3. DOM Cache
  // -------------------------------------------------------------------------
  const dom = {
    // Top Navbar
    projectTitleInput: document.getElementById('projectTitleInput'),
    saveStatus: document.getElementById('saveStatus'),
    btnUndo: document.getElementById('btnUndo'),
    btnRedo: document.getElementById('btnRedo'),
    btnMode2D: document.getElementById('btnMode2D'),
    btnMode3D: document.getElementById('btnMode3D'),
    btnOrientPortrait: document.getElementById('btnOrientPortrait'),
    btnOrientLandscape: document.getElementById('btnOrientLandscape'),
    btnPrintTop: document.getElementById('btnPrintTop'),
    btnExportDropdown: document.getElementById('btnExportDropdown'),
    exportMenu: document.getElementById('exportMenu'),
    exportFrontPNG: document.getElementById('exportFrontPNG'),
    exportBackPNG: document.getElementById('exportBackPNG'),
    exportDualPNG: document.getElementById('exportDualPNG'),
    exportTemplateJSON: document.getElementById('exportTemplateJSON'),
    btnOpenImportModal: document.getElementById('btnOpenImportModal'),

    // Contextual Property Ribbon
    contextToolbar: document.getElementById('contextToolbar'),
    propFontFamily: document.getElementById('propFontFamily'),
    propFontSize: document.getElementById('propFontSize'),
    btnFontDecr: document.getElementById('btnFontDecr'),
    btnFontIncr: document.getElementById('btnFontIncr'),
    propColorPicker: document.getElementById('propColorPicker'),
    propColorPreview: document.getElementById('propColorPreview'),
    btnBold: document.getElementById('btnBold'),
    btnItalic: document.getElementById('btnItalic'),
    btnUppercase: document.getElementById('btnUppercase'),
    btnAlignLeft: document.getElementById('btnAlignLeft'),
    btnAlignCenter: document.getElementById('btnAlignCenter'),
    btnAlignRight: document.getElementById('btnAlignRight'),
    propOpacitySlider: document.getElementById('propOpacitySlider'),
    propOpacityLabel: document.getElementById('propOpacityLabel'),
    btnBringForward: document.getElementById('btnBringForward'),
    btnSendBackward: document.getElementById('btnSendBackward'),
    btnDuplicateElement: document.getElementById('btnDuplicateElement'),
    btnDeleteElement: document.getElementById('btnDeleteElement'),
    propImageShapeWrap: document.getElementById('propImageShapeWrap'),
    btnShapeRounded: document.getElementById('btnShapeRounded'),
    btnShapeCircle: document.getElementById('btnShapeCircle'),
    btnShapeSquare: document.getElementById('btnShapeSquare'),

    // Canvas Workspace
    canvasViewport: document.getElementById('canvasViewport'),
    cardArtboard: document.getElementById('cardArtboard'),
    artboardPatternLayer: document.getElementById('artboardPatternLayer'),
    elementsContainer: document.getElementById('elementsContainer'),
    selectionBox: document.getElementById('selectionBox'),
    selectionNameTag: document.getElementById('selectionNameTag'),

    // Bottom Controls
    btnPageFront: document.getElementById('btnPageFront'),
    btnPageBack: document.getElementById('btnPageBack'),
    btnZoomOut: document.getElementById('btnZoomOut'),
    btnZoomIn: document.getElementById('btnZoomIn'),
    btnZoomFit: document.getElementById('btnZoomFit'),
    zoomLevelText: document.getElementById('zoomLevelText'),

    // Sidebar & Drawers
    sidebarTabs: document.querySelectorAll('.sidebar-tab'),
    drawerPanels: document.querySelectorAll('.drawer-panel'),
    dropZoneUpload: document.getElementById('dropZoneUpload'),
    generalFileInput: document.getElementById('generalFileInput'),
    uploadsHistoryGrid: document.getElementById('uploadsHistoryGrid'),
    barcodeValueInput: document.getElementById('barcodeValueInput'),
    btnAddBarcodeToCanvas: document.getElementById('btnAddBarcodeToCanvas'),
    qrValueInput: document.getElementById('qrValueInput'),
    btnAddQrToCanvas: document.getElementById('btnAddQrToCanvas'),
    templateFilterInput: document.getElementById('templateFilterInput'),

    // Background Controls
    customBgColorPicker: document.getElementById('customBgColorPicker'),
    customBgHexInput: document.getElementById('customBgHexInput'),

    // Import Modal
    importModal: document.getElementById('importModal'),
    btnCloseImportModal: document.getElementById('btnCloseImportModal'),
    btnCancelImport: document.getElementById('btnCancelImport'),
    btnApplyImport: document.getElementById('btnApplyImport'),
    dropZoneTemplateJSON: document.getElementById('dropZoneTemplateJSON'),
    templateFileInput: document.getElementById('templateFileInput'),
    templatePasteTextarea: document.getElementById('templatePasteTextarea'),
    importImageUrlInput: document.getElementById('importImageUrlInput'),
    dropZoneRefImage: document.getElementById('dropZoneRefImage'),
    refImageFileInput: document.getElementById('refImageFileInput'),

    // 3D Modal
    modal3DView: document.getElementById('modal3DView'),
    modal3DViewport: document.getElementById('modal3DViewport'),
    card3DFlipper: document.getElementById('card3DFlipper'),
    btnFlip3DModal: document.getElementById('btnFlip3DModal'),
    btnClose3DModal: document.getElementById('btnClose3DModal'),
    m3dFrontContent: document.getElementById('m3dFrontContent'),
    m3dBackContent: document.getElementById('m3dBackContent'),
    m3dLanyardText: document.getElementById('m3dLanyardText'),
    m3dPatternFront: document.getElementById('m3dPatternFront'),
    m3dPatternBack: document.getElementById('m3dPatternBack'),

    // Company Quick-Brander
    companyBrandNameInput: document.getElementById('companyBrandNameInput'),
    companyTaglineInput: document.getElementById('companyTaglineInput'),
    companyPrimaryColorPicker: document.getElementById('companyPrimaryColorPicker'),
    companyPrimaryColorHex: document.getElementById('companyPrimaryColorHex'),
    companyEmpNameInput: document.getElementById('companyEmpNameInput'),
    companyEmpRoleInput: document.getElementById('companyEmpRoleInput'),
    companyEmpDeptInput: document.getElementById('companyEmpDeptInput'),
    companyEmpIdInput: document.getElementById('companyEmpIdInput'),
    companyBloodGroupInput: document.getElementById('companyBloodGroupInput'),
    companyClearanceInput: document.getElementById('companyClearanceInput'),
    companyExpiryInput: document.getElementById('companyExpiryInput'),
    btnApplyCompanyBrand: document.getElementById('btnApplyCompanyBrand'),

    // Web Preset & URL Extractor
    importWebsiteDomainInput: document.getElementById('importWebsiteDomainInput'),
    btnExtractWebsite: document.getElementById('btnExtractWebsite'),

    // Mobile Drawer Controls
    sidebarDrawer: document.getElementById('sidebarDrawer'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    btnCloseDrawer: document.getElementById('btnCloseDrawer'),

    toastShelf: document.getElementById('toastShelf')
  };

  // -------------------------------------------------------------------------
  // 4. Canvas Renderer & Element Creation
  // -------------------------------------------------------------------------
  function renderCanvas() {
    dom.elementsContainer.innerHTML = '';
    
    // Background style
    dom.cardArtboard.style.background = state.backgrounds[state.currentPage];

    // Pattern class
    dom.artboardPatternLayer.className = `artboard-pattern-layer pattern-${state.activePattern}`;

    // Orientation class
    dom.cardArtboard.className = `card-artboard cr80-${state.orientation}`;

    const currentList = state.elements[state.currentPage] || [];
    currentList.forEach(el => {
      const elNode = createDOMElementNode(el);
      dom.elementsContainer.appendChild(elNode);
    });

    updateSelectionBox();
  }

  function createDOMElementNode(el) {
    const node = document.createElement('div');
    node.className = 'canvas-element';
    node.id = `node-${el.id}`;
    node.dataset.id = el.id;
    node.dataset.type = el.type;

    node.style.left = `${el.x}px`;
    node.style.top = `${el.y}px`;
    node.style.width = `${el.w}px`;
    node.style.height = `${el.h}px`;

    if (el.styles) {
      Object.assign(node.style, el.styles);
    }

    switch (el.type) {
      case 'text':
        node.textContent = el.content || 'Text';
        node.setAttribute('contenteditable', 'false');
        node.setAttribute('spellcheck', 'false');
        break;

      case 'photo':
        const img = document.createElement('img');
        img.src = el.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
        img.alt = 'Employee Photo';
        node.appendChild(img);
        applyImageCrop(node, el.cropShape || 'rounded');
        break;

      case 'logo':
        node.innerHTML = getLogoSVG(el.content);
        break;

      case 'chip':
        node.innerHTML = `
          <div class="smart-emv-chip ${el.chipFinish || 'gold'}" style="position:relative; width:100%; height:100%; border-radius:6px;">
            <div class="chip-line line-h"></div>
            <div class="chip-line line-v"></div>
            <div class="chip-core"></div>
          </div>`;
        break;

      case 'seal':
        node.innerHTML = `
          <div class="card-hologram-seal" style="position:relative; width:100%; height:100%;">
            <div class="seal-content">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span class="seal-label">AUTHENTIC</span>
            </div>
          </div>`;
        break;

      case 'punch':
        node.innerHTML = `<div class="card-punch-slot" style="margin:0; width:100%; height:100%;"><div class="slot-inner"></div></div>`;
        break;

      case 'magstripe':
        node.innerHTML = `<div class="card-magstripe" style="margin:0; width:100%; height:100%;"></div>`;
        break;

      case 'badge':
        node.textContent = el.content || 'BADGE';
        node.className = `canvas-element chip-badge-item ${el.badgeColor || 'emerald'}`;
        node.style.display = 'flex';
        node.style.alignItems = 'center';
        node.style.justifyContent = 'center';
        break;

      case 'barcode':
        node.innerHTML = `
          <div style="background:#ffffff; border-radius:6px; padding:4px 8px; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;">
            <svg id="svg-${el.id}" style="width:100%; height:38px;"></svg>
            <span style="font-family:'Fira Code', monospace; font-size:9px; font-weight:700; color:#000;">${el.barcodeValue || 'NX-84920'}</span>
          </div>`;
        const svgTarget = node.querySelector('svg');
        renderBarcodeDirect(svgTarget, el.barcodeValue || 'NX-84920');
        break;

      case 'qr':
        node.innerHTML = `
          <div id="qr-${el.id}" style="background:#ffffff; border-radius:6px; padding:4px; width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
            ${generateQRSvg(el.qrValue || 'https://verify.corp.com')}
          </div>`;
        break;

      case 'divider':
        node.style.background = el.styles?.background || 'rgba(255, 255, 255, 0.2)';
        break;

      case 'shape':
        break;
    }

    return node;
  }

  function getLogoSVG(type) {
    if (type === 'shield') {
      return `<svg viewBox="0 0 40 40" width="100%" height="100%"><path d="M20 4 L34 10 V22 C34 30 20 36 20 36 C20 36 6 30 6 22 V10 Z" fill="none" stroke="currentColor" stroke-width="2.5"></path><polyline points="14 20 18 24 26 16" stroke="currentColor" stroke-width="2.5" fill="none"></polyline></svg>`;
    } else if (type === 'orb') {
      return `<svg viewBox="0 0 40 40" width="100%" height="100%"><circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="2.5"></circle><ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="currentColor" stroke-width="2.5"></ellipse></svg>`;
    } else if (type === 'cube') {
      return `<svg viewBox="0 0 40 40" width="100%" height="100%"><path d="M20 4 L34 12 V28 L20 36 L6 28 V12 Z" fill="none" stroke="currentColor" stroke-width="2.5"></path></svg>`;
    }
    return `<svg viewBox="0 0 40 40" width="100%" height="100%"><polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="none" stroke="currentColor" stroke-width="2.5"></polygon><polygon points="20,9 31,16 31,24 20,31 9,24 9,16" fill="currentColor" opacity="0.85"></polygon></svg>`;
  }

  function applyImageCrop(node, shape) {
    if (shape === 'circle') {
      node.style.borderRadius = '50%';
    } else if (shape === 'square') {
      node.style.borderRadius = '4px';
    } else {
      node.style.borderRadius = '14px';
    }
  }

  function renderBarcodeDirect(target, val) {
    if (!target) return;
    if (window.JsBarcode) {
      try {
        window.JsBarcode(target, val, {
          format: 'CODE128',
          width: 1.5,
          height: 32,
          displayValue: false,
          margin: 0
        });
        return;
      } catch (err) {}
    }

    // High-fidelity vector fallback bars
    let barsHtml = `<rect width="100%" height="100%" fill="#ffffff"/>`;
    let curX = 10;
    const str = String(val);
    for (let i = 0; i < 36; i++) {
      const charCode = str.charCodeAt(i % str.length) || 65;
      const barW = ((charCode * (i + 1)) % 3) + 1;
      const isBlack = ((charCode + i) % 2 === 0);
      if (isBlack) {
        barsHtml += `<rect x="${curX}" y="2" width="${barW}" height="32" fill="#000000"/>`;
      }
      curX += barW + 1.5;
    }
    target.setAttribute('viewBox', `0 0 ${Math.max(120, curX + 10)} 36`);
    target.innerHTML = barsHtml;
  }

  function renderBarcodeItem(el) {
    const target = document.getElementById(`svg-${el.id}`);
    if (target) renderBarcodeDirect(target, el.barcodeValue || 'NX-84920');
  }

  function generateQRSvg(val) {
    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%" style="display:block;">
        <rect width="100" height="100" fill="#ffffff"/>
        <rect x="8" y="8" width="26" height="26" fill="#000000"/>
        <rect x="12" y="12" width="18" height="18" fill="#ffffff"/>
        <rect x="16" y="16" width="10" height="10" fill="#000000"/>
        <rect x="66" y="8" width="26" height="26" fill="#000000"/>
        <rect x="70" y="12" width="18" height="18" fill="#ffffff"/>
        <rect x="74" y="16" width="10" height="10" fill="#000000"/>
        <rect x="8" y="66" width="26" height="26" fill="#000000"/>
        <rect x="12" y="70" width="18" height="18" fill="#ffffff"/>
        <rect x="16" y="74" width="10" height="10" fill="#000000"/>
        <rect x="42" y="14" width="6" height="6" fill="#000000"/>
        <rect x="52" y="22" width="6" height="6" fill="#000000"/>
        <rect x="44" y="36" width="6" height="6" fill="#000000"/>
        <rect x="50" y="48" width="6" height="6" fill="#000000"/>
        <rect x="62" y="42" width="6" height="6" fill="#000000"/>
        <rect x="76" y="50" width="6" height="6" fill="#000000"/>
        <rect x="42" y="70" width="6" height="6" fill="#000000"/>
        <rect x="56" y="76" width="6" height="6" fill="#000000"/>
        <rect x="70" y="74" width="6" height="6" fill="#000000"/>
        <rect x="84" y="64" width="6" height="6" fill="#000000"/>
      </svg>`;
  }

  function renderQRItem(el) {
    const target = document.getElementById(`qr-${el.id}`);
    if (target) target.innerHTML = generateQRSvg(el.qrValue || 'https://verify.corp.com');
  }

  // -------------------------------------------------------------------------
  // 5. Selection Box & Handle Positioning
  // -------------------------------------------------------------------------
  function selectElement(id) {
    state.selectedId = id;
    const el = getSelectedElement();

    if (!el) {
      dom.selectionBox.classList.add('hidden');
      return;
    }

    dom.selectionBox.classList.remove('hidden');
    dom.selectionNameTag.textContent = el.name || 'Element';

    updateSelectionBox();
    syncPropertiesRibbon(el);
  }

  function updateSelectionBox() {
    const el = getSelectedElement();
    if (!el) {
      dom.selectionBox.classList.add('hidden');
      return;
    }

    dom.selectionBox.style.left = `${el.x}px`;
    dom.selectionBox.style.top = `${el.y}px`;
    dom.selectionBox.style.width = `${el.w}px`;
    dom.selectionBox.style.height = `${el.h}px`;
  }

  function getSelectedElement() {
    if (!state.selectedId) return null;
    const list = state.elements[state.currentPage] || [];
    return list.find(e => e.id === state.selectedId) || null;
  }

  function deselectAll() {
    state.selectedId = null;
    dom.selectionBox.classList.add('hidden');
  }

  // -------------------------------------------------------------------------
  // 6. Direct Drag-to-Move & Resize Manipulation Engine (Unified Mouse + Touch)
  // -------------------------------------------------------------------------
  function enableTextEditing(elTarget) {
    if (!elTarget) return;
    elTarget.setAttribute('contenteditable', 'true');
    elTarget.focus();

    const range = document.createRange();
    range.selectNodeContents(elTarget);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    function onTextBlur() {
      elTarget.setAttribute('contenteditable', 'false');
      const el = getSelectedElement();
      if (el) {
        el.content = elTarget.textContent;
        pushHistoryState();
      }
      elTarget.removeEventListener('blur', onTextBlur);
    }
    elTarget.addEventListener('blur', onTextBlur);
  }

  dom.cardArtboard.addEventListener('pointerdown', (e) => {
    // If clicking a resize handle
    if (e.target.classList.contains('handle')) {
      state.isResizing = true;
      state.resizeHandle = e.target.dataset.handle;
      state.dragStart = { x: e.clientX, y: e.clientY };
      const el = getSelectedElement();
      state.elementStart = { x: el.x, y: el.y, w: el.w, h: el.h };
      if (e.target.setPointerCapture && e.pointerId) {
        try { e.target.setPointerCapture(e.pointerId); } catch(err){}
      }
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Check if clicked an element
    const elTarget = e.target.closest('.canvas-element');
    if (elTarget) {
      const id = elTarget.dataset.id;
      selectElement(id);

      // If text element is in active typing mode, let browser handle cursor
      if (elTarget.getAttribute('contenteditable') === 'true') {
        return;
      }

      // Double-tap detection for mobile touch editing on iOS & Android
      const now = Date.now();
      if (elTarget.dataset.type === 'text') {
        if (state.lastTextTapId === id && (now - state.lastTextTapTime) < 380) {
          enableTextEditing(elTarget);
          state.lastTextTapTime = 0;
          state.lastTextTapId = null;
          e.stopPropagation();
          return;
        }
        state.lastTextTapTime = now;
        state.lastTextTapId = id;
      }

      state.isDragging = true;
      state.hasMovedDuringClick = false;
      state.dragStart = { x: e.clientX, y: e.clientY };
      const el = getSelectedElement();
      state.elementStart = { x: el.x, y: el.y, w: el.w, h: el.h };
      if (elTarget.setPointerCapture && e.pointerId) {
        try { elTarget.setPointerCapture(e.pointerId); } catch(err){}
      }
      elTarget.classList.add('is-dragging');
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();
      return;
    }

    // Clicked empty artboard
    deselectAll();
  });

  let isPointerTicking = false;
  let latestPointerEvent = null;

  window.addEventListener('pointermove', (e) => {
    if (!state.isDragging && !state.isResizing) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    latestPointerEvent = e;
    if (!isPointerTicking) {
      window.requestAnimationFrame(() => {
        handlePointerMove(latestPointerEvent);
        isPointerTicking = false;
      });
      isPointerTicking = true;
    }
  }, { passive: false });

  function handlePointerMove(e) {
    if (!e) return;
    if (state.isDragging) {
      const el = getSelectedElement();
      if (!el) return;

      const dx = (e.clientX - state.dragStart.x) / state.zoom;
      const dy = (e.clientY - state.dragStart.y) / state.zoom;

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        state.hasMovedDuringClick = true;
      }

      el.x = Math.round(state.elementStart.x + dx);
      el.y = Math.round(state.elementStart.y + dy);

      const domEl = document.getElementById(`node-${el.id}`);
      if (domEl) {
        domEl.style.left = `${el.x}px`;
        domEl.style.top = `${el.y}px`;
      }
      updateSelectionBox();
    } else if (state.isResizing) {
      const el = getSelectedElement();
      if (!el) return;

      const dx = (e.clientX - state.dragStart.x) / state.zoom;
      const dy = (e.clientY - state.dragStart.y) / state.zoom;
      const hType = state.resizeHandle;

      if (hType === 'br') {
        el.w = Math.max(20, Math.round(state.elementStart.w + dx));
        el.h = Math.max(14, Math.round(state.elementStart.h + dy));
      } else if (hType === 'bl') {
        el.w = Math.max(20, Math.round(state.elementStart.w - dx));
        el.h = Math.max(14, Math.round(state.elementStart.h + dy));
        el.x = Math.round(state.elementStart.x + dx);
      } else if (hType === 'tr') {
        el.w = Math.max(20, Math.round(state.elementStart.w + dx));
        el.h = Math.max(14, Math.round(state.elementStart.h - dy));
        el.y = Math.round(state.elementStart.y + dy);
      } else if (hType === 'tl') {
        el.w = Math.max(20, Math.round(state.elementStart.w - dx));
        el.h = Math.max(14, Math.round(state.elementStart.h - dy));
        el.x = Math.round(state.elementStart.x + dx);
        el.y = Math.round(state.elementStart.y + dy);
      }

      const domEl = document.getElementById(`node-${el.id}`);
      if (domEl) {
        domEl.style.left = `${el.x}px`;
        domEl.style.top = `${el.y}px`;
        domEl.style.width = `${el.w}px`;
        domEl.style.height = `${el.h}px`;
      }
      updateSelectionBox();
    }
  }

  function handlePointerEnd() {
    if (state.isDragging || state.isResizing) {
      document.querySelectorAll('.canvas-element.is-dragging').forEach(n => n.classList.remove('is-dragging'));
      state.isDragging = false;
      state.isResizing = false;
      state.resizeHandle = null;
      if (state.hasMovedDuringClick) {
        pushHistoryState();
      }
    }
  }

  window.addEventListener('pointerup', handlePointerEnd);
  window.addEventListener('pointercancel', handlePointerEnd);

  // -------------------------------------------------------------------------
  // 7. Inline Text Editing
  // -------------------------------------------------------------------------
  dom.cardArtboard.addEventListener('dblclick', (e) => {
    const elTarget = e.target.closest('.canvas-element[data-type="text"]');
    if (!elTarget) return;
    enableTextEditing(elTarget);
  });

  // -------------------------------------------------------------------------
  // 8. Contextual Property Ribbon Synchronization
  // -------------------------------------------------------------------------
  function syncPropertiesRibbon(el) {
    if (el.type === 'text' || el.type === 'badge') {
      dom.propFontFamily.value = el.styles?.fontFamily || "'Plus Jakarta Sans', sans-serif";
      const sizeNum = parseInt(el.styles?.fontSize || '16', 10);
      dom.propFontSize.value = sizeNum;
      
      const col = el.styles?.color || '#ffffff';
      dom.propColorPicker.value = col.startsWith('#') ? col : '#ffffff';
      dom.propColorPreview.style.backgroundColor = col;

      dom.btnBold.classList.toggle('active', el.styles?.fontWeight === '700' || el.styles?.fontWeight === '800');
      dom.btnItalic.classList.toggle('active', el.styles?.fontStyle === 'italic');
      
      const align = el.styles?.textAlign || 'left';
      dom.btnAlignLeft.classList.toggle('active', align === 'left');
      dom.btnAlignCenter.classList.toggle('active', align === 'center');
      dom.btnAlignRight.classList.toggle('active', align === 'right');

      dom.propImageShapeWrap.classList.add('hidden');
    } else if (el.type === 'photo') {
      dom.propImageShapeWrap.classList.remove('hidden');
      const shape = el.cropShape || 'rounded';
      dom.btnShapeRounded.classList.toggle('active', shape === 'rounded');
      dom.btnShapeCircle.classList.toggle('active', shape === 'circle');
      dom.btnShapeSquare.classList.toggle('active', shape === 'square');
    } else if (el.type === 'logo') {
      const col = el.styles?.color || '#06b6d4';
      dom.propColorPicker.value = col.startsWith('#') ? col : '#06b6d4';
      dom.propColorPreview.style.backgroundColor = col;
      dom.propImageShapeWrap.classList.add('hidden');
    } else if (el.type === 'shape' || el.type === 'divider') {
      const col = el.styles?.background || '#ffffff';
      dom.propColorPicker.value = col.startsWith('#') ? col : '#ffffff';
      dom.propColorPreview.style.backgroundColor = col;
      dom.propImageShapeWrap.classList.add('hidden');
    } else {
      dom.propImageShapeWrap.classList.add('hidden');
    }

    const op = Math.round((parseFloat(el.styles?.opacity || '1')) * 100);
    dom.propOpacitySlider.value = op;
    dom.propOpacityLabel.textContent = `${op}%`;
  }

  // Dynamic On-Demand Google Font Loader (Eliminates Initial Mobile Blocking Lag)
  const loadedFonts = new Set([
    'Plus Jakarta Sans', 'Inter', 'Outfit', 'Space Grotesk', 'Fira Code', 'Cinzel', 'Oswald'
  ]);

  function ensureFontLoaded(fontFamily) {
    if (!fontFamily) return;
    const cleanName = fontFamily.replace(/['"]/g, '').split(',')[0].trim();
    if (!cleanName || loadedFonts.has(cleanName)) return;
    loadedFonts.add(cleanName);

    const formatted = cleanName.replace(/\s+/g, '+');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${formatted}:wght@400;600;700;800&display=swap`;
    document.head.appendChild(link);
  }

  // Font Family
  dom.propFontFamily.addEventListener('change', (e) => {
    const el = getSelectedElement();
    if (!el || (el.type !== 'text' && el.type !== 'badge')) return;
    ensureFontLoaded(e.target.value);
    el.styles.fontFamily = e.target.value;
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.fontFamily = el.styles.fontFamily;
    pushHistoryState();
  });

  // Font Size Stepper
  dom.btnFontDecr.addEventListener('click', () => changeFontSize(-1));
  dom.btnFontIncr.addEventListener('click', () => changeFontSize(1));
  dom.propFontSize.addEventListener('change', (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) setFontSize(newSize);
  });

  function changeFontSize(delta) {
    const cur = parseInt(dom.propFontSize.value, 10) || 16;
    setFontSize(Math.max(8, Math.min(80, cur + delta)));
  }

  function setFontSize(size) {
    dom.propFontSize.value = size;
    const el = getSelectedElement();
    if (!el || (el.type !== 'text' && el.type !== 'badge')) return;
    el.styles.fontSize = `${size}px`;
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.fontSize = el.styles.fontSize;
    pushHistoryState();
  }

  // Color Picker
  dom.propColorPicker.addEventListener('input', (e) => {
    const val = e.target.value;
    dom.propColorPreview.style.backgroundColor = val;
    const el = getSelectedElement();
    if (!el) return;
    
    if (el.type === 'shape' || el.type === 'divider') {
      el.styles.background = val;
    } else {
      el.styles.color = val;
    }
    
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) {
      if (el.type === 'shape' || el.type === 'divider') {
        domEl.style.background = val;
      } else {
        domEl.style.color = val;
      }
    }
  });

  dom.propColorPicker.addEventListener('change', () => pushHistoryState());

  // Bold / Italic / Uppercase
  dom.btnBold.addEventListener('click', () => {
    const el = getSelectedElement();
    if (!el || el.type !== 'text') return;
    const isBold = el.styles.fontWeight === '800' || el.styles.fontWeight === '700';
    el.styles.fontWeight = isBold ? '400' : '800';
    dom.btnBold.classList.toggle('active', !isBold);
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.fontWeight = el.styles.fontWeight;
    pushHistoryState();
  });

  dom.btnItalic.addEventListener('click', () => {
    const el = getSelectedElement();
    if (!el || el.type !== 'text') return;
    const isItalic = el.styles.fontStyle === 'italic';
    el.styles.fontStyle = isItalic ? 'normal' : 'italic';
    dom.btnItalic.classList.toggle('active', !isItalic);
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.fontStyle = el.styles.fontStyle;
    pushHistoryState();
  });

  dom.btnUppercase.addEventListener('click', () => {
    const el = getSelectedElement();
    if (!el || el.type !== 'text') return;
    const isUpper = el.styles.textTransform === 'uppercase';
    el.styles.textTransform = isUpper ? 'none' : 'uppercase';
    dom.btnUppercase.classList.toggle('active', !isUpper);
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.textTransform = el.styles.textTransform;
    pushHistoryState();
  });

  // Alignments
  dom.btnAlignLeft.addEventListener('click', () => setAlignment('left'));
  dom.btnAlignCenter.addEventListener('click', () => setAlignment('center'));
  dom.btnAlignRight.addEventListener('click', () => setAlignment('right'));

  function setAlignment(align) {
    const el = getSelectedElement();
    if (!el || el.type !== 'text') return;
    el.styles.textAlign = align;
    dom.btnAlignLeft.classList.toggle('active', align === 'left');
    dom.btnAlignCenter.classList.toggle('active', align === 'center');
    dom.btnAlignRight.classList.toggle('active', align === 'right');
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.textAlign = align;
    pushHistoryState();
  }

  // Image Shape Frame Cropping
  document.querySelectorAll('[data-img-shape]').forEach(btn => {
    btn.addEventListener('click', () => {
      const el = getSelectedElement();
      if (!el || el.type !== 'photo') return;
      const shape = btn.dataset.imgShape;
      el.cropShape = shape;

      document.querySelectorAll('[data-img-shape]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const domEl = document.getElementById(`node-${el.id}`);
      if (domEl) applyImageCrop(domEl, shape);
      pushHistoryState();
      showToast(`Frame changed to ${shape}`, 'info');
    });
  });

  // Opacity Slider
  dom.propOpacitySlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    dom.propOpacityLabel.textContent = `${val}%`;
    const el = getSelectedElement();
    if (!el) return;
    el.styles.opacity = (val / 100).toString();
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.opacity = el.styles.opacity;
  });

  dom.propOpacitySlider.addEventListener('change', () => pushHistoryState());

  // Layer Ordering
  dom.btnBringForward.addEventListener('click', () => {
    const el = getSelectedElement();
    if (!el) return;
    const curZ = parseInt(el.styles?.zIndex || '5', 10);
    el.styles.zIndex = curZ + 1;
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.zIndex = el.styles.zIndex;
    pushHistoryState();
    showToast('Moved element forward', 'info');
  });

  dom.btnSendBackward.addEventListener('click', () => {
    const el = getSelectedElement();
    if (!el) return;
    const curZ = parseInt(el.styles?.zIndex || '5', 10);
    el.styles.zIndex = Math.max(1, curZ - 1);
    const domEl = document.getElementById(`node-${el.id}`);
    if (domEl) domEl.style.zIndex = el.styles.zIndex;
    pushHistoryState();
    showToast('Moved element backward', 'info');
  });

  // Duplicate & Delete
  dom.btnDuplicateElement.addEventListener('click', duplicateSelectedElement);
  dom.btnDeleteElement.addEventListener('click', deleteSelectedElement);

  function duplicateSelectedElement() {
    const el = getSelectedElement();
    if (!el) return;

    const newEl = JSON.parse(JSON.stringify(el));
    newEl.id = `el-dup-${Date.now()}`;
    newEl.x += 16;
    newEl.y += 16;
    newEl.name = `${el.name} (Copy)`;

    state.elements[state.currentPage].push(newEl);
    renderCanvas();
    selectElement(newEl.id);
    pushHistoryState();
    showToast('Element duplicated', 'success');
  }

  function deleteSelectedElement() {
    if (!state.selectedId) return;
    const list = state.elements[state.currentPage] || [];
    state.elements[state.currentPage] = list.filter(e => e.id !== state.selectedId);
    deselectAll();
    renderCanvas();
    pushHistoryState();
    showToast('Element removed', 'info');
  }

  // -------------------------------------------------------------------------
  // 9. Keyboard Shortcuts
  // -------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable || e.target.getAttribute('contenteditable') === 'true') {
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) redo();
      else undo();
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      redo();
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      duplicateSelectedElement();
      return;
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (state.selectedId) {
        e.preventDefault();
        deleteSelectedElement();
      }
      return;
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const el = getSelectedElement();
      if (!el) return;
      e.preventDefault();
      const step = e.shiftKey ? 10 : 1;
      if (e.key === 'ArrowUp') el.y -= step;
      if (e.key === 'ArrowDown') el.y += step;
      if (e.key === 'ArrowLeft') el.x -= step;
      if (e.key === 'ArrowRight') el.x += step;

      const domEl = document.getElementById(`node-${el.id}`);
      if (domEl) {
        domEl.style.left = `${el.x}px`;
        domEl.style.top = `${el.y}px`;
      }
      updateSelectionBox();
      pushHistoryState();
      return;
    }

    if (e.key === 'Escape') {
      deselectAll();
    }
  });

  // -------------------------------------------------------------------------
  // 10. Sidebar Drawers Navigation & Adding Elements
  // -------------------------------------------------------------------------
  function openMobileDrawer() {
    if (dom.sidebarDrawer) dom.sidebarDrawer.classList.add('mobile-open');
    if (dom.drawerBackdrop) dom.drawerBackdrop.classList.remove('hidden');
  }

  function closeMobileDrawer() {
    if (dom.sidebarDrawer) dom.sidebarDrawer.classList.remove('mobile-open');
    if (dom.drawerBackdrop) dom.drawerBackdrop.classList.add('hidden');
  }

  if (dom.btnCloseDrawer) dom.btnCloseDrawer.addEventListener('click', closeMobileDrawer);
  if (dom.drawerBackdrop) dom.drawerBackdrop.addEventListener('click', closeMobileDrawer);

  dom.sidebarTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dom.sidebarTabs.forEach(t => t.classList.remove('active'));
      dom.drawerPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const drawerId = tab.dataset.drawer;
      const targetPanel = document.getElementById(drawerId);
      if (targetPanel) targetPanel.classList.add('active');

      if (window.innerWidth <= 900) {
        openMobileDrawer();
      }
    });
  });

  // Adding Text Boxes
  document.getElementById('btnAddHeading').addEventListener('click', () => {
    addTextElement('NEW EMPLOYEE NAME', 19, '800', '#ffffff');
  });

  document.getElementById('btnAddSubtitle').addEventListener('click', () => {
    addTextElement('Senior Vice President', 12, '600', '#06b6d4');
  });

  document.getElementById('btnAddBodyText').addEventListener('click', () => {
    addTextElement('Operations & Logistics', 10, '400', '#94a3b8');
  });

  document.getElementById('btnAddMonoCode').addEventListener('click', () => {
    addTextElement('NX-99410', 12, '700', '#f59e0b', "'Fira Code', monospace");
  });

  function addTextElement(text, size, weight, color, font = "'Plus Jakarta Sans', sans-serif") {
    const newEl = {
      id: `el-text-${Date.now()}`,
      type: 'text',
      name: 'Custom Text',
      x: 30, y: 160, w: 280, h: 28,
      content: text,
      styles: {
        fontFamily: font,
        fontSize: `${size}px`,
        fontWeight: weight,
        color: color,
        textAlign: 'center',
        zIndex: 10
      }
    };
    state.elements[state.currentPage].push(newEl);
    renderCanvas();
    selectElement(newEl.id);
    pushHistoryState();
    if (window.innerWidth <= 900) closeMobileDrawer();
    showToast('Text block added to badge', 'success');
  }

  // Pre-styled badge chips
  document.querySelectorAll('[data-badge-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.dataset.badgePreset;
      const color = btn.classList.contains('emerald') ? 'emerald' :
                    btn.classList.contains('cyan') ? 'cyan' :
                    btn.classList.contains('gold') ? 'gold' :
                    btn.classList.contains('crimson') ? 'crimson' : 'purple';

      const newEl = {
        id: `el-badge-${Date.now()}`,
        type: 'badge',
        name: `${label} Badge`,
        x: 100, y: 180, w: 120, h: 26,
        content: label,
        badgeColor: color,
        styles: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '9px',
          fontWeight: '800',
          letterSpacing: '0.06em',
          zIndex: 8
        }
      };
      state.elements[state.currentPage].push(newEl);
      renderCanvas();
      selectElement(newEl.id);
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast(`Added ${label} badge`, 'success');
    });
  });

  // Adding Security Elements & Hardware
  document.querySelectorAll('[data-add-element]').forEach(item => {
    item.addEventListener('click', () => {
      const type = item.dataset.addElement;
      let newEl = null;

      if (type === 'chip-gold') {
        newEl = { id: `el-chip-${Date.now()}`, type: 'chip', name: 'Gold EMV Chip', x: 20, y: 80, w: 44, h: 34, chipFinish: 'gold', styles: { zIndex: 7 } };
      } else if (type === 'chip-silver') {
        newEl = { id: `el-chip-${Date.now()}`, type: 'chip', name: 'Silver EMV Chip', x: 20, y: 80, w: 44, h: 34, chipFinish: 'silver', styles: { zIndex: 7 } };
      } else if (type === 'holo-seal') {
        newEl = { id: `el-seal-${Date.now()}`, type: 'seal', name: 'Hologram Seal', x: 260, y: 200, w: 48, h: 48, styles: { zIndex: 7 } };
      } else if (type === 'lanyard-slot') {
        newEl = { id: `el-slot-${Date.now()}`, type: 'punch', name: 'Lanyard Slot', x: 148, y: 8, w: 44, h: 8, styles: { zIndex: 10 } };
      } else if (type === 'magstripe') {
        newEl = { id: `el-mag-${Date.now()}`, type: 'magstripe', name: 'Magnetic Stripe', x: 0, y: 24, w: 340, h: 48, styles: { zIndex: 5 } };
      }

      if (newEl) {
        state.elements[state.currentPage].push(newEl);
        renderCanvas();
        selectElement(newEl.id);
        pushHistoryState();
        if (window.innerWidth <= 900) closeMobileDrawer();
        showToast(`Added ${newEl.name}`, 'success');
      }
    });
  });

  // Adding Corporate Logos
  document.querySelectorAll('[data-add-logo]').forEach(item => {
    item.addEventListener('click', () => {
      const logoType = item.dataset.addLogo;
      const newEl = {
        id: `el-logo-${Date.now()}`,
        type: 'logo',
        name: 'Brand Logo',
        x: 20, y: 24, w: 34, h: 34,
        content: logoType,
        styles: { color: '#06b6d4', zIndex: 6 }
      };
      state.elements[state.currentPage].push(newEl);
      renderCanvas();
      selectElement(newEl.id);
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast('Brand logo placed', 'success');
    });
  });

  // Adding Geometric Shapes
  document.querySelectorAll('[data-add-shape]').forEach(item => {
    item.addEventListener('click', () => {
      const s = item.dataset.addShape;
      let newEl = null;

      if (s === 'rect') {
        newEl = { id: `el-rect-${Date.now()}`, type: 'shape', name: 'Rectangle Box', x: 40, y: 200, w: 140, h: 70, styles: { background: 'rgba(255, 255, 255, 0.08)', borderRadius: '8px', zIndex: 4 } };
      } else if (s === 'pill') {
        newEl = { id: `el-pill-${Date.now()}`, type: 'shape', name: 'Pill Container', x: 40, y: 200, w: 120, h: 26, styles: { background: 'rgba(16, 185, 129, 0.15)', borderRadius: '20px', border: '1px solid #10b981', zIndex: 4 } };
      } else if (s === 'divider') {
        newEl = { id: `el-div-${Date.now()}`, type: 'divider', name: 'Divider Line', x: 20, y: 250, w: 300, h: 1, styles: { background: 'rgba(255, 255, 255, 0.2)', zIndex: 4 } };
      }

      if (newEl) {
        state.elements[state.currentPage].push(newEl);
        renderCanvas();
        selectElement(newEl.id);
        pushHistoryState();
        if (window.innerWidth <= 900) closeMobileDrawer();
      }
    });
  });

  // Photos Gallery
  document.querySelectorAll('.stock-photo-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.photoUrl;
      const el = getSelectedElement();
      if (el && el.type === 'photo') {
        el.photoUrl = url;
        const domImg = document.querySelector(`#node-${el.id} img`);
        if (domImg) domImg.src = url;
        pushHistoryState();
        if (window.innerWidth <= 900) closeMobileDrawer();
        showToast('Photo replaced', 'success');
      } else {
        const newEl = {
          id: `el-photo-${Date.now()}`,
          type: 'photo',
          name: 'Employee Portrait',
          x: 95, y: 80, w: 150, h: 175,
          photoUrl: url,
          cropShape: 'rounded',
          styles: { borderRadius: '14px', zIndex: 5 }
        };
        state.elements[state.currentPage].push(newEl);
        renderCanvas();
        selectElement(newEl.id);
        pushHistoryState();
        if (window.innerWidth <= 900) closeMobileDrawer();
        showToast('Photo inserted', 'success');
      }
    });
  });

  // Codes & QR
  dom.btnAddBarcodeToCanvas.addEventListener('click', () => {
    const val = dom.barcodeValueInput.value.trim() || 'NX-84920';
    const el = getSelectedElement();
    if (el && el.type === 'barcode') {
      el.barcodeValue = val;
      renderBarcodeItem(el);
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast('Barcode updated', 'success');
    } else {
      const newEl = {
        id: `el-barcode-${Date.now()}`,
        type: 'barcode',
        name: 'Industrial Barcode',
        x: 20, y: 350, w: 300, h: 64,
        barcodeValue: val,
        styles: { zIndex: 5 }
      };
      state.elements[state.currentPage].push(newEl);
      renderCanvas();
      selectElement(newEl.id);
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast('Barcode inserted', 'success');
    }
  });

  dom.btnAddQrToCanvas.addEventListener('click', () => {
    const val = dom.qrValueInput.value.trim() || 'https://verify.corp.com';
    const el = getSelectedElement();
    if (el && el.type === 'qr') {
      el.qrValue = val;
      renderQRItem(el);
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast('QR Code updated', 'success');
    } else {
      const newEl = {
        id: `el-qr-${Date.now()}`,
        type: 'qr',
        name: 'vCard QR Code',
        x: 24, y: 200, w: 84, h: 84,
        qrValue: val,
        styles: { zIndex: 5 }
      };
      state.elements[state.currentPage].push(newEl);
      renderCanvas();
      selectElement(newEl.id);
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast('QR Code inserted', 'success');
    }
  });

  // Background Custom Colors & Gradients
  dom.customBgColorPicker.addEventListener('input', (e) => {
    const val = e.target.value;
    dom.customBgHexInput.value = val;
    state.backgrounds[state.currentPage] = val;
    dom.cardArtboard.style.background = val;
  });

  dom.customBgColorPicker.addEventListener('change', () => pushHistoryState());

  dom.customBgHexInput.addEventListener('change', (e) => {
    const val = e.target.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      dom.customBgColorPicker.value = val;
      state.backgrounds[state.currentPage] = val;
      dom.cardArtboard.style.background = val;
      pushHistoryState();
    }
  });

  document.querySelectorAll('.bg-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.bgColor;
      state.backgrounds[state.currentPage] = color;
      dom.customBgColorPicker.value = color.startsWith('#') ? color : '#0f172a';
      dom.customBgHexInput.value = color;
      dom.cardArtboard.style.background = color;
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast('Background updated', 'info');
    });
  });

  document.querySelectorAll('.bg-grad-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const grad = btn.dataset.bgGradient;
      state.backgrounds[state.currentPage] = grad;
      dom.cardArtboard.style.background = grad;
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast('Gradient applied', 'info');
    });
  });

  // Background Security Patterns
  document.querySelectorAll('.btn-pattern-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-pattern-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pattern = btn.dataset.pattern;
      state.activePattern = pattern;
      dom.artboardPatternLayer.className = `artboard-pattern-layer pattern-${pattern}`;
      pushHistoryState();
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast(`Security pattern: ${pattern}`, 'info');
    });
  });

  // Upload Zone
  dom.dropZoneUpload.addEventListener('click', () => dom.generalFileInput.click());
  dom.generalFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleUploadFile(file);
  });

  dom.dropZoneUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    dom.dropZoneUpload.classList.add('dragover');
  });

  dom.dropZoneUpload.addEventListener('dragleave', () => {
    dom.dropZoneUpload.classList.remove('dragover');
  });

  dom.dropZoneUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    dom.dropZoneUpload.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  });

  function handleUploadFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      
      const card = document.createElement('div');
      card.className = 'upload-thumb-card';
      card.innerHTML = `<img src="${dataUrl}" alt="Upload">`;
      card.addEventListener('click', () => insertUploadedPhoto(dataUrl));
      dom.uploadsHistoryGrid.appendChild(card);

      insertUploadedPhoto(dataUrl);
      showToast('Uploaded asset placed on badge', 'success');
    };
    reader.readAsDataURL(file);
  }

  function insertUploadedPhoto(dataUrl) {
    const el = getSelectedElement();
    if (el && el.type === 'photo') {
      el.photoUrl = dataUrl;
      const domImg = document.querySelector(`#node-${el.id} img`);
      if (domImg) domImg.src = dataUrl;
      pushHistoryState();
    } else {
      const newEl = {
        id: `el-photo-${Date.now()}`,
        type: 'photo',
        name: 'Custom Photo',
        x: 95, y: 80, w: 150, h: 175,
        photoUrl: dataUrl,
        cropShape: 'rounded',
        styles: { borderRadius: '14px', zIndex: 5 }
      };
      state.elements[state.currentPage].push(newEl);
      renderCanvas();
      selectElement(newEl.id);
      pushHistoryState();
    }
  }

  // -------------------------------------------------------------------------
  // 11. 12+ Industry Templates Engine & Search Filter
  // -------------------------------------------------------------------------
  const templatesDatabase = {
    'tech-cto': {
      bgFront: 'radial-gradient(circle at 10% 10%, #1e293b 0%, #0a0f1d 75%)',
      bgBack: 'radial-gradient(circle at 10% 10%, #1e293b 0%, #0a0f1d 75%)',
      pattern: 'guilloche',
      compName: 'NEXUS DYNAMICS',
      compTag: 'Advanced Artificial Intelligence',
      empName: 'ALEXANDER VANCE',
      role: 'Chief Technology Officer',
      dept: 'ENGINEERING & AI SYSTEMS',
      idCode: 'NX-84920',
      badgeText: 'ALL ACCESS',
      badgeColor: 'emerald',
      font: "'Plus Jakarta Sans', sans-serif",
      accentColor: '#06b6d4',
      logo: 'hexagon'
    },
    'executive-gold': {
      bgFront: 'radial-gradient(circle at 50% 0%, #2a2824 0%, #121110 85%)',
      bgBack: 'radial-gradient(circle at 50% 0%, #2a2824 0%, #121110 85%)',
      pattern: 'guilloche',
      compName: 'SOVEREIGN HOLDINGS',
      compTag: 'Global Private Equity & Trust',
      empName: 'VICTORIA STERLING',
      role: 'Managing Director & Partner',
      dept: 'EXECUTIVE COMMITTEE',
      idCode: 'SH-00109',
      badgeText: 'EXECUTIVE VIP',
      badgeColor: 'gold',
      font: "'Cinzel', serif",
      accentColor: '#f59e0b',
      logo: 'shield'
    },
    'corporate-blue': {
      bgFront: 'linear-gradient(160deg, #1e3a8a 0%, #0f172a 65%)',
      bgBack: 'linear-gradient(160deg, #1e3a8a 0%, #0f172a 65%)',
      pattern: 'circuits',
      compName: 'ZURICH CAPITAL ASSETS',
      compTag: 'Quantitative Finance & Wealth',
      empName: 'JONATHAN ROTH',
      role: 'Head of Quantitative Strategy',
      dept: 'INVESTMENT MANAGEMENT',
      idCode: 'ZC-77314',
      badgeText: 'TRADING FLOOR',
      badgeColor: 'cyan',
      font: "'Outfit', sans-serif",
      accentColor: '#3b82f6',
      logo: 'orb'
    },
    'medical-bio': {
      bgFront: 'linear-gradient(180deg, #042f2e 0%, #0f172a 80%)',
      bgBack: 'linear-gradient(180deg, #042f2e 0%, #0f172a 80%)',
      pattern: 'dots',
      compName: 'APEX HEALTH SCIENCES',
      compTag: 'Genomic Oncology & Clinical Research',
      empName: 'DR. SARAH JENKINS, MD',
      role: 'Chief Medical Officer',
      dept: 'SURGICAL ONCOLOGY WING',
      idCode: 'AH-99201',
      badgeText: 'LEVEL 5 SURGERY',
      badgeColor: 'emerald',
      font: "'Plus Jakarta Sans', sans-serif",
      accentColor: '#14b8a6',
      logo: 'pulse'
    },
    'university-pass': {
      bgFront: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)',
      bgBack: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)',
      pattern: 'guilloche',
      compName: 'CAMBRIDGE HORIZON INSTITUTE',
      compTag: 'Faculty of Advanced Robotics',
      empName: 'PROF. EDWARD THORNE',
      role: 'Dean of Computer Sciences',
      dept: 'FACULTY & LAB DIRECTORS',
      idCode: 'CHI-4402',
      badgeText: 'FACULTY ACCESS',
      badgeColor: 'gold',
      font: "'Playfair Display', serif",
      accentColor: '#fbbf24',
      logo: 'shield'
    },
    'cyber-defense': {
      bgFront: 'linear-gradient(135deg, #171717 0%, #262626 100%)',
      bgBack: 'linear-gradient(135deg, #171717 0%, #262626 100%)',
      pattern: 'circuits',
      compName: 'AEGIS CYBER OPERATIONS',
      compTag: 'Threat Intelligence & Response',
      empName: 'KAI VALENTINE',
      role: 'Lead Penetration Tester',
      dept: 'RED TEAM WAR ROOM',
      idCode: 'AG-0994',
      badgeText: 'RESTRICTED TS/SCI',
      badgeColor: 'crimson',
      font: "'JetBrains Mono', monospace",
      accentColor: '#f59e0b',
      logo: 'shield'
    },
    'creative-prism': {
      bgFront: 'linear-gradient(135deg, #4c0519 0%, #1e1b4b 60%, #022c22 100%)',
      bgBack: 'linear-gradient(135deg, #4c0519 0%, #1e1b4b 60%, #022c22 100%)',
      pattern: 'none',
      compName: 'PRISM MEDIA ATELIER',
      compTag: 'Motion Graphics & Brand Architecture',
      empName: 'MARCUS CHEN',
      role: 'Executive Creative Director',
      dept: 'PRODUCT DESIGN LABS',
      idCode: 'PM-8820',
      badgeText: 'ALL ACCESS',
      badgeColor: 'cyan',
      font: "'Montserrat', sans-serif",
      accentColor: '#f43f5e',
      logo: 'cube'
    },
    'aviation-crew': {
      bgFront: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)',
      bgBack: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)',
      pattern: 'stripes',
      compName: 'AEROGLOBAL AIRWAYS',
      compTag: 'International Flight Operations',
      empName: 'CAPTAIN GABRIEL STONE',
      role: 'Senior Fleet Commander (B787)',
      dept: 'FLIGHT CREW OPERATIONS',
      idCode: 'AG-FL902',
      badgeText: 'COCKPIT ALL ACCESS',
      badgeColor: 'gold',
      font: "'Poppins', sans-serif",
      accentColor: '#38bdf8',
      logo: 'orb'
    },
    'industrial-eng': {
      bgFront: 'linear-gradient(135deg, #27272a 0%, #18181b 100%)',
      bgBack: 'linear-gradient(135deg, #27272a 0%, #18181b 100%)',
      pattern: 'stripes',
      compName: 'TITAN HEAVY INDUSTRIES',
      compTag: 'Advanced Materials & Fabrication',
      empName: 'MATEO RAMIREZ',
      role: 'Chief Structural Inspector',
      dept: 'HEAVY FABRICATION PLANT 3',
      idCode: 'THI-5510',
      badgeText: 'PLANT HARD-HAT',
      badgeColor: 'gold',
      font: "'Oswald', sans-serif",
      accentColor: '#eab308',
      logo: 'hexagon'
    },
    'hospitality-luxury': {
      bgFront: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
      bgBack: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
      pattern: 'guilloche',
      compName: 'GRAND PALACE LUXURY HOTELS',
      compTag: 'Presidential Suites & Concierge',
      empName: 'ANTOINE DELACOUR',
      role: 'Head Concierge & Les Clefs d’Or',
      dept: 'VIP GUEST SERVICES',
      idCode: 'GP-042',
      badgeText: 'PRESIDENTIAL WING',
      badgeColor: 'emerald',
      font: "'Cormorant Garamond', serif",
      accentColor: '#34d399',
      logo: 'shield'
    },
    'police-badge': {
      bgFront: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
      bgBack: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
      pattern: 'guilloche',
      compName: 'METRO PUBLIC SAFETY DEPT',
      compTag: 'Special Investigations Bureau',
      empName: 'DET. RAYMOND HOLT',
      role: 'Supervising Detective',
      dept: 'MAJOR CRIMES DIVISION',
      idCode: 'PD-8831',
      badgeText: 'SWORN OFFICER',
      badgeColor: 'cyan',
      font: "'Space Grotesk', sans-serif",
      accentColor: '#60a5fa',
      logo: 'shield'
    },
    'pure-minimal': {
      bgFront: '#ffffff',
      bgBack: '#ffffff',
      pattern: 'none',
      compName: 'NORDIC MONOLITH STUDIOS',
      compTag: 'Architectural & Industrial Design',
      empName: 'LARS HENRIKSSON',
      role: 'Principal Design Architect',
      dept: 'HELSINKI ATELIER',
      idCode: 'NMS-001',
      badgeText: 'STUDIO PASS',
      badgeColor: 'slate',
      font: "'Inter', sans-serif",
      accentColor: '#000000',
      logo: 'cube'
    },
    'quantum-labs': {
      bgFront: 'radial-gradient(circle at 10% 20%, #2e1065 0%, #030712 80%)',
      bgBack: 'radial-gradient(circle at 10% 20%, #2e1065 0%, #030712 80%)',
      pattern: 'matrix',
      compName: 'QUANTUM COMPUTING LABS',
      compTag: 'Cryogenic Superconducting Qubits',
      empName: 'DR. ELENA ROSTOVA',
      role: 'Lead Quantum Physicist',
      dept: 'QUANTUM CRYOGENICS DIVISION',
      idCode: 'QC-90184',
      badgeText: 'CRYOLAB CLEAR',
      badgeColor: 'emerald',
      font: "'Space Grotesk', sans-serif",
      accentColor: '#10b981',
      logo: 'orb'
    },
    'racing-crew': {
      bgFront: 'linear-gradient(145deg, #1c1917 0%, #0c0a09 100%)',
      bgBack: 'linear-gradient(145deg, #1c1917 0%, #0c0a09 100%)',
      pattern: 'hexmesh',
      compName: 'APEX SCUDERIA RACING',
      compTag: 'Formula World Championship',
      empName: 'MARCO VALENTINO',
      role: 'Chief Telemetry Engineer',
      dept: 'PIT LANE & RACE STRATEGY',
      idCode: 'F1-7703',
      badgeText: 'PIT LANE HOT',
      badgeColor: 'crimson',
      font: "'Oswald', sans-serif",
      accentColor: '#ef4444',
      logo: 'pulse'
    },
    'space-command': {
      bgFront: 'radial-gradient(ellipse at 50% 10%, #09132e 0%, #020617 80%)',
      bgBack: 'radial-gradient(ellipse at 50% 10%, #09132e 0%, #020617 80%)',
      pattern: 'dots',
      compName: 'STELLAR SPACE COMMAND',
      compTag: 'Deep Space Navigation & Orbital Defense',
      empName: 'CMDR. ASTRID LINDHOLM',
      role: 'Orbital Flight Director',
      dept: 'MISSION CONTROL CENTER',
      idCode: 'SSC-4091',
      badgeText: 'ORBITAL TOP SEC',
      badgeColor: 'cyan',
      font: "'Rajdhani', sans-serif",
      accentColor: '#38bdf8',
      logo: 'shield'
    },
    'biogen-pharma': {
      bgFront: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)',
      bgBack: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)',
      pattern: 'guilloche',
      compName: 'BIOGEN PHARMACEUTICALS',
      compTag: 'Cellular Therapeutics & Genetics',
      empName: 'DR. CHEN WEI',
      role: 'Principal Geneticist',
      dept: 'CRISPR TARGETING LAB',
      idCode: 'BIO-2819',
      badgeText: 'BSL-4 CERTIFIED',
      badgeColor: 'cyan',
      font: "'Inter', sans-serif",
      accentColor: '#0284c7',
      logo: 'pulse'
    },
    'humanitarian-ngo': {
      bgFront: '#ffffff',
      bgBack: '#f8fafc',
      pattern: 'microgrid',
      compName: 'INTERNATIONAL AID CORPS',
      compTag: 'Global Relief & Refugee Mission',
      empName: 'AMINA DIALLO',
      role: 'Field Operations Director',
      dept: 'SUB-SAHARAN DISASTER RELIEF',
      idCode: 'UN-NGO-601',
      badgeText: 'DIPLOMATIC IMMUNITY',
      badgeColor: 'crimson',
      font: "'Outfit', sans-serif",
      accentColor: '#dc2626',
      logo: 'shield'
    },
    'maritime-marine': {
      bgFront: 'linear-gradient(160deg, #0c4a6e 0%, #082f49 100%)',
      bgBack: 'linear-gradient(160deg, #0c4a6e 0%, #082f49 100%)',
      pattern: 'waves',
      compName: 'PACIFIC HORIZON SHIPPING',
      compTag: 'Intercontinental Container Fleet',
      empName: 'CAPT. THOMAS STERLING',
      role: 'Master Mariner & Fleet Captain',
      dept: 'VESSEL OPERATIONS BRIDGE',
      idCode: 'MAR-8802',
      badgeText: 'MASTER MARINER',
      badgeColor: 'gold',
      font: "'Montserrat', sans-serif",
      accentColor: '#e0a96d',
      logo: 'shield'
    },
    'clean-energy': {
      bgFront: 'linear-gradient(145deg, #064e3b 0%, #022c22 100%)',
      bgBack: 'linear-gradient(145deg, #064e3b 0%, #022c22 100%)',
      pattern: 'circuits',
      compName: 'HELIOS CLEAN ENERGY',
      compTag: 'Solar Arrays & Grid Storage',
      empName: 'SOFIA ALVAREZ',
      role: 'High-Voltage Grid Architect',
      dept: 'RENEWABLE TRANSMISSION',
      idCode: 'HCE-3319',
      badgeText: 'HIGH VOLTAGE PASS',
      badgeColor: 'emerald',
      font: "'Plus Jakarta Sans', sans-serif",
      accentColor: '#10b981',
      logo: 'hexagon'
    },
    'cyberpunk-meta': {
      bgFront: 'linear-gradient(135deg, #3b0764 0%, #1e1b4b 60%, #09090b 100%)',
      bgBack: 'linear-gradient(135deg, #3b0764 0%, #1e1b4b 60%, #09090b 100%)',
      pattern: 'holonoise',
      compName: 'NEOTOKYO VIRTUAL SYSTEMS',
      compTag: 'Neural Metaverse Architecture',
      empName: 'KAI KENSHIN',
      role: 'Lead Cyberspace Architect',
      dept: 'SYNTHETIC REALMS DEV',
      idCode: 'NT-9099',
      badgeText: 'METAVERSE ROOT',
      badgeColor: 'purple',
      font: "'Orbitron', sans-serif",
      accentColor: '#f43f5e',
      logo: 'cube'
    },
    'diplomatic-corps': {
      bgFront: 'radial-gradient(ellipse at 50% 20%, #450a0a 0%, #1c0505 100%)',
      bgBack: 'radial-gradient(ellipse at 50% 20%, #450a0a 0%, #1c0505 100%)',
      pattern: 'guilloche',
      compName: 'PERMANENT DIPLOMATIC MISSION',
      compTag: 'Protocol Envoy & International Consular',
      empName: 'HON. ELIZABETH CARTWRIGHT',
      role: 'Ambassador Plenipotentiary',
      dept: 'CHANCERY & CONSULAR POST',
      idCode: 'DIP-0044',
      badgeText: 'VIENNA CONVENTION',
      badgeColor: 'gold',
      font: "'Cinzel', serif",
      accentColor: '#fbbf24',
      logo: 'shield'
    },
    'cloud-devops': {
      bgFront: 'linear-gradient(135deg, #312e81 0%, #0f172a 100%)',
      bgBack: 'linear-gradient(135deg, #312e81 0%, #0f172a 100%)',
      pattern: 'circuits',
      compName: 'HYPERSCALE CLOUD OPS',
      compTag: 'Kubernetes Infrastructure & SRE',
      empName: 'DMITRI VOLKOV',
      role: 'Staff Site Reliability Engineer',
      dept: 'GLOBAL CORE PLATFORMS',
      idCode: 'SRE-1002',
      badgeText: 'CLUSTER ROOT ACCESS',
      badgeColor: 'cyan',
      font: "'Fira Code', monospace",
      accentColor: '#38bdf8',
      logo: 'hexagon'
    },
    'press-broadcast': {
      bgFront: '#18181b',
      bgBack: '#18181b',
      pattern: 'stripes',
      compName: 'GLOBAL NEWS NETWORK (GNN)',
      compTag: 'Live Satellite Broadcast & Editorial',
      empName: 'LUCAS MORETTI',
      role: 'Senior War Correspondent',
      dept: 'INTERNATIONAL INVESTIGATIVE DESK',
      idCode: 'PRESS-554',
      badgeText: 'MEDIA PRESS PASS',
      badgeColor: 'crimson',
      font: "'Oswald', sans-serif",
      accentColor: '#ef4444',
      logo: 'pulse'
    },
    'venture-capital': {
      bgFront: 'radial-gradient(circle at 30% 10%, #1e1b4b 0%, #09090b 80%)',
      bgBack: 'radial-gradient(circle at 30% 10%, #1e1b4b 0%, #09090b 80%)',
      pattern: 'guilloche',
      compName: 'HORIZON VENTURE PARTNERS',
      compTag: 'Seed & Early-Stage AI Funds',
      empName: 'SERENA VANDERBILT',
      role: 'General Partner',
      dept: 'INVESTMENT STRATEGY & LPs',
      idCode: 'HVP-003',
      badgeText: 'GENERAL PARTNER',
      badgeColor: 'gold',
      font: "'Playfair Display', serif",
      accentColor: '#f59e0b',
      logo: 'orb'
    }
  };

  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      const tKey = card.dataset.template;
      applyIndustryTemplate(tKey);
    });
  });

  function applyIndustryTemplate(key) {
    const tmpl = templatesDatabase[key];
    if (!tmpl) return;

    state.backgrounds.front = tmpl.bgFront;
    state.backgrounds.back = tmpl.bgBack;
    state.activePattern = tmpl.pattern;
    dom.artboardPatternLayer.className = `artboard-pattern-layer pattern-${tmpl.pattern}`;

    // Ensure custom font is loaded
    ensureFontLoaded(tmpl.font);

    // Apply values to core elements
    updateTargetElement('el-comp-name', tmpl.compName, { fontFamily: tmpl.font, color: tmpl.bgFront === '#ffffff' ? '#000000' : '#ffffff' });
    updateTargetElement('el-comp-tag', tmpl.compTag, { fontFamily: tmpl.font, color: tmpl.bgFront === '#ffffff' ? '#4b5563' : '#94a3b8' });
    updateTargetElement('el-emp-name', tmpl.empName, { fontFamily: tmpl.font, color: tmpl.bgFront === '#ffffff' ? '#000000' : '#ffffff' });
    updateTargetElement('el-emp-role', tmpl.role, { fontFamily: tmpl.font, color: tmpl.accentColor });
    updateTargetElement('el-emp-dept', tmpl.dept, { fontFamily: tmpl.font, color: tmpl.bgFront === '#ffffff' ? '#111827' : '#cbd5e1' });
    updateTargetElement('el-id-val', tmpl.idCode, { color: tmpl.accentColor });
    updateTargetElement('el-back-title', tmpl.compName);

    // Update Clearance Badge
    const badgeEl = state.elements.front.find(e => e.id === 'el-badge-clearance');
    if (badgeEl) {
      badgeEl.content = tmpl.badgeText;
      badgeEl.badgeColor = tmpl.badgeColor;
    }

    // Update Logo
    const logoEl = state.elements.front.find(e => e.id === 'el-logo');
    if (logoEl) {
      logoEl.content = tmpl.logo;
      logoEl.styles.color = tmpl.accentColor;
    }

    // Sync Company Quick-Brander Inputs
    if (dom.companyBrandNameInput) dom.companyBrandNameInput.value = tmpl.compName;
    if (dom.companyTaglineInput) dom.companyTaglineInput.value = tmpl.compTag;
    if (dom.companyEmpNameInput) dom.companyEmpNameInput.value = tmpl.empName;
    if (dom.companyEmpRoleInput) dom.companyEmpRoleInput.value = tmpl.role;
    if (dom.companyEmpDeptInput) dom.companyEmpDeptInput.value = tmpl.dept;
    if (dom.companyEmpIdInput) dom.companyEmpIdInput.value = tmpl.idCode;
    if (dom.companyPrimaryColorPicker && tmpl.accentColor.startsWith('#')) {
      dom.companyPrimaryColorPicker.value = tmpl.accentColor;
    }
    if (dom.companyPrimaryColorHex) dom.companyPrimaryColorHex.value = tmpl.accentColor;
    if (dom.companyClearanceInput) dom.companyClearanceInput.value = tmpl.badgeText;

    // Project Name
    state.projectName = tmpl.compName.replace(/[^a-zA-Z0-9_-]/g, '_') + '_Badge';
    dom.projectTitleInput.value = state.projectName;

    renderCanvas();
    pushHistoryState();
    if (window.innerWidth <= 900) closeMobileDrawer();
    showToast(`Loaded "${tmpl.compName}" template`, 'success');
  }

  function updateTargetElement(id, content, styles = {}) {
    ['front', 'back'].forEach(p => {
      const el = state.elements[p].find(e => e.id === id);
      if (el) {
        if (content !== undefined) el.content = content;
        if (styles) Object.assign(el.styles, styles);
      }
    });
  }

  // Template Search Filter
  dom.templateFilterInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.template-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? 'flex' : 'none';
    });
  });

  // -------------------------------------------------------------------------
  // 12. Corporate Web Presets & Website URL Extractor
  // -------------------------------------------------------------------------
  const webPresetsDatabase = {
    'google-cloud': {
      compName: 'GOOGLE CLOUD',
      compTag: 'Alphabet Global Cloud Infrastructure',
      empName: 'SUNDAR PICHAI',
      role: 'Staff Cloud Infrastructure Architect',
      dept: 'DISTRIBUTED HYPERSCALE SYSTEMS',
      idCode: 'GOOG-88410',
      badgeText: 'FULL ACCESS',
      badgeColor: 'cyan',
      font: "'Plus Jakarta Sans', sans-serif",
      accentColor: '#4285f4',
      bgFront: '#ffffff',
      bgBack: '#f8fafc',
      pattern: 'microgrid',
      logo: 'orb'
    },
    'apple-silicon': {
      compName: 'APPLE INC.',
      compTag: '1 Apple Park Way, Cupertino CA',
      empName: 'CRAIG FEDERIGHI',
      role: 'VP Hardware Technologies',
      dept: 'APPLE SILICON RESEARCH LABS',
      idCode: 'AAPL-00108',
      badgeText: 'CAMPUS SECURE',
      badgeColor: 'slate',
      font: "'Inter', sans-serif",
      accentColor: '#e2e8f0',
      bgFront: 'linear-gradient(145deg, #262626 0%, #171717 100%)',
      bgBack: 'linear-gradient(145deg, #262626 0%, #171717 100%)',
      pattern: 'none',
      logo: 'cube'
    },
    'microsoft-corp': {
      compName: 'MICROSOFT CORPORATION',
      compTag: 'One Microsoft Way, Redmond WA',
      empName: 'SATYA NADELLA',
      role: 'Principal Cloud & AI Architect',
      dept: 'AZURE GLOBAL INFRASTRUCTURE',
      idCode: 'MSFT-50119',
      badgeText: 'REDMOND ALL BLDG',
      badgeColor: 'cyan',
      font: "'Inter', sans-serif",
      accentColor: '#00a4ef',
      bgFront: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
      bgBack: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
      pattern: 'microgrid',
      logo: 'hexagon'
    },
    'tesla-gigafactory': {
      compName: 'TESLA MOTORS',
      compTag: 'Gigafactory Texas • Autopilot & Powertrain',
      empName: 'FRANZ VON HOLZHAUSEN',
      role: 'Chief Vehicle Design Engineer',
      dept: 'AUTONOMOUS POWERTRAIN',
      idCode: 'TSLA-42069',
      badgeText: 'GIGAFACTORY ALL',
      badgeColor: 'crimson',
      font: "'Space Grotesk', sans-serif",
      accentColor: '#e82127',
      bgFront: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
      bgBack: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
      pattern: 'hexmesh',
      logo: 'pulse'
    },
    'spacex-starbase': {
      compName: 'SPACEX STARBASE',
      compTag: 'Starship Orbital Propulsion & Avionics',
      empName: 'GWYNNE SHOTWELL',
      role: 'Chief Starship Avionics Engineer',
      dept: 'LAUNCH OPERATIONS TOWER',
      idCode: 'SPX-0042',
      badgeText: 'ORBITAL PAD CLEAR',
      badgeColor: 'cyan',
      font: "'Rajdhani', sans-serif",
      accentColor: '#06b6d4',
      bgFront: 'radial-gradient(circle at 50% 20%, #0f172a 0%, #020617 100%)',
      bgBack: 'radial-gradient(circle at 50% 20%, #0f172a 0%, #020617 100%)',
      pattern: 'dots',
      logo: 'shield'
    },
    'amazon-aws': {
      compName: 'AMAZON WEB SERVICES',
      compTag: 'Global Cloud Infrastructure & Data Centers',
      empName: 'ANDY JASSY',
      role: 'Principal Solutions Architect',
      dept: 'AWS SECURITY ASSURANCE',
      idCode: 'AMZN-99104',
      badgeText: 'AWS DATA CENTER',
      badgeColor: 'gold',
      font: "'Plus Jakarta Sans', sans-serif",
      accentColor: '#ff9900',
      bgFront: 'linear-gradient(145deg, #232f3e 0%, #131921 100%)',
      bgBack: 'linear-gradient(145deg, #232f3e 0%, #131921 100%)',
      pattern: 'circuits',
      logo: 'hexagon'
    },
    'nvidia-ai': {
      compName: 'NVIDIA CORPORATION',
      compTag: 'Accelerated Computing & AI Research',
      empName: 'JENSEN HUANG',
      role: 'Chief Architect, Tensor Core GPU',
      dept: 'DGX SUPERCOMPUTING LABS',
      idCode: 'NVDA-1080',
      badgeText: 'BLACKWELL LAB ROOT',
      badgeColor: 'emerald',
      font: "'Orbitron', sans-serif",
      accentColor: '#76b900',
      bgFront: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
      bgBack: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
      pattern: 'matrix',
      logo: 'hexagon'
    },
    'meta-reality': {
      compName: 'META REALITY LABS',
      compTag: 'Spatial Computing & Holographic Displays',
      empName: 'MARK ZUCKERBERG',
      role: 'Lead XR Hardware Architect',
      dept: 'META HORIZON RESEARCH',
      idCode: 'META-7712',
      badgeText: 'REALITY LAB VIP',
      badgeColor: 'purple',
      font: "'Outfit', sans-serif",
      accentColor: '#0668e1',
      bgFront: 'linear-gradient(135deg, #1e1b4b 0%, #09090b 100%)',
      bgBack: 'linear-gradient(135deg, #1e1b4b 0%, #09090b 100%)',
      pattern: 'holonoise',
      logo: 'orb'
    },
    'harvard-med': {
      compName: 'HARVARD MEDICAL SCHOOL',
      compTag: 'Department of Neurobiology & Surgery',
      empName: 'DR. ELEANOR VASS, MD',
      role: 'Professor of Neurosurgery',
      dept: 'MASSACHUSETTS GENERAL',
      idCode: 'HMS-3011',
      badgeText: 'CLINICAL FELLOW',
      badgeColor: 'gold',
      font: "'Cinzel', serif",
      accentColor: '#d97706',
      bgFront: 'linear-gradient(145deg, #450a0a 0%, #1c0505 100%)',
      bgBack: 'linear-gradient(145deg, #450a0a 0%, #1c0505 100%)',
      pattern: 'guilloche',
      logo: 'shield'
    },
    'un-diplomat': {
      compName: 'UNITED NATIONS',
      compTag: 'Secretariat & Special Diplomatic Mission',
      empName: 'ANTONIO GUTERRES',
      role: 'Special Representative',
      dept: 'PEACEKEEPING OPERATIONS',
      idCode: 'UN-000109',
      badgeText: 'DIPLOMAT PASSPORT',
      badgeColor: 'cyan',
      font: "'Montserrat', sans-serif",
      accentColor: '#009edb',
      bgFront: 'linear-gradient(145deg, #075985 0%, #0c4a6e 100%)',
      bgBack: 'linear-gradient(145deg, #075985 0%, #0c4a6e 100%)',
      pattern: 'guilloche',
      logo: 'shield'
    }
  };

  document.querySelectorAll('.web-preset-card').forEach(card => {
    card.addEventListener('click', () => {
      const presetKey = card.dataset.webPreset;
      const preset = webPresetsDatabase[presetKey];
      if (!preset) return;

      state.backgrounds.front = preset.bgFront;
      state.backgrounds.back = preset.bgBack;
      state.activePattern = preset.pattern;
      dom.artboardPatternLayer.className = `artboard-pattern-layer pattern-${preset.pattern}`;

      const isLightBg = preset.bgFront === '#ffffff';
      updateTargetElement('el-comp-name', preset.compName, { fontFamily: preset.font, color: isLightBg ? '#000000' : '#ffffff' });
      updateTargetElement('el-comp-tag', preset.compTag, { fontFamily: preset.font, color: isLightBg ? '#4b5563' : '#94a3b8' });
      updateTargetElement('el-emp-name', preset.empName, { fontFamily: preset.font, color: isLightBg ? '#000000' : '#ffffff' });
      updateTargetElement('el-emp-role', preset.role, { fontFamily: preset.font, color: preset.accentColor });
      updateTargetElement('el-emp-dept', preset.dept, { fontFamily: preset.font, color: isLightBg ? '#111827' : '#cbd5e1' });
      updateTargetElement('el-id-val', preset.idCode, { color: preset.accentColor });
      updateTargetElement('el-back-title', preset.compName);

      const badgeEl = state.elements.front.find(e => e.id === 'el-badge-clearance');
      if (badgeEl) {
        badgeEl.content = preset.badgeText;
        badgeEl.badgeColor = preset.badgeColor;
      }

      const logoEl = state.elements.front.find(e => e.id === 'el-logo');
      if (logoEl) {
        logoEl.content = preset.logo;
        logoEl.styles.color = preset.accentColor;
      }

      // Sync form fields
      if (dom.companyBrandNameInput) dom.companyBrandNameInput.value = preset.compName;
      if (dom.companyTaglineInput) dom.companyTaglineInput.value = preset.compTag;
      if (dom.companyEmpNameInput) dom.companyEmpNameInput.value = preset.empName;
      if (dom.companyEmpRoleInput) dom.companyEmpRoleInput.value = preset.role;
      if (dom.companyEmpDeptInput) dom.companyEmpDeptInput.value = preset.dept;
      if (dom.companyEmpIdInput) dom.companyEmpIdInput.value = preset.idCode;
      if (dom.companyPrimaryColorPicker && preset.accentColor.startsWith('#')) {
        dom.companyPrimaryColorPicker.value = preset.accentColor;
      }
      if (dom.companyPrimaryColorHex) dom.companyPrimaryColorHex.value = preset.accentColor;
      if (dom.companyClearanceInput) dom.companyClearanceInput.value = preset.badgeText;

      state.projectName = preset.compName.replace(/[^a-zA-Z0-9_-]/g, '_') + '_Badge';
      dom.projectTitleInput.value = state.projectName;

      ensureFontLoaded(preset.font);
      renderCanvas();
      pushHistoryState();
      dom.importModal.classList.add('hidden');
      if (window.innerWidth <= 900) closeMobileDrawer();
      showToast(`Loaded ${preset.compName} Web Preset!`, 'success');
    });
  });

  // Website Brand Extractor
  dom.btnExtractWebsite.addEventListener('click', () => {
    extractAndApplyWebsiteBrand(dom.importWebsiteDomainInput.value);
  });

  dom.importWebsiteDomainInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      extractAndApplyWebsiteBrand(dom.importWebsiteDomainInput.value);
    }
  });

  function extractAndApplyWebsiteBrand(input) {
    if (!input || !input.trim()) {
      showToast('Please enter a website URL or company domain', 'info');
      return;
    }

    let domain = input.trim().toLowerCase();
    domain = domain.replace(/^https?:\/\//i, '');
    domain = domain.replace(/^www\./i, '');
    domain = domain.split('/')[0].split('?')[0];

    const brandPart = domain.split('.')[0] || 'COMPANY';
    const brandWords = brandPart.split(/[-_.]/).map(w => w.toUpperCase()).join(' ');
    const brandName = brandWords.length > 22 ? brandWords.slice(0, 22) : brandWords;

    let hash = 0;
    for (let i = 0; i < domain.length; i++) {
      hash = ((hash << 5) - hash) + domain.charCodeAt(i);
      hash |= 0;
    }

    const palettes = [
      { primary: '#06b6d4', bg: 'radial-gradient(circle at 10% 10%, #1e293b 0%, #0a0f1d 75%)', badge: 'emerald', pattern: 'guilloche', font: "'Plus Jakarta Sans', sans-serif" },
      { primary: '#3b82f6', bg: 'linear-gradient(160deg, #1e3a8a 0%, #0f172a 65%)', badge: 'cyan', pattern: 'circuits', font: "'Outfit', sans-serif" },
      { primary: '#f59e0b', bg: 'radial-gradient(circle at 50% 0%, #2a2824 0%, #121110 85%)', badge: 'gold', pattern: 'guilloche', font: "'Cinzel', serif" },
      { primary: '#10b981', bg: 'linear-gradient(145deg, #064e3b 0%, #022c22 100%)', badge: 'emerald', pattern: 'hexmesh', font: "'Inter', sans-serif" },
      { primary: '#ef4444', bg: 'linear-gradient(145deg, #1c1917 0%, #0c0a09 100%)', badge: 'crimson', pattern: 'stripes', font: "'Oswald', sans-serif" },
      { primary: '#8b5cf6', bg: 'linear-gradient(135deg, #312e81 0%, #0f172a 100%)', badge: 'purple', pattern: 'holonoise', font: "'Space Grotesk', sans-serif" }
    ];
    const picked = palettes[Math.abs(hash) % palettes.length];

    if (dom.companyBrandNameInput) dom.companyBrandNameInput.value = brandName;
    if (dom.companyTaglineInput) dom.companyTaglineInput.value = `Official Enterprise Portal • ${domain}`;
    if (dom.companyPrimaryColorPicker) dom.companyPrimaryColorPicker.value = picked.primary;
    if (dom.companyPrimaryColorHex) dom.companyPrimaryColorHex.value = picked.primary;

    state.projectName = brandName.replace(/\s+/g, '_') + '_Badge';
    dom.projectTitleInput.value = state.projectName;
    state.backgrounds.front = picked.bg;
    state.backgrounds.back = picked.bg;
    state.activePattern = picked.pattern;
    dom.artboardPatternLayer.className = `artboard-pattern-layer pattern-${picked.pattern}`;

    updateTargetElement('el-comp-name', brandName, { fontFamily: picked.font, color: '#ffffff' });
    updateTargetElement('el-comp-tag', `Official Enterprise Portal • ${domain}`, { fontFamily: picked.font, color: '#94a3b8' });
    updateTargetElement('el-emp-role', 'Corporate Staff', { color: picked.primary });
    updateTargetElement('el-id-val', `ID-${Math.abs(hash % 90000 + 10000)}`, { color: picked.primary });
    updateTargetElement('el-back-title', brandName);

    const badgeEl = state.elements.front.find(e => e.id === 'el-badge-clearance');
    if (badgeEl) {
      badgeEl.content = 'VERIFIED';
      badgeEl.badgeColor = picked.badge;
    }

    const qrEl = state.elements.back.find(e => e.id === 'el-qr');
    if (qrEl) {
      qrEl.qrValue = `https://${domain}`;
      renderQRItem(qrEl);
    }

    renderCanvas();
    pushHistoryState();
    dom.importModal.classList.add('hidden');
    showToast(`Extracted "${brandName}" from ${domain}!`, 'success');
  }

  // Company Quick-Brander Sync
  dom.companyPrimaryColorPicker.addEventListener('input', (e) => {
    dom.companyPrimaryColorHex.value = e.target.value;
  });
  dom.companyPrimaryColorHex.addEventListener('change', (e) => {
    const val = e.target.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      dom.companyPrimaryColorPicker.value = val;
    }
  });

  dom.btnApplyCompanyBrand.addEventListener('click', () => {
    const compName = dom.companyBrandNameInput.value.trim() || 'NEXUS DYNAMICS';
    const compTag = dom.companyTaglineInput.value.trim() || 'Advanced Artificial Intelligence';
    const brandColor = dom.companyPrimaryColorPicker.value || '#06b6d4';
    const empName = dom.companyEmpNameInput.value.trim() || 'ALEXANDER VANCE';
    const empRole = dom.companyEmpRoleInput.value.trim() || 'Chief Technology Officer';
    const empDept = dom.companyEmpDeptInput.value.trim() || 'ENGINEERING & AI SYSTEMS';
    const empId = dom.companyEmpIdInput.value.trim() || 'NX-84920';
    const bloodGrp = dom.companyBloodGroupInput.value.trim() || 'O+';
    const clearance = dom.companyClearanceInput.value.trim() || 'ALL ACCESS';
    const expiry = dom.companyExpiryInput.value.trim() || '12 / 2029';

    state.projectName = compName.replace(/[^a-zA-Z0-9_-]/g, '_') + '_Badge';
    dom.projectTitleInput.value = state.projectName;

    updateTargetElement('el-comp-name', compName);
    updateTargetElement('el-comp-tag', compTag);
    updateTargetElement('el-emp-name', empName);
    updateTargetElement('el-emp-role', empRole, { color: brandColor });
    updateTargetElement('el-emp-dept', empDept);
    updateTargetElement('el-id-val', empId, { color: brandColor });
    updateTargetElement('el-blood-val', bloodGrp);
    updateTargetElement('el-exp-val', expiry);
    updateTargetElement('el-back-title', compName);

    const badgeEl = state.elements.front.find(e => e.id === 'el-badge-clearance');
    if (badgeEl) {
      badgeEl.content = clearance;
    }

    const logoEl = state.elements.front.find(e => e.id === 'el-logo');
    if (logoEl) {
      logoEl.styles.color = brandColor;
    }

    const barcodeEl = state.elements.back.find(e => e.id === 'el-barcode');
    if (barcodeEl) {
      barcodeEl.barcodeValue = empId;
      renderBarcodeItem(barcodeEl);
    }

    const qrEl = state.elements.back.find(e => e.id === 'el-qr');
    if (qrEl) {
      qrEl.qrValue = `https://verify.corp.com/id?code=${encodeURIComponent(empId)}&emp=${encodeURIComponent(empName)}`;
      renderQRItem(qrEl);
    }

    renderCanvas();
    pushHistoryState();
    if (window.innerWidth <= 900) closeMobileDrawer();
    showToast(`Company details applied to ${compName} ID badge!`, 'success');
  });

  // -------------------------------------------------------------------------
  // 13. Import Modal & Template Loading
  // -------------------------------------------------------------------------
  dom.btnOpenImportModal.addEventListener('click', () => {
    dom.importModal.classList.remove('hidden');
  });

  dom.btnCloseImportModal.addEventListener('click', () => dom.importModal.classList.add('hidden'));
  dom.btnCancelImport.addEventListener('click', () => dom.importModal.classList.add('hidden'));

  // Import Modal Tabs
  document.querySelectorAll('.import-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.import-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.import-tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const paneId = btn.dataset.importTab;
      document.getElementById(paneId).classList.add('active');
    });
  });

  // Import JSON File
  dom.dropZoneTemplateJSON.addEventListener('click', () => dom.templateFileInput.click());
  dom.templateFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        dom.templatePasteTextarea.value = event.target.result;
        showToast('JSON template file loaded', 'info');
      };
      reader.readAsText(file);
    }
  });

  // Import Reference Image from device
  dom.dropZoneRefImage.addEventListener('click', () => dom.refImageFileInput.click());
  dom.refImageFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        state.backgrounds[state.currentPage] = `url("${dataUrl}") center/cover no-repeat`;
        renderCanvas();
        pushHistoryState();
        dom.importModal.classList.add('hidden');
        showToast('Imported badge image as card background', 'success');
      };
      reader.readAsDataURL(file);
    }
  });

  // Apply Import Action
  dom.btnApplyImport.addEventListener('click', () => {
    const jsonStr = dom.templatePasteTextarea.value.trim();
    if (jsonStr) {
      try {
        const parsed = JSON.parse(jsonStr);
        if (parsed.elements && parsed.backgrounds) {
          applySnapshot(parsed);
          pushHistoryState();
          dom.importModal.classList.add('hidden');
          showToast('Template imported successfully!', 'success');
          return;
        } else {
          showToast('Invalid template format', 'info');
        }
      } catch (err) {
        showToast('JSON parse error. Check syntax.', 'info');
      }
    }

    const imgUrl = dom.importImageUrlInput.value.trim();
    if (imgUrl) {
      state.backgrounds[state.currentPage] = `url("${imgUrl}") center/cover no-repeat`;
      renderCanvas();
      pushHistoryState();
      dom.importModal.classList.add('hidden');
      showToast('Loaded template from URL', 'success');
      return;
    }

    dom.importModal.classList.add('hidden');
  });

  // Export Template JSON
  dom.exportTemplateJSON.addEventListener('click', () => {
    dom.exportMenu.classList.add('hidden');
    const exportData = {
      version: '1.0',
      projectName: state.projectName,
      orientation: state.orientation,
      backgrounds: state.backgrounds,
      activePattern: state.activePattern,
      elements: state.elements
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${state.projectName}_TEMPLATE.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Template JSON downloaded', 'success');
  });

  // -------------------------------------------------------------------------
  // 14. Page Switching & Orientation
  // -------------------------------------------------------------------------
  dom.btnPageFront.addEventListener('click', () => switchPage('front'));
  dom.btnPageBack.addEventListener('click', () => switchPage('back'));

  function switchPage(page) {
    if (state.currentPage === page) return;
    state.currentPage = page;
    deselectAll();
    dom.btnPageFront.classList.toggle('active', page === 'front');
    dom.btnPageBack.classList.toggle('active', page === 'back');
    renderCanvas();

    const currentBg = state.backgrounds[page];
    if (currentBg && currentBg.startsWith('#') && currentBg.length === 7) {
      dom.customBgColorPicker.value = currentBg;
      dom.customBgHexInput.value = currentBg;
    }
  }

  dom.btnOrientPortrait.addEventListener('click', () => setOrientation('portrait'));
  dom.btnOrientLandscape.addEventListener('click', () => setOrientation('landscape'));

  function setOrientation(orient) {
    if (state.orientation === orient) return;
    state.orientation = orient;
    dom.btnOrientPortrait.classList.toggle('active', orient === 'portrait');
    dom.btnOrientLandscape.classList.toggle('active', orient === 'landscape');
    adaptElementsForOrientation(orient);
    renderCanvas();
    autoFitCanvas();
    pushHistoryState();
    showToast(`Orientation set to ${orient}`, 'info');
  }

  function adaptElementsForOrientation(orient) {
    const cardW = orient === 'portrait' ? 340 : 540;
    const cardH = orient === 'portrait' ? 540 : 340;

    ['front', 'back'].forEach(p => {
      const list = state.elements[p] || [];
      list.forEach(el => {
        // Keep lanyard slot centered at the top
        if (el.id === 'el-punch' || el.type === 'punch') {
          el.x = Math.round((cardW - el.w) / 2);
          el.y = 8;
          return;
        }

        // Clamp element within bounds
        if (el.x + el.w > cardW) {
          el.x = Math.max(10, cardW - el.w - 12);
        }
        if (el.y + el.h > cardH) {
          el.y = Math.max(10, cardH - el.h - 12);
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 15. Zoom Controls & Auto-Fit Engine (Bidirectional 2D Responsive Fit)
  // -------------------------------------------------------------------------
  dom.btnZoomIn.addEventListener('click', () => changeZoom(0.1));
  dom.btnZoomOut.addEventListener('click', () => changeZoom(-0.1));
  dom.btnZoomFit.addEventListener('click', () => autoFitCanvas());

  function changeZoom(delta) {
    setZoom(Math.max(0.4, Math.min(2.0, state.zoom + delta)));
  }

  function setZoom(val) {
    const rounded = parseFloat(val.toFixed(2));
    if (Math.abs(state.zoom - rounded) < 0.005) return;
    state.zoom = rounded;
    dom.cardArtboard.style.setProperty('--canvas-zoom', state.zoom);
    dom.zoomLevelText.textContent = `${Math.round(state.zoom * 100)}%`;
  }

  function autoFitCanvas() {
    const cardW = state.orientation === 'portrait' ? 340 : 540;
    const cardH = state.orientation === 'portrait' ? 540 : 340;
    const vp = dom.canvasViewport;
    const isMobile = window.innerWidth <= 900;
    
    // Viewport dimensions with reliable fallback
    const vpW = (vp && vp.clientWidth > 40) ? vp.clientWidth : (window.innerWidth - (isMobile ? 56 : 72));
    const vpH = (vp && vp.clientHeight > 40) ? vp.clientHeight : (window.innerHeight - (isMobile ? 96 : 96));
    
    // Margins guaranteeing company name at top and controls at bottom never clip
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
    
    setZoom(target);
  }

  let resizeTimer = null;
  let lastWinW = window.innerWidth;
  let lastWinH = window.innerHeight;

  function onWindowResizeThrottled() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      // Filter out micro height changes caused by mobile address-bar collapse
      if (Math.abs(curW - lastWinW) > 8 || Math.abs(curH - lastWinH) > 45) {
        lastWinW = curW;
        lastWinH = curH;
        requestAnimationFrame(autoFitCanvas);
      }
    }, 100);
  }

  window.addEventListener('resize', onWindowResizeThrottled, { passive: true });
  window.addEventListener('orientationchange', () => {
    setTimeout(autoFitCanvas, 150);
  }, { passive: true });

  // -------------------------------------------------------------------------
  // 16. 3D Realistic Simulation Modal
  // -------------------------------------------------------------------------
  dom.btnMode3D.addEventListener('click', open3DModal);
  dom.btnMode2D.addEventListener('click', close3DModal);
  dom.btnClose3DModal.addEventListener('click', close3DModal);

  function open3DModal() {
    deselectAll();
    dom.btnMode3D.classList.add('active');
    dom.btnMode2D.classList.remove('active');

    // Sync lanyard text with company name
    const compEl = state.elements.front.find(e => e.id === 'el-comp-name');
    const compName = compEl ? compEl.content : (state.projectName || 'COMPANY ID');
    if (dom.m3dLanyardText) {
      dom.m3dLanyardText.textContent = compName;
    }

    // Render front
    state.currentPage = 'front';
    renderCanvas();
    dom.m3dFrontContent.innerHTML = dom.elementsContainer.innerHTML;
    dom.m3dFrontContent.style.background = state.backgrounds.front;
    if (dom.m3dPatternFront) {
      dom.m3dPatternFront.className = `artboard-pattern pattern-${state.activePattern || 'none'}`;
    }

    // Render back
    state.currentPage = 'back';
    renderCanvas();
    dom.m3dBackContent.innerHTML = dom.elementsContainer.innerHTML;
    dom.m3dBackContent.style.background = state.backgrounds.back;
    if (dom.m3dPatternBack) {
      dom.m3dPatternBack.className = `artboard-pattern pattern-${state.activePattern || 'none'}`;
    }

    // Restore page
    state.currentPage = 'front';
    renderCanvas();

    dom.modal3DView.classList.remove('hidden');
    init3DTilt();
  }

  function close3DModal() {
    dom.modal3DView.classList.add('hidden');
    dom.btnMode3D.classList.remove('active');
    dom.btnMode2D.classList.add('active');
  }

  let is3DFlipped = false;
  dom.btnFlip3DModal.addEventListener('click', () => {
    is3DFlipped = !is3DFlipped;
    dom.card3DFlipper.classList.toggle('flipped', is3DFlipped);
  });

  function init3DTilt() {
    function handleTilt(clientX, clientY) {
      const rect = dom.card3DFlipper.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (clientX - centerX) / (rect.width / 2);
      const mouseY = (clientY - centerY) / (rect.height / 2);

      const maxTilt = 16;
      const tiltX = -mouseY * maxTilt;
      const tiltY = mouseX * maxTilt;

      const glareX = `${Math.round(((clientX - rect.left) / rect.width) * 100)}%`;

      requestAnimationFrame(() => {
        dom.card3DFlipper.style.setProperty('--m3d-tilt-x', `${tiltX.toFixed(2)}deg`);
        dom.card3DFlipper.style.setProperty('--m3d-tilt-y', `${tiltY.toFixed(2)}deg`);
        dom.card3DFlipper.style.setProperty('--m3d-holo-x', glareX);
      });
    }

    function resetTilt() {
      requestAnimationFrame(() => {
        dom.card3DFlipper.style.setProperty('--m3d-tilt-x', '0deg');
        dom.card3DFlipper.style.setProperty('--m3d-tilt-y', '0deg');
        dom.card3DFlipper.style.setProperty('--m3d-holo-x', '50%');
      });
    }

    dom.modal3DViewport.addEventListener('mousemove', (e) => {
      handleTilt(e.clientX, e.clientY);
    });

    dom.modal3DViewport.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        handleTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    dom.modal3DViewport.addEventListener('mouseleave', resetTilt);
    dom.modal3DViewport.addEventListener('touchend', resetTilt, { passive: true });
    dom.modal3DViewport.addEventListener('touchcancel', resetTilt, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 16. Export & Print Engine
  // -------------------------------------------------------------------------
  dom.btnExportDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    dom.exportMenu.classList.toggle('hidden');
  });

  window.addEventListener('click', () => {
    dom.exportMenu.classList.add('hidden');
  });

  dom.btnPrintTop.addEventListener('click', () => {
    deselectAll();
    showToast('Opening CR80 Print Dialog...', 'info');
    setTimeout(() => window.print(), 350);
  });

  dom.exportFrontPNG.addEventListener('click', () => exportSinglePage('front'));
  dom.exportBackPNG.addEventListener('click', () => exportSinglePage('back'));
  dom.exportDualPNG.addEventListener('click', exportDualSides);

  async function exportSinglePage(page) {
    dom.exportMenu.classList.add('hidden');
    deselectAll();
    showToast(`Rendering ${page.toUpperCase()} at 300 DPI...`, 'info');

    const originalPage = state.currentPage;
    state.currentPage = page;
    renderCanvas();

    await new Promise(r => setTimeout(r, 60));

    if (window.html2canvas) {
      try {
        const canvasOut = await window.html2canvas(dom.cardArtboard, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false
        });

        const filename = `${state.projectName}_${page.toUpperCase()}.png`;
        downloadCanvas(canvasOut, filename);
        showToast(`Downloaded ${filename}`, 'success');

        state.currentPage = originalPage;
        renderCanvas();
        return;
      } catch (err) {
        console.warn('html2canvas export error:', err);
      }
    }

    state.currentPage = originalPage;
    renderCanvas();
  }

  async function exportDualSides() {
    dom.exportMenu.classList.add('hidden');
    deselectAll();
    showToast('Rendering Dual-Side 300DPI Presentation...', 'info');

    if (window.html2canvas) {
      try {
        state.currentPage = 'front';
        renderCanvas();
        await new Promise(r => setTimeout(r, 60));
        const frontCanvas = await window.html2canvas(dom.cardArtboard, { scale: 3, useCORS: true, logging: false });

        state.currentPage = 'back';
        renderCanvas();
        await new Promise(r => setTimeout(r, 60));
        const backCanvas = await window.html2canvas(dom.cardArtboard, { scale: 3, useCORS: true, logging: false });

        const dualCanvas = document.createElement('canvas');
        dualCanvas.width = frontCanvas.width + backCanvas.width + 120;
        dualCanvas.height = Math.max(frontCanvas.height, backCanvas.height) + 120;
        const ctx = dualCanvas.getContext('2d');

        ctx.fillStyle = '#0a0d14';
        ctx.fillRect(0, 0, dualCanvas.width, dualCanvas.height);
        ctx.drawImage(frontCanvas, 40, 60);
        ctx.drawImage(backCanvas, frontCanvas.width + 80, 60);

        downloadCanvas(dualCanvas, `${state.projectName}_DUAL_SIDE.png`);
        showToast('Dual-Side Presentation exported!', 'success');

        state.currentPage = 'front';
        renderCanvas();
        return;
      } catch (err) {
        console.warn('Dual export error:', err);
      }
    }
  }

  function downloadCanvas(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // -------------------------------------------------------------------------
  // 17. Toast Notifications
  // -------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
        ${type === 'success' 
          ? '<polyline points="20 6 9 17 4 12"></polyline>' 
          : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
      </svg>
      <span>${message}</span>
    `;

    dom.toastShelf.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // -------------------------------------------------------------------------
  // 18. Project Title & Auto-Restore
  // -------------------------------------------------------------------------
  dom.projectTitleInput.addEventListener('change', (e) => {
    state.projectName = e.target.value.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'Badge';
    pushHistoryState();
  });

  // Try auto-restoring saved project from localStorage
  try {
    const saved = localStorage.getItem('badgecraft_project_data');
    if (saved) {
      const snap = JSON.parse(saved);
      if (snap && snap.elements) {
        applySnapshot(snap);
      }
    }
  } catch (e) {}

  // -------------------------------------------------------------------------
  // 19. Initialization & Multi-Stage Auto-Fit
  // -------------------------------------------------------------------------
  renderCanvas();
  autoFitCanvas();
  requestAnimationFrame(autoFitCanvas);
  setTimeout(autoFitCanvas, 100);
  setTimeout(autoFitCanvas, 300);
  pushHistoryState();
  console.log('BadgeCraft Studio Pro Engine 2.0 Ready.');
});
