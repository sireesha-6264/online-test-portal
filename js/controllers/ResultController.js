class ResultController {
    constructor(userModel, testModel, resultView) {
        this.userModel = userModel;
        this.testModel = testModel;
        this.resultView = resultView;
    }

    init() {
        const user = this.userModel.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const userResult = this.testModel.getUserResult(user.rollNumber);

        if (userResult) {
            this.resultView.renderResult(user, userResult);
        } else {
            this.resultView.renderNoResult();
        }
    }
}
