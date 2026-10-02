let stack = [];

let operationHistory = [];

const MAX_SIZE = 6;

let queue = [];

const QUEUE_MAX_SIZE = 6;

let queueHistory = [];


function showStack() {

    document.getElementById("structure-title").innerText =
        "STACK VISUALIZER";

    document.getElementById("structure-area").innerHTML = `

        <div class="stack-container">

            <div class="stack-info">

                <h3>Stack</h3>

                <p>
                    <strong>LIFO</strong>
                    — Last In, First Out
                </p>

                <div class="input-area">

                    <input
                        type="number"
                        id="stack-value"
                        placeholder="Enter value"
                    >

                    <button onclick="pushElement()">
                        PUSH
                    </button>

                    <button onclick="popElement()">
                        POP
                    </button>

                    <button onclick="peekElement()">
                        PEEK
                    </button>

                    <button onclick="resetStack()">
                        RESET
                    </button>

                </div>

                <p id="stack-message">
                    Stack is ready.
                </p>
                <div class="history-panel">

                <h3>Operation History</h3>

                <ul id="operation-history">
                </ul>

                </div>

            </div>


            <div class="stack-display">

                <div id="top-label">
                    TOP
                </div>

                <div id="stack-box">
                </div>

            </div>

        </div>
    `;

    displayStack();
}


function pushElement() {

    const input = document.getElementById("stack-value");

    const value = input.value;

    if (value === "") {

        showMessage("⚠️ Please enter a value.");

        return;
    }


    if (stack.length === MAX_SIZE) {

        showMessage("⚠️ Stack Overflow!");

        return;
    }


    stack.push(value);

    addHistory("PUSH(" + value + ")");

    operationSteps = pushSteps;

    currentStep = 0;

    displayStep();

    input.value = "";

    displayStack();

    showMessage(
        "✅ " + value + " pushed into the stack."
    );
}


function popElement() {

    if (stack.length === 0) {

        showMessage("⚠️ Stack Underflow!");

        return;
    }


    const stackBox =
        document.getElementById("stack-box");


    const elements =
        stackBox.querySelectorAll(".stack-element");


    const topElement =
        elements[0];


    topElement.classList.add("pop-animation");


    const removed =
        stack[stack.length - 1];

    addHistory("POP() → " + removed);


    setTimeout(function () {

        stack.pop();

        operationSteps = popSteps;

        currentStep = 0;

        displayStep();

        displayStack();

        showMessage(
            "🗑️ " + removed +
            " popped from the stack."
        );

    }, 500);
}

function peekElement() {

    if (stack.length === 0) {

        showMessage("⚠️ Stack is empty.");

        return;
    }


    const topElement = stack[stack.length - 1];

    showMessage(
        "👀 TOP element is " + topElement
    );
}


function resetStack() {

    stack = [];

    displayStack();

    showMessage("🔄 Stack has been reset.");
}


function displayStack() {

    const stackBox =
        document.getElementById("stack-box");

    if (!stackBox) {
        return;
    }

    stackBox.innerHTML = "";


    for (let i = stack.length - 1; i >= 0; i--) {

        const element =
            document.createElement("div");

        element.className = "stack-element";

        element.innerText = stack[i];

        stackBox.appendChild(element);
    }


    const topLabel =
        document.getElementById("top-label");


    if (stack.length > 0) {

        topLabel.innerText =
            "TOP → " + stack[stack.length - 1];

        topLabel.classList.remove("top-highlight");

        void topLabel.offsetWidth;

        topLabel.classList.add("top-highlight");

    } else {

        topLabel.innerText =
            "TOP → EMPTY";
    }
}

function showMessage(message) {

    const messageBox =
        document.getElementById("stack-message");

    if (messageBox) {

        messageBox.innerText = message;
    }
}
// =====================================
// STEP-BY-STEP EXPLANATION
// =====================================

let currentStep = 0;

let operationSteps = [];


// PUSH explanation
const pushSteps = [

    {
        title: "Step 1 — Check Overflow",
        text: "First, we check whether the Stack is full. If the Stack has reached its maximum size, a Stack Overflow occurs."
    },

    {
        title: "Step 2 — Move TOP",
        text: "If there is space, TOP is moved to the next position where the new element will be inserted."
    },

    {
        title: "Step 3 — Insert Element",
        text: "The new value is inserted at the position indicated by TOP."
    },

    {
        title: "Step 4 — Update TOP",
        text: "TOP now points to the newly inserted element. The new element becomes the first element that will be removed."
    }

];


// POP explanation
const popSteps = [

    {
        title: "Step 1 — Check Underflow",
        text: "First, we check whether the Stack is empty. If it is empty, POP cannot be performed and Stack Underflow occurs."
    },

    {
        title: "Step 2 — Access TOP",
        text: "The element currently pointed to by TOP is selected for removal."
    },

    {
        title: "Step 3 — Remove Element",
        text: "The TOP element is removed from the Stack."
    },

    {
        title: "Step 4 — Move TOP",
        text: "TOP moves to the previous element. That element now becomes the new TOP."
    }

];


// Display current step
function displayStep() {

    const stepContent =
        document.getElementById("step-content");

    const stepNumber =
        document.getElementById("step-number");


    if (operationSteps.length === 0) {

        stepContent.innerHTML = `
            <h3>Choose an operation</h3>

            <p>
                Perform PUSH or POP to see
                the operation explained step-by-step.
            </p>
        `;

        stepNumber.innerText = "Step 0";

        return;
    }


    const step = operationSteps[currentStep];


    stepContent.innerHTML = `

        <h3>${step.title}</h3>

        <p>${step.text}</p>

    `;


    stepNumber.innerText =
        "Step " +
        (currentStep + 1) +
        " / " +
        operationSteps.length;
}


// Go to next step
function nextStep() {

    if (operationSteps.length === 0) {
        return;
    }


    if (currentStep < operationSteps.length - 1) {

        currentStep++;

        displayStep();
    }
}


// Go to previous step
function previousStep() {

    if (operationSteps.length === 0) {
        return;
    }


    if (currentStep > 0) {

        currentStep--;

        displayStep();
    }
}


// Automatically play steps
function autoPlay() {

    if (operationSteps.length === 0) {
        return;
    }


    currentStep = 0;

    displayStep();


    let interval = setInterval(function () {

        if (currentStep >= operationSteps.length - 1) {

            clearInterval(interval);

            return;
        }


        currentStep++;

        displayStep();

    }, 2000);
}
function addHistory(operation) {

    operationHistory.push(operation);


    const history =
        document.getElementById("operation-history");


    if (!history) {
        return;
    }


    history.innerHTML = "";


    for (let i = operationHistory.length - 1;
         i >= 0;
         i--) {

        const item =
            document.createElement("li");

        item.innerText =
            operationHistory[i];

        history.appendChild(item);
    }
}

// =====================================
// QUEUE
// =====================================

// Show Queue
function showQueue() {

    document.getElementById("structure-title").innerText =
        "QUEUE VISUALIZER";

    document.getElementById("structure-area").innerHTML = `

        <div class="queue-container">

            <div class="queue-info">

                <h3>Queue</h3>

                <p>
                    <strong>FIFO</strong>
                    — First In, First Out
                </p>

                <div class="input-area">

                    <input
                        type="number"
                        id="queue-value"
                        placeholder="Enter value"
                    >

                    <button onclick="enqueueElement()">
                        ENQUEUE
                    </button>

                    <button onclick="dequeueElement()">
                        DEQUEUE
                    </button>

                    <button onclick="frontElement()">
                        FRONT
                    </button>

                    <button onclick="resetQueue()">
                        RESET
                    </button>

                </div>

                <p id="queue-message">
                    Queue is ready.
                </p>
                <div class="queue-history">

                    <h3>Operation History</h3>

                    <ul id="queue-operation-history">
                    </ul>

                </div>
                <div id="queue-explanation-panel">

    <h2>🧠 How Does It Work?</h2>

    <div id="queue-step-content">

        <h3>Welcome to Queue</h3>

        <p>
            Perform ENQUEUE or DEQUEUE
            to see the operation explained
            step-by-step.
        </p>

    </div>

    <div class="queue-step-buttons">

        <button onclick="previousQueueStep()">
            ← Previous
        </button>

        <span id="queue-step-number">
            Step 0
        </span>

        <button onclick="nextQueueStep()">
            Next →
        </button>

        <button onclick="autoPlayQueue()">
            ▶ Auto Play
        </button>

    </div>

</div>

            </div>


            <div class="queue-display">

                <div id="front-label">
                    FRONT → EMPTY
                </div>

                <div id="queue-box">
                </div>

                <div id="rear-label">
                    REAR → EMPTY
                </div>

            </div>

        </div>
    `;

    displayQueue();
}


// =====================================
// ENQUEUE
// =====================================

function enqueueElement() {

    const input =
        document.getElementById("queue-value");

    const value = input.value;


    if (value === "") {

        showQueueMessage(
            "⚠️ Please enter a value."
        );

        return;
    }


    if (queue.length >= QUEUE_MAX_SIZE) {

        showQueueMessage(
            "⚠️ Queue Overflow!"
        );

        return;
    }


    queue.push(value);

    queueOperationSteps = enqueueSteps;

currentQueueStep = 0;

displayQueueStep();

    addQueueHistory(
    "ENQUEUE(" + value + ")"
    );

    input.value = "";

    displayQueue();

    showQueueMessage(
        "✅ " + value +
        " added to the Queue."
    );
}


// =====================================
// DEQUEUE
// =====================================

function dequeueElement() {

    if (queue.length === 0) {

        showQueueMessage(
            "⚠️ Queue Underflow!"
        );

        return;
    }


    const queueBox =
        document.getElementById("queue-box");


    const elements =
        queueBox.querySelectorAll(".queue-element");


    const firstElement =
        elements[0];


    firstElement.classList.add(
        "dequeue-animation"
    );


    const removed =
        queue[0];


    setTimeout(function () {

        queue.shift();

        queueOperationSteps = dequeueSteps;

currentQueueStep = 0;

displayQueueStep();
        addQueueHistory(
    "DEQUEUE() → " + removed
);

        displayQueue();

        showQueueMessage(
            "🗑️ " + removed +
            " removed from the Queue."
        );

    }, 600);
}


// =====================================
// FRONT
// =====================================

function frontElement() {

    if (queue.length === 0) {

        showQueueMessage(
            "⚠️ Queue is empty."
        );

        return;
    }


    showQueueMessage(
        "👀 FRONT element is " +
        queue[0]
    );
}


// =====================================
// RESET
// =====================================

function resetQueue() {

    queue = [];

    displayQueue();

    showQueueMessage(
        "🔄 Queue has been reset."
    );
}


// =====================================
// DISPLAY QUEUE
// =====================================

function displayQueue() {

    const queueBox =
        document.getElementById("queue-box");


    if (!queueBox) {
        return;
    }


    queueBox.innerHTML = "";


    for (let i = 0; i < queue.length; i++) {

        const element =
            document.createElement("div");

        element.className =
            "queue-element";

        element.innerText =
            queue[i];

        queueBox.appendChild(element);
    }


    const frontLabel =
        document.getElementById("front-label");

    const rearLabel =
        document.getElementById("rear-label");


    if (queue.length > 0) {

    frontLabel.innerText =
        "FRONT → " + queue[0];

    rearLabel.innerText =
        "REAR → " +
        queue[queue.length - 1];


    frontLabel.classList.remove(
        "pointer-highlight"
    );

    rearLabel.classList.remove(
        "pointer-highlight"
    );


    void frontLabel.offsetWidth;
    void rearLabel.offsetWidth;


    frontLabel.classList.add(
        "pointer-highlight"
    );

    rearLabel.classList.add(
        "pointer-highlight"
    );

} else {

        frontLabel.innerText =
            "FRONT → EMPTY";

        rearLabel.innerText =
            "REAR → EMPTY";
    }
}


// =====================================
// QUEUE MESSAGE
// =====================================

function showQueueMessage(message) {

    const messageBox =
        document.getElementById("queue-message");


    if (messageBox) {

        messageBox.innerText =
            message;
    }
}
function addQueueHistory(operation) {

    queueHistory.push(operation);


    const history =
        document.getElementById(
            "queue-operation-history"
        );


    if (!history) {
        return;
    }


    history.innerHTML = "";


    for (
        let i = queueHistory.length - 1;
        i >= 0;
        i--
    ) {

        const item =
            document.createElement("li");


        item.innerText =
            queueHistory[i];


        history.appendChild(item);
    }
}
// =====================================
// QUEUE STEP-BY-STEP EXPLANATION
// =====================================

let currentQueueStep = 0;

let queueOperationSteps = [];


// ENQUEUE steps
const enqueueSteps = [

    {
        title: "Step 1 — Check Overflow",
        text: "First, we check whether the Queue is full. If the Queue is full, a Queue Overflow occurs."
    },

    {
        title: "Step 2 — Move REAR",
        text: "If there is space, REAR identifies the position where the new element will be inserted."
    },

    {
        title: "Step 3 — Insert Element",
        text: "The new element is inserted at the REAR of the Queue."
    },

    {
        title: "Step 4 — Update REAR",
        text: "REAR now points to the newly inserted element."
    }

];


// DEQUEUE steps
const dequeueSteps = [

    {
        title: "Step 1 — Check Underflow",
        text: "First, we check whether the Queue is empty. If it is empty, DEQUEUE cannot be performed."
    },

    {
        title: "Step 2 — Access FRONT",
        text: "The element at the FRONT is selected because Queue follows FIFO — First In, First Out."
    },

    {
        title: "Step 3 — Remove FRONT",
        text: "The FRONT element is removed from the Queue."
    },

    {
        title: "Step 4 — Move FRONT",
        text: "FRONT moves to the next element in the Queue."
    }

];


// Display Queue step
function displayQueueStep() {

    const content =
        document.getElementById(
            "queue-step-content"
        );

    const number =
        document.getElementById(
            "queue-step-number"
        );


    if (!content || !number) {
        return;
    }


    if (queueOperationSteps.length === 0) {

        content.innerHTML = `

            <h3>Choose an operation</h3>

            <p>
                Perform ENQUEUE or DEQUEUE
                to see the operation explained
                step-by-step.
            </p>

        `;

        number.innerText = "Step 0";

        return;
    }


    const step =
        queueOperationSteps[currentQueueStep];


    content.innerHTML = `

        <h3>${step.title}</h3>

        <p>${step.text}</p>

    `;


    number.innerText =
        "Step " +
        (currentQueueStep + 1) +
        " / " +
        queueOperationSteps.length;
}


// NEXT
function nextQueueStep() {

    if (queueOperationSteps.length === 0) {
        return;
    }


    if (
        currentQueueStep <
        queueOperationSteps.length - 1
    ) {

        currentQueueStep++;

        displayQueueStep();
    }
}


// PREVIOUS
function previousQueueStep() {

    if (queueOperationSteps.length === 0) {
        return;
    }


    if (currentQueueStep > 0) {

        currentQueueStep--;

        displayQueueStep();
    }
}


// AUTO PLAY
function autoPlayQueue() {

    if (queueOperationSteps.length === 0) {
        return;
    }


    currentQueueStep = 0;

    displayQueueStep();


    let interval = setInterval(function () {

        if (
            currentQueueStep >=
            queueOperationSteps.length - 1
        ) {

            clearInterval(interval);

            return;
        }


        currentQueueStep++;

        displayQueueStep();

    }, 2000);
}