const productsApp = Vue.createApp({
  data() {
    return {
      products: [],
      numericFilterThreshold: null,
      textFilterKeyword: '',
      sortField: 'price',
      sortDirection: 'asc'
    };
  },
  computed: {
    filteredSortedProducts() {
      let filtered = this.products.filter(product => {
        const priceNum = parseFloat(product.price.replace('$', ''));
        const meetsNumericFilter = this.numericFilterThreshold === null || priceNum <= this.numericFilterThreshold;
        const keyword = this.textFilterKeyword.toLowerCase();
        const matchesTextFilter =
          product.title.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword);
        return meetsNumericFilter && matchesTextFilter;
      });

      filtered.sort((a, b) => {
        let aVal, bVal;
        if (this.sortField === 'price') {
          aVal = parseFloat(a.price.replace('$', ''));
          bVal = parseFloat(b.price.replace('$', ''));
        } else if (this.sortField === 'title') {
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
        } else {
          aVal = '';
          bVal = '';
        }

        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      return filtered;
    },
    categories() {
      const grouped = {};
      this.filteredSortedProducts.forEach(product => {
        if (!grouped[product.category]) {
          grouped[product.category] = [];
        }
        grouped[product.category].push(product);
      });
      return grouped;
    }
  },
  mounted() {
  fetch('/.netlify/functions/fetchProducts')
    .then(response => {
      if (!response.ok) throw new Error('Contentful failed');
      return response.json();
    })
    .then(data => {
      const assets = this.loadAssets(data.includes?.Asset || []);
      this.products = data.items.map(item => ({
        ...item.fields,
        ...assets[item.fields.image?.sys.id]
      }));
    })
    .catch((error) => {
      console.error('Fetch failed, falling back to products.json:', error);
      // fallback to products.json
      fetch('/products.json')
        .then(res => res.json())
        .then(json => {
          this.products = json.map(p => ({
            ...p,
            imageUrl: p.image,
            imageAlt: p.title
          }));
        });
    });
}
,
  methods: {
    loadAssets(assets) {
      const map = {};
      assets.forEach(asset => {
        map[asset.sys.id] = {
          imageUrl: 'https:' + asset.fields.file.url,
          imageAlt: asset.fields.description || asset.fields.title || 'Product image'
        };
      });
      return map;
    }
  }
});

productsApp.mount('#products-component');
