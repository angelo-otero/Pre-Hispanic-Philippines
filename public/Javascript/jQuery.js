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

  // quiz variables
  let question = $('.question');
  let choices = $('#choices');
  const submitAnswerBtn = $('.submit-answer');
  let questionNumber = 1;
  let answerScore = 0;
  const people = $('.people');
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


  // testing quiz mechanics
  //array containing questions and their choices
  const questionAndChoices = [{
    question: 'About how many Filipino ethnolinguistic groups currently exist?',
    choices: `<input class='people' type='radio' name='ethnolinguistic-number' value='a'> 1<br>
      <input class='people' type='radio' name='ethnolinguistic-number' value='b'> 365<br>
      <input class='people' type='radio' name='ethnolinguistic-number' value='c'> 175<br>
      <input class='people' type='radio' name='ethnolinguistic-number' value='d'> 25`
    }, {
      question: 'What are the three major regions of the Philippines?',
      choices: `<input type='checkbox' name='regions' value='a'> Mindoro<br>
        <input type='checkbox' name='regions' value='b'> Luzon<br>
        <input type='checkbox' name='regions' value='c'> Srivijaya<br>
        <input type='checkbox' name='regions' value='d'> Mindanao<br>
        <input type='checkbox' name='regions' value='e'> Visayas`
    }, {
      question: 'Who led the first Spanish expedition to the Philippines?',
      choices: `<input type='radio' name='conquistador' value='a'> Karimul Makhdum<br>
        <input type='radio' name='conquistador' value='b'> Zheng He<br>
        <input type='radio' name='conquistador' value='c'> Ferdinand Magellan<br>
        <input type='radio' name='conquistador' value='d'> Miguel Lopez de Legazpi`
    }, {
      question: 'Which Filipino ethnolinguistic group is the most well-known?',
      choices: `<input type='radio' name='famous-group' value='a'> T'boli<br>
        <input type='radio' name='famous-group' value='b'> Tagalog<br>
        <input type='radio' name='famous-group' value='c'> Tutsi<br>
        <input type='radio' name='famous-group' value='d'> Uyghurs`
    }, {
      question: 'The Philippines is a(n):',
      choices: `<input type='radio' name='land-type' value='a'> peninsula or land mostly surrounded by water <br>
        <input type='radio' name='land-type' value='b'> isthmus or narrow land connecting two larger areas across water<br>
        <input type='radio' name='land-type' value='c'> fjord or long, narrow inlet with steep sides or cliffs<br>
        <input type='radio' name='land-type' value='d'> archipelago or group of islands`
    }, {
      question: 'Which of these places in the Philippines is listed as a UNESCO World Heritage Site?',
      choices: `<input type='radio' name='UNESCO' value='a'> Borubudur Temple Compounds<br>
        <input type='radio' name='UNESCO' value='b'> Rice Terraces of Philippine Cordilleras<br>
        <input type='radio' name='UNESCO' value='c'> Plaza Moraga<br>
        <input type='radio' name='UNESCO' value='d'> Banaue Rice Terraces`
    }, {
      question: 'Which Filipino groups resisted Spanish expansion the longest?',
      choices: `<input type='checkbox' name='resist' value='a'> Mestizos<br>
        <input type='checkbox' name='resist' value='b'> Highlanders<br>
        <input type='checkbox' name='resist' value='c'> Muslim Sultanates<br>
        <input type='checkbox' name='resist' value='d'> Lowlanders`
    }, {
      question: 'How long did the Spanish Colonial Era last?',
      choices: `<input type='radio' name='colonial-era' value='a'> 1000 years<br>
        <input type='radio' name='colonial-era' value='b'> 333 years<br>
        <input type='radio' name='colonial-era' value='c'> 42 days<br>
        <input type='radio' name='colonial-era' value='d'> 12 weeks`
    }, {
      question: 'The Laguna Copperplate Inscription is important because:',
      choices: `<input type='checkbox' name='LCI' value='a'> it's the earliest written record found in the Philippines<br>
        <input type='checkbox' name='LCI' value='b'>it's written by Jose Rizal <br>
        <input type='checkbox' name='LCI' value='c'> it proves the existence of ancient aliens<br>
        <input type='checkbox' name='LCI' value='d'> it provides evidence of cultural exchange due to different languages used<br>
        <input type='checkbox' name='LCI' value='e'> it shows the wealth of the Javanese empire`
    }, {
      question: 'Who is credited for bringing Islam to the Philippines?',
      choices: `<input type='radio' name='islam' value='a'>An-Nasir Salah ad-Din Yusuf ibn Ayyub <br>
        <input type='radio' name='islam' value='b'> Abdul Alhazred<br>
        <input type='radio' name='islam' value='c'> Karimul Makhdum<br>
        <input type='radio' name='islam' value='d'> Muhammad Ali`
  }];

  submitAnswerBtn.on('click', function() {
    //randomly generate an integer between 0 and length of the array
    let i = Math.floor(Math.random() * questionAndChoices.length);

    //checks if the button text is Begin Quiz and changes it to Submit Answer
    if (submitAnswerBtn.text() === 'Begin Quiz') {
      submitAnswerBtn.text('Submit Answer');
    }
    // if (submitAnswerBtn.text() === 'Submit Answer') {
    //   feedback.show();
    // }
    //checks to see if array is empty
    //if not empty, randomly choose and render a question and choices object
    //then remove that object from the array
    if (!questionAndChoices || !questionAndChoices.length) {
      question.html("<h1>You've finished!</h1>");
      choices.html("");
    } else {
      let randomQuestion = questionAndChoices[i].question;
      let randomChoices = questionAndChoices[i].choices;
      question.html('<h3>Question ' + questionNumber + ' of 10</h3><br><h2>' + randomQuestion + '</h2>');
      choices.html(randomChoices);
      questionAndChoices.splice(i, 1);
      questionNumber++;
      // console.log(i);
      // console.log(questionAndChoices);
      // console.log(questionAndChoices.length);
    }

    // if (submitAnswerBtn.text() === 'Submit Answer') {
    //   switch (choices.find('input[name="ethnolinguistic-number"]:checked').val()) {
    //     case 'a':
    //       feedbackHeader.text('Wrong!');
    //       feedbackText.text('Try Again!');
    //       console.log('wrong');
    //       break;
    //     case 'b':
    //       feedbackHeader.text('Wrong!');
    //       feedbackText.text('Try Again!');
    //       console.log('wrong');
    //       break;
    //     case 'c':
    //       answerScore++;
    //       console.log('right');
    //       console.log(answerScore);
    //       break;
    //     case 'd':
    //       feedbackHeader.text('Wrong!');
    //       feedbackText.text('Try Again!');
    //       console.log('wrong');
    //       break;
    //     default:
    //     console.log('something went wrong');
    //
    //   }
    // }

  });

  $('.get-value').on('click', function(){
    console.log($('input[name=ethnolinguistic-number]:checked', '#choices').val());
    console.log($('input[name=regions]:checked', '#choices').val());
    console.log($('input[name=conquistador]:checked', '#choices').val());
    console.log($('input[name=famous-group]:checked', '#choices').val());
    console.log($('input[name=land-type]:checked', '#choices').val());
    console.log($('input[name=UNESCO]:checked', '#choices').val());
    console.log($('input[name=resist]:checked', '#choices').val());
    console.log($('input[name=colonial-era]:checked', '#choices').val());
    console.log($('input[name=LCI]:checked', '#choices').val());
    console.log($('input[name=islam]:checked', '#choices').val());
  });


});
