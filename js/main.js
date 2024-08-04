"use strict";

let previous_state = [];

const edit_items = document.querySelectorAll(".editItem");
const edit_button = document.querySelector(".editButton");
const save_button = document.querySelector(".saveButton");
const cancel_button = document.querySelector(".cancelButton");

edit_button.addEventListener("click", () => {
  for (const item of edit_items) {
    const text = item.innerText;
    previous_state.push(text);
    item.innerHTML = `<input type="text" value="${text}">`;
  }

  edit_button.hidden = true;
  save_button.hidden = false;
  cancel_button.hidden = false;
});

cancel_button.addEventListener("click", () => {
  for (let i = 0; i < edit_items.length; i++) {
    edit_items[i].innerText = previous_state[i];
  }
  previous_state = [];

  edit_button.hidden = false;
  save_button.hidden = true;
  cancel_button.hidden = true;
});

save_button.addEventListener("click", () => {
  for (let i = 0; i < edit_items.length; i++) {
    const input = edit_items[i].children[0];
    if (input) {
      const value = input.value;
      edit_items[i].innerText = value;
      localStorage.setItem(`editItem-${i}`, value);
    }
  }

  previous_state = [];
  edit_button.hidden = false;
  save_button.hidden = true;
  cancel_button.hidden = true;
});

// Material waves effect
document.addEventListener("pointerdown", (mouseEvent) => {
  const elementWithRipple = mouseEvent.target.closest("[ripple]");
  if (!elementWithRipple) return;

  const rippleEl = document.createElement("div");
  rippleEl.classList.add("ripple");

  const rect = elementWithRipple.getBoundingClientRect();
  const x = mouseEvent.clientX - rect.left;
  const y = mouseEvent.clientY - rect.top;

  rippleEl.style.left = `${x}px`;
  rippleEl.style.top = `${y}px`;

  elementWithRipple.appendChild(rippleEl);

  requestAnimationFrame(() => {
    rippleEl.classList.add("run");
  });

  rippleEl.addEventListener("transitionend", () => {
    rippleEl.remove();
  });
});

// Load saved state from localStorage
document.addEventListener("DOMContentLoaded", () => {
  edit_items.forEach((item, index) => {
    const savedValue = localStorage.getItem(`editItem-${index}`);
    if (savedValue) {
      item.innerText = savedValue;
    }
  });
});

// downloading pdf
document.getElementById("downloadButton").addEventListener("click", () => {
  const element = document.getElementById("container");
  const windowHeight = window.innerHeight;
  // for window heights less than element height(1650 for container) html2pdf need to have additional canvas crop based on difference between heights
  const yPosition = windowHeight < 1650 ? 1650 - windowHeight : 0;
  const opt = {
    filename: "best-resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      ignoreElements: (element) => {
        const ignoreClasses = ["editButton", "downloadButton"];
        return ignoreClasses.some((cls) => element.classList.contains(cls));
      },
      y: yPosition,
    },
    jsPDF: { unit: "in", format: "a2", orientation: "p" },
  };
  html2pdf().set(opt).from(element).save();
});
