import { disable_submit_btn } from "./script.js";

const total_submission_locator = document.getElementById("total_submission");
const remaining_limit_locator = document.getElementById("remaining_limit");
const result = document.getElementById("result");
const submit_btn = document.getElementById("submit_btn");

const given_rem_lim = 5;
let TOTAL_SUBMISSIONS = 1;
let local_rem_lim = parseInt(localStorage.getItem("rem_limit"));
let REMAINING_LIMIT = null;

initialize_limits();
hero();

function initialize_limits() {
  if (!localStorage.getItem("rem_limit")) {
    localStorage.setItem("rem_limit", `${given_rem_lim}`);
  }
  REMAINING_LIMIT = local_rem_lim;
  display_values();
}

function hero() {
  if (REMAINING_LIMIT > 0) {
    submit_btn.addEventListener("click", (e) => {
      e.preventDefault();
      update_values();
      alert("Submitted Succesfully");
      if (confirm("do you want to submit another response ?")) {
        window.location.reload();
      } else {
        disable_submit_btn();
        display_message(
          "Thank you ! Your response has been submitted successfully ."
        );
      }
    });
  } else {
    reset_limit();
    display_message(
      "Your have exceeded your daily limit . Please try again tomorrow"
    );
    disable_submit_btn();
  }
}
function reset_limit() {
  // If the limit is reached, display a message and reset the limit after 24 hours
  var timestamp = localStorage.getItem("timestamp");
  var now = new Date().getTime();
  if (now - timestamp >= 86400000) {
    // 24 hours in milliseconds
    localStorage.setItem("rem_limit", `${given_rem_lim}`);
    localStorage.setItem("timestamp", now);
  }
}
function update_values() {
  REMAINING_LIMIT--;
  TOTAL_SUBMISSIONS++;
  localStorage.setItem("rem_limit", `${REMAINING_LIMIT}`);
  display_values();
}
function display_values() {
  total_submission_locator.innerText = `${TOTAL_SUBMISSIONS}`;
  remaining_limit_locator.innerText = `${local_rem_lim}`;
}
function display_message(message) {
  result.innerHTML = message;
}
