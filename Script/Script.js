window.addEventListener("load", function () {
    const loading = document.getElementById("loading-screen");

    if (loading) {
        setTimeout(function () {
            loading.classList.add("hidden");
        }, 2200);
    }
});

let typingTimer = null;

function typeText(element, text) {
    if (typingTimer) {
        clearInterval(typingTimer);
        typingTimer = null;
    }

    element.textContent = "";
    element.classList.add("is-typing");

    let index = 0;
    typingTimer = setInterval(function () {
        element.textContent += text.charAt(index);
        index += 1;

        if (index >= text.length) {
            clearInterval(typingTimer);
            typingTimer = null;
            element.classList.remove("is-typing");
        }
    }, 28);
}

document.querySelectorAll(".card[data-message]").forEach(function (card) {
    card.addEventListener("click", function () {
        const item = card.closest(".card-item");
        const output = item.querySelector(".typed-message");
        const message = card.getAttribute("data-message") || "";

        document.querySelectorAll(".card").forEach(function (other) {
            other.classList.remove("active");
        });
        card.classList.add("active");

        document.querySelectorAll(".typed-message").forEach(function (text) {
            if (text !== output) {
                text.textContent = "";
                text.classList.remove("is-typing");
            }
        });

        typeText(output, message);
        output.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
});

document.querySelectorAll("[data-answer]").forEach(function (button) {
    button.addEventListener("click", function () {
        const choice = button.getAttribute("data-answer");
        const actions = document.getElementById("question-actions");
        const selected = document.getElementById("answer-" + choice);

        if (actions) {
            actions.classList.add("hidden");
        }

        document.querySelectorAll(".answer").forEach(function (message) {
            message.classList.add("hidden");
        });

        if (selected) {
            selected.classList.remove("hidden");
        }
    });
});
