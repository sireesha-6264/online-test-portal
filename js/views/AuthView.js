class AuthView {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        
        // Login Elements
        if (this.loginForm) {
            this.loginIdInput = document.getElementById('loginId');
            this.loginPassInput = document.getElementById('password');
            this.generalError = document.getElementById('generalError');
        }

        // Register Elements
        if (this.registerForm) {
            this.rollNumberInput = document.getElementById('rollNumber');
            this.emailInput = document.getElementById('email');
            this.firstNameInput = document.getElementById('firstName');
            this.lastNameInput = document.getElementById('lastName');
            this.phoneInput = document.getElementById('phone');
            this.passwordInput = document.getElementById('password');
            this.rePasswordInput = document.getElementById('rePassword');
            
            this.successMessage = document.getElementById('successMessage');
            this.passwordCriteria = document.getElementById('passwordCriteria');
            this.critElements = {
                length: document.getElementById('crit-length'),
                upper: document.getElementById('crit-upper'),
                lower: document.getElementById('crit-lower'),
                number: document.getElementById('crit-number'),
                special: document.getElementById('crit-special')
            };
        }
    }

    bindLoginSubmit(handler) {
        if (!this.loginForm) return;
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generalError.textContent = '';
            handler(this.loginIdInput.value.trim(), this.loginPassInput.value);
        });
    }

    bindRegisterSubmit(handler) {
        if (!this.registerForm) return;
        this.registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.clearErrors();
            
            const userData = {
                rollNumber: this.rollNumberInput.value.trim(),
                email: this.emailInput.value.trim(),
                firstName: this.firstNameInput.value.trim(),
                lastName: this.lastNameInput.value.trim(),
                phone: this.phoneInput.value.trim(),
                password: this.passwordInput.value,
                rePassword: this.rePasswordInput.value
            };
            handler(userData);
        });
    }

    bindPasswordInput(handler) {
        if (!this.passwordInput) return;
        
        this.passwordInput.addEventListener('focus', () => {
            this.passwordCriteria.classList.add('show');
        });

        this.passwordInput.addEventListener('input', () => {
            handler(this.passwordInput.value);
        });
    }

    updatePasswordCriteria(criteriaMet) {
        const updateClass = (el, isValid, text) => {
            el.className = isValid ? 'criteria-item valid' : 'criteria-item invalid';
            el.textContent = (isValid ? '✓ ' : '✗ ') + text;
        };

        updateClass(this.critElements.length, criteriaMet.length, '8-11 characters');
        updateClass(this.critElements.upper, criteriaMet.upper, 'One uppercase letter');
        updateClass(this.critElements.lower, criteriaMet.lower, 'One lowercase letter');
        updateClass(this.critElements.number, criteriaMet.number, 'One number');
        updateClass(this.critElements.special, criteriaMet.special, 'One special symbol');
    }

    showLoginError(msg) {
        this.generalError.textContent = msg;
    }

    showRegisterError(field, msg) {
        const errElem = document.getElementById(`${field}Error`);
        if (errElem) errElem.textContent = msg;
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    showSuccessAndRedirect() {
        this.successMessage.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}
