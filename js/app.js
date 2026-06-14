/**
 * Main application initialization logic.
 * Ensures that base data from JSON files is loaded into localStorage,
 * and sets up global helpers like logout.
 */

async function initApp() {
    const userModel = new UserModel();
    const testModel = new TestModel();

    await userModel.initData();
    await testModel.initData();
}

function logout() {
    const userModel = new UserModel();
    userModel.logout();
    window.location.href = 'login.html';
}

// Run init on load
initApp();
