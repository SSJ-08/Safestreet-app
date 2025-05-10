import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  isLoggedIn: boolean;
  onNavigate: (screen: string) => void;
  fullName?: string;
};

const TopNavBar: React.FC<Props> = ({ isLoggedIn, onNavigate, fullName }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>SafeStreet</Text>
      </View>

      {!isLoggedIn ? (
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={() => onNavigate('login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity onPress={() => onNavigate('signup')}>
            <Text style={styles.link}>Signup</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.navMenu}>
          <TouchableOpacity onPress={() => onNavigate('UserDashboard')}>
            <Text style={styles.navItem}>Home</Text>
          </TouchableOpacity>

          <View style={styles.fabContainer}>
            <TouchableOpacity style={styles.fab} onPress={() => onNavigate('imageUpload')}>
              <Ionicons name="cloud-upload-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => onNavigate('history')}>
            <Text style={styles.navItem}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDropdownVisible(true)}>
            <Ionicons name="menu-outline" size={28} color="white" />
          </TouchableOpacity>

          <Modal transparent visible={dropdownVisible} animationType="fade">
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setDropdownVisible(false)}>
              <View style={[styles.dropdown, { width: screenWidth }]}>
                <Text style={styles.dropdownText}>Hello, {fullName || 'User'}</Text>
                <TouchableOpacity onPress={() => onNavigate('logout')}>
                  <Text style={styles.dropdownText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    position: 'relative',
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 30, height: 30, marginRight: 8 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  rightSection: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  link: { color: 'white', fontSize: 16 },
  separator: { color: 'white', marginHorizontal: 5 },
  navMenu: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  navItem: { color: 'white', fontSize: 16 },
  fabContainer: { position: 'relative', top: -10 },
  fab: {
    backgroundColor: 'green',
    borderRadius: 30,
    padding: 12,
    elevation: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi-transparent background
  },
  dropdown: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    top: 60, // adjusted to keep the dropdown below the navbar
    left: 0,
    zIndex: 30,
  },
  dropdownText: { color: 'white', paddingVertical: 5 },
});

export default TopNavBar;
