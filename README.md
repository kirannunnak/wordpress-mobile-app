# WordPress Mobile App

A mobile application built with React Native and Expo to display your WordPress website.

## Features

✅ **Browse Posts** - Display all WordPress posts with featured images
✅ **Categories** - Explore posts by category
✅ **Search** - Full-text search functionality
✅ **Post Details** - View complete post content
✅ **Share** - Share posts on social media
✅ **Pull to Refresh** - Refresh content with a pull gesture
✅ **Author Info** - Display post author information
✅ **Responsive Design** - Works on iOS and Android

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- A WordPress website with REST API enabled (default for WordPress 4.7+)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kirannunnak/wordpress-mobile-app.git
cd wordpress-mobile-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Your WordPress URL

Edit the file `config/wordpress.js` and replace the default URL:

```javascript
let WORDPRESS_URL = 'https://your-wordpress-site.com'; // Replace with your WordPress URL
```

## Running the App

### Start the Development Server

```bash
npm start
# or
yarn start
```

This will open the Expo CLI menu with the following options:

### On iOS

```bash
npm run ios
```

Requirements:
- macOS
- Xcode (installed via App Store)

### On Android

```bash
npm run android
```

Requirements:
- Android Studio
- Android SDK
- Android Emulator running

### On Web Browser

```bash
npm run web
```

Open your browser and navigate to `http://localhost:19006`

### Using Expo Go App

1. Download the **Expo Go** app from:
   - [iOS App Store](https://apps.apple.com/us/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Run `npm start` in your project directory

3. Scan the QR code with Expo Go app (Android) or your iPhone camera (iOS)

## Project Structure

```
wordpress-mobile-app/
├── App.js                 # Main app entry point
├── package.json           # Project dependencies
├── app.json               # Expo configuration
├── config/
│   └── wordpress.js       # WordPress API configuration
├── screens/
│   ├── PostsScreen.js     # Display all posts
│   ├── PostDetailScreen.js # Show full post content
│   ├── CategoriesScreen.js # Browse categories
│   ├── SearchScreen.js     # Search posts
│   └── SettingsScreen.js   # App settings
└── README.md              # This file
```

## API Configuration

The app uses the WordPress REST API. By default, WordPress has REST API enabled, but you can verify by:

1. Visit: `https://your-site.com/wp-json/wp/v2/posts`
2. You should see JSON data of your posts

### Troubleshooting

If you get CORS errors:

1. Install the CORS plugin: [CORS Headers](https://wordpress.org/plugins/allow-origin/)
2. Or add this to your WordPress `functions.php`:

```php
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: *');
});
```

## Available Screens

### Home (Posts)
- Lists all posts from your WordPress site
- Display featured images
- Pull to refresh
- Tap to view full post

### Categories
- Browse all categories
- See post count per category
- Filter posts by category

### Search
- Search posts by keyword
- Full-text search across title and content
- Instant search results

### Settings
- Change WordPress URL
- View app information
- App features overview

## Customization

### Change App Colors

Edit the color values in the screen files:

```javascript
backgroundColor: '#007AFF', // Change to your brand color
```

### Modify Post Display

Edit `screens/PostsScreen.js` to customize:
- Number of posts per page (modify `per_page=10`)
- Post card layout
- Featured image size

### Add More Features

You can extend the app with:
- User authentication
- Comments section
- Bookmarks/Favorites
- Dark mode
- Multi-language support
- Push notifications

## Building for Production

### iOS (Mac Required)

```bash
exp build:ios
```

### Android

```bash
exp build:android
```

Follow the Expo documentation for detailed build instructions.

## Dependencies

- **React Native** - Cross-platform mobile framework
- **Expo** - Platform for developing universal React applications
- **React Navigation** - Navigation library for React Native
- **Axios** - HTTP client for API requests
- **Ionicons** - Icon library

## Troubleshooting

### Issue: "Cannot connect to WordPress API"

**Solution:**
1. Verify your WordPress URL in `config/wordpress.js`
2. Make sure WordPress REST API is accessible
3. Check for CORS errors in browser console
4. Test the API URL directly in browser: `https://your-site.com/wp-json/wp/v2/posts`

### Issue: "Blank screen after launch"

**Solution:**
1. Check that your WordPress URL is correct
2. Verify internet connection
3. Clear Expo cache: `expo start --clear`
4. Check console logs for errors

### Issue: "Images not loading"

**Solution:**
1. Verify featured images are set in WordPress posts
2. Check image URLs are accessible from mobile network
3. Enable CORS if needed

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT License - feel free to use for personal or commercial projects

## Support

For issues and questions:
1. Check WordPress REST API documentation: https://developer.wordpress.org/rest-api/
2. Review Expo documentation: https://docs.expo.dev/
3. Check React Native docs: https://reactnative.dev/

## Changelog

### v1.0.0 (Initial Release)
- Browse WordPress posts
- View post details
- Browse categories
- Search posts
- Share posts
- Settings screen
- Responsive design for iOS and Android

---

**Happy coding!** 🚀
