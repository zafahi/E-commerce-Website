# Troubleshooting Guide - TralaShop

## 🔧 Masalah Loading Terus (Loading Screen Tidak Hilang)

### Penyebab Umum

1. **Script dependencies tidak ter-load**
2. **Error JavaScript yang tidak tertangani**
3. **Path file salah**
4. **Browser cache**

### Solusi

#### 1. Cek Browser Console

Buka Developer Tools (F12) dan lihat Console tab untuk error:

```javascript
// Error yang mungkin muncul:
// - Failed to load resource: js/config.js
// - Uncaught ReferenceError: Config is not defined
// - Uncaught TypeError: Cannot read property...
```

#### 2. Test File Loading

Buka `test-loading.html` di browser untuk test apakah semua dependencies ter-load:

```bash
# Buka di browser
http://localhost:3000/test-loading.html
```

File ini akan menampilkan status loading setiap dependency.

#### 3. Clear Browser Cache

**Chrome/Edge:**
- Ctrl+Shift+Delete (Windows) atau Cmd+Shift+Delete (Mac)
- Pilih "Cached images and files"
- Clear data

**Atau Hard Refresh:**
- Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac)

#### 4. Cek File Path

Pastikan struktur folder benar:

```
script/
├── index.html
├── script.js
├── js/
│   ├── config.js
│   ├── utils.js
│   ├── services/
│   │   ├── ProductService.js
│   │   ├── CartService.js
│   │   └── NotificationService.js
│   └── components/
│       ├── LoadingScreen.js
│       ├── ProductCard.js
│       └── CartSidebar.js
```

#### 5. Test dengan Simple Server

Jangan buka file langsung (file://), gunakan local server:

```bash
# Option 1: npm serve
npm start

# Option 2: Python
python -m http.server 8000

# Option 3: PHP
php -S localhost:8000
```

#### 6. Manual Fix Loading Screen

Jika loading screen stuck, buka browser console dan jalankan:

```javascript
// Force hide loading screen
document.getElementById('loading-screen').style.display = 'none';
document.body.style.overflow = 'auto';
```

### Debug Steps

1. **Buka Browser Console (F12)**
2. **Cek apakah ada error merah**
3. **Cek Network tab** - apakah semua file .js ter-load?
4. **Cek apakah dependencies tersedia:**

```javascript
// Di console, cek satu per satu:
console.log('Config:', typeof window.Config);
console.log('Utils:', typeof window.Utils);
console.log('ProductService:', typeof window.ProductService);
console.log('CartService:', typeof window.CartService);
console.log('NotificationService:', typeof window.NotificationService);
console.log('LoadingScreen:', typeof window.LoadingScreen);
console.log('ProductCard:', typeof window.ProductCard);
console.log('CartSidebar:', typeof window.CartSidebar);
```

Semua harus return `"function"` atau `"object"`, bukan `"undefined"`.

### Quick Fix

Jika masih stuck, tambahkan ini di akhir `index.html` sebelum `</body>`:

```html
<script>
    // Emergency fallback - hide loading screen after 5 seconds
    setTimeout(function() {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            loading.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }, 5000);
</script>
```

## 🐛 Masalah Lainnya

### Script Error

**Error:** `Uncaught ReferenceError: Config is not defined`

**Solusi:** Pastikan `js/config.js` ter-load sebelum file lain yang menggunakannya.

### CORS Error

**Error:** `Access to script at 'file:///...' from origin 'null' has been blocked`

**Solusi:** Gunakan local server, jangan buka file langsung.

### 404 Not Found

**Error:** `Failed to load resource: the server responded with a status of 404`

**Solusi:** 
- Cek path file benar
- Cek file ada di lokasi yang benar
- Cek server running

### Blank Page

**Kemungkinan:**
- JavaScript error yang menghentikan eksekusi
- CSS tidak ter-load
- HTML structure salah

**Solusi:**
- Cek console untuk error
- Cek Network tab untuk failed requests
- Disable JavaScript untuk test apakah HTML ter-render

## 📞 Bantuan Lebih Lanjut

Jika masalah masih terjadi:

1. **Cek Logs:**
   - Browser Console
   - Network tab
   - Application tab (localStorage, etc.)

2. **Test di Browser Lain:**
   - Chrome
   - Firefox
   - Safari
   - Edge

3. **Test dengan Clean State:**
   - Clear localStorage
   - Clear cache
   - Incognito/Private mode

4. **Check File Integrity:**
   ```bash
   # Pastikan semua file ada
   ls -la js/
   ls -la js/services/
   ls -la js/components/
   ```

---

**Tips:** Selalu buka Developer Tools (F12) saat develop untuk melihat error real-time!

