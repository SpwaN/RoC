// Example JSON structure for decision tree
const decisionTree = {
    "steps": [
        {
            "id": 1,
            "question": "Was the deceased/testator married?",
            "yes": 2,
            "no": "legal_order_inheritance_alt_will",
            "legal_sources": "3 kap. 1 § ÄB & e contrario 2 kap. 1-3 §§ ÄB 5 kap. 1 § ÄB"
        },
        {
            "id": 2,
            "question": "Was there a pending divorce case at the time of the deceased’s/testator’s death?",
            "yes": "legal_order_inheritance_alt_will",
            "no": 3,
            "legal_sources": "3 kap. 1 § ÄB"
        },
        {
            "id": 3,
            "question": "Is there a valid will?",
            "yes": "no_inheritance_spouse",
            "no": 4,
            "legal_sources": "3 kap. 10 § ÄB"
        },
        {
            "id": 4,
            "question": "Does the deceased/testator have any surviving children?",
            "yes": 5,
            "no": "spouse_right_to_4_price_base",
            "legal_sources": "3 kap. 1 § 2 st. ÄB"
        },
        {
            "id": 5,
            "question": "Does the deceased/testator have children from another relationship?",
            "yes": 6,
            "no": "spouse_inherits_shared_children",
            "legal_sources": "3 kap. 1 § 1 st ÄB 3 kap. 2 § ÄB"
        },
        {
            "id": 6,
            "question": "Have they waived their inheritance rights?",
            "yes": "spouse_inherits_shared_children",
            "no": "children_right_to_inheritance",
            "legal_sources": "3 kap. 1 § 1 st 2 m. ÄB 3 kap. 9 § ÄB"
        },
        {
            "id": "spouse_inherits_shared_children",
            "outcome": "The spouse inherits with free disposal rights. Shared children have a right to subsequent inheritance.",
            "legal_sources": "3 kap. 1 § 1 st. ÄB 3 kap. 2 § ÄB Prop. 1986/87:1 s. 2"
        },
        {
            "id": "spouse_right_to_4_price_base",
            "outcome": "The spouse’s right to at least 4 price base amounts.",
            "legal_sources": "3 kap. 1 § 2 st. ÄB (2 kap. 6-7 §§ SFB)"
        },
        {
            "id": "no_inheritance_spouse",
            "outcome": "No inheritance right of spouse. The legal order of inheritance alt. Will.",
            "legal_sources": "3 kap. 10 § ÄB"
        },
        {
            "id": "children_right_to_inheritance",
            "outcome": "Children from another relationship have the right to their inheritance share immediately.",
            "legal_sources": "3 kap. 1 § 1 st 2 m. ÄB 3 kap. 9 § ÄB"
        },
        {
            "id": "legal_order_inheritance_alt_will",
            "outcome": "The legal order of inheritance alt. Will.",
            "legal_sources": "3 kap. 1 § ÄB & e contrario 2 kap. 1-3 §§ ÄB 5 kap. 1 § ÄB"
        }
    ]
};

// State management
let currentStepId = 1;

// Load the first question
window.onload = function() {
    displayQuestion(currentStepId);
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
