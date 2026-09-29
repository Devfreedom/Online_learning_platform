const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim())
}

export function validateSignIn({ email = '', password = '' }) {
  const errors = {}
  if (!email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!password) {
    errors.password = 'Enter your password.'
  }
  return errors
}

export function validateSignUp({ name = '', email = '', password = '' }) {
  const errors = {}
  if (!name.trim()) {
    errors.name = 'Enter your name.'
  }
  if (!email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!password) {
    errors.password = 'Create a password.'
  } else if (password.length < 8) {
    errors.password = 'Use at least 8 characters.'
  }
  return errors
}

export function validatePasswordReset({ email = '' }) {
  const errors = {}
  if (!email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }
  return errors
}

export function validateIdentityStep({
  fullName = '',
  email = '',
  password = '',
  confirmPassword = '',
}) {
  const errors = {}
  if (!fullName.trim()) {
    errors.fullName = 'Enter your full name.'
  }
  if (!email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!password) {
    errors.password = 'Create a password.'
  } else if (password.length < 8) {
    errors.password = 'Use at least 8 characters.'
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (password && password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match.'
  }
  return errors
}

export function passwordStrength(password = '') {
  const checks = {
    length: password.length >= 8,
    lowerUpper: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }
  const score = Object.values(checks).filter(Boolean).length
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
  return { score, label: labels[password ? score : 0], checks }
}
