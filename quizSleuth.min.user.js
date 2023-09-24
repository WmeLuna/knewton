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
const originalFetch=window.fetch;window.fetch=async(t,a)=>{if("/graphql"===t){const e=await originalFetch(t,a),n=await e.json();return n.forEach((t=>{if(t.data&&t.data.assignmentForStudent&&t.data.assignmentForStudent.quizConfiguration){let a=t.data.assignmentForStudent.quizConfiguration;t.data.assignmentForStudent.label+=" ● Max attempts ",t.data.assignmentForStudent.label+=a.maxNumAttempts,t.data.assignmentForStudent.label+=" ● ",t.data.assignmentForStudent.label+=a.totalQuestions,t.data.assignmentForStudent.label+=" Questions",a.shuffleQuestions&&(t.data.assignmentForStudent.label+=" ● Questions Shuffled")}})),new Response(JSON.stringify(n),{status:e.status,statusText:e.statusText,headers:e.headers})}return originalFetch(t,a)};