import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getWordPressURL } from '../config/wordpress';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${getWordPressURL()}/wp-json/wp/v2/categories?per_page=50`
      );
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchCategories().then(() => setRefreshing(false));
  }, []);

  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() =>
          navigation.navigate('CategoryPosts', {
            categoryId: item.id,
            categoryName: item.name,
          })
        }
      >
        <View style={styles.categoryIconContainer}>
          <Ionicons name="folder" size={30} color="#007AFF" />
        </View>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.postCount}>{item.count} posts</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#ccc" />
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
          onPress={fetchCategories}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories.filter((cat) => cat.count > 0)}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text>No categories found</Text>
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
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryIconContainer: {
    marginRight: 15,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  postCount: {
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

export default CategoriesScreen;
