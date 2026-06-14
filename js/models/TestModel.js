class TestModel {
    constructor() {
        this.resultsKey = 'results';
        this.stateKey = 'testState';
        this.questions = [
            // HTML (7 Questions)
            { q: "Which tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], a: 1 },
            { q: "Which HTML tag is used to insert an image?", options: ["<picture>", "<src>", "<image>", "<img>"], a: 3 },
            { q: "Which HTML element is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], a: 2 },
            { q: "Which attribute specifies an alternate text for an image?", options: ["title", "alt", "src", "href"], a: 1 },
            { q: "Which HTML tag is used to create an unordered list?", options: ["<ol>", "<list>", "<ul>", "<li>"], a: 2 },
            { q: "Which input type hides the entered characters?", options: ["text", "email", "password", "hidden"], a: 2 },
            { q: "Which HTML5 element represents navigation links?", options: ["<navigation>", "<nav>", "<menu>", "<links>"], a: 1 },

            // CSS (7 Questions)
            { q: "Which CSS property changes the text color?", options: ["font-color", "text-color", "color", "foreground"], a: 2 },
            { q: "Which CSS property is used to make text bold?", options: ["font-style", "font-weight", "text-weight", "bold"], a: 1 },
            { q: "Which property is used to change the background color?", options: ["bg-color", "color", "background-color", "background"], a: 2 },
            { q: "Which CSS selector selects all elements?", options: ["#", ".", "*", "%"], a: 2 },
            { q: "Which display value enables Flexbox?", options: ["display: block", "display: flex", "display: inline", "display: grid"], a: 1 },
            { q: "Which property controls the space outside an element?", options: ["padding", "border", "margin", "spacing"], a: 2 },
            { q: "Which CSS property rounds the corners of an element?", options: ["border-style", "border-radius", "corner-radius", "radius"], a: 1 },

            // JavaScript (6 Questions)
            { q: "Which keyword is used to declare a variable with block scope?", options: ["var", "define", "let", "int"], a: 2 },
            { q: "Which method is used to display a popup message?", options: ["prompt()", "alert()", "console.log()", "display()"], a: 1 },
            { q: "What is the output of typeof \"Hello\"?", options: ["text", "string", "char", "object"], a: 1 },
            { q: "Which method is used to select an element by its ID?", options: ["getElement()", "querySelectorAll()", "getElementById()", "selectById()"], a: 2 },
            { q: "Which event occurs when a button is clicked?", options: ["onmouseover", "onload", "onclick", "onchange"], a: 2 },
            { q: "Which symbol is used for strict equality comparison?", options: ["=", "==", "===", "!="], a: 2 }
        ];
    }

    async initData() {
        if (!localStorage.getItem(this.resultsKey)) {
            try {
                const res = await fetch('data/results.json');
                const results = res.ok ? await res.json() : [];
                localStorage.setItem(this.resultsKey, JSON.stringify(results));
            } catch (e) {
                console.warn("Could not load results.json", e);
                localStorage.setItem(this.resultsKey, JSON.stringify([]));
            }
        }
    }

    getResults() {
        return JSON.parse(localStorage.getItem(this.resultsKey) || '[]');
    }

    getUserResult(rollNumber) {
        return this.getResults().find(r => r.rollNumber === rollNumber);
    }

    hasTakenTest(rollNumber) {
        return this.getUserResult(rollNumber) !== undefined;
    }

    saveResult(rollNumber, score) {
        const totalQuestions = this.questions.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

        const resultObj = {
            rollNumber,
            score,
            totalQuestions,
            percentage,
            submittedAt: dateStr
        };

        const results = this.getResults();
        results.push(resultObj);
        localStorage.setItem(this.resultsKey, JSON.stringify(results));
        
        return resultObj;
    }

    saveProgress(state) {
        sessionStorage.setItem(this.stateKey, JSON.stringify(state));
    }

    getProgress() {
        return JSON.parse(sessionStorage.getItem(this.stateKey) || '{}');
    }

    clearProgress() {
        sessionStorage.removeItem(this.stateKey);
    }
}
