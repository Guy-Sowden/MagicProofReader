window.addEventListener('load', () => {
  const pad = document.getElementById('WritingPad');
  const overlay = document.getElementById('error-overlay');
  const feedbackBox = document.getElementById('feedback');
  let matches =[];

  // detect when user change text WritingPad
  // rerun models
  scanPadForScanos();

  resizeWritingPad();

  pad.addEventListener('input', () => {
    scanPadForScanos();
  }, false);

  /**
 */
  function scanPadForScanos() {
    // scan writingPad for any Scannos

    // make sure both overlay and writing pad are aligned
    resizeWritingPad();
    overlay.innerHTML= '';
    let lineNumber = 0;
    matches = [];
    for (let sentence of pad.value.split('\n')) {
      sentence = sentence.replace(/</g, '&lt'); // XXS Prevention
      let sentenceWithErrors = sentence;
      let interimMatches = [];
      let interimMatch;
      for (const rule of ruleSet) {
        while ((interimMatch = rule.pattern.exec(sentence)) !== null) {
          // add position of matches to array
          interimMatches.push({
            'position': [interimMatch.index +
            interimMatch[0].indexOf(interimMatch[interimMatch.length -1]),
            interimMatch.index +
            interimMatch[0].indexOf(interimMatch[interimMatch.length -1]) +
            interimMatch[interimMatch.length -1].length],
            'rule': rule,
            'lineNumber': lineNumber,
          });
        }
      }
      // sort matches by position
      interimMatches = interimMatches.sort((a, b) =>{
        if (a.position[0] > b.position[0]) return 1;
        return -1;
      });

      // Reduce overlapping errors
      const temp =[];
      for (let i = 0; i < interimMatches.length; i++ ) {
        if (i > 0 && interimMatches[i-1].position[1] >= interimMatches[i]
            .position[0]) {
          // div overlapping combine divs
          temp[temp.length-1].position[1] = interimMatches[i].position[1];
          temp[temp.length-1].options = [];
        } else {
          if (interimMatches[i] != null) {
            interimMatches[i].id = randomID();
          }
          temp.push(interimMatches[i]);
        }
      }
      interimMatches = temp;

      // Add underlines to errors and warnings on overlay
      for (const i of interimMatches.reverse()) {
        sentenceWithErrors = sentenceWithErrors.substring(0, i.position[0]) +
                '<span id=' + i.id + ' class=\"text-'+ i.rule.type +'\">' +
                sentenceWithErrors.substring(i.position[0], i.position[1])+
                '</span>'+
                sentenceWithErrors.substring(
                    i.position[1], sentenceWithErrors.length);
      }
      overlay.innerHTML = overlay.innerHTML + sentenceWithErrors + '\n';
      lineNumber++;

      matches.push(interimMatches);
    }
  }

  pad.addEventListener('click', () => {
    // update documentation box with tool tips
    const linesLength = [];
    pad.value.split('\n').map((line) => linesLength.push(line.length));

    const cursorPosition = pad.selectionStart;

    let totalLineLength =0;
    let lineIndex = 0;
    for (const j of matches) {
      for (const i of j ) {
        // find length of proceedings lines to convert absolute position
        // in text box to line position
        if (cursorPosition >= totalLineLength + i.position[0] &&
          cursorPosition <= totalLineLength + i.position[1]) {
          // set the text of the feedback box
          if (i.rule.usageNote != null) {
            feedbackBox.innerHTML = i.rule.usageNote;
          } else feedbackBox.innerText = '';
        }
      }
      totalLineLength += linesLength[lineIndex] +1;
      lineIndex++;
    }
  });

  /**
 */
  function resizeWritingPad() {
    // make sure that the writing pad dose not become scrollable
    pad.style.height = pad.scrollHeight +'px';
    pad.style.width = pad.scrollWidth +'px';
  }

  document.addEventListener('contextmenu', (e) =>{
    // bring overlay to top layer so it csn be interacted with
    overlay.style.zIndex = 30;
    // get element that had been clicked on
    const element = document.elementFromPoint(e.pageX, e.pageY);
    // make sure writing pad can be interacted with agin
    overlay.style.zIndex = 0;
    // remove any pre existing context menus
    removeContextMenu();
    if (element != null) {
      for (const j of matches) {
        for (const i of j ) {
          if (i.id == element.id) {
            // create context menu
            const contextmenu = document.createElement('div');
            contextmenu.id ='rightClickMenu';
            // set position of context menu
            contextmenu.style.left = e.pageX + 'px';
            contextmenu.style.top = e.pageY + 'px';
            // add auto fix suggestions to context menu
            const options = i.rule.options;
            if (options != []) {
              for (const z of options ) {
                const action = document.createElement('div');
                if (z != '') {
                  action.innerText = z;
                } else {
                  action.innerText = 'delete';
                }

                action.classList.add('actionItem');
                // make item clickable
                action.addEventListener('click', () => {
                  // replace orignal text with corrected text
                  const text = pad.value.substr(0,
                      getAbsolutePosision(i.lineNumber, i.position[0])) +
                  z +
                  pad.value.substr(
                      getAbsolutePosision(i.lineNumber, i.position[1]),
                      pad.value.length,
                  );
                  pad.value = text;
                  scanPadForScanos();
                });
                contextmenu.appendChild(action);
              }
            } else {
              const action = document.createElement('div');
              action.innerText = 'No action Avabile';
              action.classList.add('actionItem');
              contextmenu.appendChild(action);
            }
            e.preventDefault();
            document.body.appendChild(contextmenu);
            pad.focus;
          }
        }
      }
    }
  });

  /**
 * @param {int} lineNumber // line number
 * @param {int} lineposition // position within line
 * @return {int} //AbsolutePosision
 */
  function getAbsolutePosision(lineNumber, lineposition) {
    const linesLength = [];
    pad.value.split('\n').map((line) => linesLength.push(line.length));

    let lp =0;
    for (let i=0; i<lineNumber; i++ ) {
      lp = lp + linesLength[i] + 1;
    }
    return lp + lineposition;
  }
});


document.addEventListener( 'click', (e) => {
  removeContextMenu();
});

/**
 * @return {string}
 */
function randomID() {
  // generate random 6 character string for the id for text error div
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let randomID ='';
  for ( let i = 0; i < 7; i++ ) {
    randomID += characters.charAt(Math.floor(Math.random() *
    characters.length));
  }
  return randomID;
}

/**
 */
function removeContextMenu() {
  const contextmenu = document.getElementById('rightClickMenu');
  if (contextmenu != null) contextmenu.remove();
}
