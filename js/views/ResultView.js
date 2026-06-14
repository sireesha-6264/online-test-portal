class ResultView {
    constructor() {
        this.resultContent = document.getElementById('resultContent');
        this.noResultContent = document.getElementById('noResultContent');
        
        this.resName = document.getElementById('resName');
        this.resRoll = document.getElementById('resRoll');
        this.resTotal = document.getElementById('resTotal');
        this.resCorrect = document.getElementById('resCorrect');
        this.resWrong = document.getElementById('resWrong');
        this.resScore = document.getElementById('resScore');
        this.resPercent = document.getElementById('resPercent');
        this.resStatus = document.getElementById('resStatus');
    }

    renderResult(user, result) {
        if (!this.resultContent) return;
        this.resultContent.style.display = 'block';

        const wrongAnswers = result.totalQuestions - result.score;

        this.resName.textContent = `${user.firstName} ${user.lastName}`;
        this.resRoll.textContent = user.rollNumber;
        this.resTotal.textContent = result.totalQuestions;
        this.resCorrect.textContent = result.score;
        this.resWrong.textContent = wrongAnswers;
        this.resScore.textContent = result.score;
        this.resPercent.textContent = result.percentage;

        if (result.percentage >= 70) {
            this.resStatus.textContent = 'PASS';
            this.resStatus.className = 'status-badge pass';
        } else {
            this.resStatus.textContent = 'FAIL';
            this.resStatus.className = 'status-badge fail';
        }
    }

    renderNoResult() {
        if (this.noResultContent) {
            this.noResultContent.style.display = 'block';
        }
    }
}
