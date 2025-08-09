import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// --- Font Registration (same as your original code) ---
Font.register({
  family: 'Noto Sans',
  src: '/fonts/NotoSans-Regular.ttf',
});
Font.register({
  family: 'Noto Sans',
  fontStyle: 'italic',
  src: '/fonts/NotoSans-Italic.ttf',
});
Font.register({
  family: 'Noto Sans',
  fontWeight: 'bold',
  src: '/fonts/NotoSans-Bold.ttf',
});
Font.register({
  family: 'Noto Sans',
  fontWeight: 'bold',
  fontStyle: 'italic',
  src: '/fonts/NotoSans-BoldItalic.ttf',
});

// --- Stylesheet (Refactored Footer) ---
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontFamily: 'Noto Sans',
  },
  headerSection: {
    backgroundColor: '#3674B5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderTopWidth: 5,
    borderTopColor: '#004fa4',
    marginBottom: 20,
  },
  ownerDetailsLeft: {},
  ownerDetailsRight: {
    textAlign: 'right',
  },
  ownerHeading: {
    fontSize: 26,
    marginBottom: 5,
    color: '#fdfdfd',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  ownerAddress: {
    borderTopWidth: 2,
    borderTopColor: '#FFF',
    paddingTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fdfdfd',
  },
  ownerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fdfdfd',
    marginBottom: 2,
  },
  customerDetails: {
    marginBottom: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  customerRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  customerLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3674B5',
    marginRight: 5,
  },
  customerValue: {
    fontSize: 12,
    flex: 1,
    color: '#444',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  // Common table column styling
  tableColBase: {
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    padding: 3,
  },
  // Header specific column styling
  tableColHeaderBase: {
    backgroundColor: '#3674B5',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  tableColHeaderDescription: {
    textAlign: 'left',
  },
  tableCellBase: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },
  tableCellDescription: {
    textAlign: 'left',
  },
  // Column Widths
  colWidthSlNo: { width: '7%' },
  colWidthDescription: { width: '36%' },
  colWidthSize: { width: '12%' },
  colWidthOther: { width: '9%' },
  colWidthAmount: { width: '15%' },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    margin: 5,
  },
  rateSqftHeader: {
    fontSize: 12,
  },
  tableColHeaderRateSqFt: {
    width: '12%',
    paddingVertical: 2,
    paddingHorizontal: 0,
  },

  // Main content area to grow and push footer down
  content: {
    flexGrow: 1,
  },
  
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 'auto', 
    paddingTop: 10,
    paddingRight: 10,
  },
  footerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  termsWrapper: {
    width: '80%',
  },
  signatureSection: {
    textAlign: 'center',
    width: '20%',
  },
  signatureText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmountWrapper: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    borderTopWidth: 1.5,
    borderTopColor: '#3674B5',
  },
  totalAmountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  termsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
});

const QuotePdfDocument = ({ customer, quoteItems }) => {
  const totalAmount = quoteItems.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.ownerDetailsLeft}>
            <Text style={styles.ownerHeading}>Adithya Sign Associates</Text>
            <Text style={styles.ownerAddress}>
              Plot No. 316, 4th Cross, Auto Nagar, KIADB, Belagavi - 16
            </Text>
            <Text style={styles.ownerText}>GST No: 29AYYPD1111DIZN (Comp)</Text>
          </View>
          <View style={styles.ownerDetailsRight}>
            <Text style={styles.ownerText}>Mobile: +91 97316 16450</Text>
            <Text style={styles.ownerText}>Email: rdavalbhai@gmail.com</Text>
          </View>
        </View>

        {/* Main Content View (this will grow) */}
        <View style={styles.content}>
          {/* Customer Details Section */}
          <View style={styles.customerDetails}>
            <View style={{ ...styles.customerRow, justifyContent: 'space-between' }}>
              {customer?.name && (
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Text style={styles.customerLabel}>Name:</Text>
                  <Text style={styles.customerValue}>{customer.name}</Text>
                </View>
              )}
              {customer?.date && (
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text style={styles.customerLabel}>Date:</Text>
                  <Text style={styles.customerValue}>{customer.date}</Text>
                </View>
              )}
            </View>

            {(customer?.phone || customer?.email) && (
              <View style={styles.customerRow}>
                {customer?.phone && (
                  <View style={{ flexDirection: 'row', flex: 0.5 }}>
                    <Text style={styles.customerLabel}>Phone:</Text>
                    <Text style={styles.customerValue}>{customer.phone}</Text>
                  </View>
                )}
                {customer?.email && (
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.5,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Text style={styles.customerLabel}>Email:</Text>
                    <Text style={styles.customerValue}>{customer.email}</Text>
                  </View>
                )}
              </View>
            )}

            {customer?.address && (
              <View style={styles.customerRow}>
                <Text style={styles.customerLabel}>Address:</Text>
                <Text style={styles.customerValue}>{customer.address}</Text>
              </View>
            )}
          </View>

          {/* Quote Items Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow} fixed>
              <View style={[styles.tableColBase, styles.tableColHeaderBase, styles.colWidthSlNo]}>
                <Text style={styles.tableCellHeader}>No</Text>
              </View>
              <View style={[styles.tableColBase, styles.tableColHeaderBase, styles.tableColHeaderDescription, styles.colWidthDescription]}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={[styles.tableColBase, styles.tableColHeaderBase, styles.colWidthSize]}>
                <Text style={styles.tableCellHeader}>Size (ft)</Text>
              </View>
              <View style={[styles.tableColBase, styles.tableColHeaderBase, styles.colWidthOther]}>
                <Text style={styles.tableCellHeader}>Qty</Text>
              </View>
              <View style={[styles.tableColBase, styles.tableColHeaderBase, styles.colWidthOther]}>
                <Text style={styles.tableCellHeader}>SqFt</Text>
              </View>
              <View style={[styles.tableColBase, styles.tableColHeaderBase, styles.tableColHeaderRateSqFt]}>
                <Text style={[styles.tableCellHeader, styles.rateSqftHeader]}>Rate/SqFt</Text>
              </View>
              <View style={[styles.tableColBase, styles.tableColHeaderBase, styles.colWidthAmount]}>
                <Text style={styles.tableCellHeader}>Amount</Text>
              </View>
            </View>

            {/* Table Body */}
            {quoteItems.map((item, idx) => (
              <View
                style={{
                  ...styles.tableRow,
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#e4f1fc',
                }}
                key={idx}
                wrap={false}
              >
                <View style={[styles.tableColBase, styles.tableCellBase, styles.colWidthSlNo]}>
                  <Text>{idx + 1}</Text>
                </View>
                <View style={[styles.tableColBase, styles.tableCellBase, styles.tableCellDescription, styles.colWidthDescription]}>
                  <Text>{item.itemDescription}</Text>
                </View>
                <View style={[styles.tableColBase, styles.tableCellBase, styles.colWidthSize]}>
                  <Text>
                    {item.height} X {item.width}
                  </Text>
                </View>
                <View style={[styles.tableColBase, styles.tableCellBase, styles.colWidthOther]}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={[styles.tableColBase, styles.tableCellBase, styles.colWidthOther]}>
                  <Text>{item.totalSqft}</Text>
                </View>
                <View style={[styles.tableColBase, styles.tableCellBase, styles.tableColHeaderRateSqFt]}>
                  <Text>
                    {parseFloat(item.ratePerSqft || 0).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>
                <View style={[styles.tableColBase, styles.tableCellBase, styles.colWidthAmount]}>
                  <Text style={{ textAlign: 'right' }}>
                    {parseFloat(item.amount || 0).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection} fixed>
          <View style={styles.totalAmountWrapper}>
            <Text style={styles.totalAmountText}>
              Total Amount: ₹
              {totalAmount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View style={styles.footerWrapper}>
            <View style={styles.termsWrapper}>
              <Text style={styles.termsText}>
                * Above charges are on Composition GST. {'\n'}
                * Transportation and On Site Fitting Cost Extra. {'\n'}
                * Design Charges Cost Extra.
              </Text>
            </View>
            <View style={styles.signatureSection}>
              <Text style={styles.signatureText}>Signature</Text>
              <View style={{ height: 30 }}></View>
              <Text style={styles.signatureText}>_________________</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default QuotePdfDocument;