import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getWordPressURL } from '../config/wordpress';

const PostDetailScreen = ({ route }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id, title } = route.params;

  useEffect(() => {
    fetchPostDetail();
  }, [id]);

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${getWordPressURL()}/wp-json/wp/v2/posts/${id}?_embed`
      );
      setPost(response.data);
    } catch (err) {
      setError('Failed to load post details');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${post.title.rendered}\n${post.link}`,
        url: post.link,
        title: post.title.rendered,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Post not found'}</Text>
      </View>
    );
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const categories = post._embedded?.['wp:term']?.[0]?.map((cat) => cat.name) || [];

  return (
    <ScrollView style={styles.container}>
      {featuredImage && (
        <Image source={{ uri: featuredImage }} style={styles.featuredImage} />
      )}

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{post.title.rendered}</Text>
            <Text style={styles.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-social" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {categories.length > 0 && (
          <View style={styles.categories}>
            {categories.map((cat, index) => (
              <View key={index} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{cat}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.authorSection}>
          <Text style={styles.authorLabel}>Author:</Text>
          <Text style={styles.authorName}>
            {post._embedded?.author?.[0]?.name || 'Unknown'}
          </Text>
        </View>

        <Text style={styles.bodyText}>
          {post.content.rendered.replace(/<[^>]*>/g, '')}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  shareButton: {
    padding: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  categoryTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  authorSection: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  authorLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
  },
});

export default PostDetailScreen;
