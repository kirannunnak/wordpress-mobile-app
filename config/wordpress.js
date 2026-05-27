let WORDPRESS_URL = 'https://wordpress.example.com'; // Change this to your WordPress URL

export const getWordPressURL = () => {
  return WORDPRESS_URL;
};

export const setWordPressURL = (url) => {
  WORDPRESS_URL = url.replace(/\/$/, ''); // Remove trailing slash
};

// Default WordPress REST API endpoints
export const API_ENDPOINTS = {
  POSTS: '/wp-json/wp/v2/posts',
  CATEGORIES: '/wp-json/wp/v2/categories',
  PAGES: '/wp-json/wp/v2/pages',
  COMMENTS: '/wp-json/wp/v2/comments',
  USERS: '/wp-json/wp/v2/users',
  MEDIA: '/wp-json/wp/v2/media',
};
