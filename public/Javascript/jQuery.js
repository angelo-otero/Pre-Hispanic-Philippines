//jshint esversion:6

$(document).ready(() => {
  const highlandImage = $('.highland-people-img');
  const highlandGallery = $('.highland-people-gallery');
  const highlandButton = $('.highland-button');
  const highlandInfo = $('.highland-group-info');
  const highlandThumbnail = $('.img-thumbnail');

  highlandGallery.hide();

  highlandButton.on('click', () => {
    if (highlandButton.text() === 'View Gallery') {
      highlandInfo.hide();
      highlandGallery.show();
      highlandButton.text('View Info');
    } else {
      highlandInfo.show();
      highlandGallery.hide();
      highlandButton.text('View Gallery');
    }
  });

  highlandThumbnail.on('mouseenter', ()=>{
    highlandThumbnail.css({
      'cursor': 'pointer'
    });
  });

  highlandThumbnail.on('click', ()=>{
    highlandImage.attr({
      'src': 'Images/coastal-area.jpeg'
    });
  });

});
