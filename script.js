// --- 1. ENRICHED DATA & TRANSLATIONS ---

const translations = {
    projectType: {
        "Konut": "Residential house, modern home architecture, detailed residential design",
        "Villa": "Luxury villa, contemporary residence, high-end architectural design, expansive glass walls",
        "Ofis": "Modern office building, corporate headquarters, glass facade, commercial architecture, curtain wall system",
        "Ticari": "Commercial building, retail store, shopping complex, mixed-use development",
        "İç Mekan": "Interior design, architectural interior, realistic room visualization, interior decor",
        "Kafe": "Cozy cafe, restaurant interior, hospitality design, atmospheric lighting, detailed seating",
        "Otel": "Luxury hotel building, resort architecture, hospitality design, grand entrance, premium materials"
    },
    floorCount: {
        "Tek katlı": "single story, low-rise, horizontal layout",
        "İki katlı": "two-story, duplex, double height volumes",
        "Çok katlı": "multi-story, mid-rise building, vertical repetition",
        "Gökdelen": "skyscraper, high-rise tower, vertical metropolis, glass curtain wall"
    },
    materials: {
        "Beton": "raw exposed concrete texture, brutalist aesthetic, tactile material quality, detailed bump map",
        "Ahşap": "natural timber cladding, cedar wood siding, warm wood tones, organic texture, high resolution wood grain",
        "Cam": "floor-to-ceiling glass windows, transparent facade, curtain wall, reflective glass, double glazing details",
        "Taş": "natural stone cladding, textured stone wall, travertine, slate, heavy masonry work",
        "Tuğla": "red brick facade, exposed brickwork, detailed masonry, rustic texture",
        "Metal": "metallic facade, steel structure, aluminium composite panels, sleek modern finish, titanium cladding",
        "Sıva": "clean white stucco, minimal white facade, smooth plaster finish, santorini style"
    },
    colors: {
        "Modern": "neutral color palette, white and grey tones, monochrome elegance, sophisticated palette",
        "Sıcak": "warm earth tones, beige and brown palette, terracotta, inviting atmosphere, cosiness",
        "Koyu": "dark monochromatic tones, black and charcoal, moody atmosphere, sophisticated dark theme",
        "Pastel": "soft pastel colors, light airy atmosphere, muted tones, gentle palette",
        "Doğal": "natural organic colors, green and wood tones, biophilic color scheme, earth colors"
    },
    lighting: {
        "Gün Işığı": "bright natural daylight, sunny day, clear blue sky, hard shadows, high exposure",
        "Altın Saat": "golden hour lighting, warm sunset light, long shadows, dramatic rim light, magic hour",
        "Akşam": "night time, cinematic exterior lighting, glowing windows, blue hour, artificial lighting design, cozy atmosphere",
        "Bulutlu": "overcast soft light, diffused light, moody atmosphere, soft shadows, balanced exposure, global illumination",
        "Sinematik": "dramatic cinematic lighting, high contrast, studio lighting, volumetric fog, god rays, chiaroscuro"
    },
    environment: {
        "Şehir": "urban street context, city background, sidewalk, asphalt, surrounding buildings, busy street life",
        "Bahçe": "lush green garden, manicured lawn, landscaping, trees, shrubs, botanical garden setting",
        "Deniz": "seaside location, ocean view background, beach, coastal atmosphere, water reflection, horizon line",
        "Orman": "forest surroundings, pine trees, nature, wilderness, dense vegetation, natural landscape",
        "Boş": "clean studio background, minimalist setting, infinity cove, professional studio lighting, product shot style"
    },
    style: {
        "Modern": "Modern architecture, clean lines, contemporary design, bauhaus influence, form follows function",
        "Minimalist": "Minimalist architecture, simple geometry, less is more, reductionist design, clean spaces",
        "Klasik": "Classical architecture, ornamental details, traditional columns, symmetry, grand proportions",
        "Endüstriyel": "Industrial loft style, exposed steel and pipes, raw materials, warehouse conversion aesthetic",
        "İskandinav": "Scandinavian design, nordic style, functional, hygge, light wood, bright spaces",
        "Brutalist": "Brutalist style, massive geometric structures, raw concrete, heavy forms, monumentalism",
        "Geleneksel": "Traditional vernacular architecture, local materials, cultural heritage, authentic design"
    },
    presentation: {
        "Fotorealistik": "8k resolution, photorealistic render, Unreal Engine 5, Octane Render, V-Ray, Ray Tracing, Global Illumination, highly detailed, sharp focus",
        "Eskiz": "architectural sketch, pencil drawing style, concept art, rough lines, artistic flair",
        "Maket": "architectural model style, diorama, tilt-shift effect, scale model, balsa wood, white foam board",
        "Suluboya": "watercolor architectural rendering, artistic style, wet on wet, soft edges, artistic impression"
    },
    camera: {
        "Kuş Bakışı": "aerial view, bird's eye view, drone shot, site plan view",
        "Göz Hızası": "eye-level perspective, street view, 35mm lens, human scale perspective",
        "Cephe": "straight front facade view, elevation, orthographic projection, architectural drawing style",
        "İç Mekan": "wide angle interior shot, 16mm lens, interior photography",
        "Detay": "close-up architectural detail, depth of field, 85mm lens, macro texture focus, bokeh"
    },
    extras: {
        "Mobilyalı": "fully furnished, detailed interior decoration, designer furniture pieces",
        "Peyzaj": "landscaped gardens, trees, foliage, botanical elements, realistic vegetation",
        "İnsanlar": "walking people for scale, lively atmosphere, motion blur on people",
        "Araçlar": "parked luxury cars"
    }
};

const defaults = {
    projectType: "Architectural structure",
    style: "Modern architecture",
    lighting: "natural daylight, sun lit",
    presentation: "8k resolution, photorealistic render, architectural photography, hyperrealistic, ISO 100, f/8 aperture"
};

const renderFocusMapping = {
    "Exterior": "Exterior architectural render, facade view, building perspective, architectural visualization",
    "InteriorWide": "Wide angle interior architectural photography, showing full room context, 16mm lens, spacious look, real estate photography style, high ceiling",
    "InteriorEye": "Eye-level interior view, human perspective, realistic standing view, immersive experience, standard 35mm lens",
    "InteriorCinematic": "Cinematic interior shot, dramatic lighting, depth of field, atmospheric, moody, artistic composition, 35mm film look, anamorphic lens flare",
    "Isoplan": "Isometric 3D floor plan render, cutaway view, top-down view of furnished interior, wall section cut, 3d plan visualization, dollhouse view"
};

// --- 2. DOM ELEMENTS & INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('promptForm');
    const generateBtn = document.getElementById('generateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const outputPrompt = document.getElementById('outputPrompt');
    const copyBtn = document.getElementById('copyBtn');
    const themeToggle = document.getElementById('themeToggle');

    // --- 3. GENERATE FUNCTION ---
    function generatePrompt() {
        const formData = new FormData(form);
        let promptParts = [];

        // --- A. STRICT MODE ---
        const strictMode = formData.get('strictMode');
        if (strictMode) {
            promptParts.push("**STRICTLY follow the provided floor plan layout**");
            promptParts.push("exact architectural structure match to input image");
            promptParts.push("do not alter the walls or geometry");
            promptParts.push("maintain exact proportions");
        }

        // --- B. RENDER FOCUS & LENS ---
        const renderFocus = formData.get('renderFocus');
        if (renderFocus && renderFocusMapping[renderFocus]) {
            promptParts.push(renderFocusMapping[renderFocus]);
        }

        // --- C. ROOMS & MEASUREMENTS ---
        const areas = {
            salon: formData.get('area_salon'),
            kitchen: formData.get('area_kitchen'),
            master: formData.get('area_master'),
            room2: formData.get('area_room2'),
            bath: formData.get('area_bath'),
            balcony: formData.get('area_balcony')
        };

        let roomDescriptions = [];
        if (areas.salon) roomDescriptions.push(`Spacious Living Room (${areas.salon}m²) with furniture`);
        if (areas.kitchen) roomDescriptions.push(`Kitchen Area (${areas.kitchen}m²)`);
        if (areas.master) roomDescriptions.push(`Master Bedroom (${areas.master}m²)`);
        if (areas.room2) roomDescriptions.push(`Room (${areas.room2}m²)`);
        if (areas.bath) roomDescriptions.push(`Bathroom (${areas.bath}m²)`);
        if (areas.balcony) roomDescriptions.push(`Balcony (${areas.balcony}m²)`);

        if (roomDescriptions.length > 0) {
            promptParts.push("**Floor plan layout containing: " + roomDescriptions.join(", ") + "**");
            promptParts.push("maintain relative scale and density");
        }

        const usePlanText = formData.get('usePlanText');
        if (usePlanText) {
            promptParts.push("adhere to room size text annotations");
        }

        // --- D. ARCHITECTURAL DETAILS ---
        const projectType = formData.get('projectType');
        promptParts.push(translations.projectType[projectType] || defaults.projectType);

        const floorCount = formData.get('floorCount');
        if (floorCount) promptParts.push(translations.floorCount[floorCount]);

        const style = formData.get('style');
        promptParts.push(translations.style[style] || defaults.style);

        const material = formData.get('materials');
        if (material) promptParts.push(translations.materials[material]);

        const color = formData.get('colors');
        if (color) promptParts.push(translations.colors[color]);

        const lighting = formData.get('lighting');
        promptParts.push(translations.lighting[lighting] || defaults.lighting);

        const environment = formData.get('environment');
        if (environment) promptParts.push(translations.environment[environment]);

        const camera = formData.get('camera');
        if (camera) promptParts.push(translations.camera[camera]);

        const presentation = formData.get('presentation');
        promptParts.push(translations.presentation[presentation] || defaults.presentation);

        // --- E. EXTRAS ---
        const extras = [
            formData.get('furniture'),
            formData.get('landscape'),
            formData.get('people'),
            formData.get('cars')
        ];
        extras.forEach(extra => {
            if (extra && translations.extras[extra]) {
                promptParts.push(translations.extras[extra]);
            }
        });

        // --- F. NEGATIVE PROMPT ---
        const negativeInput = formData.get('negativePrompt');
        let finalPrompt = promptParts.join(", ");

        if (negativeInput && negativeInput.trim().length > 0) {
            finalPrompt += ` --no ${negativeInput.trim()}`;
        }

        // --- G. ASPECT RATIO ---
        // New feature implementation
        const ar = formData.get('aspectRatio');
        if (ar) {
            finalPrompt += ` --ar ${ar}`;
        }

        outputPrompt.value = finalPrompt;
    }

    // --- 4. FEATURE: DARK MODE ---
    function initDarkMode() {
        if (!themeToggle) return;
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️ Aydınlık Mod';
        } else {
            themeToggle.classList.remove('dark-mode');
            themeToggle.textContent = '🌙 Karanlık Mod';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            themeToggle.textContent = isDark ? '☀️ Aydınlık Mod' : '🌙 Karanlık Mod';
        });
    }

    // --- 5. FEATURE: LOCAL STORAGE (AUTO SAVE) ---
    function saveFormState() {
        if (!form) return;
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            if (data[key]) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        localStorage.setItem('formState', JSON.stringify(data));
    }

    function loadFormState() {
        const saved = localStorage.getItem('formState');
        if (!saved || !form) return;

        try {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(key => {
                const el = form.elements[key];
                if (!el) return;

                if (el instanceof RadioNodeList) {
                    const values = Array.isArray(data[key]) ? data[key] : [data[key]];
                    el.forEach(input => {
                        if (values.includes(input.value)) {
                            input.checked = true;
                        }
                    });
                } else if (el.type === 'checkbox') {
                    el.checked = true;
                } else {
                    el.value = data[key];
                }
            });
        } catch (e) {
            console.error("Error loading state", e);
        }
    }

    // --- 6. EVENT LISTENERS ---
    if (generateBtn) generateBtn.addEventListener('click', generatePrompt);

    if (resetBtn) resetBtn.addEventListener('click', () => {
        form.reset();
        outputPrompt.value = "";
        localStorage.removeItem('formState');
        // Reset Aspect Ratio logic if needed, but form.reset covers it.
    });

    if (copyBtn) copyBtn.addEventListener('click', () => {
        outputPrompt.select();
        document.execCommand('copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `✅ Kopyalandı!`;
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });

    if (form) {
        form.addEventListener('change', saveFormState);
        form.addEventListener('input', saveFormState);
    }

    // Init Logic
    initDarkMode();
    loadFormState();
});
