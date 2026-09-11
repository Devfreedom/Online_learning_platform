import test from 'node:test'
import assert from 'node:assert/strict'
import {
  isValidEmail,
  validateSignIn,
  validateSignUp,
  validatePasswordReset,
} from './validateAuth.js'

test('isValidEmail accepts normal addresses and rejects bad ones', () => {
  assert.equal(isValidEmail('learner@example.com'), true)
  assert.equal(isValidEmail('  learner@example.com  '), true)
  assert.equal(isValidEmail('not-an-email'), false)
  assert.equal(isValidEmail('missing@domain'), false)
  assert.equal(isValidEmail(''), false)
})

test('validateSignIn requires email and password', () => {
  assert.deepEqual(validateSignIn({ email: '', password: '' }), {
    email: 'Enter your email address.',
    password: 'Enter your password.',
  })
})

test('validateSignIn rejects a malformed email', () => {
  const errors = validateSignIn({ email: 'bad', password: 'secret123' })
  assert.equal(errors.email, 'Enter a valid email address.')
  assert.equal(errors.password, undefined)
})

test('validateSignIn passes with valid input', () => {
  assert.deepEqual(
    validateSignIn({ email: 'learner@example.com', password: 'secret123' }),
    {},
  )
})

test('validateSignUp requires name and a longer password', () => {
  const errors = validateSignUp({ name: '', email: 'a@b.co', password: 'short' })
  assert.equal(errors.name, 'Enter your name.')
  assert.equal(errors.password, 'Use at least 8 characters.')
})

test('validateSignUp passes with valid input', () => {
  assert.deepEqual(
    validateSignUp({ name: 'Ada', email: 'ada@example.com', password: 'secret123' }),
    {},
  )
})

test('validatePasswordReset requires a valid email', () => {
  assert.ok(validatePasswordReset({ email: '' }).email)
  assert.ok(validatePasswordReset({ email: 'bad' }).email)
  assert.deepEqual(validatePasswordReset({ email: 'a@b.co' }), {})
})
