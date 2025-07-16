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
