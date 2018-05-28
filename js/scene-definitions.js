
app.scenes = [
{
  name: 'study',
  text: 'Study',
  onEnter: function() {

  },
  onExit: function() {

  },
  words: {
    read: {
      text: 'read',
      position: { x: 250, y: 100 }
    },
    book: {
      text: 'book',
      position: { x: 100, y: 120 },
      interactions: {
        read: function() {
          app.reveal('illumination');
        }
      }
    },
    candle: {
      text: 'candle',
      position: { x: 75, y: 50 },
      interactions: {
        illumination: function() {
          console.log('illuminated');
        }
      }
    },
    illumination: {
      text: 'illumination',
      position: { x: 75, y: 200 },
      hidden: true
    }
  }
}
];
