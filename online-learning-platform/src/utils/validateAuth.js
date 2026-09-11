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
