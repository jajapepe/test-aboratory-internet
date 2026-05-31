// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const formMessage = document.getElementById('formMessage');

// Form fields
const fields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  comment: document.getElementById('comment')
};

const errorElements = {
  name: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  phone: document.getElementById('phoneError'),
  comment: document.getElementById('commentError')
};

// Validation functions
function validateField(field) {
  const value = field.value.trim();
  const errorEl = errorElements[field.id];
  let error = '';

  switch (field.id) {
    case 'name':
      if (!value) {
        error = 'Имя обязательно';
      } else if (value.length < 2) {
        error = 'Имя должно быть минимум 2 символа';
      } else if (value.length > 100) {
        error = 'Имя должно быть максимум 100 символов';
      }
      break;
      
    case 'email':
      if (!value) {
        error = 'Email обязателен';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Некорректный email';
      }
      break;
      
    case 'phone':
      if (!value) {
        error = 'Телефон обязателен';
      } else if (!/^[\d\s\-\+\(\)]{10,20}$/.test(value)) {
        error = 'Некорректный номер телефона';
      }
      break;
      
    case 'comment':
      if (!value) {
        error = 'Комментарий обязателен';
      } else if (value.length < 10) {
        error = 'Комментарий должен быть минимум 10 символов';
      } else if (value.length > 1000) {
        error = 'Комментарий должен быть максимум 1000 символов';
      }
      break;
  }

  if (error) {
    errorEl.textContent = error;
    field.classList.add('error');
    return false;
  } else {
    errorEl.textContent = '';
    field.classList.remove('error');
    return true;
  }
}

function validateForm() {
  let isValid = true;
  
  Object.values(fields).forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// Clear field error on input
Object.values(fields).forEach(field => {
  field.addEventListener('input', () => {
    validateField(field);
  });
});

// Set loading state
function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.style.display = loading ? 'none' : 'inline';
  btnLoading.style.display = loading ? 'inline' : 'none';
}

// Show form message
function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = 'form-message ' + type;
  
  setTimeout(() => {
    formMessage.className = 'form-message';
  }, 5000);
}

// Submit form
async function handleSubmit(event) {
  event.preventDefault();
  
  if (!validateForm()) {
    showMessage('Пожалуйста, исправьте ошибки в форме', 'error');
    return;
  }
  
  setLoading(true);
  formMessage.className = 'form-message';
  
  const formData = {
    name: fields.name.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    comment: fields.comment.value.trim()
  };

  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showMessage(data.message, 'success');
      contactForm.reset();
      Object.values(fields).forEach(field => {
        errorElements[field.id].textContent = '';
        field.classList.remove('error');
      });
    } else {
      const errorMsg = data.errors 
        ? data.errors.map(e => e.message).join('. ')
        : data.message || 'Ошибка при отправке формы';
      showMessage(errorMsg, 'error');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showMessage('Ошибка соединения с сервером. Пожалуйста, попробуйте позже.', 'error');
  } finally {
    setLoading(false);
  }
}

// Event listeners
contactForm.addEventListener('submit', handleSubmit);

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      navLinks?.classList.remove('active');
    }
  });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

console.log('Portfolio loaded successfully!');
