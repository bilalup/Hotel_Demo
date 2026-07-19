export const AUTO_ADMIN_EMAILS = ["bstech500@gmail.com", "bssmoothtech@gmail.com"];

export function isAutoAdminEmail(email) {
  return AUTO_ADMIN_EMAILS.includes(String(email).toLowerCase());
}
