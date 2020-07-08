//$('.d-none').removeClass('d-none');
// create a function to display what question user is on
// create function to display score
// create function to display correct answer when it is chosen
// if statement - if it is not the right answer display "Incorrect Answer"


/* when a user clicks on start quiz button */
function startQuiz() {
  $('#start').on('click', function(event){
    renderAQuestion();
  }
  );
}

//display question and score obtained
function updateQuestionAndScore() {
  const html = $(`<ul>
      <li id="answered">Questions Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
      <li id="score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
  $(".question-and-score").html(html);
}


// when user clicks on next the next question will show
function updateOptions()
{
  let question = STORE.questions[STORE.currentQuestion];
  for(let i=0; i<question.options.length; i++)
  {
    $('.js-options').append(`
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);
  }
  
}


/*displays the question*/
function renderAQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionAndScore();
  const questionHtml = $(`
  <div>
    <form id="js-questions" class="question-form">
      
      <fieldset>
        <div class="row question">
          <div class="col-12">
            <legend> ${question.question}</legend>
          </div>
        </div>

        <div class="row options">
          <div class="col-12">
            <div class="js-options"> </div>
        </div>
      </div>
    

      <div class="row">
        <div class="col-12">
          <button type = "submit" id="answer" tabindex="5">Submit</button>
          <button type = "button" id="next-question" tabindex="6"> Next >></button>
        </div>
      </div>
    </fieldset>
    </form>
  </div>`);
$("main").html(questionHtml);
updateOptions();
$("#next-question").hide();
}

/* displays results and restart quiz button */
function displayResults() {
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
  $("main").html(resultHtml);
}


/*checks whether the chosen option is right or wrong and displays respective message*/ 
function handleSelectOption() {
  $('body').on("submit",'#js-questions', function(event) {
    event.preventDefault();
    let currentQues = STORE.questions[STORE.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    } 
    let id_num = currentQues.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("right-answer wrong-answer");
    if(currentQues.answer[0] === selectedOption[0]) {
      STORE.score++; 
      $(`${id}`).append(`You got it right<br/>`);
      $(`${id}`).addClass("right-answer");
    }
    else {
      $(`${id}`).append(`You got it wrong <br/> The answer is "${currentQues.answer}"<br/>`);
      $(`${id}`).addClass("wrong-answer");
    }

    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
  });
}


/* checks whether it reached the end of questions list */
function nextQuestions() {
  $('body').on('click','#next-question', (event) => {
    STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
  });
}
// submit quiz to display correct answers
$("#form").on('submit', function (e) {
  e.preventDefault();
  const correctAnswers = Array.from($('.true')).map(e => {
    return $(e).prop('checked');
  });
})


function restartQuiz() {
  $('body').on('click','#restart', (event) => {
    renderAQuestion();
  });
}

function produceQuiz() {
  startQuiz();
  nextQuestions();
  handleSelectOption();
  restartQuiz();
}

$(produceQuiz);
