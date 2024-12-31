document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("downloadButton").addEventListener("click", () => {
    const registrationNumber = document
      .getElementById("registrationNumber")
      .value.trim();
    const date = document.getElementById("date").value.trim();

    if (!registrationNumber || !date) {
      alert("Please fill out the registration number and date fields.");
      return;
    }

    if (typeof scriptTemplate === "undefined") {
      alert("Script template is not loaded.");
      return;
    }

    const updatedScript = scriptTemplate
      .replace(/{{REGISTRATION_NUMBER}}/g, registrationNumber)
      .replace(/{{DATE}}/g, date);

    const blob = new Blob([updatedScript], { type: "application/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modifiedScript.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  });
});
