//jshint esversion:6

$(document).ready(() => {
  const aetaImage = $('#aetaImg');
  const aetaButton = $('#aetaButton');
  const aetaGallery = $('#Aeta .highland-people-gallery');
  const aetaInfo = $('#Aeta .highland-group-info');
  const ilongotImage = $('#ilongotImg');
  const ilongotButton = $('#ilongotButton');
  const ilongotGallery = $('#Ilongot .highland-people-gallery');
  const ilongotInfo = $('#Ilongot .highland-group-info');
  const highlandThumbnail = $('.highland-people-gallery img');

  $('.highland-people-gallery').hide();

  aetaButton.on('click', function() {
    if (aetaButton.text() === 'View Gallery') {
      aetaInfo.fadeOut(1000);
      aetaGallery.fadeIn(1000);
      aetaButton.text('View Info');
    } else {
      aetaInfo.fadeIn(1000);
      aetaGallery.fadeOut(1000);
      aetaButton.text('View Gallery');
    }
  });

  ilongotButton.on('click', function() {
    if (ilongotButton.text() === 'View Gallery') {
      ilongotInfo.fadeOut(1000);
      ilongotGallery.fadeIn(1000);
      ilongotButton.text('View Info');
    } else {
      ilongotInfo.fadeIn(1000);
      ilongotGallery.fadeOut(1000);
      ilongotButton.text('View Gallery');
    }
  });

  highlandThumbnail.on('mouseenter', () => {
    highlandThumbnail.css({
      'cursor': 'pointer'
    });
  });

  highlandThumbnail.on('click', function() {
    var imgSrc = $(this).attr('src');
    if ($(this).parent().attr('id', 'AetaGallery')) {
      aetaImage.attr('src', imgSrc);
      console.log('aeta');
    }
    if ($(this).parent().attr('id', 'IlongotGallery')) {
      ilongotImage.attr('src', imgSrc);
      console.log('ilongot');
    }
  });

});
