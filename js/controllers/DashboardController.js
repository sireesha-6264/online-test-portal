class DashboardController {
    constructor(userModel, testModel, dashboardView) {
        this.userModel = userModel;
        this.testModel = testModel;
        this.dashboardView = dashboardView;
    }

    init() {
        const user = this.userModel.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        this.dashboardView.renderWelcome(user.firstName);
        this.dashboardView.bindCloseModal();

        this.dashboardView.bindTakeTest(() => {
            if (this.testModel.hasTakenTest(user.rollNumber)) {
                this.dashboardView.showModal('User already completed the test');
            } else {
                window.location.href = 'test.html';
            }
        });

        this.dashboardView.bindShowResult(() => {
            window.location.href = 'result.html';
        });
    }
}
