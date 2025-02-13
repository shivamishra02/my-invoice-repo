import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { FaPrint, FaDownload, FaEdit, FaEllipsisV, FaBell } from "react-icons/fa";

// Define PDF styles (for @react-pdf/renderer)
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    border: "1px solid #F2D8B0",
    position: "relative",
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: 48,
    color: "#F2D8B0",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headerText: {
    fontSize: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 8,
    textAlign: "center",
    marginBottom: 5,
  },
  invoiceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  box: {
    border: "1px solid #000",
    padding: 5,
    width: "48%",
    marginRight: "4%",
    marginBottom: 5,
  },
  boxTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
  },
  boxText: {
    fontSize: 8,
    marginBottom: 3,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
  },
  tableColHeader: {
    width: "12%",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
  tableCol: {
    width: "12%",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    padding: 5,
    textAlign: "center",
  },
  itemDescriptionCol: {
    width: "30%",
  },
  tableLine: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "#000",
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
  taxBox: {
    border: "1px solid #000",
    padding: 15,
    marginBottom: 5,
    position: "relative",
  },
  taxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  grandTotal: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    paddingTop: 5,
    paddingBottom: 5,
  },
  rupeesText: {
    fontSize: 8,
    position: "absolute",
    bottom: 5,
    left: 5,
  },
  signatureBox: {
    border: "1px solid #000",
    padding: 10,
    width: "48%",
    marginRight: "4%",
    marginBottom: 5,
    textAlign: "center",
  },
  signatureText: {
    fontSize: 8,
    marginBottom: 3,
  },
  footer: {
    border: "1px solid #000",
    padding: 5,
    textAlign: "center",
  },
  termsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  termsText: {
    fontSize: 8,
    marginBottom: 3,
  },
});

// Invoice PDF Component using the above styles
const InvoiceDocument = ({ invoiceData }) => (
  <Document>
    <Page style={styles.page}>
      {/* Watermark */}
      <Text style={styles.watermark}>Sample Bill</Text>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>GSTIN: {invoiceData.companyGSTIN}</Text>
        <Text style={styles.headerText}>Original Copy</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>TAX INVOICE</Text>
      <Text style={styles.companyName}>{invoiceData.companyName}</Text>
      <Text style={styles.companyAddress}>{invoiceData.companyAddress}</Text>

      {/* Invoice & Supply Details */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
        <View style={[styles.box, { width: "100%" }]}>
          <Text style={styles.boxTitle}>Invoice & Supply Details</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ width: "48%" }}>
              <Text style={styles.boxText}>Invoice No: {invoiceData.invoiceNumber}</Text>
              <Text style={styles.boxText}>Dated: {invoiceData.date}</Text>
            </View>
            <View style={{ width: "48%" }}>
              <Text style={styles.boxText}>Place of Supply: {invoiceData.billedTo.state}</Text>
              <Text style={styles.boxText}>Reverse Charge: N</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Billing and Shipping Details */}
      <View style={styles.invoiceDetails}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Billed To:</Text>
          <Text style={styles.boxText}>{invoiceData.billedTo.name}</Text>
          <Text style={styles.boxText}>{invoiceData.billedTo.address}</Text>
          <Text style={styles.boxText}>
            {invoiceData.billedTo.city}, {invoiceData.billedTo.state} - {invoiceData.billedTo.pin}
          </Text>
          <Text style={styles.boxText}>GSTIN/UIN: {invoiceData.billedTo.GSTIN}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Shipping Address:</Text>
          <Text style={styles.boxText}>{invoiceData.shippingAddress.name}</Text>
          <Text style={styles.boxText}>{invoiceData.shippingAddress.address}</Text>
          <Text style={styles.boxText}>
            {invoiceData.shippingAddress.city}, {invoiceData.shippingAddress.state} - {invoiceData.shippingAddress.pin}
          </Text>
          <Text style={styles.boxText}>GSTIN/UIN: {invoiceData.shippingAddress.GSTIN}</Text>
        </View>
      </View>

      {/* Item Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>S.No</Text>
          <Text style={[styles.tableColHeader, styles.itemDescriptionCol]}>
            Item Description
          </Text>
          <Text style={styles.tableColHeader}>HSN/SAC Code</Text>
          <Text style={styles.tableColHeader}>Qty</Text>
          <Text style={styles.tableColHeader}>Unit</Text>
          <Text style={styles.tableColHeader}>Price</Text>
          <Text style={styles.tableColHeader}>Amount</Text>
        </View>
        <View style={styles.tableLine} />
        {invoiceData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{item.sno}</Text>
            <Text style={[styles.tableCol, styles.itemDescriptionCol]}>
              {item.description}
            </Text>
            <Text style={styles.tableCol}>{item.hsnCode}</Text>
            <Text style={styles.tableCol}>{item.quantity.split(" ")[0]}</Text>
            <Text style={styles.tableCol}>{item.quantity.split(" ")[1]}</Text>
            <Text style={styles.tableCol}>{item.unitPrice}</Text>
            <Text style={styles.tableCol}>{item.amount}</Text>
          </View>
        ))}
        {[...Array(9 - invoiceData.items.length)].map((_, index) => (
          <View style={styles.tableRow} key={`empty-${index}`}>
            <Text style={styles.tableCol}>
              {invoiceData.items.length + index + 1}
            </Text>
            <Text style={[styles.tableCol, styles.itemDescriptionCol]}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
          </View>
        ))}
      </View>

      {/* Tax Details */}
      <View style={styles.taxBox}>
        <Text style={styles.boxTitle}>Tax Details</Text>
        <View style={styles.taxRow}>
          <Text style={[styles.boxText, { width: "40%" }]}>Tax Details</Text>
          <Text style={[styles.boxText, { width: "15%" }]}>Tax Rate</Text>
          <Text style={[styles.boxText, { width: "15%" }]}>Taxable Amount</Text>
          <Text style={[styles.boxText, { width: "15%" }]}>SGST Amount</Text>
          <Text style={[styles.boxText, { width: "15%" }]}>Total Tax</Text>
        </View>
        <View style={styles.taxRow}>
          <Text style={[styles.boxText, { width: "40%" }]}>{invoiceData.grandTotal}</Text>
          <Text style={[styles.boxText, { width: "15%" }]}>
            {invoiceData.taxes.cgst + invoiceData.taxes.sgst}
          </Text>
          <Text style={[styles.boxText, { width: "15%" }]}>
            {(parseFloat(invoiceData.grandTotal) * 0.18).toFixed(2)}
          </Text>
          <Text style={[styles.boxText, { width: "15%" }]}>
            {(parseFloat(invoiceData.grandTotal) * 0.09).toFixed(2)}
          </Text>
          <Text style={[styles.boxText, { width: "15%" }]}>
            {(parseFloat(invoiceData.grandTotal) * 0.18).toFixed(2)}
          </Text>
        </View>
        <Text style={styles.grandTotal}>
          Grand Total: {invoiceData.grandTotal}
        </Text>
        <Text style={styles.rupeesText}>{invoiceData.grandTotalInWords}</Text>
      </View>

      {/* Terms and Conditions */}
      <View style={styles.termsBox}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Terms and Conditions</Text>
          {invoiceData.termsAndConditions.map((term, index) => (
            <Text key={index} style={styles.termsText}>
              {term}
            </Text>
          ))}
          <Text style={styles.termsText}>E&O.E.</Text>
        </View>
      </View>

      {/* Signatures */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureText}>Receiver Signature:</Text>
          <Text style={styles.signatureText}>________________________</Text>
        </View>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureText}>
            For {invoiceData.companyName}:
          </Text>
          <Text style={styles.signatureText}>________________________</Text>
        </View>
      </View>

      {/* Footer */}
       
    </Page>
  </Document>
);

// Main component with PDF Viewer and side buttons
export default function Invoice() {
  // Sample invoice data
  const invoiceData = {
    invoiceNumber: "2024-25/2",
    date: "15/08/2024",
    companyName: "New Sample Company",
    companyAddress: "New Address1, New City, New State - New PIN",
    companyGSTIN: "0NEWGSTGSTF1ZN",
    billedTo: {
      name: "New Bill Company",
      address: "N-11, NEW, CITY",
      city: "New City",
      state: "New State",
      pin: "002200",
      GSTIN: "00NEWGSTBILL00",
    },
    shippingAddress: {
      name: "New Bill Company",
      address: "N-11, NEW, CITY",
      city: "New City",
      state: "New State",
      pin: "002200",
      GSTIN: "00NEWGSTBILL00",
    },
    items: [
      {
        sno: 1,
        description: "NEW ITEM 1",
        hsnCode: "7801",
        quantity: "2000.00 Kgs",
        unitPrice: "200.00",
        amount: "400000.00",
      },
      {
        sno: 2,
        description: "NEW ITEM 2",
        hsnCode: "7802",
        quantity: "1000.00 Kgs",
        unitPrice: "150.00",
        amount: "150000.00",
      },
    ],
    taxes: {
      cgst: "9%",
      sgst: "9%",
    },
    grandTotal: "550000.00",
    grandTotalInWords: "Five Lakh Fifty Thousand Rupees Only",
    termsAndConditions: [
      "1. Goods once sold will not be taken back.",
      "2. Interest @18% p.a. will be charged if the payment is not made within the stipulated time.",
      "3. Subject to New State Jurisdiction only.",
    ],
  };

  // Function to handle printing the page
  const handlePrint = () => window.print();

  // Inline style for vertical HTML buttons (for buttons below the first row)
  const htmlButtonStyle = {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "10px",
    minWidth: "200px",
  };

  // New style for short horizontal buttons (first row) with icon and label
  const shortButtonStyle = {
    padding: "5px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "70px",
  };

  const shortButtonLabelStyle = {
    fontSize: "8px",
    marginTop: "2px",
  };

  // For the E-Invoice/E-Way Bill row, we'll define a style without forcing a minWidth
  const horizontalButtonStyle = {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  };

  return (
    <div style={{ display: "flex", height: "100vh", padding: "20px" }}>
      {/* PDF Viewer on the Left */}
      <div style={{ flex: 1, border: "1px solid #ddd", padding: "10px" }}>
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <InvoiceDocument invoiceData={invoiceData} />
        </PDFViewer>
      </div>

      {/* Side Buttons */}
      <div
        style={{
          width: "250px",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {/* First row of short horizontal buttons with icons and labels */}
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <button
            onClick={handlePrint}
            style={{ ...shortButtonStyle, backgroundColor: "#007bff" }}
          >
            <FaPrint />
            <span style={shortButtonLabelStyle}>Print</span>
          </button>
          <PDFDownloadLink
            document={<InvoiceDocument invoiceData={invoiceData} />}
            fileName="invoice.pdf"
          >
            {({ loading }) => (
              <button style={{ ...shortButtonStyle, backgroundColor: "#28a745" }}>
                {loading ? "..." : <FaDownload />}
                <span style={shortButtonLabelStyle}>Download</span>
              </button>
            )}
          </PDFDownloadLink>
          <button
            style={{ ...shortButtonStyle, backgroundColor: "#ffc107", color: "#000" }}
          >
            <FaEdit />
            <span style={shortButtonLabelStyle}>Edit</span>
          </button>
          <button style={{ ...shortButtonStyle, backgroundColor: "#6610f2" }}>
            <FaEllipsisV />
            <span style={shortButtonLabelStyle}>More</span>
          </button>
        </div>

        {/* Vertical buttons */}
        <button style={{ ...htmlButtonStyle, backgroundColor: "#fdd835", color: "#000" }}>
          Record Payment
        </button>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ flex: 1, ...horizontalButtonStyle, backgroundColor: "#000" }}>
            E-Invoice
          </button>
          <button style={{ flex: 1, ...horizontalButtonStyle, backgroundColor: "#000" }}>
            E-Way Bill
          </button>
        </div>
        <button style={{ ...htmlButtonStyle, backgroundColor: "#ff0000" }}>
          <FaBell /> Send Payment Reminder
        </button>
        <button style={{ ...htmlButtonStyle, backgroundColor: "#17a2b8" }}>
          Change Template
        </button>
        <button style={{ ...htmlButtonStyle, backgroundColor: "#6610f2" }}>
          Invoice Logs
        </button>
      </div>
    </div>
  );
}
