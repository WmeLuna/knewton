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
