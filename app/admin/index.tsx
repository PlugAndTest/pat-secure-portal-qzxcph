
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const adminActions = [
    {
      title: 'Add New Client',
      description: 'Create a new client account and send setup link',
      icon: 'person.badge.plus',
      color: colors.primary,
      action: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
    },
    {
      title: 'Manage Appointments',
      description: 'Schedule and edit client appointments',
      icon: 'calendar.badge.plus',
      color: colors.accent,
      action: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
    },
    {
      title: 'Upload Documents',
      description: 'Upload certificates and invoices',
      icon: 'doc.badge.plus',
      color: colors.primary,
      action: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
    },
    {
      title: 'View All Clients',
      description: 'Access all customer accounts',
      icon: 'person.3',
      color: colors.secondary,
      action: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
    },
    {
      title: 'Equipment Management',
      description: 'Manage equipment testing lists',
      icon: 'wrench.and.screwdriver',
      color: colors.accent,
      action: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>Welcome, {user?.name}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={[commonStyles.card, styles.statCard]}>
            <IconSymbol name="person.3.fill" size={32} color={colors.primary} />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Total Clients</Text>
          </View>
          <View style={[commonStyles.card, styles.statCard]}>
            <IconSymbol name="calendar" size={32} color={colors.accent} />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {adminActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={commonStyles.card}
              onPress={action.action}
            >
              <View style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <IconSymbol name={action.icon} size={24} color="#ffffff" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>
                    {action.description}
                  </Text>
                </View>
                <IconSymbol
                  name="chevron.right"
                  size={20}
                  color={colors.textSecondary}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.card, styles.infoCard]}>
          <IconSymbol name="info.circle" size={24} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Admin Access</Text>
            <Text style={styles.infoText}>
              You have full access to all client accounts and can manage all aspects of the portal.
            </Text>
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  actionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.highlight,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
