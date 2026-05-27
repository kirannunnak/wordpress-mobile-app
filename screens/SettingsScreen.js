import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWordPressURL, setWordPressURL } from '../config/wordpress';

const SettingsScreen = () => {
  const [wordPressUrl, setWordPressUrlState] = useState(getWordPressURL());
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveURL = async () => {
    if (!wordPressUrl.trim()) {
      Alert.alert('Error', 'Please enter a WordPress URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(wordPressUrl);
      setWordPressURL(wordPressUrl);
      setIsEditing(false);
      Alert.alert('Success', 'WordPress URL updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Please enter a valid URL');
    }
  };

  const handleReset = () => {
    setWordPressUrlState(getWordPressURL());
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings" size={40} color="#007AFF" />
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WordPress Configuration</Text>

        {isEditing ? (
          <View>
            <Text style={styles.label}>WordPress URL</Text>
            <TextInput
              style={styles.urlInput}
              value={wordPressUrl}
              onChangeText={setWordPressUrlState}
              placeholder="https://example.com"
              autoCapitalize="none"
              keyboardType="url"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveURL}
              >
                <Ionicons name="checkmark" size={20} color="white" />
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleReset}
              >
                <Ionicons name="close" size={20} color="white" />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.configCard}>
              <Text style={styles.label}>Current WordPress URL</Text>
              <Text style={styles.urlText} numberOfLines={2}>
                {wordPressUrl}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => setIsEditing(true)}
              >
                <Ionicons name="pencil" size={18} color="white" />
                <Text style={styles.buttonText}>Edit URL</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Built with</Text>
            <Text style={styles.infoValue}>React Native</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Framework</Text>
            <Text style={styles.infoValue}>Expo</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Browse WordPress Posts</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Explore Categories</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Full Text Search</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Share Posts</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Pull to Refresh</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This app connects to your WordPress site via REST API
        </Text>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  section: {
    marginTop: 15,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  configCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  urlText: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 15,
    fontWeight: '500',
  },
  urlInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  featureList: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});

export default SettingsScreen;
