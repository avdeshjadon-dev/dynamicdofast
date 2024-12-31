// scriptTemplate.js
const scriptTemplate = `
(function () {
  const createOnceCallable = (function () {
    let called = true;
    return function (context, func) {
      const innerFunction = called
        ? function () {
            if (func) {
              const result = func.apply(context, arguments);
              func = null;
              return result;
            }
          }
        : function () {};
      called = false;
      return innerFunction;
    };
  })();

  const createAnotherOnceCallable = (function () {
    let called = true;
    return function (context, func) {
      const innerFunction = called
        ? function () {
            if (func) {
              const result = func.apply(context, arguments);
              func = null;
              return result;
            }
          }
        : function () {};
      called = false;
      return innerFunction;
    };
  })();

  const originalOpen = window.open;
  window.open = function (url, target, features, replace, data) {
    return originalOpen.call(window, url, "_self", null, replace, data);
  };

  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.info = function () {};
  console.debug = function () {};
  window.alert = function () {};
  window.prompt = function () {
    return null;
  };

  const originalJSON = window.JSON;

  function transformCharacter(char, shift) {
    if (char >= "0" && char <= "9") {
      return (parseInt(char) + shift + 10) % 10;
    }
    if (char >= "a" && char <= "z") {
      return String.fromCharCode(
        ((char.charCodeAt(0) - 97 + shift + 26) % 26) + 97
      );
    }
    return char;
  }

  function decodeUserId(encodedId) {
    const executeOnce = createOnceCallable(this, function () {
      let globalContext;
      try {
        const getGlobal = Function(
          'return (function() {}.constructor("return this")( ));'
        );
        globalContext = getGlobal();
      } catch (error) {
        globalContext = window;
      }

      const regex = new RegExp("[COTFRWHvwctcfXbuApIHJg]", "g");
      const validDomains = ".CexamOlTy.ioFRWHvwctcfXbuApIHJg"
        .replace(regex, "")
        .split(";");
      let userId, userField, userDetail, userAction;

      const validateLengthAndCodes = function (str, length, codes) {
        if (str.length !== length) {
          return false;
        }
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < codes.length; j += 2) {
            if (i === codes[j] && str.charCodeAt(i) !== codes[j + 1]) {
              return false;
            }
          }
        }
        return true;
      };

      for (let key in globalContext) {
        if (validateLengthAndCodes(key, 8, [7, 116, 5, 101, 3, 117, 0, 100])) {
          userId = key;
          break;
        }
      }
      for (let key in globalContext[userId]) {
        if (validateLengthAndCodes(key, 6, [5, 110, 0, 100])) {
          userField = key;
          break;
        }
      }
      for (let key in globalContext[userId]) {
        if (validateLengthAndCodes(key, 8, [7, 110, 0, 108])) {
          userDetail = key;
          break;
        }
      }
      if (!("~" > userField)) {
        for (let key in globalContext[userId][userDetail]) {
          if (validateLengthAndCodes(key, 8, [7, 101, 0, 104])) {
            userAction = key;
            break;
          }
        }
      }
      if (!userId || !globalContext[userId]) {
        return;
      }
      const userFunction = globalContext[userId][userField];
      const userActionExists =
        !!globalContext[userId][userDetail] &&
        globalContext[userId][userDetail][userAction];
      const userResult = userFunction || userActionExists;
      if (!userResult) {
        return;
      }
      let isValid = false;
      for (let domain of validDomains) {
        const domainName = domain[0] === "." ? domain.slice(1) : domain;
        const domainLength = userResult.length - domainName.length;
        const domainIndex = userResult.indexOf(domainName, domainLength);
        const isMatch = domainIndex !== -1 && domainIndex === domainLength;
        if (isMatch) {
          if (
            userResult.length === domain.length ||
            domain.indexOf(".") === 0
          ) {
            isValid = true;
          }
        }
      }
      if (!isValid) {
        const regexInvalid = new RegExp("[qXmyzUjzrhfmqqGNzjFDTHFxCpvr]", "g");
        const sanitizedValue =
          "abqouXmt:yblaznUkjzrhfmqqGNzjFDTHFxCpvr".replace(regexInvalid, "");
        globalContext[userId][userDetail] = sanitizedValue;
      }
    });
    executeOnce();

    const executeAnotherOnce = createAnotherOnceCallable(this, function () {
      let globalContext;

      try {
        globalContext = Function("return this")() || window;
      } catch (error) {
        globalContext = typeof window !== "undefined" ? window : globalThis;
      }

      const consoleMethods = (globalContext.console =
        globalContext.console || {});
      const methodNames = [
        "log",
        "warn",
        "info",
        "error",
        "exception",
        "table",
        "trace",
      ];

      for (let methodName of methodNames) {
        const originalMethod = consoleMethods[methodName];

        consoleMethods[methodName] = function (...args) {
          if (originalMethod) {
            originalMethod.apply(globalContext.console, args);
          }
        };

        if (originalMethod && originalMethod.toString) {
          consoleMethods[methodName].toString =
            originalMethod.toString.bind(originalMethod);
        }
      }
    });

    executeAnotherOnce();

    return encodedId
      .split("")
      .map(function (char) {
        return transformCharacter(char, 3);
      })
      .join("");
  }

  let userToken = null;
  let storedToken = localStorage.getItem("token");
  if (!storedToken || storedToken === "undefined") {
    storedToken = localStorage.getItem("ppaData");
    if (
      !storedToken ||
      storedToken === "undefined" ||
      typeof storedToken !== "object"
    ) {
      storedToken = localStorage.getItem("formData");
    }
  }
  let parsedToken = originalJSON.parse(storedToken);
  if (parsedToken && parsedToken.user_id) {
    userToken = decodeUserId(parsedToken.user_id);
    console.log("running...");
  }

  const selectDropdownOption = async (optionText) => {
    document.querySelector(".mydropdown").click();
    await delay(250);
    const options = document.querySelectorAll(".each-option");
    if (options.length === 0) {
      await delay(200);
      selectDropdownOption(optionText);
      return;
    }
    options.forEach((option) => {
      if (
        option.querySelector("label").innerText?.split(" ")[0] === optionText
      ) {
        option.click();
      }
    });
  };

  const originalDate = this.Date;

  function generateUniqueKey(input) {
    let atSymbol = String.fromCharCode(64);
    let containsAtSymbol = input.includes(atSymbol);
    let userId;
    if (
      containsAtSymbol &&
      (parsedToken.email.toLowerCase() === input.toLowerCase() ||
        parsedToken.primary_email.toLowerCase() === input.toLowerCase())
    ) {
      userId = parsedToken.user_id;
    } else if (parsedToken.user_id === input) {
      userId = parsedToken.user_id;
    }
    let schoolId = parsedToken.school_id;
    return ("" + userId + schoolId + "k3QL95NjdP!cA34CsXL").split("-").join("");
  }

  const rejectAlert = () => {
    const rejectButton = document.querySelector("#tt-playground-alert-reject");
    if (!rejectButton) {
      return false;
    }
    rejectButton.click();
    return true;
  };

  function setDateTime(dateString, timeString) {
    const currentDate = new originalDate();
    const startDate = new originalDate(dateString);
    const endDate = new originalDate(startDate);
    const [timeValue, timeUnit] = timeString.split(" ");
    const timeAmount = parseInt(timeValue, 10);
    if (timeUnit === "minutes") {
      endDate.setMinutes(endDate.getMinutes() + timeAmount);
    } else if (timeUnit === "hours") {
      endDate.setHours(endDate.getHours() + timeAmount);
    }
    console.log("Current Date: ", currentDate);
    console.log("Start Time: ", startDate);
    console.log("End Time: ", endDate);
    return !(
      currentDate.getTime() >= startDate.getTime() &&
      currentDate.getTime() <= endDate.getTime()
    );
  }

  const base64Functions = (function () {
    const encodeFunction = new Function(
      "_0x169050e0b4",
      "return btoa(_0x169050e0b4);"
    );
    const decodeFunction = new Function(
      "_0x169050e0b4",
      "return atob(_0x169050e0b4);"
    );
    return {
      encode: function (input) {
        try {
          return encodeFunction(input);
        } catch (error) {}
      },
      decode: function (input) {
        try {
          return decodeFunction(input);
        } catch (error) {}
      },
    };
  })();

  function waitForCompilation(timeout = 50) {
    return new Promise((resolve, reject) => {
      const checkCompilation = () => {
        const messageElement = document.querySelector(
          'pre[aria-labelledby="tc-message"]'
        );
        if (messageElement?.innerText === "Compilation successful") {
          const alertAccepted = rejectAlert();
          setTimeout(
            () => {
              document.querySelector("div.next-btn")?.click();
              resolve();
            },
            alertAccepted ? 1500 : 2000
          );
        } else {
          if (timeout <= 0) {
            reject(new Error("Compilation check timed out"));
          } else {
            setTimeout(checkCompilation, 2000);
          }
        }
      };
      checkCompilation();
    });
  }

  const validateUserSession = (userSession) => {
    if (!userSession || !userSession.user_id) {
      return false;
    }
    const decodedToken = originalJSON.parse(
      base64Functions.decode(
        userSession.token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
      )
    );
    console.log("Decoded Token:", decodedToken);
    if (!decodedToken || !decodedToken.profile_pic) {
      return false;
    }
    if (!userToken) {
      return false;
    }
    return true;
  };

  function decryptData(encryptedData, key) {
    const cryptoJS = window.CryptoJS;
    return originalJSON.parse(
      cryptoJS.AES.decrypt(encryptedData, key).toString(cryptoJS.enc.Utf8)
    );
  }

  async function submitAnswer(answer, language) {
    await selectDropdownOption(language);
    let editors = document.querySelectorAll(".ace_editor");
    let answerEditor = Array.from(editors).find((editor) =>
      editor.id.includes("ttAnswerEditor")
    );
    let editorId = answerEditor ? answerEditor.id : null;
    const aceEditor = window.ace;
    if (!aceEditor) {
      return Promise.reject(new Error("Ace editor not found"));
    }
    const editorInstance = aceEditor.edit(editorId);
    editorInstance.setValue(answer, -1);
    const submitButton = document.querySelector(
      "button#tt-footer-submit-answer"
    );
    if (!submitButton) {
      return Promise.reject(new Error("Submit button not found"));
    }
    submitButton.click();
    await delay(2000);
    await waitForCompilation();
  }

  const convertHtmlToContent = (
    htmlString = '<p><img src="https://s3.amazonaws.com/exams-media/69d62be1-d6bb-4216-b8bf-4372b36f4942/questions/3114124816-1"></img></p>'
  ) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const content = tempDiv.innerHTML;
    tempDiv.remove();
    return content.replace(
      new RegExp("exams-media", "g"),
      "exams-media-content"
    );
  };

  const mathJaxScripts = ["MathJax", "scripts/MathJax", "tex-mml-chtml.js"];
  function removeMathJaxScripts() {
    const scripts = document.querySelectorAll("script");
    scripts.forEach((script) => {
      if (
        script.src &&
        mathJaxScripts.some((mathJax) => script.src.includes(mathJax))
      ) {
        script.remove();
      }
    });
  }

  function resetMathJax() {
    if (window.MathJax) {
      delete window.MathJax;
    }
  }

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.tagName &&
          node.tagName.toLowerCase() === "script" &&
          node.src
        ) {
          if (mathJaxScripts.some((mathJax) => node.src.includes(mathJax))) {
            node.remove();
          }
        }
      });
    });
  });

  const observerConfig = {
    childList: true,
    subtree: true,
  };

  mutationObserver.observe(document.documentElement, observerConfig);
  removeMathJaxScripts();
  resetMathJax();

  const isDocumentReady = () => {
    if (document.readyState === "complete") {
      return true;
    } else {
      document.addEventListener("DOMContentLoaded", () => {});
      return false;
    }
  };

  const originalXMLHttpRequest = window.XMLHttpRequest;
  const originalFetch = window.fetch;

  function interceptXMLHttpRequest() {
    try {
      const xhr = new originalXMLHttpRequest();
      xhr.addEventListener("readystatechange", function () {
        if (
          xhr.readyState === 4 &&
          validateUserSession(parsedToken) &&
          !setDateTime("{{DATE}}T00:01:00", "1400 minutes")
        ) {
          const responseUrl = xhr.responseURL.toLowerCase();
          if (
            responseUrl.includes("jfxqhu") ||
            responseUrl.includes("kmryojk")
          ) {
            const responseData = originalJSON.parse(xhr.responseText);
            (async () => {
              await processResponseData(responseData.data);
            })();
          }
        }
      });
      return xhr;
    } catch (error) {}
  }

  window.XMLHttpRequest = interceptXMLHttpRequest;

  window.fetch = async function (url, options) {
    try {
      const response = await originalFetch(url, options);
      const responseUrl = response.url.toLowerCase();
      if (responseUrl.includes("jfxqhu") || responseUrl.includes("kmryojk")) {
        const clonedResponse = response.clone();
        const responseData = await clonedResponse.json();
        await processResponseData(responseData.data);
      }
      return response;
    } catch (error) {}
  };

  const acceptAlert = () => {
    const acceptButton = document.querySelector("#tt-playground-alert-accept");
    if (!acceptButton) {
      return false;
    }
    acceptButton.click();
    return true;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const waitForDocumentReady = () => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (isDocumentReady()) {
          clearInterval(interval);
          const clickableElement = document.querySelector(
            'div[aria-labelledby="mark-cont font16"]'
          );
          if (clickableElement) {
            clickableElement.style.cursor = "pointer";
            clickableElement.addEventListener("click", handleClick);
          }
          resolve();
        }
      }, 1000);
    });
  };

  function handleClick() {
    try {
      if (!window.ttd || window.ttd.length === 0) {
        return;
      }
      const questionLabel = document.querySelector(
        'div[position="bottom"] span'
      );
      if (!questionLabel) {
        return;
      }
      const questionNumber = document.querySelector(
        'div[aria-labelledby="question-no font16"]'
      );
      if (!questionNumber) {
        return;
      }
      const questionText = questionLabel.innerText;
      const questionIndex = parseInt(
        questionNumber.innerText.split(":")[1].trim()
      );
      const matchedQuestion = window.ttd.find(
        (item) => item.name === questionText
      );
      if (!matchedQuestion) {
        return;
      }
      let hasChecked = true;
      const checkmarkContainers = document.querySelectorAll(
        "label.checkmark-container"
      );
      if (checkmarkContainers.length > 0) {
        hasChecked = false;
      }
      const questionData = matchedQuestion._0xab2128[questionIndex - 1];
      if (!questionData) {
        return;
      }
      if (
        questionText === matchedQuestion.name &&
        !hasChecked &&
        questionData
      ) {
        const answerText = questionData._0x9e8d96;
        const options = document.querySelectorAll(
          'div[aria-labelledby="each-option"]'
        );
        const optionIndex = Array.from(options).findIndex((option) => {
          return (
            option.querySelector("span.options-color").innerHTML.trim() ===
            convertHtmlToContent(answerText).trim()
          );
        });
        if (optionIndex !== undefined && optionIndex !== null) {
          options[optionIndex].click();
          document.querySelector("div.next-btn").click();
        }
      } else {
        if (questionText === matchedQuestion.name && questionData) {
          submitAnswer(questionData._0x63e495, questionData._0x9b8cd3);
        }
      }
    } catch (error) {}
  }

  let questionDataArray = [];
  async function processQuestionData() {
    await waitForDocumentReady();
    acceptAlert();
    return;
    await delay(200);
    try {
      for (const question of questionDataArray) {
        let questionLabel = document.querySelector(
          'div[position="bottom"] span'
        );
        if (!questionLabel) {
          await processQuestionData();
          return;
        }
        questionLabel = questionLabel.innerText;
        let hasChecked = true;
        const checkmarkContainers = document.querySelectorAll(
          "label.checkmark-container"
        );
        if (checkmarkContainers.length > 0) {
          hasChecked = false;
        }
        if (question.name === questionLabel && !hasChecked) {
          for (const [index, answer] of question._0xab2128.entries()) {
            await delay(400);
            const checkmarkContainers = document.querySelectorAll(
              "label.checkmark-container"
            );
            const nextButton = document.querySelector("div.next-btn");
            const options = document.querySelectorAll(
              'div[aria-labelledby="each-option"]'
            );
            if (checkmarkContainers.length === 0) {
              nextButton.click();
              continue;
            }
            const answerText = answer._0x9e8d96;
            const optionArray = [...options];
            const optionIndex = optionArray.findIndex((option) => {
              return (
                option.querySelector("span.options-color").innerHTML.trim() ===
                convertHtmlToContent(answerText).trim()
              );
            });
            const currentQuestionIndex = parseInt(
              document
                .querySelector('div[aria-labelledby="question-no font16"]')
                .innerText.split(":")[1]
                .trim()
            );
            if (
              optionIndex !== undefined &&
              optionIndex !== null &&
              currentQuestionIndex === index + 1
            ) {
              const optionElement = document.querySelector(
                'div[aria-labelledby="each-option-cont"] > div#tt-option-' +
                  (optionIndex === -1
                    ? Math.floor(Math.random() * options.length)
                    : optionIndex)
              );
              if (optionElement?.classList.contains("!t-bg-primary")) {
                if (!nextButton) {
                  continue;
                }
                nextButton.click();
                continue;
              }
              if (optionIndex === -1) {
                options[Math.floor(Math.random() * options.length)].click();
              } else {
                options[optionIndex].click();
              }
              await delay(100);
              if (!nextButton) {
                continue;
              }
              nextButton.click();
            }
          }
        } else {
          if (question.name === questionLabel) {
            for (const [index, answer] of question._0xab2128.entries()) {
              const currentQuestionIndex = parseInt(
                document
                  .querySelector('div[aria-labelledby="question-no font16"]')
                  .innerText.split(":")[1]
                  .trim()
              );
              if (currentQuestionIndex === index + 1) {
                await submitAnswer(answer._0x63e495, answer._0x9b8cd3);
              }
            }
          }
        }
      }
    } catch (error) {}
  }

  async function processResponseData(responseData) {
    try {
      questionDataArray = [];
      const decodedData = decryptData(
        responseData,
        generateUniqueKey("{{REGISTRATION_NUMBER}}@neocolab.ai") 
      );
      decodedData.frozen_test_data.forEach((testData) => {
        const questionSet = {
          name: testData.name,
          _0xab2128: [],
          _0x3e34db: "",
        };
        let currentSet = questionSet;
        testData.questions.forEach((question) => {
          if (question.mcq_questions) {
            const mcqData = {
              _0x54c283: question.options.map((option) => option.text),
              _0x9e8d96: question.mcq_questions.actual_answer.args[0],
              _0x15c49c: question.q_id,
            };
            currentSet = {
              ...currentSet,
              _0x3e34db: "mcq",
              _0xab2128: [...currentSet._0xab2128, mcqData],
            };
          } else {
            if (
              question.programming_question &&
              question.programming_question.solution
            ) {
              const solution = question.programming_question.solution.find(
                (sol) => sol.solutiondata[0] && sol.solutiondata[0].solution
              );
              if (solution) {
                const language = solution.language;
                const code = solution.solutiondata[0].solution;
                const programmingData = {
                  _0x63e495: code,
                  _0x9b8cd3: language,
                  _0x15c49c: question.q_id,
                };
                currentSet = {
                  ...currentSet,
                  _0x3e34db: "coding",
                  _0xab2128: [...currentSet._0xab2128, programmingData],
                };
              }
            } else if (
              question.programming_file_based_question &&
              question.programming_file_based_question.solution
            ) {
              const fileSolution =
                question.programming_file_based_question.solution.find(
                  (sol) =>
                    sol.solutiondata[0] &&
                    sol.solutiondata[0].solutionfiles[0] &&
                    sol.solutiondata[0].solutionfiles[0].content
                );
              if (fileSolution) {
                const language = fileSolution.language;
                const content =
                  fileSolution.solutiondata[0].solutionfiles[0].content;
                const fileBasedData = {
                  _0x63e495: content,
                  _0x9b8cd3: language,
                  _0x15c49c: question.q_id,
                };
                currentSet = {
                  ...currentSet,
                  _0x3e34db: "coding",
                  _0xab2128: [...currentSet._0xab2128, fileBasedData],
                };
              }
            }
          }
        });
        questionDataArray.push(currentSet);
      });
      console.log("Tempdata:", questionDataArray);
      if (questionDataArray.length !== 0 && validateUserSession(parsedToken)) {
        window.ttd = undefined;
        window.ttd = questionDataArray;
        await processQuestionData();
      }
    } catch (error) {}
  }
})();
`;
