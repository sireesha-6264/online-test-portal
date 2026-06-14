class AuthController {
    constructor(userModel, authView) {
        this.userModel = userModel;
        this.authView = authView;
    }

    initLogin() {
        if (this.userModel.getCurrentUser()) {
            window.location.href = 'dashboard.html';
            return;
        }

        this.authView.bindLoginSubmit((loginId, password) => {
            const success = this.userModel.login(loginId, password);
            if (success) {
                window.location.href = 'dashboard.html';
            } else {
                this.authView.showLoginError('Invalid credentials. Please try again.');
            }
        });
    }

    initRegister() {
        if (this.userModel.getCurrentUser()) {
            window.location.href = 'dashboard.html';
            return;
        }

        this.authView.bindPasswordInput((password) => {
            const criteria = this.userModel.validatePasswordCriteria(password);
            this.authView.updatePasswordCriteria(criteria);
        });

        this.authView.bindRegisterSubmit((userData) => {
            let hasError = false;

            if (this.userModel.isRollNumberTaken(userData.rollNumber)) {
                this.authView.showRegisterError('rollNumber', 'Roll Number already exists');
                hasError = true;
            }
            if (this.userModel.isEmailTaken(userData.email)) {
                this.authView.showRegisterError('email', 'Email ID already exists');
                hasError = true;
            }
            if (this.userModel.isPhoneTaken(userData.phone)) {
                this.authView.showRegisterError('phone', 'Phone Number already exists');
                hasError = true;
            }

            const criteria = this.userModel.validatePasswordCriteria(userData.password);
            const isValidPassword = Object.values(criteria).every(v => v);

            if (!isValidPassword) {
                this.authView.showRegisterError('password', 'Password does not meet criteria');
                hasError = true;
            }

            if (userData.password !== userData.rePassword) {
                this.authView.showRegisterError('rePassword', 'Passwords do not match');
                hasError = true;
            }

            if (!hasError) {
                // Save user and redirect
                const newUser = {
                    rollNumber: userData.rollNumber,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phone: userData.phone,
                    password: userData.password
                };
                this.userModel.registerUser(newUser);
                this.authView.showSuccessAndRedirect();
            }
        });
    }
}
