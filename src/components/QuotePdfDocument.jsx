import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF', 
    padding: 40, 
    fontFamily: 'Helvetica', 
  },
  headerSection: {
    backgroundColor: '#3674B5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: 595.28,
    marginTop: -40,
    marginLeft: -40, // Pull it left by page padding
    marginRight: -40, // Pull it right by page padding
    paddingHorizontal: 40, // Apply internal horizontal padding for content alignment
    paddingVertical: 15, // Maintain internal vertical spacing
  },
  ownerDetailsLeft: {
    // flexGrow: 1, // Can be used if you want it to take more space
  },
  ownerDetailsRight: {
    textAlign: 'right',
  },
  ownerHeading: {
    fontSize: 24,
    marginBottom: 5,
    color: '#fdfdfd',
    fontWeight: 'bold'
  },
  ownerAddress: {
    borderTopWidth: '2px',
    borderTopColor: "#FFF",
    paddingTop: 10,
    fontSize: 14,
    marginBottom: 5,
    color: '#fdfdfd',
  },
  
  ownerText: {
    fontSize: 12,
    color: '#fdfdfd',
  },
  customerDetails: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  customerRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  customerLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    width: 60, // Fixed width for labels to align values
    color: '#555',
  },
  customerValue: {
    fontSize: 10,
    flex: 1,
    color: '#666',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '14.28%', // 100 / 7 columns
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
  },
  tableCol: {
    width: '14.28%', // 100 / 7 columns
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColDescription: {
    width: '28.56%', // For description column (e.g., 2/7 of width)
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333',
  },
  tableCell: {
    margin: 5,
    fontSize: 8,
    color: '#444',
  },
  footerSection: {
    marginTop: 'auto', // Pushes footer to the bottom
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  signatureSection: {
    textAlign: 'center',
  },
  signatureText: {
    fontSize: 10,
    color: '#555',
  },
  totalAmountWrapper: {
    alignSelf: 'flex-end', // Aligns to the right within the footer
  },
  totalAmountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

// QuotePdfDocument now accepts 'customer' and 'quoteItems' as props
const QuotePdfDocument = ({ customer, quoteItems }) => {
  // Calculate total amount dynamically based on passed quoteItems
  const totalAmount = quoteItems.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section (Owner Details - Static as per your original component) */}
        <View style={styles.headerSection}>
          <View style={styles.ownerDetailsLeft}>
            <Text style={styles.ownerHeading}>Adithya Sign Associates</Text>
            <Text style={styles.ownerAddress}>Plot No. 316, 4th Cross, Auto Nagar, KIADB, Belagavi - 16</Text>
          </View>
          <View style={styles.ownerDetailsRight}>
            <Text style={styles.ownerText}>Mobile: +91 97316 16450</Text>
            <Text style={styles.ownerText}>Email: rdavalbhai@gmail.com</Text>
          </View>
        </View>

        {/* Customer Details - Dynamic */}
        <View style={styles.customerDetails}>
          {customer?.name && (
            <View style={styles.customerRow}>
              <Text style={styles.customerLabel}>Name:</Text>
              <Text style={styles.customerValue}>{customer.name}</Text>
            </View>
          )}
          {customer?.date && (
            <View style={styles.customerRow}>
              <Text style={styles.customerLabel}>Date:</Text>
              <Text style={styles.customerValue}>{customer.date}</Text>
            </View>
          )}
          {/* Corrected structure for Phone and Email to avoid ' ' string child error */}
          {(customer?.phone || customer?.email) && (
            <View style={styles.customerRow}>
              {customer?.phone && (
                <View style={{ flexDirection: 'row', marginRight: customer?.email ? 20 : 0 }}>
                  <Text style={styles.customerLabel}>Phone:</Text>
                  <Text style={styles.customerValue}>{customer.phone}</Text>
                </View>
              )}
              {customer?.email && (
                <View style={{ flexDirection: 'row' }}>
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

        {/* Quote Items Table - Dynamic */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow} fixed> {/* 'fixed' makes header repeat on new pages */}
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Sl No</Text>
            </View>
            <View style={styles.tableColDescription}>
              <Text style={styles.tableCellHeader}>Description</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Height (ft)</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Width (ft)</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Qty</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>SqFt</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Amount</Text>
            </View>
          </View>

          {/* Table Body - Dynamic Rows */}
          {quoteItems.map((item, idx) => (
            <View style={styles.tableRow} key={idx} wrap={false}> {/* wrap={false} prevents row from breaking across pages */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{idx + 1}</Text>
              </View>
              <View style={styles.tableColDescription}>
                <Text style={styles.tableCell}>{item.itemDescription}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.height}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.width}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.totalSqft}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {parseFloat(item.amount || 0).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer Section - Dynamic Total Amount */}
        <View style={styles.footerSection}>
          <View style={styles.signatureSection}>
            <Text style={styles.signatureText}>Signature</Text>
            <View style={{ height: 30 }}></View> {/* Spacer */}
            <Text style={styles.signatureText}>_________________</Text>
          </View>

          <View style={styles.totalAmountWrapper}>
            <Text style={styles.totalAmountText}>
              Total Amount:
              {totalAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed /> {/* 'fixed' makes page number appear on all pages */}

      </Page>
    </Document>
  );
};

export default QuotePdfDocument;
