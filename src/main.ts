let commandMemory:string[] = [];
let commandIndex = 0;

function executeCommand(command:string) {
    // remember our command
    commandMemory.push(command);
    commandIndex = commandMemory.length; // for up & down arrow history
    // now execute our command and output results
    let commandResults = document.createElement("span");
    commandResults.classList.add("results-text");
    switch(command) {
        case "man":
        case "help":
            commandResults.innerText = "Try commands like 'ls' and 'dir'. Finding them out is half the fun. I don't want to ruin it.";
            break;
        case "man man":
        case "man help":
        case "help help":
        case "help man":
            commandResults.innerText = "'man' and 'help' are both commands you can use to learn about things.";
            break;
        case "ls":
            commandResults.innerText = "You'll probably get this a lot here, but I don't have any directories to list. Sorry.";
            break;
        case "man ls":
        case "help ls":
            commandResults.innerText = "'ls' is a command that would list directories, if I had any. I don't.";
            break;
        case "dir":
            commandResults.innerText = "Ohhh! You're a Windows user? Cool. I don't have any directories to list, though.";
            break;
        case "man dir":
        case "help dir":
            commandResults.innerText = "'dir' is a Windows command that lets you list contents of a directory.";
            break;
        case "exit":
            commandResults.innerText = "Why don't you just close the web page? That's a lot easier.";
            break;
        case "man exit":
        case "help exit":
            commandResults.innerText = "'exit' is a command that lets you leave the shell. Seems a bit rash.";
            break;
        case "kill":
        case "kill -9":
            commandResults.innerText = "Now why would you want to do that? You catch more flies with honey than you do vinegar. But who wants flies anyway?";
            break;
        case "man kill":
        case "help kill":
            commandResults.innerText = "'kill' is a command that ends processes. Good news- I don't have any processes!";
            break;
        case "ipconfig":
            commandResults.innerText = "You are probably connected via WiFi. It's gotta be either that or ethernet.";
            break;
        case "ifconfig":
            commandResults.innerText = "If I were a UNIX system, I'd tell you all about my active internet connections!";
            break;
        case "man ipconfig":
        case "help ipconfig":
            commandResults.innerText = "'ipconfig' is a Windows utility that will tell you about internet connections.";
            break;
        case "man ifconfig":
        case "help ifconfig":
            commandResults.innerText = "'ifconfig' is a UNIX utility that will tell you about internet connections.";
            break;
        default:
            commandResults.innerText = "I didn't quite get that. Try a different command.";
            commandResults.classList.add("error");
            break;
    }
    if(commandResults.innerText != "") {
        document.body.appendChild(commandResults);
        document.body.appendChild(document.createElement("br"));
    }
}

function createAnotherInput() {
    let gtSpan = document.createElement("span");
    gtSpan.innerHTML = "&gt;&nbsp;";
    let input = document.createElement("input");
    input.type = "text";
    input.id = "ConsoleInput";
    input.className = "console-input";
    document.body.appendChild(gtSpan);
    document.body.appendChild(input);
    input.focus();
    input.addEventListener('keyup', initConsoleInput);
}

function initConsoleInput(e:KeyboardEvent) {
    consoleInputElement = <HTMLInputElement>document.getElementById("ConsoleInput");
    e.preventDefault();
    let inputValue = consoleInputElement.value;
    let parentNode = consoleInputElement.parentNode;
    // get around typescript not knowing about .keyCode
    if(e.keyCode === 13) { // enter key
        consoleInputElement.removeEventListener("keyup", initConsoleInput);
        if(parentNode) {
            parentNode.removeChild(consoleInputElement);
            let consoleMemorial = document.createElement("span");
            consoleMemorial.innerText = inputValue;
            parentNode.appendChild(consoleMemorial);
            parentNode.appendChild(document.createElement("br"));
        }
        executeCommand(inputValue);
        createAnotherInput();
    }
    else if(e.keyCode === 38 && commandIndex > 0) { // up arrow key
        commandIndex--;
        consoleInputElement.value = commandMemory[commandIndex];
    }
    else if(e.keyCode === 40 && commandIndex < commandMemory.length - 1) { // down arrow key
        commandIndex++;
        consoleInputElement.value = commandMemory[commandIndex];
    }
    else {
        // other key presses?
    }
}

let consoleInputElement = <HTMLInputElement>document.getElementById("ConsoleInput");
consoleInputElement.addEventListener('keyup', initConsoleInput);
// whenever a user clicks anywhere on the screen, the probably wanna type
document.addEventListener("click", function() {
    consoleInputElement = <HTMLInputElement>document.getElementById("ConsoleInput");
    consoleInputElement.focus(); // disallows highlighting, need a fix
});