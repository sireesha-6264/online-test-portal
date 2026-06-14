class TestView {
    constructor() {
        this.container = document.getElementById('questionsContainer');
        this.timerElem = document.getElementById('timer');
        this.testForm = document.getElementById('testForm');
        
        this.alertModal = document.getElementById('alertModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalMessage = document.getElementById('modalMessage');
        this.closeModalBtn = document.getElementById('closeModal');
    }

    escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    renderQuestions(questions) {
        if (!this.container) return;
        let html = '';
        
        questions.forEach((qObj, index) => {
            html += `<div class="question-container">
                <h3 class="question-title">${index + 1}. ${this.escapeHTML(qObj.q)}</h3>`;
            
            qObj.options.forEach((opt, optIndex) => {
                const id = `q${index}_opt${optIndex}`;
                html += `<label class="option-label" for="${id}">
                    <input type="radio" name="q${index}" id="${id}" value="${optIndex}">
                    ${this.escapeHTML(opt)}
                </label>`;
            });
            
            html += `</div>`;
        });
        
        this.container.innerHTML = html;
    }

    updateTimer(minutes, seconds) {
        if (this.timerElem) {
            this.timerElem.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    bindOptionChange(handler) {
        if (this.container) {
            this.container.addEventListener('change', handler);
        }
    }

    bindSubmitTest(handler) {
        if (this.testForm) {
            this.testForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to submit the test?")) {
                    handler();
                }
            });
        }
    }

    bindModalClose(handler) {
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', handler);
        }
    }

    getSelectedOptions(numQuestions) {
        const state = {};
        for (let i = 0; i < numQuestions; i++) {
            const checked = document.querySelector(`input[name="q${i}"]:checked`);
            if (checked) {
                state[`q${i}`] = checked.id;
            }
        }
        return state;
    }

    restoreOptions(state) {
        for (const key in state) {
            const el = document.getElementById(state[key]);
            if (el) el.checked = true;
        }
    }

    calculateScore(questions) {
        let score = 0;
        questions.forEach((qObj, index) => {
            const checked = document.querySelector(`input[name="q${index}"]:checked`);
            if (checked && parseInt(checked.value) === qObj.a) {
                score++;
            }
        });
        return score;
    }

    showResultModal(score, total, percentage) {
        if (this.alertModal) {
            this.modalTitle.textContent = 'Test Submitted!';
            this.modalTitle.style.color = 'var(--success-color)';
            this.modalMessage.textContent = `Your Score: ${score}/${total} (${percentage}%)`;
            this.closeModalBtn.textContent = 'View Detailed Results';
            this.alertModal.style.display = 'flex';
        }
    }

    showErrorModal(title, message, btnText) {
        if (this.alertModal) {
            this.modalTitle.textContent = title;
            this.modalTitle.style.color = 'var(--error-color)';
            this.modalMessage.textContent = message;
            this.closeModalBtn.textContent = btnText;
            this.alertModal.style.display = 'flex';
        }
    }
}
