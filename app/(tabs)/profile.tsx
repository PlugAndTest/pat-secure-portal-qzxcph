
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const socialLinks = [
    {
      name: 'Website',
      icon: 'globe',
      url: 'https://plugandtest.com',
    },
    {
      name: 'Facebook',
      icon: 'link',
      url: 'https://facebook.com/plugandtest',
    },
    {
      name: 'Twitter',
      icon: 'link',
      url: 'https://twitter.com/plugandtest',
    },
    {
      name: 'LinkedIn',
      icon: 'link',
      url: 'https://linkedin.com/company/plugandtest',
    },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open link');
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar,
        ]}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={commonStyles.card}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Company:</Text>
            <Text style={styles.infoValue}>{user?.company || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{user?.phone || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account Type:</Text>
            <Text style={styles.infoValue}>
              {user?.role === 'admin' ? 'Administrator' : 'Client'}
            </Text>
          </View>
        </View>

        <View style={commonStyles.card}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <Text style={styles.sectionSubtitle}>
            Stay connected with Plug And Test
          </Text>
          <View style={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.socialLink}
                onPress={() => openLink(link.url)}
              >
                <IconSymbol name={link.icon} size={20} color={colors.primary} />
                <Text style={styles.socialLinkText}>{link.name}</Text>
                <IconSymbol
                  name="chevron.right"
                  size={16}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={commonStyles.card}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity
            style={styles.supportItem}
            onPress={() => Alert.alert('Help', 'Help documentation coming soon')}
          >
            <IconSymbol name="questionmark.circle" size={20} color={colors.primary} />
            <Text style={styles.supportText}>Help & FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportItem}
            onPress={() => Linking.openURL('mailto:support@plugandtest.com')}
          >
            <IconSymbol name="envelope" size={20} color={colors.primary} />
            <Text style={styles.supportText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[buttonStyles.secondary, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={buttonStyles.text}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  contentWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  socialLinks: {
    gap: 8,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  socialLinkText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  supportText: {
    fontSize: 16,
    color: colors.text,
  },
  logoutButton: {
    marginTop: 24,
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 24,
  },
});
