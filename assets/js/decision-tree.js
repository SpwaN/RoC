let decisionTree = {};
let currentStepId = 1;
let currentQuestionNumber = 1;
let historyStack = [];

// Load the decision tree JSON dynamically
function loadDecisionTree() {
    fetch('https://raw.githubusercontent.com/SpwaN/RoC/main/assets/json/decision-tree.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load decision tree JSON');
            }
            return response.json();
        })
        .then(data => {
            decisionTree = data;
            // Load the first question after JSON is loaded
            displayQuestion(currentStepId);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
}

// Load the first question
window.onload = function() {
    loadDecisionTree();
};

// Function to display question and dynamically generate choice buttons
function displayQuestion(stepId) {
    const step = getStepById(stepId);
    console.log("Current step:", step);

    const backButton = document.getElementById('back-btn');
    console.log('Button: ', backButton);
    console.log('HStack: ', historyStack.length);

    if (step.question) {
        document.querySelector('.modal-title').innerText = `Question ${currentQuestionNumber} - Questionnaire`;
        // Update the question text
        document.getElementById('question-container').innerHTML = step.question;

        // Clear the previous buttons
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';

        // Dynamically generate buttons based on the choices in the JSON
        for (const [choiceText, nextStepId] of Object.entries(step.choices)) {
            const button = document.createElement('button');
            button.innerText = choiceText; 
            button.classList.add('btn', 'btn-primary', 'm-2'); 
            button.onclick = () => handleAnswer(choiceText);
            choicesContainer.appendChild(button);
        }
        
        // Ensure choices container is visible
        document.getElementById('choices-container').style.display = 'block';
        document.getElementById('result-container').innerHTML = '';
    } else if (step.outcome) {
        displayOutcome(step);
    }
}

// Function to get step by ID
function getStepById(id) {
    return decisionTree.steps.find(step => step.id === id);
}

// Function to handle user's answer
function handleAnswer(answer) {
    const currentStep = getStepById(currentStepId);
    const nextStepId = currentStep.choices[answer]; // Fetch the next step ID based on the user's choice
    
    if (nextStepId) {
        historyStack.push(currentStepId);
        currentStepId = nextStepId;
        currentQuestionNumber++;
        displayQuestion(currentStepId);
    } else {
        console.error('Invalid answer or step ID');
    }
}

// Function to go back to the previous step
function goBack() {
    if (historyStack.length > 0) {
        currentStepId = historyStack.pop();
        currentQuestionNumber--;
        displayQuestion(currentStepId);
    }
}

// Function to display the final outcome
function displayOutcome(step) {
    document.querySelector('.modal-title').innerText = 'Result - Questionnaire';
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('choices-container').style.display = 'none';
    document.getElementById('result-container').innerHTML = `
        Outcome: ${step.outcome} <br>
        Legal Sources: ${step.legal_sources}
    `;
}
