
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { mockEquipment } from '@/data/mockData';

export default function EquipmentScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEquipment = mockEquipment.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return 'checkmark.circle.fill';
      case 'fail':
        return 'xmark.circle.fill';
      default:
        return 'clock.fill';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return colors.accent;
      case 'fail':
        return colors.error;
      default:
        return colors.warning;
    }
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
        <View style={styles.header}>
          <Text style={styles.title}>Equipment List</Text>
          <Text style={styles.subtitle}>
            {mockEquipment.length} items registered
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search equipment..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.equipmentList}>
          {filteredEquipment.map((item) => (
            <View key={item.id} style={commonStyles.card}>
              <View style={styles.equipmentHeader}>
                <View style={styles.equipmentInfo}>
                  <Text style={styles.equipmentName}>{item.name}</Text>
                  <Text style={styles.equipmentType}>{item.type}</Text>
                </View>
                <IconSymbol
                  name={getStatusIcon(item.status)}
                  size={32}
                  color={getStatusColor(item.status)}
                />
              </View>

              <View style={styles.equipmentDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Serial Number:</Text>
                  <Text style={styles.detailValue}>{item.serialNumber}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailValue}>{item.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Last Tested:</Text>
                  <Text style={styles.detailValue}>
                    {formatDate(item.lastTestDate)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Next Test Due:</Text>
                  <Text style={[styles.detailValue, styles.nextTestDate]}>
                    {formatDate(item.nextTestDate)}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {filteredEquipment.length === 0 && (
          <View style={[commonStyles.card, styles.emptyState]}>
            <IconSymbol name="magnifyingglass" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyStateText}>No equipment found</Text>
          </View>
        )}
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
  header: {
    marginBottom: 20,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  equipmentList: {
    gap: 12,
  },
  equipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  equipmentType: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  equipmentDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  nextTestDate: {
    color: colors.primary,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
});
