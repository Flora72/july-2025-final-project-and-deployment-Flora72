// Form validation for tribute submission
function validateTributeForm() {
  const tributeText = document.getElementById('tribute');
  const category = document.getElementById('category');

  if (!tributeText.value.trim()) {
    alert('Please write something for your tribute.');
    return false;
  }

  if (!category.value) {
    alert('Please select a category.');
    return false;
  }

  return true;
}

// Attach validation to form submission
const tributeForm = document.querySelector('form');
if (tributeForm) {
  tributeForm.addEventListener('submit', function (e) {
    if (!validateTributeForm()) {
      e.preventDefault();
    }
  });
}

// Filter tribute cards by category
function filterStories(category) {
  const cards = document.querySelectorAll('.tribute-card');

  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Attach filter logic to dropdown
const filterDropdown = document.getElementById('filter');
if (filterDropdown) {
  filterDropdown.addEventListener('change', function () {
    const selected = this.value;
    filterStories(selected);
  });
}

// Utility function: get element safely
function getElement(id) {
  const el = document.getElementById(id);
  return el ? el : null;
}

// Example of scoped logic with return value
function isEmpty(inputId) {
  const input = getElement(inputId);
  return input && input.value.trim() === '';
}

// Save tribute to localStorage
function saveTribute(name, message, category) {
  const tributes = JSON.parse(localStorage.getItem('tributes')) || [];
  const newTribute = {
    name,
    message,
    category,
    timestamp: new Date().toISOString()
  };
  tributes.push(newTribute);
  localStorage.setItem('tributes', JSON.stringify(tributes));
}

// Render tribute cards from localStorage
function renderTributes() {
  const container = document.getElementById('tribute-container');
  if (!container) return;

  container.innerHTML = ''; // Clear existing

  const tributes = JSON.parse(localStorage.getItem('tributes')) || [];

  tributes.forEach(({ name, message, category, timestamp }) => {
    const card = document.createElement('div');
    card.className = 'tribute-card';
    card.setAttribute('data-category', category);

    card.innerHTML = `
      <h3>${name || 'Anonymous'}</h3>
      <p>${message}</p>
      <em>${new Date(timestamp).toLocaleString()} • ${category}</em>
    `;

    container.appendChild(card);
  });
}

// Attach validation and saving to form
if (tributeForm) {
  tributeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateTributeForm()) return;

    const name = getElement('name')?.value || 'Anonymous';
    const message = getElement('tribute')?.value;
    const category = getElement('category')?.value;

    saveTribute(name, message, category);
    renderTributes();
    tributeForm.reset();
  });
}

// Load tributes on page load
document.addEventListener('DOMContentLoaded', renderTributes);

// Filtering logic remains unchanged
