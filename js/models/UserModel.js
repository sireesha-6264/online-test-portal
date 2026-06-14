class UserModel {
    constructor() {
        this.usersKey = 'users';
        this.sessionKey = 'currentUser';
    }

    async initData() {
        if (!localStorage.getItem(this.usersKey)) {
            try {
                const res = await fetch('data/users.json');
                const users = res.ok ? await res.json() : [];
                localStorage.setItem(this.usersKey, JSON.stringify(users));
            } catch (e) {
                console.warn("Could not load users.json", e);
                localStorage.setItem(this.usersKey, JSON.stringify([]));
            }
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    }

    getCurrentUser() {
        const userJson = sessionStorage.getItem(this.sessionKey);
        return userJson ? JSON.parse(userJson) : null;
    }

    login(loginId, password) {
        const users = this.getUsers();
        const user = users.find(u => 
            (u.email === loginId || u.rollNumber === loginId) && u.password === password
        );
        if (user) {
            sessionStorage.setItem(this.sessionKey, JSON.stringify(user));
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.removeItem(this.sessionKey);
    }

    isRollNumberTaken(rollNumber) {
        return this.getUsers().some(u => u.rollNumber === rollNumber);
    }

    isEmailTaken(email) {
        return this.getUsers().some(u => u.email === email);
    }

    isPhoneTaken(phone) {
        return this.getUsers().some(u => u.phone === phone);
    }

    validatePasswordCriteria(password) {
        return {
            length: password.length >= 8 && password.length <= 11,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
    }

    registerUser(userData) {
        const users = this.getUsers();
        users.push(userData);
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
}
