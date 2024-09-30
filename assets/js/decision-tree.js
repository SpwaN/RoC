let decisionTree = {};
let currentStepId = 1;
let currentQuestionNumber = 1;
let historyStack = [];
let answerHistory = [];

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
            displayQuestion(currentStepId);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
}

// Load the first question
document.addEventListener('DOMContentLoaded', function () {
    loadDecisionTree();
});

// Function to clear only the choice buttons, not the back button
function clearChoices() {
    const buttonGroupContainer = document.getElementById('button-group-container');
    buttonGroupContainer.innerHTML = '';  
}

// Function to display question and dynamically generate choice buttons
function displayQuestion(stepId) {
    const step = getStepById(stepId);
    
    const backButton = document.getElementById('back-btn');
    
    // Show or hide the back button based on the history stack
    if (historyStack.length > 0) {
        backButton.style.display = 'inline-block'; 
    } else {
        backButton.style.display = 'none'; 
    }

    if (step.question) {
        // Update the question text and title
        document.querySelector('.modal-title').innerText = `Question ${currentQuestionNumber} - Questionnaire`;
        document.getElementById('question-container').innerHTML = step.question;
        
        clearChoices();

        // Ensure buttons are visible using class toggles
        document.getElementById('choices-container').classList.add('show-choices');
        document.getElementById('button-group-container').classList.add('show-buttons');
        document.getElementById('result-container').classList.remove('show-result');

        // Dynamically generate buttons based on the choices in the JSON
        for (const [choiceText, nextStepId] of Object.entries(step.choices)) {
            const button = document.createElement('button');
            button.innerText = choiceText;
            button.classList.add('btn', 'btn-primary', 'm-2');
            button.onclick = () => handleAnswer(nextStepId, choiceText);
            document.getElementById('button-group-container').appendChild(button);
        }

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
function handleAnswer(nextStepId) {
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

// Function to handle user's answer
function handleAnswer(nextStepId, answerText) {
    if (nextStepId) {
        const currentQuestion = document.getElementById('question-container').innerText;
        answerHistory.push({
            question: currentQuestion,
            answer: answerText
        });
        updateHistoryUI();
        historyStack.push(currentStepId);
        currentStepId = nextStepId;
        currentQuestionNumber++;
        displayQuestion(currentStepId);
    } else {
        console.error('Invalid answer or step ID');
    }
}

function updateHistoryUI() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    answerHistory.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>Q${index + 1}:</strong> ${entry.question} <br><strong>A:</strong> ${entry.answer}`;
        historyList.appendChild(listItem);
    });

    const historySection = document.getElementById('history-section');
    historySection.scrollTop = historySection.scrollHeight;
}

// Function to display the final outcome
function displayOutcome(step) {
    document.querySelector('.modal-title').innerText = 'Result - Questionnaire';
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('choices-container').classList.remove('show-choices');
    document.getElementById('button-group-container').classList.remove('show-buttons');
    document.getElementById('result-container').classList.add('show-result');
    const buttons = document.querySelectorAll('#button-group-container button');
    buttons.forEach(button => {
        button.style.display = 'none';
    });
    document.getElementById('result-container').innerHTML = `
        <p>Outcome: ${step.outcome}</p>
        <p>Legal Sources: ${step.legal_sources}</p>
    `;
}
