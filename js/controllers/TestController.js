class TestController {
    constructor(userModel, testModel, testView) {
        this.userModel = userModel;
        this.testModel = testModel;
        this.testView = testView;
        
        this.duration = 1500; // 25 minutes
        this.timerInterval = null;
    }

    init() {
        const user = this.userModel.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        if (this.testModel.hasTakenTest(user.rollNumber)) {
            this.testView.showErrorModal('Notice', 'User already completed the test', 'Back to Dashboard');
            this.testView.bindModalClose(() => {
                window.location.href = 'dashboard.html';
            });
            return;
        }

        this.testView.renderQuestions(this.testModel.questions);
        
        // Restore progress
        const savedState = this.testModel.getProgress();
        this.testView.restoreOptions(savedState);

        this.testView.bindOptionChange(() => {
            const state = this.testView.getSelectedOptions(this.testModel.questions.length);
            this.testModel.saveProgress(state);
        });

        this.testView.bindSubmitTest(() => {
            this.submitTest();
        });

        this.startTimer();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.duration--;
            
            let minutes = Math.floor(this.duration / 60);
            let seconds = this.duration % 60;
            
            this.testView.updateTimer(minutes, seconds);
            
            if (this.duration <= 0) {
                clearInterval(this.timerInterval);
                this.submitTest();
            }
        }, 1000);
    }

    submitTest() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        const user = this.userModel.getCurrentUser();
        const score = this.testView.calculateScore(this.testModel.questions);
        
        const result = this.testModel.saveResult(user.rollNumber, score);
        this.testModel.clearProgress();

        this.testView.showResultModal(result.score, result.totalQuestions, result.percentage);
        this.testView.bindModalClose(() => {
            window.location.href = 'result.html';
        });
    }
}
