//jshint esversion:6

$(document).ready(() => {
// general image variables
  const img = $('.img');
  const imgContainer = $('.img-container');
  const imgCaption = $('.img-caption');

// highland variables
  const aetaImage = $('#aetaImg');
  const aetaButton = $('#aetaButton');
  const aetaGallery = $('#Aeta .highland-people-gallery');
  const aetaInfo = $('#Aeta .highland-group-info');
  const aetaThumbnail = $('#AetaGallery img');
  const ilongotImage = $('#ilongotImg');
  const ilongotButton = $('#ilongotButton');
  const ilongotGallery = $('#Ilongot .highland-people-gallery');
  const ilongotInfo = $('#Ilongot .highland-group-info');
  const ilongotThumbnail = $('#IlongotGallery img');
  const highlandThumbnail = $('.img-thumbnail');

// hides gallery for Aeta and Ilongot groups
  $('.highland-people-gallery').hide();
// hides the caption for all images
  imgCaption.hide();

// initialize popovers in bootstrap
  $(function() {
    $('[data-toggle="popover"]').popover();
  });

// zooms in on image and shows the caption and color
// background of the image when the mouse hovers,
// then hides it when no longer hovering
  imgContainer.on('mouseenter', function() {
    imgCaption.fadeIn(500);
    img.css({
      'opacity': '.3',
      'cursor': 'pointer',
      'transform': 'scale(1.2)'
    });
  }).on('mouseleave', function() {
    imgCaption.fadeOut(500);
    img.css({
      'opacity': '1',
      'cursor': 'default',
      'transform': 'scale(1)'
    });
  });

// ensures the image color overlay remains when
// the mouse hovers over the caption
  imgCaption.on('mouseenter', function() {
    img.css({
      'opacity': '.3',
      'transform': 'scale(1.2)'
    });
  });

// checks to see if the gallery is currently hidden
// based on button text, then toggles it on click
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

  // checks to see if the gallery is currently hidden
  // based on button text, then toggles it on click
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

// changes the mouse icon to
// a pointer when hover over the img
  highlandThumbnail.on('mouseenter', () => {
    highlandThumbnail.css({
      'cursor': 'pointer'
    });
  });

// changes the large image on the left
// based on the image thumbnail clicked
  aetaThumbnail.on('click', function() {
    const imgSrc = $(this).attr('src');
    aetaImage.fadeOut(1000, function() {
      aetaImage.attr('src', imgSrc).fadeIn(1000);
    });
  });

  // changes the large image on the left
  // based on the image thumbnail clicked
  ilongotThumbnail.on('click', function() {
    const imgSrc = $(this).attr('src');
    ilongotImage.fadeOut(1000, function() {
      ilongotImage.attr('src', imgSrc).fadeIn(1000);
    });
  });

});
