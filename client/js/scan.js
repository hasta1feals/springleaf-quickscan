// console.log('i clicked the start button');
function addButtonActions(){
    var startButton = document.getElementById('button-start');
    var infoButton = document.getElementById('info-button');
    var questionsButton = document.getElementById('questions-button');

    startButton.addEventListener('click', function(){
        showStartPage();
        
    });

    infoButton.addEventListener('click', function(){
        showQuestionPage();

});

questionsButton.addEventListener('click', function(){
    showLandingPage();  
});
}
function hideAllPages(){
    var landingPage = document.getElementById('page-landing');
    var startPage = document.getElementById('page-start');
    var questionsPage = document.getElementById('page-questions');

    landingPage.style.display = 'none';
    startPage.style.display = 'none';
    questionsPage.style.display = 'none';
}


function showLandingPage() {
    var page = document.getElementById('page-landing');

    hideAllPages();

    page.style.display = 'block';

    console.info('Je bent nu op de Landingpagina');
}

function showStartPage() {
    var page = document.getElementById('page-start');

    hideAllPages();

    page.style.display = 'block';

    console.info('Je bent nu op de Startpagina');
}

function showQuestionPage() {
    var page = document.getElementById('page-questions');

    hideAllPages();

    page.style.display = 'block';

    console.info('Je bent nu op de QuestionPage');

}

addButtonActions();
showLandingPage();