//jshint esversion:6

$(document).ready(() => {
  // general image variables
  const img = $('.img');
  const imgContainer = $('.img-container');
  const imgCaption = $('.img-caption');

  // lowland variables
  const regionName = $('.region-name').find('h1');

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

  //quiz variables
  const feedback = $('.feedback');
  const feedbackHeader = $("#feedback-header");
  const feedbackText = $("#feedback-text");

  // variables for setting the modal image, title and footer
  let modalImage = $('#modal-image');
  let modalTitle = $('#image-modal-title');
  let modalFooter = $('.modal-footer').find('p');

  // hides gallery for Aeta and Ilongot groups
  $('.highland-people-gallery').hide();
  // hides the caption for all images
  imgCaption.hide();
  feedback.hide();

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
    const thumbAlt = $(this).attr('alt');
    let aetaTitle = $('.aeta-title');
    let aetaSource = $('.aeta-source');

    aetaImage.fadeOut(250, function() {
      aetaImage.attr('src', imgSrc).fadeIn(250);
    });

    // changes the alt to match the clicked thumbnail's alt
    $('#aetaImg').attr('alt', thumbAlt);

    // changes the image caption based
    // on the src of thumbnail clicked
    switch (imgSrc) {
      case 'Images/Aeta1.jpg':
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
        aetaTitle.text('Aeta Women and their Children ca. 1890 - ca. 1923');
        aetaSource.text('PD-US-Expired');
    }
  });

  // changes the large image on the left
  // based on the image thumbnail clicked
  ilongotThumbnail.on('click', function() {
    const imgSrc = $(this).attr('src');
    const thumbAlt = $(this).attr('alt');
    let ilongotTitle = $('.ilongot-title');
    let ilongotSource = $('.ilongot-source');

    ilongotImage.fadeOut(250, function() {
      ilongotImage.attr('src', imgSrc).fadeIn(250);
    });

    // changes the alt to match the clicked thumbnail's alt
    $('#ilongotImg').attr('alt', thumbAlt);

    // changes the image caption based
    // on the src of thumbnail clicked
    switch (imgSrc) {
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
        ilongotTitle.text('Ilongot Hunting Party 1910');
        ilongotSource.text('PD-US-Expired');

    }
  });


  // changes the src, alt, title and footer of
  // the image modal based on image clicked
  // so the full, uncropped image can be displayed
  imgContainer.on('click', function() {
    // variables for getting the clicked image's src, alt and caption
    const imgSrc = $(this).find('.img').attr('src');
    const imgAlt = $(this).find('.img').attr('alt');
    const imgTitle = $(this).find('h4').text();
    const imgCredits = $(this).find('p').html();

    // changes the modal title, alt and footer
    modalTitle.text(imgTitle);
    modalFooter.html(imgCredits);
    modalImage.attr('alt', imgAlt);

    // changes the modal image src based on image clicked
    switch (imgSrc) {
      // cases for full sized images with jpeg file type
      case 'Images/PreHistory.jpg':
        modalImage.attr('src', 'Images/PreHistory_full.jpeg');
        break;
      case 'Images/LCI.jpg':
        modalImage.attr('src', 'Images/LCI_full.jpeg');
        break;
      case 'Images/ColonialMoraga.jpg':
        modalImage.attr('src', 'Images/ColonialMoraga_full.jpeg');
        break;
      case 'Images/Lowland.jpg':
        modalImage.attr('src', 'Images/Lowland_full.jpeg');
        break;
      case 'Images/Highland.jpg':
        modalImage.attr('src', 'Images/Highland_full.jpeg');
        break;
      default:
        // if image clicked is none of the above, subtracts the last four
        // letters of the file (.jpg) and replaces it with '_full.jpg'
        // so the full image is displayed
        modalImage.attr('src', imgSrc.slice(0, -4) + '_full.jpg');
    }

  });

  // changes modal image based on region name clicked
  regionName.on('click', function() {
    const regionNameText = $(this).text();
    console.log(regionNameText);
    switch (regionNameText) {
      case 'Luzon':
        modalImage.attr('src', 'Images/Luzon.jpg');
        modalTitle.text('Luzon');
        modalFooter.html('<p>Photo by: <a href="https://commons.wikimedia.org/wiki/File:Luzon_Island_Red.png" target="_blank">JL 09</a></p>');
        break;
      case 'Visayas':
        modalImage.attr('src', 'Images/Visayas.jpg');
        modalTitle.text('Visayas');
        modalFooter.html('<p>Photo by: <a href="https://commons.wikimedia.org/wiki/File:Visayas_Red.png" target="_blank">JL 09</a></p>');
        break;
      case 'Mindanao':
        modalImage.attr('src', 'Images/Mindanao.jpg');
        modalTitle.text('Mindanao');
        modalFooter.html('<p>Photo by: <a href="https://commons.wikimedia.org/wiki/File:Mindanao_Red.png" target="_blank">JL 09</a></p>');
        break;
      default:

    }
  });
});
