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
    $(this).find(imgCaption).fadeIn(500);
    $(this).find(img).css({
      'opacity': '.3',
      'cursor': 'pointer',
      'transform': 'scale(1.2)'
    });
  }).on('mouseleave', function() {
    $(this).find(imgCaption).fadeOut(500);
    $(this).find(img).css({
      'opacity': '1',
      'cursor': 'default',
      'transform': 'scale(1)'
    });
  });

  // ensures the image color overlay remains when
  // the mouse hovers over the caption
  imgCaption.on('mouseenter', function() {
    $(this).find(img).css({
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
    let aetaTitle = $('.aeta-title');
    let aetaSource = $('.aeta-source');
    aetaImage.fadeOut(1000, function() {
      aetaImage.attr('src', imgSrc).fadeIn(1000);
    });
    // changes the image caption based
    // on the src of thumbnail clicked
    switch (imgSrc) {
      case 'Images/Aeta1.jpg':
        aetaTitle.text('Aeta Women and their Children ca. 1890 - ca. 1923');
        aetaSource.text('PD-US-Expired');
        break;
      case 'Images/Aeta2.jpg':
        aetaTitle.text('Aeta Group 1902');
        aetaSource.text('PD-US-Expired');
        break;
      case 'Images/Aeta3.jpg':
        aetaTitle.text('Aeta Man and Woman 1885');
        aetaSource.html('<p>Photo By: <a href="https://commons.wikimedia.org/wiki/File:Bosquejo_del_archipi%C3%A9lago_filipino,_1885_%22Negritos_o_Aetas%22_(3817431370).jpg" target="_blank">Antonio Machado</a></p>');
        break;
      case 'Images/Aeta4.jpg':
        aetaTitle.text('Aeta Girl 1902');
        aetaSource.text('PD-US-Expired');
        break;
      default:

    }
  });

  // changes the large image on the left
  // based on the image thumbnail clicked
  ilongotThumbnail.on('click', function() {
    const imgSrc = $(this).attr('src');
    let ilongotTitle = $('.ilongot-title');
    let ilongotSource = $('.ilongot-source');
    ilongotImage.fadeOut(1000, function() {
      ilongotImage.attr('src', imgSrc).fadeIn(1000);
    });
    // changes the image caption based
    // on the src of thumbnail clicked
    switch (imgSrc) {
      case 'Images/Ilongot1.jpg':
        ilongotTitle.text('Ilongot Hunting Party 1910');
        ilongotSource.text('PD-US-Expired');
        break;
      case 'Images/Ilongot2.jpg':
        ilongotTitle.text('Ilongot Rice Farmers 1910');
        ilongotSource.text('PD-US-Expired');
        break;
      case 'Images/Ilongot3.jpg':
        ilongotTitle.text('Ilongot Men and Women 1910');
        ilongotSource.text('PD-US-Expired');
        break;
      case 'Images/Ilongot4.jpg':
        ilongotTitle.text('Ilongot Man');
        ilongotSource.text('PD-US-Expired');
        break;
      default:

    }
  });


  // changes the src, alt, title and footer of
  // the image modal based on image clicked
  imgContainer.on('click', function() {
    // variables for getting the clicked image's src, alt and caption
    const imgSrc = $(this).find('.img').attr('src');
    const imgAlt = $(this).find('.img').attr('alt');
    const imgTitle = $(this).find('h4').text();
    const imgCredits = $(this).find('p').html();
    // variables for setting the modal image, title and footer
    let modalImage = $('#modal-image');
    let modalTitle = $('#image-modal-title');
    let modalFooter = $('.modal-footer').find('p');

    // changes the modal title, alt and footer
    modalTitle.text(imgTitle);
    modalFooter.html(imgCredits);
    modalImage.attr('alt', imgAlt);

    // changes the modal image src based on image clicked
    switch (imgSrc) {
      // index page cases 
      case 'Images/PreHistory.jpg':
        modalImage.attr('src', 'Images/PreHistory_full.jpeg');
        break;
      case 'Images/Lowland.jpg':
        modalImage.attr('src', 'Images/Lowland_full.jpeg');
        break;
      default:

    }

  });


});
