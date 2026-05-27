import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { getWordPressURL } from '../config/wordpress';

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const categoryId = route?.params?.categoryId;

  useEffect(() => {
    fetchPosts();
  }, [categoryId]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = categoryId
        ? `${getWordPressURL()}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=10&_embed`
        : `${getWordPressURL()}/wp-json/wp/v2/posts?per_page=10&_embed`;

      const response = await axios.get(url);
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts. Check your WordPress URL in config.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts().then(() => setRefreshing(false));
  }, [categoryId]);

  const renderPost = ({ item }) => {
    const featuredImage = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return (
      <TouchableOpacity
        style={styles.postCard}
        onPress={() =>
          navigation.navigate('PostDetail', {
            id: item.id,
            title: item.title.rendered,
          })
        }
      >
        {featuredImage && (
          <Image source={{ uri: featuredImage }} style={styles.postImage} />
        )}
        <View style={styles.postContent}>
          <Text style={styles.postTitle} numberOfLines={2}>
            {item.title.rendered}
          </Text>
          <Text style={styles.postExcerpt} numberOfLines={3}>
            {item.excerpt.rendered.replace(/<[^>]*>/g, '')}
          </Text>
          <Text style={styles.postDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchPosts}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text>No posts found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  postCard: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  postImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  postContent: {
    padding: 15,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postExcerpt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  postDate: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostsScreen;
