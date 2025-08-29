
// Toggle sidebar menu
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('closeBtn');
  const navbar = document.getElementById('navbar');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  }

  // Close menu when clicking a nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });
});


// MODE //

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mode-toggle');
  const body = document.body;

  toggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Toggle icon text between 'toggle_off' and 'toggle_on'
    if (body.classList.contains('dark-mode')) {
      toggle.textContent = 'toggle_on';
    } else {
      toggle.textContent = 'toggle_off';
    }
  });
});

// ITEMS SCROLLING //
function scrollLeft() {
  const container = document.querySelector('.scroll-container');
  const current = container.scrollLeft;
  if (current > 0) {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }
}

function scrollRight() {
  const container = document.querySelector('.scroll-container');
  const maxScroll = container.scrollWidth - container.clientWidth;
  if (container.scrollLeft < maxScroll) {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }
}


// STATS COUNTERS //
  document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = target / 100;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
});
// VILLA //
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.property-image');
  let current = 0;

  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 8000); // 8 seconds
});

// sorting //

  const filterLocation = document.getElementById('filter-location');
  const filterType = document.getElementById('filter-type');
  const filterBedrooms = document.getElementById('filter-bedrooms');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const sortBy = document.getElementById('sort-by');
  const cards = document.querySelectorAll('.property-card');
  const grid = document.querySelector('.property-grid');

  function updatePriceDisplay() {
    priceValue.textContent = parseInt(priceRange.value).toLocaleString();
  }

  function filterListings() {
    const loc = filterLocation.value;
    const type = filterType.value;
    const beds = parseInt(filterBedrooms.value) || 0;
    const maxPrice = parseInt(priceRange.value);

    cards.forEach(card => {
      const matchLoc = !loc || card.dataset.location === loc;
      const matchType = !type || card.dataset.type === type;
      const matchBeds = parseInt(card.dataset.bedrooms) >= beds;
      const matchPrice = parseInt(card.dataset.price) <= maxPrice;

      if (matchLoc && matchType && matchBeds && matchPrice) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  function sortListings() {
    const sort = sortBy.value;
    const sortedCards = Array.from(cards).sort((a, b) => {
      const priceA = parseInt(a.dataset.price);
      const priceB = parseInt(b.dataset.price);
      return sort === "price-low" ? priceA - priceB : priceB - priceA;
    });
    sortedCards.forEach(card => grid.appendChild(card));
  }

  // Event Listeners
  [filterLocation, filterType, filterBedrooms].forEach(el => el.addEventListener('change', filterListings));
  priceRange.addEventListener('input', () => {
    updatePriceDisplay();
    filterListings();
  });
  sortBy.addEventListener('change', sortListings);

  // Initial Display
  updatePriceDisplay();

