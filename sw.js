self.addEventListener('install', (event) => {
    console.log('Service worker installed');
  });
  
  self.addEventListener('fetch', function(event) {
    // basic pass-through fetch for now
  });
  