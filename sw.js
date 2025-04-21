self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
  });
  
  self.addEventListener('fetch', (event) => {
    // Do nothing, just pass through
  });
  