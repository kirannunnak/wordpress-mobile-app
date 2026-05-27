import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getWordPressURL } from '../config/wordpress';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      const response = await axios.get(
        `${getWordPressURL()}/wp-json/wp/v2/posts?search=${searchQuery}&per_page=20&_embed`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching posts:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.postExcerpt} numberOfLines={2}>
            {item.excerpt.rendered.replace(/<[^>]*>/g, '')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSearchResults([]);
                setSearched(false);
              }}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {!loading && searched && searchResults.length === 0 && (
        <View style={styles.centerContainer}>
          <Ionicons name="search" size={60} color="#ccc" />
          <Text style={styles.noResultsText}>No posts found</Text>
        </View>
      )}

      {!loading && !searched && (
        <View style={styles.centerContainer}>
          <Ionicons name="search" size={60} color="#ccc" />
          <Text style={styles.noResultsText}>Enter a search query</Text>
        </View>
      )}

      {!loading && searched && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <Text style={styles.resultCount}>
              Found {searchResults.length} result(s)
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCard: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
  },
  postContent: {
    padding: 12,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  postExcerpt: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
  },
  resultCount: {
    fontSize: 14,
    color: '#666',
    padding: 15,
    fontWeight: '600',
  },
});

export default SearchScreen;
