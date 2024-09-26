let decisionTree = {};
let currentStepId = 1;

// Load the decision tree JSON dynamically
function loadDecisionTree() {
    fetch('../json/decision-tree.json')
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

// Function to display question
function displayQuestion(stepId) {
    const step = getStepById(stepId);
    if (step.question) {
        document.getElementById('question-container').innerHTML = step.question;
        document.getElementById('choices-container').style.display = 'block';
        document.getElementById('result-container').innerHTML = ''; // Clear previous result
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
    const nextStepId = currentStep[answer];
    
    if (typeof nextStepId === 'string') {
        displayOutcome(getStepById(nextStepId));
    } else {
        currentStepId = nextStepId;
        displayQuestion(currentStepId);
    }
}

// Function to display the final outcome
function displayOutcome(step) {
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('choices-container').style.display = 'none';
    document.getElementById('result-container').innerHTML = `
        Outcome: ${step.outcome} <br>
        Legal Sources: ${step.legal_sources}
    `;
}
