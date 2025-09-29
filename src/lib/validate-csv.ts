import fs from 'fs';
import csv from 'csv-parser';

function validateCSVStructure() {
  const requiredColumns = ['Product Name', 'Size', 'Product Image', 'Country'];
  let foundColumns = [];
  let hasErrors = false;

  console.log('🔍 Validating CSV structure...');
  
  fs.createReadStream('products.csv')
    .pipe(csv())
    .on('headers', (headers) => {
      foundColumns = headers;
      
      // Check for required columns
      requiredColumns.forEach(requiredCol => {
        if (!headers.includes(requiredCol)) {
          console.error(`❌ Missing required column: "${requiredCol}"`);
          hasErrors = true;
        }
      });
      
      // Check for extra columns
      headers.forEach(header => {
        if (!requiredColumns.includes(header)) {
          console.warn(`⚠️  Extra column found: "${header}" (will be ignored)`);
        }
      });
      
      if (!hasErrors) {
        console.log('✅ All required columns found');
      }
    })
    .on('data', (row) => {
      // Validate data quality
      if (row['Product Name'] && row['Product Name'].length > 100) {
        console.warn(`⚠️  Long product name: "${row['Product Name'].substring(0, 50)}..."`);
      }
    })
    .on('end', () => {
      console.log('📊 CSV validation completed');
      if (hasErrors) {
        console.error('❌ CSV has structural errors. Please fix before conversion.');
        process.exit(1);
      }
    });
}

validateCSVStructure();