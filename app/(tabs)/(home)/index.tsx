
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
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { mockAppointments, mockEquipment } from '@/data/mockData';

export default function HomeScreen() {
  const { user } = useAuth();

  const upcomingAppointments = mockAppointments.filter(
    (apt) => apt.status === 'upcoming'
  );

  const recentAppointments = mockAppointments
    .filter((apt) => apt.status === 'completed')
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return colors.primary;
      case 'completed':
        return colors.accent;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          title: 'Dashboard',
          headerShown: Platform.OS === 'ios',
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar,
        ]}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.companyName}>{user?.company}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={[commonStyles.card, styles.statCard]}>
            <IconSymbol name="calendar" size={32} color={colors.primary} />
            <Text style={styles.statNumber}>{upcomingAppointments.length}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={[commonStyles.card, styles.statCard]}>
            <IconSymbol name="wrench.and.screwdriver" size={32} color={colors.accent} />
            <Text style={styles.statNumber}>{mockEquipment.length}</Text>
            <Text style={styles.statLabel}>Equipment</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          </View>
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={commonStyles.card}
                onPress={() => Alert.alert('Appointment Details', appointment.notes || 'No additional notes')}
              >
                <View style={styles.appointmentHeader}>
                  <View style={styles.appointmentDate}>
                    <IconSymbol name="calendar" size={20} color={colors.primary} />
                    <Text style={styles.appointmentDateText}>
                      {formatDate(appointment.date)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(appointment.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {appointment.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.appointmentDetails}>
                  <View style={styles.detailRow}>
                    <IconSymbol name="clock" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{appointment.time}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <IconSymbol name="location" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{appointment.location}</Text>
                  </View>
                  {appointment.equipmentCount && (
                    <View style={styles.detailRow}>
                      <IconSymbol name="wrench.and.screwdriver" size={16} color={colors.textSecondary} />
                      <Text style={styles.detailText}>
                        {appointment.equipmentCount} items to test
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={[commonStyles.card, styles.emptyState]}>
              <IconSymbol name="calendar" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyStateText}>No upcoming appointments</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent History</Text>
          </View>
          {recentAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              style={commonStyles.card}
              onPress={() => Alert.alert('Appointment Details', appointment.notes || 'No additional notes')}
            >
              <View style={styles.appointmentHeader}>
                <View style={styles.appointmentDate}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color={colors.accent} />
                  <Text style={styles.appointmentDateText}>
                    {formatDate(appointment.date)}
                  </Text>
                </View>
              </View>
              <View style={styles.appointmentDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="location" size={16} color={colors.textSecondary} />
                  <Text style={styles.detailText}>{appointment.location}</Text>
                </View>
                {appointment.equipmentCount && (
                  <View style={styles.detailRow}>
                    <IconSymbol name="wrench.and.screwdriver" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      {appointment.equipmentCount} items tested
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={[commonStyles.card, styles.actionCard]}
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
          >
            <IconSymbol name="doc.text" size={24} color={colors.primary} />
            <Text style={styles.actionText}>View Certificates</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[commonStyles.card, styles.actionCard]}
            onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
          >
            <IconSymbol name="doc.plaintext" size={24} color={colors.primary} />
            <Text style={styles.actionText}>View Invoices</Text>
          </TouchableOpacity>
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
  contentWithTabBar: {
    paddingBottom: 100,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },
  companyName: {
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appointmentDateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  appointmentDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
  quickActions: {
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
});
