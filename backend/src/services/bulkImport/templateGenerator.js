import * as xlsx from 'xlsx';

export function generateTemplate(templateType, brand) {
  const baseColumns = [
    'Product Name*', 'SKU', 'Description*', 'Short Description', 
    'Price*', 'MRP', 'Cost Price', 'Stock*', 'Category*', 
    'Sub Category', 'Tags', 'Bestseller', 'Featured', 
    'New Arrival', 'Care Instructions', 'Meta Title', 'Meta Description'
  ];

  let extraColumns = [];
  switch (templateType) {
    case 'fashion':
      extraColumns = ['Weave', 'Fabric', 'Colors', 'Occasion', 'Style'];
      break;
    case 'kids':
      extraColumns = ['Gender', 'Age Group', 'Size'];
      break;
    case 'accessories':
      extraColumns = ['Material', 'Weight (g)', 'Dimensions'];
      break;
    case 'sarees':
      extraColumns = ['Weave', 'Fabric', 'Blouse Piece', 'Length'];
      break;
    case 'home-decor':
      extraColumns = ['Material', 'Dimensions', 'Care Instructions'];
      break;
  }

  const header = [...baseColumns, ...extraColumns];
  
  // Example Row Data
  const exampleRow = {
    'Product Name*': 'Example Elegant Dress',
    'SKU': 'EXD-001',
    'Description*': 'A beautiful elegant dress perfect for parties.',
    'Short Description': 'Elegant party wear',
    'Price*': '1999',
    'MRP': '2999',
    'Cost Price': '1000',
    'Stock*': '50',
    'Category*': 'Women',
    'Sub Category': 'Dresses',
    'Tags': 'summer,party,dress',
    'Bestseller': 'yes',
    'Featured': 'yes',
    'New Arrival': 'no',
    'Care Instructions': 'Dry clean only',
    'Meta Title': 'Buy Elegant Dress Online',
    'Meta Description': 'Shop the latest elegant dress.'
  };

  // Add extra columns to example
  extraColumns.forEach(col => {
    exampleRow[col] = 'Sample ' + col;
  });

  const descriptionRow = {};
  header.forEach(col => {
    descriptionRow[col] = col.includes('*') ? 'Required field' : 'Optional';
  });

  const ws = xlsx.utils.json_to_sheet([exampleRow, descriptionRow], { header, skipHeader: false });
  
  // Create workbook
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Products');

  // Set defined name for template type
  if (!wb.Workbook) wb.Workbook = { Names: [] };
  wb.Workbook.Names.push({ Name: '__template_type__', Ref: 'Products!A1000' });
  xlsx.utils.sheet_add_aoa(ws, [[templateType]], { origin: 'A1000' });

  // Column widths
  const wscols = header.map(h => ({
    wch: (h === 'Description*' || h === 'Product Name*') ? 30 : 15
  }));
  ws['!cols'] = wscols;

  return xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
}
