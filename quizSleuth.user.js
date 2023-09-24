// ==UserScript==
// @name         quizSleuth
// @namespace    https://wmeluna.com/
// @version      0.1
// @description  Give more info for tests/quizes
// @author       WmeLuna
// @match        https://www.knewton.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=knewton.com
// @grant        none
// @run-at       document-start
// ==/UserScript==
const originalFetch = window.fetch;

window.fetch = async (url, options) => {
  if (url === "/graphql") {
    const originalResponse = await originalFetch(url, options);
    const responseData = await originalResponse.json();

    responseData.forEach(item => {
      if (item.data) {
        if (item.data.assignmentForStudent) {
          if (item.data.assignmentForStudent.quizConfiguration){
            let qc = item.data.assignmentForStudent.quizConfiguration;
            item.data.assignmentForStudent.label += " ● Max attempts "
            item.data.assignmentForStudent.label += qc.maxNumAttempts
            item.data.assignmentForStudent.label += " ● "
            item.data.assignmentForStudent.label += qc.totalQuestions
            item.data.assignmentForStudent.label += " Questions"
            if (qc.shuffleQuestions) {
              item.data.assignmentForStudent.label += " ● Questions Shuffled"
            }
          }
        }
      }
    });

    const modifiedResponse = new Response(JSON.stringify(responseData), {
      status: originalResponse.status,
      statusText: originalResponse.statusText,
      headers: originalResponse.headers
    });

    return modifiedResponse;
  }

  return originalFetch(url, options);
};
