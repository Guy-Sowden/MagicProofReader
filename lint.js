import * as rules from "/scripts/rules_eng.js"

window.addEventListener('load', () => {
    let pad = document.getElementById("WritingPad");
    let overlay = document.getElementById("error-overlay");
    let feedbackBox = document.getElementById("feedback");
    let matches =[];
    //detect when user change text WritingPad
    //rerun models
    resizeWritingPad();
    pad.addEventListener("input", () => {
        resizeWritingPad();
        overlay.innerHTML= "";
        let lineNumber = 0;
        matches = []
        for (let sentence of pad.value.split("\n")) {
            let rule = void 0; 
            sentence = sentence.replace(/</g, "&lt"); // XXS Prevention
            let sentenceWithErrors = sentence;
            let interimMatches = [];
            let interimMatch = "";
            for (rule of rules.ruleSet){ 
                while(interimMatch = rule.pattern.exec(sentence)){
                    // add position of matches to array
                    interimMatches.push({
                        "position":[interimMatch.index, interimMatch.index + interimMatch.toString().length],
                        "rule":rule,
                        "lineNumber":lineNumber
                    });
                }
            }
            //sort matches by position 
            interimMatches = interimMatches.sort((a , b) =>{
                if(a.position[0] > b.position[0]) return 1 
                return -1
            })

            //Reduce overlapping divs
            let temp =[]
            for(let i = 0; i < interimMatches.length; i++ ){
                //div overlapping
                if(i > 0 && interimMatches[i-1].position[1] >= interimMatches[i].position[0]){
                    temp[temp.length-1].position[1] = interimMatches[i].position[1];
                }
                else{
                    if(interimMatch != null){

                        //generate random id 
                        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                        for ( let i = 0; i < 7; i++ ) {
                            result += characters.charAt(Math.floor(Math.random() * characters.length));
                        }
                        interimMatch[i].id =  result;
                    }
                    temp.push(interimMatches[i]);
                }
            }
            interimMatches = temp

            // Add underlines to errors and warnings
            for (let i of interimMatches.reverse()){
                sentenceWithErrors = sentenceWithErrors.substring(0, i.position[0]) +
                "<span id=" + i.id + " class='text-"+ i.rule.type +"'>" + 
                sentenceWithErrors.substring(i.position[0], i.position[1])+
                "</span>"+
                sentenceWithErrors.substring(i.position[1],sentenceWithErrors.length);
            }
            overlay.innerHTML = overlay.innerHTML + sentenceWithErrors + "\n";
            lineNumber++;

            //generate context menu for error
            for(let i in interimMatches){
                document.getElementById(i.id).addEventListener("contextmenu", (e) => {
                    removeContextMenu();
                    e.preventDefault()
                    console.log("right click listeners");
                    let contextmenu = document.createElement("div");
                    contextmenu.id ="rightClickMenu";

                    //set posistion of context menu 
                    console.log(e.pageX+ " "+ e.pageY);
                    contextmenu.style.left =  e.pageX + "px";
                    contextmenu.style.top = e.pageY + "px";

                    // add values to context menu
                    let options = i.rule.options
                    for(let i of options ){
                        let action = document.createElement("div");
                        console.log(i);
                        action.innerText = i;
                        action.classList.add("actionItem");
                        contextmenu.appendChild(action);
                    }
                    document.body.appendChild(contextmenu);
                    return false;
                
                })
            }
            matches.push(interimMatches);
        }
    }, false);


    pad.addEventListener("click", () => {
        let linesLength = [];
        pad.value.split("\n").map((line) => linesLength.push(line.length));

        let cursorPosition = pad.selectionStart

        let totalLineLength =0;
        let lineIndex = 0;
        for(let j of matches){
            for(let i of j ){
                // find length of predings line to convert absulute posistion in text box to line posistion
                if(cursorPosition >= totalLineLength + i.position[0] && cursorPosition <= totalLineLength + i.position[1]){
                    // set the text of the feedback box
                    if(i.rule.usageNote != null) feedbackBox.innerHTML = i.rule.usageNote;
                    else feedbackBox.innerText = ""
                }
            }
            totalLineLength += linesLength[lineIndex] +1;
            lineIndex++;
        }
    });

    function resizeWritingPad(){
        pad.style.height = pad.scrollHeight +"px";
        pad.style.width = pad.scrollWidth +"px";
    }
    
});

document.addEventListener( "click", (e) => {
    removeContextMenu();
});


function removeContextMenu(){
    let contextmenu = document.getElementById("rightClickMenu")
    if(contextmenu != null) contextmenu.remove()
}