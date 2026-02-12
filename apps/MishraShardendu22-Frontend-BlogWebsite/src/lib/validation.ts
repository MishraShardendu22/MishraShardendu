// Validation utilities for frontend

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' }
  }

  return { isValid: true }
}

/**
 * Validate password strength
 * Requirements: min 8 chars, at least one uppercase, one lowercase, one number, one special char
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' }
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' }
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' }
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' }
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' }
  }

  return { isValid: true }
}

/**
 * Validate name (2-50 characters, letters and spaces only)
 */
export function validateName(name: string): ValidationResult {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Name is required' }
  }

  const trimmedName = name.trim()

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' }
  }

  if (trimmedName.length > 50) {
    return { isValid: false, error: 'Name must not exceed 50 characters' }
  }

  if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    return { isValid: false, error: 'Name can only contain letters and spaces' }
  }

  return { isValid: true }
}

/**
 * Validate OTP (6 digits)
 */
export function validateOTP(otp: string): ValidationResult {
  if (!otp || !otp.trim()) {
    return { isValid: false, error: 'OTP is required' }
  }

  if (!/^\d{6}$/.test(otp.trim())) {
    return { isValid: false, error: 'OTP must be 6 digits' }
  }

  return { isValid: true }
}

/**
 * Validate blog title (5-200 characters)
 */
export function validateBlogTitle(title: string): ValidationResult {
  if (!title || !title.trim()) {
    return { isValid: false, error: 'Title is required' }
  }

  const trimmedTitle = title.trim()

  if (trimmedTitle.length < 5) {
    return { isValid: false, error: 'Title must be at least 5 characters long' }
  }

  if (trimmedTitle.length > 200) {
    return { isValid: false, error: 'Title must not exceed 200 characters' }
  }

  return { isValid: true }
}

/**
 * Validate blog content (minimum 50 characters)
 */
export function validateBlogContent(content: string): ValidationResult {
  if (!content || !content.trim()) {
    return { isValid: false, error: 'Content is required' }
  }

  const trimmedContent = content.trim()

  if (trimmedContent.length < 50) {
    return { isValid: false, error: 'Content must be at least 50 characters long' }
  }

  if (trimmedContent.length > 50000) {
    return { isValid: false, error: 'Content is too long (max 50,000 characters)' }
  }

  return { isValid: true }
}

/**
 * Validate comment content (5-1000 characters)
 */
export function validateCommentContent(content: string): ValidationResult {
  if (!content || !content.trim()) {
    return { isValid: false, error: 'Comment cannot be empty' }
  }

  const trimmedContent = content.trim()

  if (trimmedContent.length < 5) {
    return { isValid: false, error: 'Comment must be at least 5 characters long' }
  }

  if (trimmedContent.length > 1000) {
    return { isValid: false, error: 'Comment must not exceed 1000 characters' }
  }

  return { isValid: true }
}

/**
 * Validate tag (1-30 characters, alphanumeric and hyphens)
 */
export function validateTag(tag: string): ValidationResult {
  if (!tag || !tag.trim()) {
    return { isValid: false, error: 'Tag cannot be empty' }
  }

  const trimmedTag = tag.trim()

  if (trimmedTag.length < 1) {
    return { isValid: false, error: 'Tag is too short' }
  }

  if (trimmedTag.length > 30) {
    return { isValid: false, error: 'Tag must not exceed 30 characters' }
  }

  if (!/^[a-zA-Z0-9-]+$/.test(trimmedTag)) {
    return { isValid: false, error: 'Tag can only contain letters, numbers, and hyphens' }
  }

  return { isValid: true }
}
