/* ==========================================================================
   PRESIGHT VIDEO HUB — CONTENT CONFIG
   ==========================================================================

   THIS IS THE FILE YOU EDIT TO ADD, REMOVE, OR CHANGE VIDEOS.
   You don't need to touch any other file.

   HOW TO EDIT:
   1. Open this file in any text editor (TextEdit on Mac, Notepad on Windows,
      or VS Code).
   2. Make your changes inside the structure below. Keep the punctuation
      exactly as shown — every comma, quote, and bracket matters.
   3. Save the file. Refresh the browser to see your changes.

   QUICK SAFETY TIPS:
   - Always make a backup copy of this file before big changes.
   - Use straight quotes  "  not curly quotes  “ ”  (some editors auto-convert;
      turn that off if you can).
   - If something breaks after editing, look for a missing comma or quote.
   - Every video needs an "en" file. The "ar" file is optional — if you don't
      have an Arabic version, just leave it as an empty string: ""

   FILE PATHS:
   - Drop video files into the /videos folder.
   - Drop thumbnail images into the /thumbnails folder.
   - Then reference them below as "videos/yourfile.mp4" or
      "thumbnails/yourimage.jpg"
   - Recommended video format: MP4 (H.264). It plays everywhere.
   - Recommended thumbnail size: 1920x1080 pixels, JPG or PNG.

   ========================================================================== */

/* -------------------------------------------------------------------------
   SETTINGS
   General behaviour. Edit these to change how the hub runs.
   ------------------------------------------------------------------------- */
window.PRESIGHT_CONFIG = {

  /* When true, the first user interaction enters browser fullscreen
     (address bar / tabs hidden). Press Esc to exit.

     Set to false if you'd prefer to control fullscreen manually with F11,
     or if you're launching via launch-mac.command / launch-windows.bat
     (which already start in kiosk mode — no need for this). */
  autoFullscreen: true

};


window.PRESIGHT_CONTENT = {

  /* -------------------------------------------------------------------------
     HERO VIDEO
     The big featured video shown at the top of the Videos page.
     Click it to play in fullscreen.
     ------------------------------------------------------------------------- */
  hero: {
    title: "Presight - Intelligence. Applied.",
    file_en: "videos/hero.en.mp4",        // English version
    file_ar: "videos/hero.ar.mp4",        // Arabic version (optional — leave "" if none)
    thumbnail: "thumbnails/hero.jpg"      // Image shown before the video plays
  },


  /* -------------------------------------------------------------------------
     CATEGORIES
     Each category becomes a button on the Videos page. When a visitor clicks
     a category, the videos listed inside that category are shown.

     To add a new category, copy one of the blocks below and paste it after.
     To remove a category, delete its block (including the curly braces and
     the trailing comma).

     The "id" must be unique and contain only lowercase letters, numbers,
     and hyphens. No spaces.
     ------------------------------------------------------------------------- */
  categories: [

    {
      id: "public-services",
      label: "Public Services",
      description: "We enhance public services and optimize government efficiencies through big data analytics powered by GenAI.\n\nOur mission critical and proven GenAI solutions enable public agencies to improve citizen service offerings, define data-driven policies, enhance public safety, and enable digital identity management.",
      videos: [
        {
          title: "Presight LifeSaver Platform",
          file_en: "videos/lifesaver.en.mp4",
          file_ar: "videos/lifesaver.ar.mp4",
          thumbnail: "thumbnails/lifesaver.jpg"
        },
        {
          title: "Presight Law Enforcement Platform",
          file_en: "videos/law-enforcement.en.mp4",
          file_ar: "videos/law-enforcement.ar.mp4",
          thumbnail: "thumbnails/law-enforcement.jpg"
        },
        {
          title: "Presight Digital Forensics Platform",
          file_en: "videos/digital-forensics.en.mp4",
          file_ar: "videos/digital-forensics.ar.mp4",
          thumbnail: "thumbnails/digital-forensics.jpg"
        },
        {
          title: "Presight Public Services Vertical",
          file_en: "videos/public-services-vertical.en.mp4",
          file_ar: "videos/public-services-vertical.ar.mp4",
          thumbnail: "thumbnails/public-services-vertical.jpg"
        }
      ]
    },

    {
      id: "smart-cities",
      label: "Smart Cities",
      description: "We help cities operate smarter through integrated intelligence — connecting infrastructure, mobility, environment, and services into a single coordinated layer.",
      videos: [
        {
          title: "Presight Intellicity Overview",
          file_en: "videos/intellicity-overview.en.mp4",
          file_ar: "videos/intellicity-overview.ar.mp4",
          thumbnail: "thumbnails/intellicity-overview.jpg"
        }
      ]
    },

    {
      id: "finance",
      label: "Finance",
      description: "Capital allocation, risk modeling, and market intelligence — Presight applies AI to financial decision-making at sovereign and enterprise scale.",
      videos: [
        {
          title: "Presight Synergy",
          file_en: "videos/synergy.en.mp4",
          file_ar: "videos/synergy.ar.mp4",
          thumbnail: "thumbnails/synergy.jpg"
        }
      ]
    },

    {
      id: "energy",
      label: "Energy",
      description: "From generation to grid management, Presight delivers AI capabilities that optimize energy operations, forecasting, and sustainability outcomes.",
      videos: [
        {
          title: "Presight Enova",
          file_en: "videos/enova.en.mp4",
          file_ar: "videos/enova.ar.mp4",
          thumbnail: "thumbnails/enova.jpg"
        }
      ]
    },

    {
      id: "enterprise",
      label: "Enterprise",
      description: "Enterprise-grade AI for the operations of large organizations — automation, decision support, and integrated intelligence across business functions.",
      videos: []
    },

    {
      id: "growth",
      label: "Growth",
      description: "Strategic capabilities that compound — investments, accelerators, and platforms that build long-term capacity in applied intelligence.",
      videos: [
        {
          title: "Presight Accelerator Program",
          file_en: "videos/accelerator-program.en.mp4",
          file_ar: "videos/accelerator-program.ar.mp4",
          thumbnail: "thumbnails/accelerator-program.jpg"
        }
      ]
    }

  ],


  /* -------------------------------------------------------------------------
     PRODUCTS
     Product icons appear in a row at the bottom of the Videos page.
     Clicking a product filters the page to show videos for that product.

     The "icon" is a small image (SVG or PNG) shown in the icon circle.
     Drop the file into /assets/product-icons/ and reference it here.
     ------------------------------------------------------------------------- */
  products: [
    {
      id: "intellicity",
      label: "Presight Intellicity",
      icon: "assets/product-icons/intellicity.png",
      videos: [
        {
          title: "Presight Intellicity Overview",
          file_en: "videos/intellicity-overview.en.mp4",
          file_ar: "videos/intellicity-overview.ar.mp4",
          thumbnail: "thumbnails/intellicity-overview.jpg"
        }
      ]
    },
    {
      id: "lifesaver",
      label: "Presight Lifesaver",
      icon: "assets/product-icons/lifesaver.png",
      videos: [
        {
          title: "Presight LifeSaver Platform",
          file_en: "videos/lifesaver.en.mp4",
          file_ar: "videos/lifesaver.ar.mp4",
          thumbnail: "thumbnails/lifesaver.jpg"
        }
      ]
    },
    {
      id: "ai-policing",
      label: "Presight AI-Policing Suite",
      icon: "assets/product-icons/ai-policing.png",
      videos: []
    },
    {
      id: "report-optimizer",
      label: "Presight Report Optimizer",
      icon: "assets/product-icons/report-optimizer.png",
      videos: []
    },
    {
      id: "newspulse",
      label: "Presight Newspulse",
      icon: "assets/product-icons/newspulse.png",
      videos: []
    },
    {
      id: "vitruvian",
      label: "Presight Vitruvian",
      icon: "assets/product-icons/vitruvian.png",
      videos: []
    },
    {
      id: "synergy",
      label: "Presight Synergy",
      icon: "assets/product-icons/synergy.png",
      videos: [
        {
          title: "Presight Synergy",
          file_en: "videos/synergy.en.mp4",
          file_ar: "videos/synergy.ar.mp4",
          thumbnail: "thumbnails/synergy.jpg"
        }
      ]
    },
    {
      id: "spectra",
      label: "Presight Spectra",
      icon: "assets/product-icons/spectra.png",
      videos: []
    },
    {
      id: "accelerator-program",
      label: "Presight Accelerator Program",
      icon: "assets/product-icons/accelerator-program.png",
      videos: [
        {
          title: "Presight Accelerator Program",
          file_en: "videos/accelerator-program.en.mp4",
          file_ar: "videos/accelerator-program.ar.mp4",
          thumbnail: "thumbnails/accelerator-program.jpg"
        }
      ]
    },
    {
      id: "financial-solutions",
      label: "Financial Solutions",
      icon: "assets/product-icons/financial-solutions.png",
      videos: []
    },
    {
      id: "enova",
      label: "Presight Enova",
      icon: "assets/product-icons/enova.png",
      videos: [
        {
          title: "Presight Enova",
          file_en: "videos/enova.en.mp4",
          file_ar: "videos/enova.ar.mp4",
          thumbnail: "thumbnails/enova.jpg"
        }
      ]
    }
  ],


  /* -------------------------------------------------------------------------
     DEMOS
     The Demos page shows a grid of product demo videos.
     Each demo is a card with a title, optional subtitle, image, and video.
     ------------------------------------------------------------------------- */
  demos: [
    {
      title: "Presight AI Policing Suite",
      subtitle: "",
      image: "thumbnails/demo-ai-policing.jpg",
      file_en: "videos/demo-ai-policing.en.mp4",
      file_ar: "videos/demo-ai-policing.ar.mp4"
    },
    {
      title: "Presight Lifesaver",
      subtitle: "",
      image: "thumbnails/demo-lifesaver.jpg",
      file_en: "videos/demo-lifesaver.en.mp4",
      file_ar: "videos/demo-lifesaver.ar.mp4"
    },
    {
      title: "Presight Intellicity",
      subtitle: "Waste Management & Energy Management",
      image: "thumbnails/demo-intellicity-1.jpg",
      file_en: "videos/demo-intellicity-1.en.mp4",
      file_ar: "videos/demo-intellicity-1.ar.mp4"
    },
    {
      title: "Presight Intellicity",
      subtitle: "Abu Dhabi & Facility Management",
      image: "thumbnails/demo-intellicity-2.jpg",
      file_en: "videos/demo-intellicity-2.en.mp4",
      file_ar: "videos/demo-intellicity-2.ar.mp4"
    },
    {
      title: "Presight Sentinel",
      subtitle: "",
      image: "thumbnails/demo-sentinel.jpg",
      file_en: "videos/demo-sentinel.en.mp4",
      file_ar: "videos/demo-sentinel.ar.mp4"
    },
    {
      title: "Presight Strategy Observer",
      subtitle: "",
      image: "thumbnails/demo-strategy-observer.jpg",
      file_en: "videos/demo-strategy-observer.en.mp4",
      file_ar: "videos/demo-strategy-observer.ar.mp4"
    },
    {
      title: "Presight Vitruvian",
      subtitle: "Multiple Agentic AI use cases",
      image: "thumbnails/demo-vitruvian.jpg",
      file_en: "videos/demo-vitruvian.en.mp4",
      file_ar: "videos/demo-vitruvian.ar.mp4"
    },
    {
      title: "Presight Newspulse",
      subtitle: "",
      image: "thumbnails/demo-newspulse.jpg",
      file_en: "videos/demo-newspulse.en.mp4",
      file_ar: "videos/demo-newspulse.ar.mp4"
    },
    {
      title: "Khazna Data Centre",
      subtitle: "",
      image: "thumbnails/demo-khazna.jpg",
      file_en: "videos/demo-khazna.en.mp4",
      file_ar: "videos/demo-khazna.ar.mp4"
    },
    {
      title: "Presight Intellicity",
      subtitle: "Powerplant Management",
      image: "thumbnails/demo-intellicity-3.jpg",
      file_en: "videos/demo-intellicity-3.en.mp4",
      file_ar: "videos/demo-intellicity-3.ar.mp4"
    }
  ]

};
