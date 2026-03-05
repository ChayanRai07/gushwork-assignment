const images = [
"https://picsum.photos/600/400?1",
"https://picsum.photos/600/400?2",
"https://picsum.photos/600/400?3",
"https://picsum.photos/600/400?4"
]

let index = 0

const mainImage = document.getElementById("mainImage")
const thumbnails = document.querySelectorAll('.thumbnails img')

// Function to update main image
function updateMainImage() {
    mainImage.src = images[index]
    // Update thumbnail active state
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index)
    })
    // recalc zoom settings once the new image has loaded
    mainImage.onload = () => {
        setUpZoom();
    };
}

// Initialize thumbnails
thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
        index = i
        updateMainImage()
    })
    // Set initial active state
    if (i === 0) thumb.classList.add('active')
})

document.querySelector(".left").onclick = () => {
    index--
    if(index < 0){
        index = images.length-1
    }
    updateMainImage()
}

document.querySelector(".right").onclick = () => {
    index++
    if(index >= images.length){
        index = 0
    }
    updateMainImage()
}

// FAQ Toggle Functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
	question.addEventListener('click', () => {
		const faqItem = question.parentElement;
		const isActive = faqItem.classList.contains('active');
		
		// Close all other FAQ items
		document.querySelectorAll('.faq-item').forEach((item) => {
			item.classList.remove('active');
		});
		
		// Toggle current item
		if (!isActive) {
			faqItem.classList.add('active');
		}
	});
});

// APPLICATIONS CAROUSEL SCROLL
const appContainer = document.querySelector('.app-cards');
if (appContainer) {
	const leftBtn = document.querySelector('.app-arrow.left');
	const rightBtn = document.querySelector('.app-arrow.right');

	// amount to scroll each time (can be container width or card width)
	const scrollAmount = 320; // approx card width + gap

	leftBtn.addEventListener('click', () => {
		appContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	});
	rightBtn.addEventListener('click', () => {
		appContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	});
}


// ---------- IMAGE ZOOM / MAGNIFIER ----------
let lens, result, cx, cy;

// create the zooming effect for #mainImage and display in #zoomResult
function setUpZoom() {
    result = document.getElementById('zoomResult');
    if (!mainImage || !result) return;
    // clear any existing lens
    if (lens) lens.remove();

    lens = document.createElement('div');
    lens.className = 'img-zoom-lens';
    // insert lens on top of image
    mainImage.parentElement.insertBefore(lens, mainImage);

    // calculate ratio
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    result.style.backgroundImage = `url('${mainImage.src}')`;
    result.style.backgroundSize = (mainImage.width * cx) + 'px ' + (mainImage.height * cy) + 'px';

    lens.addEventListener('mousemove', moveLens);
    mainImage.addEventListener('mousemove', moveLens);
    lens.addEventListener('touchmove', moveLens);
    mainImage.addEventListener('touchmove', moveLens);
}

function updateZoom() {
    if (!result) return;
    result.style.backgroundImage = `url('${mainImage.src}')`;
    result.style.backgroundSize = (mainImage.width * cx) + 'px ' + (mainImage.height * cy) + 'px';
}

function moveLens(e) {
    e.preventDefault();
    const pos = getCursorPos(e);
    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;
    if (x > mainImage.width - lens.offsetWidth) { x = mainImage.width - lens.offsetWidth; }
    if (x < 0) { x = 0; }
    if (y > mainImage.height - lens.offsetHeight) { y = mainImage.height - lens.offsetHeight; }
    if (y < 0) { y = 0; }
    lens.style.left = x + 'px';
    lens.style.top = y + 'px';
    result.style.backgroundPosition = '-' + (x * cx) + 'px -' + (y * cy) + 'px';
}

function getCursorPos(e) {
    const a = mainImage.getBoundingClientRect();
    let x = e.pageX - a.left - window.pageXOffset;
    let y = e.pageY - a.top - window.pageYOffset;
    return {x, y};
}

// initialize zoom after DOM loaded and whenever the main image src changes
window.addEventListener('load', () => {
    setUpZoom();
});

// TAB ACTIVE STATE FOR PROCESS SECTION
const processData = [
	{
		title: "High-Grade Raw Material Selection",
		description: "We source premium PE100 grade HDPE resin with optimal molecular weight distribution and additive packages for superior performance.",
		points: ["PE100 grade material", "Optimal molecular weight distribution", "UV stabilization additives", "Antioxidant protection"],
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
	},
	{
		title: "Advanced Extrusion Process",
		description: "State-of-the-art extrusion technology ensures consistent wall thickness, dimensional accuracy, and material homogeneity.",
		points: ["Precision temperature control", "Consistent melt flow", "Automated process monitoring", "Quality control integration"],
		image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
	},
	{
		title: "Precision Cooling System",
		description: "Controlled cooling in vacuum calibration tanks ensures perfect dimensional stability and surface finish.",
		points: ["Vacuum calibration", "Temperature-controlled water", "Precise diameter control", "Surface finish optimization"],
		image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64"
	},
	{
		title: "Accurate Sizing & Calibration",
		description: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
		points: ["Vacuum sizing technology", "Internal pressure calibration", "Diameter precision ±0.1mm", "Wall thickness uniformity"],
		image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12"
	},
	{
		title: "Comprehensive Quality Control",
		description: "Multi-stage quality inspection ensures every pipe meets international standards and performance specifications.",
		points: ["Dimensional verification", "Pressure testing", "Material property testing", "Visual inspection"],
		image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
	},
	{
		title: "Precision Marking & Identification",
		description: "Each pipe is clearly marked with specifications, standards compliance, and manufacturer identification.",
		points: ["Standard compliance marking", "Size and pressure rating", "Manufacturing date", "Batch traceability"],
		image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866"
	},
	{
		title: "Automated Cutting & Finishing",
		description: "Computer-controlled cutting ensures accurate lengths and clean, burr-free ends for perfect fusion welding.",
		points: ["Precision length cutting", "Clean end finishing", "Automated measurement", "Quality assurance"],
		image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e"
	},
	{
		title: "Professional Packaging & Storage",
		description: "Careful packaging and storage procedures protect pipes during transportation and ensure they arrive in perfect condition.",
		points: ["Protective packaging", "Secure bundling", "Climate-controlled storage", "Logistics optimization"],
		image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
	}
];

document.querySelectorAll('.process-tabs .tab').forEach((tab, idx) => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.process-tabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Update content based on selected tab
    const processInfo = document.querySelector('.process-info');
    const processImage = document.querySelector('.process-image img');
    
    processInfo.innerHTML = `
      <h2>${processData[idx].title}</h2>
      <p>${processData[idx].description}</p>
      <ul>
        ${processData[idx].points.map(point => `<li>${point}</li>`).join('')}
      </ul>
    `;
    
    processImage.src = processData[idx].image;
    processImage.alt = processData[idx].title;
  });

	// modal functionality for download and quote forms
	// modal functionality for download and quote forms
	function setupModal(buttonId, modalId) {
		const btn = document.getElementById(buttonId);
		const modal = document.getElementById(modalId);
		if (!btn || !modal) return;
		btn.addEventListener('click', () => {
			modal.classList.add('active');
		});
	}

	// initialize modal behavior after DOM is ready (handles case when script loads before modals)
	document.addEventListener('DOMContentLoaded', () => {
		setupModal('downloadBtn', 'modal-download');
		setupModal('quoteBtn', 'modal-quote');

		// close buttons inside modals
		document.querySelectorAll('.modal .close').forEach(closeBtn => {
			closeBtn.addEventListener('click', () => {
				const m = closeBtn.closest('.modal');
				if (m) m.classList.remove('active');
			});
		});

		// clicking outside content closes modal
		window.addEventListener('click', (e) => {
			if (e.target.classList.contains('modal')) {
				e.target.classList.remove('active');
			}
		});
	});
});