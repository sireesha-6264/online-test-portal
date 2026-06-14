class DashboardView {
    constructor() {
        this.welcomeMessage = document.getElementById('welcomeMessage');
        this.btnTakeTest = document.getElementById('btnTakeTest');
        this.btnShowResult = document.getElementById('btnShowResult');
        this.alertModal = document.getElementById('alertModal');
        this.modalMessage = document.getElementById('modalMessage');
        this.closeModal = document.getElementById('closeModal');
    }

    renderWelcome(firstName) {
        if (this.welcomeMessage) {
            this.welcomeMessage.textContent = `Welcome, ${firstName}`;
        }
    }

    bindTakeTest(handler) {
        if (this.btnTakeTest) {
            this.btnTakeTest.addEventListener('click', handler);
        }
    }

    bindShowResult(handler) {
        if (this.btnShowResult) {
            this.btnShowResult.addEventListener('click', handler);
        }
    }

    bindCloseModal() {
        if (this.closeModal) {
            this.closeModal.addEventListener('click', () => {
                this.alertModal.style.display = 'none';
            });
        }
    }

    showModal(msg) {
        if (this.modalMessage && this.alertModal) {
            this.modalMessage.textContent = msg;
            this.alertModal.style.display = 'flex';
        }
    }
}
