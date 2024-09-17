const questionsArray = [
  "question-1",
  "question-2",
  "question-3",
  "question-4",
  "question-5",
];

const submit_btn = document.getElementById("submit_btn");
const questions_container = document.querySelector(".questions_container");
const firstQuestion = questions_container.querySelector(".questions");

let questionCount = 1;
disable_submit_btn();
let local_rem_lim = parseInt(localStorage.getItem("rem_limit"));

if (local_rem_lim > 0) {
  alert("Once Option is selected it can't be changed later . So, choose wisely");
  verifyAnswer(firstQuestion);
} else {
  disable_all_inputs();
}

function verifyAnswer(newQ) {
  const answer = newQ.querySelectorAll(
    `.answer input[name='q${questionCount}']`
  );
  answer.forEach((option) => {
    option.addEventListener("click", (e) => {
      const radioValue = e.target.value;
      // console.log(radioValue);

      if (radioValue == "yes") {
        if (questionCount < questionsArray.length) {
          addAnotherQuestion(++questionCount);
          disableBothInputs(e.target);
        } else {
          enableSubmitButton();
        }
      } else {
        enableSubmitButton();
      }
      disableOtherOption(e.target);
      disableBothInputs(e.target);
    });
  });
}
function disableBothInputs(selectedOption) {
  const radios = selectedOption.parentElement;
  radios.querySelectorAll("input").disabled = false;
}
function disableOtherOption(selectedOption) {
  if (selectedOption.value == "yes") {
    const noRadio = selectedOption.parentElement.nextElementSibling;
    noRadio.querySelector("input").disabled = true;
  } else {
    const yesRadio = selectedOption.parentElement.previousElementSibling;
    yesRadio.querySelector("input").disabled = true;
  }
}
function addAnotherQuestion() {
  const questionString = questionsArray[questionCount - 1];
  const newQ = document.createElement("div");
  newQ.classList.add("questions");
  newQ.innerHTML = ` <h4 id="question_string${questionCount}">${questionCount} . ${questionString}</h4>
                    <div class="answer ">
                        <div class="option">
                            <input type="radio" id="yes${questionCount}" value="yes" name="q${questionCount}">
                            <label for="yes${questionCount}">Yes</label>
                        </div>
                        <div class="option">
                            <input type="radio" id="no${questionCount}" value="no" name="q${questionCount}">
                            <label for="no${questionCount}">No</label>
                        </div>
                    </div>`;
  questions_container.appendChild(newQ);
  verifyAnswer(newQ);
}
function enableSubmitButton() {
  if (submit_btn.disabled) {
    submit_btn.disabled = false;
    submit_btn.classList.add("hover_button");
  }
  return;
}
function disable_submit_btn() {
  submit_btn.disabled = true;
  if (submit_btn.disabled) {
    submit_btn.classList.remove("hover_button");
  }
}
function disable_all_inputs() {
  firstQuestion.querySelectorAll("input").forEach((element) => {
    element.disabled = true;
  });
}
export { disable_submit_btn };
