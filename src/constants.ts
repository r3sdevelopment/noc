export const BASE_URL = process.env.NODE_ENV === "development" ? 'http://localhost:8000' : 'https://api.r3s.dev';
export const POSTS_URL = `${BASE_URL}/posts`;
export const ADMIN_POSTS_URL = `${BASE_URL}/admin/posts`;
