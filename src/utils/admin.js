const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS ?? '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

export function isAdminUser(user) {
  if (!user?.email) return false
  return adminEmails.includes(user.email.toLowerCase())
}
