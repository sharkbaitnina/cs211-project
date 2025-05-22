const header = Vue.createApp({
    template: `
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="home.html">
<img src="css/assets/rtd.png" alt="Roast The Dead Coffee Logo" width="70" height="70">
            Roast The Dead Coffee
          </a>
         <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarContent">
<ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: isActive('home.html') }"
                  :aria-current="isActive('home.html') ? 'page' : null"
                  href="home.html"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: isActive('products.html') }"
                  :aria-current="isActive('products.html') ? 'page' : null"
                  href="products.html"
                >
                  Products
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: isActive('about.html') }"
                  :aria-current="isActive('about.html') ? 'page' : null"
                  href="about.html"
                >
                  About
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: isActive('contact.html') }"
                  :aria-current="isActive('contact.html') ? 'page' : null"
                  href="contact.html"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `,
    methods: {
        isActive(page) {
          return window.location.pathname.endsWith(page);
        }
      }
  });
  
  header.mount('#header-component');

  const footer = Vue.createApp({
    template: 
    `<footer>
        <p>&copy; 2023 Roast The Dead Coffee. All rights reserved.</p>
    </footer>`
  });
  
  footer.mount('#footer-component');

  // Products App
  // const productsApp = Vue.createApp({
  //   data() {
  //     return {
  //       products: []
  //     };
  //   },
  //   mounted() {
      
  //     fetch('/.netlify/functions/fetchProducts')
  //       .then(response => response.json())
  //       .then(data => {
  //         this.products = data.items.map(item => item.fields);
  //       })
  //       .catch(console.error);
  //   }
  // });
  
  // productsApp.mount('#products-component');
