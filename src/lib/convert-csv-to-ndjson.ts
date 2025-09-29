import fs from 'fs';
import csv from 'csv-parser';
import { createClient } from '@sanity/client';

// Initialize Sanity client (optional, for validation)
export const client = createClient({
    projectId: 'ybvkq0kb', // Your project ID
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-09-25', // Use current date
  })

async function convertCSVToNDJSON() {
  const documents = [];
  let rowCount = 0;
  let errorCount = 0;
  
  console.log('Starting CSV to NDJSON conversion...');
  console.log('Expected columns: Product Name, Size, Product Image, Country');
  
  fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (row) => {
      rowCount++;
      
      // VALIDATION: Check required fields
      const errors = [];
      
      if (!row['Product Name'] || row['Product Name'].trim() === '') {
        errors.push('Missing "Product Name"');
      }
      
      if (!row['Size'] || row['Size'].trim() === '') {
        errors.push('Missing "Size"');
      }
      
      if (!row['Product Image'] || row['Product Image'].trim() === '') {
        errors.push('Missing "Product Image"');
      }
      
      if (!row['Country'] || row['Country'].trim() === '') {
        errors.push('Missing "Country"');
      }
      
      // If there are validation errors, skip this row
      if (errors.length > 0) {
        errorCount++;
        console.warn(`❌ Row ${rowCount} skipped - Errors: ${errors.join(', ')}`);
        console.warn(`   Data: ${JSON.stringify(row)}`);
        return;
      }
      
      // Generate a unique ID from Product Name and Size (for easy updates)
      const productId = generateProductId(row['Product Name'], row['Size']);
      
      // Create Sanity document with your specific fields
      const document = {
        _id: productId,
        _type: 'Product', // Change this to match your Sanity schema type
        productName: row['Product Name'].trim(),
        size: row['Size'].trim(),
        productImage: row['Product Image'].trim(),
        country: row['Country'].trim(),
        // Add automatic slug generation from product name
        slug: {
          _type: 'slug',
          current: generateSlug(row['Product Name'])
        }
      };
      
      documents.push(document);
      console.log(`✅ Processed: ${row['Product Name']} (${row['Size']})`);
    })
    .on('end', async () => {
      console.log('\n=== CONVERSION SUMMARY ===');
      console.log(`Total rows processed: ${rowCount}`);
      console.log(`Successfully converted: ${documents.length}`);
      console.log(`Skipped due to errors: ${errorCount}`);
      
      if (documents.length === 0) {
        console.error('❌ No valid documents to convert!');
        return;
      }
      
      // Convert to NDJSON format
      const ndjson = documents.map(doc => JSON.stringify(doc)).join('\n');
      
      // Write to file
      fs.writeFileSync('products.ndjson', ndjson);
      console.log(`📁 NDJSON file created: products.ndjson`);
      
      // Validate document structure
      await validateDocumentStructure(documents);
      
      // Show sample of first document
      console.log('\n=== SAMPLE DOCUMENT ===');
      console.log(JSON.stringify(documents[0], null, 2));
    })
    .on('error', (error) => {
      console.error('❌ Error reading CSV:', error);
    });
}

// Generate consistent product ID for easy updates
function generateProductId(productName, size) {
  // Remove special characters and create consistent ID
  const cleanName = productName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const cleanSize = size
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `product-${cleanName}-${cleanSize}`;
}

// Generate slug from product name
function generateSlug(productName) {
  return productName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Validate document structure matches expected Sanity schema
async function validateDocumentStructure(documents) {
  console.log('\n=== VALIDATION CHECK ===');
  
  const sampleDoc = documents[0];
  const expectedFields = ['productName', 'size', 'productImage', 'country', 'slug'];
  
  expectedFields.forEach(field => {
    if (sampleDoc[field] === undefined) {
      console.warn(`⚠️  Field "${field}" might not match your Sanity schema`);
    } else {
      console.log(`✅ Field "${field}" found in documents`);
    }
  });
  
  // Check for potential issues with productImage field
  documents.forEach(doc => {
    if (doc.productImage && !isValidUrl(doc.productImage) && !doc.productImage.startsWith('image-')) {
      console.warn(`⚠️  Product Image for "${doc.productName}" may not be a Sanity asset reference`);
      console.log(`   Value: ${doc.productImage}`);
      console.log(`   Expected: Sanity image asset ID (starts with "image-") or full URL`);
    }
  });
}

// Basic URL validation
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Run the conversion
convertCSVToNDJSON().catch(console.error);