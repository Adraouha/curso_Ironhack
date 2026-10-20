const API = "http://localhost:8080/api/chat";
const chat = document.getElementById("chat");
const input = document.getElementById("input");

let sessionId = localStorage.getItem("sessionId");
if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
}

function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = "msg " + sender;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div;
}

async function loadHistory() {
    try {
        const res = await fetch(API + "/" + sessionId);
        const messages = await res.json();
        messages.forEach((m) => addMessage(m.sender, m.text));
        if (messages.length === 0) {
            addMessage("bot", "Hola, soy Eliza. Como te encuentras hoy?");
        }
    } catch (error) {
        addMessage("bot", "No se pudo conectar con el servidor de Eliza en el puerto 8080.");
    }
}

async function send() {
    const text = input.value;
    input.value = "";

    // Mostrar el mensaje del usuario (incluso si es corto o vacio para que Eliza responda)
    addMessage("user", text.trim() === "" ? "(mensaje vacio)" : text);

    // 1. Mostrar aviso "Pensando..." antes de responder
    const avisoPensando = addMessage("bot pensando", "Pensando...");

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: sessionId, message: text })
        });
        const data = await res.json();

        // Pequeña pausa para que se aprecie el aviso "Pensando..."
        setTimeout(() => {
            avisoPensando.remove();
            addMessage("bot", data.reply);
        }, 500);
    } catch (error) {
        avisoPensando.remove();
        addMessage("bot", "Error al conectar con el servidor.");
    }
}

document.getElementById("send").addEventListener("click", send);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
});
document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("sessionId");
    location.reload();
});

loadHistory();
