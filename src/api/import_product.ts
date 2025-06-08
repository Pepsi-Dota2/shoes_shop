import importData from '../json/import_product.json'; // ✅ path must be correct

export default {
    getAllImport: () => {return Promise.resolve(importData);}
};
