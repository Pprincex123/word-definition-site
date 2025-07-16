document.addEventListener("mouseup", async function (event) {
  const selection = window.getSelection().toString().trim();
  const tooltip = document.getElementById("tooltip");

  if (selection && /^[a-zA-Z]+$/.test(selection)) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selection}`);
    
    if (response.ok) {
      const data = await response.json();
      const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
      
      tooltip.textContent = `${selection}: ${definition}`;
      tooltip.style.left = event.pageX + "px";
      tooltip.style.top = event.pageY + "px";
      tooltip.style.display = "block";
    } else {
      tooltip.textContent = `No definition found for "${selection}"`;
      tooltip.style.left = event.pageX + "px";
      tooltip.style.top = event.pageY + "px";
      tooltip.style.display = "block";
    }
  } else {
    tooltip.style.display = "none";
  }
});
async function getDefinition() {
  const word = document.getElementById("wordInput").value.trim();
  const output = document.getElementById("definitionBox");

  if (!word) {
    output.textContent = "Please enter a word.";
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();
    const meaning = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
    output.textContent = `${word}: ${meaning}`;
  } catch (err) {
    output.textContent = `No definition found for "${word}".`;
  }
}
