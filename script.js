// Translation and Mapping Database
const translations = {
    projectType: {
        "Konut": "Residential house, modern home architecture",
        "Villa": "Luxury villa, contemporary residence",
        "Ofis": "Modern office building, corporate headquarters, glass facade",
        "Ticari": "Commercial building, retail store, shopping complex",
        "İç Mekan": "Interior design, architectural interior, realistic room",
        "Kafe": "Cozy cafe, restaurant interior, hospitality design",
        "Otel": "Luxury hotel building, resort architecture"
    },
    floorCount: {
        "Tek katlı": "single story, low-rise",
        "İki katlı": "two-story, duplex",
        "Çok katlı": "multi-story, mid-rise building",
        "Gökdelen": "skyscraper, high-rise tower"
    },
    materials: {
        "Beton": "raw concrete texture, brutalist architecture, exposed concrete",
        "Ahşap": "natural timber cladding, wood siding, warm tones",
        "Cam": "floor-to-ceiling glass windows, transparent facade, curtain wall",
        "Taş": "natural stone cladding, textured stone wall",
        "Tuğla": "red brick facade, exposed brickwork",
        "Metal": "metallic facade, steel structure, aluminium panels",
        "Sıva": "clean white stucco, minimal white facade"
    },
    colors: {
        "Modern": "neutral color palette, white and grey tones",
        "Sıcak": "warm earth tones, beige and brown palette",
        "Koyu": "dark monochromatic tones, black and charcoal",
        "Pastel": "soft pastel colors, light airy atmosphere",
        "Doğal": "natural organic colors, green and wood tones"
    },
    lighting: {
        "Gün Işığı": "bright natural daylight, sunny day, clear blue sky",
        "Altın Saat": "golden hour lighting, warm sunset light, long shadows",
        "Akşam": "night time, cinematic exterior lighting, glowing windows, blue hour",
        "Bulutlu": "overcast soft light, diffused light, moody atmosphere",
        "Sinematik": "dramatic cinematic lighting, high contrast, studio lighting"
    },
    environment: {
        "Şehir": "urban street context, city background, sidewalk",
        "Bahçe": "lush green garden, manicured lawn, trees",
        "Deniz": "seaside location, ocean view background, beach",
        "Orman": "forest surroundings, pine trees, nature",
        "Boş": "clean studio background, minimalist setting"
    },
    style: {
        "Modern": "Modern architecture, clean lines, contemporary design",
        "Minimalist": "Minimalist architecture, simple geometry, less is more",
        "Klasik": "Classical architecture, ornamental details, traditional",
        "Endüstriyel": "Industrial loft style, exposed steel and pipes",
        "İskandinav": "Scandinavian design, nordic style, functional",
        "Brutalist": "Brutalist style, massive geometric structures",
        "Geleneksel": "Traditional vernacular architecture"
    },
    presentation: {
        "Fotorealistik": "8k resolution, photorealistic render, unreal engine 5, architectural photography",
        "Eskiz": "architectural sketch, pencil drawing style, concept art",
        "Maket": "architectural model style, diorama, tilt-shift effect",
        "Suluboya": "watercolor architectural rendering, artistic style"
    },
    camera: {
        "Kuş Bakışı": "aerial view, bird's eye view, drone shot",
        "Göz Hızası": "eye-level perspective, street view",
        "Cephe": "straight front facade view, elevation",
        "İç Mekan": "wide angle interior shot",
        "Detay": "close-up architectural detail, depth of field"
    },
    extras: {
        "Mobilyalı": "fully furnished, detailed interior decoration",
        "Peyzaj": "landscaped gardens, trees, foliage",
        "İnsanlar": "walking people for scale, lively atmosphere",
        "Araçlar": "parked luxury cars"
    }
};

const defaults = {
    projectType: "Architectural structure",
    style: "Modern architecture",
    lighting: "natural daylight",
    presentation: "8k resolution, photorealistic render, architectural photography, hyperrealistic"
};

const renderFocusMapping = {
    "Exterior": "Exterior architectural render, facade view, building perspective",
    "InteriorWide": "Wide angle interior architectural photography, showing full room context, 16mm lens, spacious look, real estate photography style",
    "InteriorEye": "Eye-level interior view, human perspective, realistic standing view, immersive experience, standard lens",
    "InteriorCinematic": "Cinematic interior shot, dramatic lighting, depth of field, atmospheric, moody, artistic composition, 35mm film look",
    "Isoplan": "Isometric 3D floor plan render, cutaway view, top-down view of furnished interior, wall section cut, 3d plan visualization"
};

const roomTranslations = {
    "Salon": "Living room area",
    "Mutfak": "Kitchen area",
    "SalonMutfak": "Open plan living room and kitchen combination, American kitchen style",
    "YatakOdasi": "Bedroom",
    "EbeveynYatak": "Master bedroom",
    "Banyo": "Bathroom",
    "EbeveynBanyo": "En-suite master bathroom",
    "Antre": "Entrance hall, corridor, hallway",
    "Balkon": "Balcony, terrace area",
    "CocukOdasi": "Kids bedroom, children's room"
};

// DOM Elements
const form = document.getElementById('promptForm');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const outputPrompt = document.getElementById('outputPrompt');
const copyBtn = document.getElementById('copyBtn');

// Generate Function
function generatePrompt() {
    const formData = new FormData(form);
    let promptParts = [];

    // --- STRICT MODE CHECK ---
    const strictMode = formData.get('strictMode');
    if (strictMode) {
        // High priority instructions first
        promptParts.push("**STRICTLY follow the provided floor plan layout**");
        promptParts.push("exact architectural structure match to input image");
        promptParts.push("do not alter the walls or geometry");
        promptParts.push("maintain exact proportions");
    } else {
        // Loose/Creative mode implicit
    }

    // --- RENDER FOCUS (NEW) ---
    const renderFocus = formData.get('renderFocus');
    if (renderFocus && renderFocusMapping[renderFocus]) {
        promptParts.push(renderFocusMapping[renderFocus]);
    }

    // --- SPECIFIC ROOM & AREA ---
    // Collect all area inputs
    const areas = {
        salon: formData.get('area_salon'),
        kitchen: formData.get('area_kitchen'),
        master: formData.get('area_master'),
        room2: formData.get('area_room2'),
        bath: formData.get('area_bath'),
        balcony: formData.get('area_balcony')
    };

    let roomDescriptions = [];
    if (areas.salon) roomDescriptions.push(`Spacious Living Room (${areas.salon}m²) with full furniture set`);
    if (areas.kitchen) roomDescriptions.push(`Kitchen Area (${areas.kitchen}m²)`);
    if (areas.master) roomDescriptions.push(`Master Bedroom (${areas.master}m²) with large bed`);
    if (areas.room2) roomDescriptions.push(`Secondary Bedroom (${areas.room2}m²)`);
    if (areas.bath) roomDescriptions.push(`Bathroom (${areas.bath}m²)`);
    if (areas.balcony) roomDescriptions.push(`Balcony (${areas.balcony}m²)`);

    if (roomDescriptions.length > 0) {
        promptParts.push("**Floor plan layout containing: " + roomDescriptions.join(", ") + "**");
        promptParts.push("maintain relative scale and furniture density according to square meter sizes");
    }

    const usePlanText = formData.get('usePlanText');
    if (usePlanText) {
        promptParts.push("read and adhere to room size text annotations in the plan");
        promptParts.push("construct room proportions exactly as written in the plan");
    }

    // 1. Basic Info
    const projectType = formData.get('projectType');
    // If we have a specific room focus, the generic project type might be less relevant, but still good for context.
    promptParts.push(translations.projectType[projectType] || defaults.projectType);

    const floorCount = formData.get('floorCount');
    if (floorCount) promptParts.push(translations.floorCount[floorCount]);

    // Area handled implicitly by scale

    // 2. Style
    const style = formData.get('style');
    promptParts.push(translations.style[style] || defaults.style);

    // 3. Visualization Details
    const material = formData.get('materials');
    if (material) promptParts.push(translations.materials[material]);

    const color = formData.get('colors');
    if (color) promptParts.push(translations.colors[color]);

    const lighting = formData.get('lighting');
    promptParts.push(translations.lighting[lighting] || defaults.lighting);

    const environment = formData.get('environment');
    if (environment) promptParts.push(translations.environment[environment]);

    // 4. Camera & Presentation
    const camera = formData.get('camera');
    if (camera) promptParts.push(translations.camera[camera]);

    const presentation = formData.get('presentation');
    promptParts.push(translations.presentation[presentation] || defaults.presentation);

    // 5. Extras
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

    // 6. Quality Boosters
    promptParts.push("highly detailed, professional render, architectural visualization, sharp focus");

    // Join and display
    const finalPrompt = promptParts.join(", ");
    outputPrompt.value = finalPrompt;
}

// Event Listeners
generateBtn.addEventListener('click', generatePrompt);

resetBtn.addEventListener('click', () => {
    form.reset();
    outputPrompt.value = "";
});

copyBtn.addEventListener('click', () => {
    outputPrompt.select();
    document.execCommand('copy');
    
    // Visual feedback
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Kopyalandı!
    `;
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
    }, 2000);
});
