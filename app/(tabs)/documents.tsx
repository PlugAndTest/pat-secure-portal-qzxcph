
import React, { useState } from 'react';
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
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { mockCertificates, mockInvoices } from '@/data/mockData';

type DocumentTab = 'certificates' | 'invoices';

export default function DocumentsScreen() {
  const [activeTab, setActiveTab] = useState<DocumentTab>('certificates');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleDownload = (fileName: string) => {
    Alert.alert('Download', `Downloading ${fileName}...`);
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return colors.accent;
      case 'pending':
        return colors.warning;
      case 'overdue':
        return colors.error;
      default:
        return colors.textSecondary;
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
          <Text style={styles.title}>Documents</Text>
          <Text style={styles.subtitle}>
            View and download your certificates and invoices
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'certificates' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('certificates')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'certificates' && styles.activeTabText,
              ]}
            >
              Certificates
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'invoices' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('invoices')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'invoices' && styles.activeTabText,
              ]}
            >
              Invoices
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'certificates' && (
          <View style={styles.documentList}>
            {mockCertificates.map((cert) => (
              <View key={cert.id} style={commonStyles.card}>
                <View style={styles.documentHeader}>
                  <View style={styles.iconContainer}>
                    <IconSymbol
                      name="doc.text.fill"
                      size={32}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>{cert.fileName}</Text>
                    <Text style={styles.documentDate}>
                      Issued: {formatDate(cert.issueDate)}
                    </Text>
                    <Text style={styles.documentDate}>
                      Expires: {formatDate(cert.expiryDate)}
                    </Text>
                  </View>
                </View>

                <View style={styles.documentDetails}>
                  <View style={styles.detailItem}>
                    <IconSymbol
                      name="wrench.and.screwdriver"
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.detailText}>
                      {cert.equipmentTested} items tested
                    </Text>
                  </View>
                </View>

                <View style={styles.documentActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDownload(cert.fileName)}
                  >
                    <IconSymbol
                      name="arrow.down.circle"
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={styles.actionButtonText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert('View', `Opening ${cert.fileName}...`)}
                  >
                    <IconSymbol
                      name="eye"
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={styles.actionButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'invoices' && (
          <View style={styles.documentList}>
            {mockInvoices.map((invoice) => (
              <View key={invoice.id} style={commonStyles.card}>
                <View style={styles.documentHeader}>
                  <View style={styles.iconContainer}>
                    <IconSymbol
                      name="doc.plaintext.fill"
                      size={32}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>{invoice.fileName}</Text>
                    <Text style={styles.documentDate}>
                      Invoice: {invoice.invoiceNumber}
                    </Text>
                    <Text style={styles.documentDate}>
                      Due: {formatDate(invoice.dueDate)}
                    </Text>
                  </View>
                </View>

                <View style={styles.invoiceAmount}>
                  <Text style={styles.amountLabel}>Amount:</Text>
                  <Text style={styles.amountValue}>
                    £{invoice.amount.toFixed(2)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getInvoiceStatusColor(invoice.status) },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {invoice.status.toUpperCase()}
                  </Text>
                </View>

                <View style={styles.documentActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDownload(invoice.fileName)}
                  >
                    <IconSymbol
                      name="arrow.down.circle"
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={styles.actionButtonText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert('View', `Opening ${invoice.fileName}...`)}
                  >
                    <IconSymbol
                      name="eye"
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={styles.actionButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: '#ffffff',
  },
  documentList: {
    gap: 12,
  },
  documentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  documentDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  documentDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  invoiceAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  documentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
