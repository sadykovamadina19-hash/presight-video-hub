/* ==========================================================================
   PRESIGHT VIDEO HUB — APP LOGIC
   ==========================================================================

   You shouldn't need to edit this file to update content.
   All content lives in /content.js.

   STRUCTURE (the navigation model):
     videos       — ENTRY POINT. Featured hero + categories/products rows.
       ├─ collection (category) — distinct screen for one category
       ├─ collection (product)  — distinct screen for one product
       └─ demos    — distinct collection of demo videos
           (player overlays whichever view it was launched from)

   Back-button behaviour:
     collection →  videos
     demos      →  videos
     player     →  whichever view was open before play started

   The Videos / Demos toggle in the top-right is the primary navigation
   between the two main branches. The logo top-left also routes to videos.

   What this file does:
   1. Reads the content from window.PRESIGHT_CONTENT (set in content.js)
   2. Builds the categories row + products row (rendered into BOTH views
      that show those rows — videos and collection)
   3. Handles all click routing and view switching
   4. Manages the EN/AR language toggle in the player
   5. Shows graceful placeholders when thumbnail or video files are missing
   ========================================================================== */

   (function () {
    'use strict';
  
    /* ------------------------------------------------------------------------
       STATE
       ------------------------------------------------------------------------ */
    const state = {
      currentView: 'videos',
      previousView: 'videos',                   // for player back button
      currentCollection: null,                  // { type: 'category'|'product', id }
      currentLang: 'en',
      currentVideo: null,
      firstInteraction: true                    // tracks first user click for fullscreen
    };
  
  
    /* ------------------------------------------------------------------------
       VIEW SWITCHING
       Views overlap as absolutely-positioned sections. A CSS transition fades
       the active one in and the previous one out — see .view / .view.is-active
       in style.css.
       ------------------------------------------------------------------------ */
    const views = document.querySelectorAll('.view');
  
    function showView(name) {
      // Track previous view so the player back button can return to it
      if (name === 'player' && state.currentView !== 'player') {
        state.previousView = state.currentView;
      }
      state.currentView = name;
  
      views.forEach(v => {
        v.classList.toggle('is-active', v.dataset.view === name);
      });
  
      // Reset scroll inside the active view (each view manages its own scroll)
      const active = document.querySelector('.view.is-active');
      if (active) active.scrollTop = 0;
    }
  
  
    /* ------------------------------------------------------------------------
       RENDER: HERO (videos view)
       ------------------------------------------------------------------------ */
    function renderHero() {
      const hero = window.PRESIGHT_CONTENT.hero;
      document.getElementById('hero-title').textContent = hero.title;
      setupPreviewVideo(document.getElementById('hero-thumb'), hero.file_en, hero.thumbnail);
    }
  
  
    /* ------------------------------------------------------------------------
       RENDER: CATEGORIES + PRODUCTS ROWS
       These rows appear in BOTH the videos view and the collection view.
       We render the same content into all elements with the matching class.
       ------------------------------------------------------------------------ */
    function renderCategoriesRows() {
      const categories = window.PRESIGHT_CONTENT.categories;
      document.querySelectorAll('.categories-row').forEach(row => {
        row.style.gridTemplateColumns = `repeat(${categories.length}, 1fr)`;
        row.innerHTML = '';
        categories.forEach(cat => {
          const btn = document.createElement('button');
          btn.className = 'filter-btn';
          btn.dataset.collectionType = 'category';
          btn.dataset.collectionId = cat.id;
          btn.textContent = cat.label;
          btn.addEventListener('click', () => openCollection('category', cat.id));
          row.appendChild(btn);
        });
      });
    }
  
    function renderProductsRows() {
      const products = window.PRESIGHT_CONTENT.products;
      document.querySelectorAll('.products-row').forEach(row => {
        row.style.gridTemplateColumns = `repeat(${products.length}, 1fr)`;
        row.innerHTML = '';
        products.forEach(prod => {
          const card = document.createElement('button');
          card.className = 'product-card';
          card.dataset.collectionType = 'product';
          card.dataset.collectionId = prod.id;
  
          const iconWrap = document.createElement('span');
          iconWrap.className = 'product-icon';
          const iconImg = document.createElement('img');
          iconImg.alt = '';
          iconImg.src = prod.icon || '';
          iconImg.onerror = () => { iconImg.style.visibility = 'hidden'; };
          iconWrap.appendChild(iconImg);
  
          const label = document.createElement('span');
          label.className = 'product-label';
          label.textContent = prod.label;
  
          card.appendChild(iconWrap);
          card.appendChild(label);
          card.addEventListener('click', () => openCollection('product', prod.id));
          row.appendChild(card);
        });
      });
    }
  
  
    /* ------------------------------------------------------------------------
       COLLECTION VIEW
       Opens a distinct screen for a single category or product.
       ------------------------------------------------------------------------ */
    function openCollection(type, id) {
      const list = (type === 'category')
        ? window.PRESIGHT_CONTENT.categories
        : window.PRESIGHT_CONTENT.products;
      const collection = list.find(item => item.id === id);
      if (!collection) return;
  
      state.currentCollection = { type, id };
  
      document.getElementById('collection-title').textContent =
        collection.label.toUpperCase();
  
      const desc = collection.description ||
                   (type === 'product' ? 'Videos featuring this product.' : '');
      document.getElementById('collection-description').textContent = desc;
  
      renderVideoGrid('collection-grid', collection.videos || []);
      updateCollectionActiveStates();
      showView('collection');
    }
  
    function updateCollectionActiveStates() {
      const cur = state.currentCollection;
      // Highlight the active button(s) across both views
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('filter-btn-active',
          cur && btn.dataset.collectionType === cur.type
              && btn.dataset.collectionId === cur.id);
      });
      document.querySelectorAll('.product-card').forEach(card => {
        card.classList.toggle('product-card-active',
          cur && card.dataset.collectionType === cur.type
              && card.dataset.collectionId === cur.id);
      });
    }
  
    function clearCollectionActiveStates() {
      state.currentCollection = null;
      updateCollectionActiveStates();
    }
  
  
    /* ------------------------------------------------------------------------
       VIDEO GRID — shared rendering for collection screens
       ------------------------------------------------------------------------ */
    function renderVideoGrid(targetId, videos) {
      const grid = document.getElementById(targetId);
      grid.innerHTML = '';
  
      if (!videos || videos.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'collection-description';
        empty.textContent = 'No videos in this collection yet.';
        grid.appendChild(empty);
        return;
      }
  
      videos.forEach(v => {
        const card = document.createElement('button');
        card.className = 'video-card';
  
        const preview = document.createElement('video');
        setupPreviewVideo(preview, v.file_en, v.thumbnail);
  
        const caption = document.createElement('span');
        caption.className = 'video-card-caption';
        caption.textContent = v.title;
  
        card.appendChild(preview);
        card.appendChild(caption);
        card.addEventListener('click', () => playVideo(v));
        grid.appendChild(card);
      });
    }
  
  
    /* ------------------------------------------------------------------------
       RENDER: DEMOS PAGE
       ------------------------------------------------------------------------ */
    function renderDemos() {
      const grid = document.getElementById('demos-grid');
      grid.innerHTML = '';
  
      window.PRESIGHT_CONTENT.demos.forEach(demo => {
        const card = document.createElement('button');
        card.className = 'demo-card';
  
        // Rotated screenshot peeking from the right side of the card
        const screenshotWrap = document.createElement('div');
        screenshotWrap.className = 'demo-card-screenshot';
        const screenshotRotate = document.createElement('div');
        screenshotRotate.className = 'demo-card-screenshot-rotate';
        const screenshotFrame = document.createElement('div');
        screenshotFrame.className = 'demo-card-screenshot-frame';
        const img = document.createElement('img');
        img.alt = '';
        setImageWithFallback(img, demo.image);
        screenshotFrame.appendChild(img);
        screenshotRotate.appendChild(screenshotFrame);
        screenshotWrap.appendChild(screenshotRotate);
        card.appendChild(screenshotWrap);
  
        // Title text (top-left, above subtitle)
        const title = document.createElement('p');
        title.className = 'demo-card-title';
        title.textContent = demo.title;
        card.appendChild(title);
  
        if (demo.subtitle) {
          const sub = document.createElement('span');
          sub.className = 'demo-card-subtitle';
          sub.textContent = demo.subtitle;
          card.appendChild(sub);
        }
  
        card.addEventListener('click', () => playVideo(demo));
        grid.appendChild(card);
      });
    }
  
  
    /* ------------------------------------------------------------------------
       PLAYER
       ------------------------------------------------------------------------ */
    const playerVideo = document.getElementById('player-video');
    const playerFallback = document.getElementById('player-fallback');
    const playerFallbackTitle = document.getElementById('player-fallback-title');
  
    function playVideo(item) {
      state.currentVideo = item;
      state.currentLang = 'en';
      updateLangButtons();
      loadCurrentVideo();
      showView('player');
    }
  
    function loadCurrentVideo() {
      const item = state.currentVideo;
      if (!item) return;
  
      const src = (state.currentLang === 'ar' && item.file_ar)
        ? item.file_ar
        : item.file_en;
  
      playerVideo.pause();
      playerVideo.removeAttribute('src');
      playerVideo.load();
      playerFallback.hidden = true;
      playerVideo.hidden = false;
  
      if (!src) {
        showPlayerFallback(item.title);
        return;
      }
  
      playerVideo.src = src;
      playerVideo.onerror = () => showPlayerFallback(item.title);
  
      const playPromise = playerVideo.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(() => { /* user can press play manually */ });
      }
    }
  
    function showPlayerFallback(title) {
      playerVideo.hidden = true;
      playerFallbackTitle.textContent = title || 'Video';
      playerFallback.hidden = false;
    }
  
    function updateLangButtons() {
      document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('lang-btn-active', b.dataset.lang === state.currentLang);
      });
    }
  
  
    /* ------------------------------------------------------------------------
       IMAGE FALLBACK
       If a thumbnail fails to load, swap the <img> for a styled placeholder.
       ------------------------------------------------------------------------ */
    function setImageWithFallback(img, src) {
      if (!src) {
        replaceImageWithPlaceholder(img);
        return;
      }
      img.onerror = () => replaceImageWithPlaceholder(img);
      img.src = src;
    }
  
    function replaceImageWithPlaceholder(img) {
      img.style.display = 'none';
      const parent = img.parentElement;
      if (!parent || parent.querySelector('.is-missing')) return;
      const ph = document.createElement('div');
      ph.className = 'is-missing';
      parent.appendChild(ph);
    }
  
  
    /* ------------------------------------------------------------------------
       PREVIEW VIDEO (autoplay-muted thumbnails)
       Cards show the actual video file looping silently. The static thumbnail
       image is set as the video's poster — it appears instantly while the video
       loads, and stands in as a fallback if the video file is missing.
       ------------------------------------------------------------------------ */
    function setupPreviewVideo(videoEl, videoSrc, posterSrc) {
      // Muted MUST be set before src to satisfy autoplay policy
      videoEl.muted = true;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.setAttribute('muted', '');
      videoEl.setAttribute('autoplay', '');
      videoEl.setAttribute('loop', '');
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('disablepictureinpicture', '');
      videoEl.preload = 'metadata';
      if (posterSrc) videoEl.poster = posterSrc;
  
      // If the video file fails to load, replace with a static image fallback
      videoEl.addEventListener('error', () => fallbackToImage(videoEl, posterSrc));
  
      if (videoSrc) {
        videoEl.src = videoSrc;
        // Explicit play() call helps in some browsers despite autoplay attribute
        const playPromise = videoEl.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => { /* autoplay blocked — poster remains visible */ });
        }
      } else {
        fallbackToImage(videoEl, posterSrc);
      }
    }
  
    function fallbackToImage(videoEl, posterSrc) {
      if (posterSrc) {
        const img = document.createElement('img');
        img.alt = '';
        img.className = videoEl.className;
        img.onerror = () => replaceImageWithPlaceholder(img);
        img.src = posterSrc;
        videoEl.replaceWith(img);
      } else {
        replaceImageWithPlaceholder(videoEl);
      }
    }
  
  
    /* ------------------------------------------------------------------------
       FULLSCREEN
       Triggered by user-gesture clicks. Browsers require a click context, so
       we call this from inside the click handler below.
       ------------------------------------------------------------------------ */
    function enterFullscreenIfEnabled() {
      const cfg = window.PRESIGHT_CONFIG;
      if (!cfg || !cfg.autoFullscreen) return;
      if (document.fullscreenElement || document.webkitFullscreenElement) return;
  
      const el = document.documentElement;
      const req = el.requestFullscreen || el.webkitRequestFullscreen
                || el.msRequestFullscreen;
      if (!req) return;
  
      try {
        const result = req.call(el);
        if (result && result.catch) result.catch(() => { /* user denied or unsupported */ });
      } catch (_) {
        /* ignore */
      }
    }
  
  
    /* ------------------------------------------------------------------------
       GLOBAL CLICK ROUTING via [data-action]
       ------------------------------------------------------------------------ */
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-action]');
      if (!trigger) return;
  
      const action = trigger.dataset.action;
  
      // First user interaction: request fullscreen if enabled. Browsers require
      // this call to live inside a user-gesture handler.
      if (state.firstInteraction) {
        state.firstInteraction = false;
        enterFullscreenIfEnabled();
      }
  
      switch (action) {
        case 'goto-videos':
          clearCollectionActiveStates();
          showView('videos');
          break;
  
        case 'goto-demos':
          clearCollectionActiveStates();
          showView('demos');
          break;
  
        case 'play-hero':
          playVideo(window.PRESIGHT_CONTENT.hero);
          break;
  
        case 'player-back':
          playerVideo.pause();
          showView(state.previousView);
          break;
      }
    });
  
    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentLang = btn.dataset.lang;
        updateLangButtons();
        loadCurrentVideo();
      });
    });
  
  
    /* ------------------------------------------------------------------------
       INIT
       ------------------------------------------------------------------------ */
    function init() {
      if (!window.PRESIGHT_CONTENT) {
        console.error('content.js failed to load. Check the file is present next to index.html.');
        return;
      }
      renderHero();
      renderCategoriesRows();
      renderProductsRows();
      renderDemos();
      showView('videos');
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
  })();
  