document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
       items: [
        { id: 1, name: 'Nba 2k22', img: 'nba.png', price: 400000},
        { id: 1, name: 'Fifa 23', img: 'bola.png', price: 600000},
      ],
    }));

    Alpine.store('cart',{
      items: [],
      total: 0,
      quantity: 0,
      add(newItem) {
          
        // cek apakah ada barang yg sama di cart
        const cartItem = this.items.find((item) => item.id === newItem.id);

        // jika belum ada / cart masih kosong 
        if(!cartItem) {
          
                  this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                  this.quantity++;
                  this.total += newItem.price;
        } else {
          // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
          this.items = this.items.map((item) => {
            // jika barang berbeda 
            if (item.id !== newItem.id) {
              return item;
            } else {
              // jika barang sudah ada, tambah quantity dan totalnya 
              item.quantity++;
              item.total = item.price * item.quantity;
              this.quantity++;
              this.total += item.price;
              return item;
            }
          });
        }
      },

      remove(id) {
        // ambil item yg mau berdasarkanan id nya
        const cartItem = this.items.find((item) => item.id === id);

        // jika item lebih dari 1
        if(cartItem.quantity > 1) {
            this.items = this.items.map((item) => {
              if(item.id !== id) {
                return item;
              } else {
                item.quantity--;
                item.total = item.price * item.quantity;
                this.quantity--;
                this.total -= item.price;
                return item;
              }
            })
        } else if (cartItem.quantity === 1) {
          this.items = this.items.filter((item) => item.id !== id);
          this.quantity--;
          this.total -= cartItem.price;
        }
      },
    });
});

// konversi ke rupiah

const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}