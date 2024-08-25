const addFloatingButton = () => {
    const videos = document.querySelectorAll('video');
  
    videos.forEach(video => {
      if (!document.querySelector('.floating-btn')) { // Buton yalnızca bir kez eklenecek
        const rect = video.getBoundingClientRect();
  
        // Buton elementini oluştur
        const btn = document.createElement('button');
        btn.className = 'floating-btn';
  
        // İkonu image olarak ekleyelim
        const icon = document.createElement('img');
        icon.src = 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/popup-link-icon.png'; // URL'den ikon yükle
        icon.style.width = '24px';
        icon.style.height = '24px';
        icon.style.display = 'block';
  
        // Butona ikonu ekle
        btn.appendChild(icon);
  
        // Buton stilleri
        btn.style.position = 'fixed'; // Sayfada sabit konumlandırma
        btn.style.top = `${rect.top + 10}px`;
        btn.style.left = `${rect.left + (rect.width / 2) - 12}px`; // Video playerin ortasında olacak şekilde ayarla
        btn.style.padding = '0px'; // Padding kaldırıldı
        btn.style.zIndex = '9999';
        btn.style.backgroundColor = 'transparent'; // Arka plan tamamen şeffaf
        btn.style.border = 'none'; // Kenar çizgisi yok
        btn.style.cursor = 'pointer';
        btn.style.opacity = '0'; // Başlangıçta görünmez
        btn.style.transition = 'opacity 0.3s';
  
        // Butonun video playerin üzerine gelince gösterilmesini sağla
        let hideTimeout;
  
        const showButton = () => {
          btn.style.opacity = '1';
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            if (!btn.matches(':hover')) { // Buton üzerinde değilse gizle
              btn.style.opacity = '0';
            }
          }, 3000); // 2 saniye hareketsizlik sonrası gizlenir
        };
  
        // Video playerda mouse hareketini izleme
        video.parentElement.addEventListener('mousemove', () => {
          showButton(); // Mouse hareket edince buton görünür
        });
  
        // Mouse playerdan ayrılınca buton gizlenir
        video.parentElement.addEventListener('mouseleave', () => {
          if (!btn.matches(':hover')) { // Buton üzerinde değilse gizle
            btn.style.opacity = '0';
          }
        });
  
        // Buton üzerinde olunduğunda kaybolmasını engelleme
        btn.addEventListener('mouseenter', () => {
          clearTimeout(hideTimeout); // Gizleme zamanlayıcısını iptal et
          btn.style.opacity = '1'; // Buton tamamen görünür
        });
  
        // Buton üzerinden çıkıldığında tekrar zamanlayıcı başlat
        btn.addEventListener('mouseleave', () => {
          hideTimeout = setTimeout(() => {
            btn.style.opacity = '0';
          }, 2000);
        });
  
        btn.addEventListener('click', () => {
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          } else if (video.requestPictureInPicture) {
            video.requestPictureInPicture()
              .catch(error => {
                console.error('Picture-in-Picture hatası:', error);
              });
          } else {
            alert('Tarayıcınız Picture-in-Picture özelliğini desteklemiyor.');
          }
        });
  
        // Butonu body'e ekle
        document.body.appendChild(btn);
  
        // Pencere veya video boyutu değiştiğinde butonun konumunu güncelle
        const updateButtonPosition = () => {
          const rect = video.getBoundingClientRect();
          btn.style.top = `${rect.top + 10}px`;
          btn.style.left = `${rect.left + (rect.width / 2) - 12}px`;
        };
  
        window.addEventListener('resize', updateButtonPosition); // Pencere boyutu değiştiğinde konumu güncelle
        new ResizeObserver(updateButtonPosition).observe(video); // Video boyutu değiştiğinde konumu güncelle
      }
    });
  };
  
  // Butonların video player üzerinde sürekli doğru pozisyonda kalmasını sağlamak için belirli aralıklarla kontrol
  setInterval(addFloatingButton, 2000);
  