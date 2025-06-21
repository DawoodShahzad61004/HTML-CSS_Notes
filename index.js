const demoElement = document.getElementById("demo-element");
let draggedElement = null;
let offset = { x: 0, y: 0 };

// Enhanced Position Control
function changePosition(pos) {
  demoElement.style.position = pos;
  if (pos === "relative") {
    demoElement.style.top = "20px";
    demoElement.style.left = "20px";
  } else if (pos === "absolute") {
    demoElement.style.top = "10px";
    demoElement.style.right = "10px";
    demoElement.style.left = "auto";
  } else if (pos === "fixed") {
    demoElement.style.top = "100px";
    demoElement.style.right = "20px";
    demoElement.style.left = "auto";
  } else {
    demoElement.style.top = "auto";
    demoElement.style.left = "auto";
    demoElement.style.right = "auto";
  }
  demoElement.innerHTML = `Position: ${pos}<br><small>Drag me around!</small>`;
  updateActiveButton(event);
}

function changeDisplay(display) {
  demoElement.style.display = display;
  if (display !== "none") {
    demoElement.innerHTML = `Display: ${display}<br><small>Drag me around!</small>`;
  }
  updateActiveButton(event);
}

// Float Controls
function setFloat(elementId, floatValue) {
  const element = document.getElementById(elementId);
  element.style.float = floatValue;

  // Update classes for styling
  element.className = "float-element";
  if (floatValue === "left") {
    element.classList.add("float-left");
  } else if (floatValue === "right") {
    element.classList.add("float-right");
  } else {
    element.classList.add("float-none");
  }

  element.textContent = `${elementId} (float: ${floatValue})`;
}

function toggleClear() {
  const clearElement = document.getElementById("clear-element");
  clearElement.style.display =
    clearElement.style.display === "none" ? "block" : "none";
}

function resetFloat() {
  document.getElementById("element1").className = "float-element float-left";
  document.getElementById("element1").style.float = "left";
  document.getElementById("element1").textContent = "Element 1";

  document.getElementById("element2").className = "float-element float-right";
  document.getElementById("element2").style.float = "right";
  document.getElementById("element2").textContent = "Element 2";

  document.getElementById("clear-element").style.display = "none";
}

// Z-Index Controls
function updateZIndex(elementId, value, displayId) {
  const element = document.getElementById(elementId);
  element.style.zIndex = value;
  document.getElementById(displayId).textContent = value;

  // Update text in element
  const textSpan = element.querySelector("span");
  if (textSpan) {
    textSpan.textContent = value;
  }
}

function randomizeZIndex() {
  const elements = ["z-back", "z-middle", "z-front"];
  const displays = ["z1-value", "z2-value", "z3-value"];
  const sliders = ["z1-slider", "z2-slider", "z3-slider"];

  elements.forEach((id, index) => {
    const randomZ = Math.floor(Math.random() * 16) - 5;
    updateZIndex(id, randomZ, displays[index]);
    document.getElementById(sliders[index]).value = randomZ;
  });
}

function resetZIndex() {
  updateZIndex("z-back", 1, "z1-value");
  updateZIndex("z-middle", 2, "z2-value");
  updateZIndex("z-front", 3, "z3-value");
  document.getElementById("z1-slider").value = 1;
  document.getElementById("z2-slider").value = 2;
  document.getElementById("z3-slider").value = 3;
}

// Box Model Controls
function updateBoxModel(property, value, displayId) {
  const elements = {
    margin: document.getElementById("interactive-margin"),
    border: document.getElementById("interactive-border"),
    padding: document.getElementById("interactive-padding"),
  };

  if (property === "margin") {
    elements.margin.style.padding = value + "px";
    document.getElementById(displayId).textContent = value + "px";
  } else if (property === "border") {
    elements.border.style.borderWidth = value + "px";
    document.getElementById(displayId).textContent = value + "px";
  } else if (property === "padding") {
    elements.padding.style.padding = value + "px";
    document.getElementById(displayId).textContent = value + "px";
  }
}

function resetBoxModel() {
  updateBoxModel("margin", 15, "margin-value");
  updateBoxModel("border", 3, "border-value");
  updateBoxModel("padding", 15, "padding-value");
  document.getElementById("margin-slider").value = 15;
  document.getElementById("border-slider").value = 3;
  document.getElementById("padding-slider").value = 15;
}

// Transform Controls
function updateTransform(property, value, displayId) {
  const element = demoElement;
  let currentTransform = element.style.transform || "";

  if (property === "rotate") {
    currentTransform = currentTransform.replace(/rotate\([^)]*\)/g, "");
    currentTransform += ` rotate(${value}deg)`;
    document.getElementById(displayId).textContent = value + "°";
  } else if (property === "scale") {
    currentTransform = currentTransform.replace(/scale\([^)]*\)/g, "");
    currentTransform += ` scale(${value})`;
    document.getElementById(displayId).textContent = value;
  } else if (property === "opacity") {
    element.style.opacity = value / 100;
    document.getElementById(displayId).textContent = value + "%";
    return;
  }

  element.style.transform = currentTransform.trim();
}

function resetElement() {
  demoElement.style.position = "static";
  demoElement.style.display = "block";
  demoElement.style.top = "auto";
  demoElement.style.left = "auto";
  demoElement.style.right = "auto";
  demoElement.style.transform = "";
  demoElement.style.opacity = "1";
  demoElement.innerHTML = "Demo Element<br><small>Drag me around!</small>";

  // Reset sliders
  document.getElementById("rotation-slider").value = 0;
  document.getElementById("scale-slider").value = 1;
  document.getElementById("opacity-slider").value = 100;
  document.getElementById("rotation-value").textContent = "0°";
  document.getElementById("scale-value").textContent = "1";
  document.getElementById("opacity-value").textContent = "100%";

  // Remove active class from buttons
  document
    .querySelectorAll(".interactive-btn")
    .forEach((btn) => btn.classList.remove("active"));
}

function randomizeElement() {
  const positions = ["static", "relative", "absolute"];
  const displays = ["block", "inline-block"];

  changePosition(positions[Math.floor(Math.random() * positions.length)]);
  changeDisplay(displays[Math.floor(Math.random() * displays.length)]);

  const randomRotation = Math.floor(Math.random() * 360);
  const randomScale = (Math.random() * 2 + 0.5).toFixed(1);
  const randomOpacity = Math.floor(Math.random() * 100 + 1);

  updateTransform("rotate", randomRotation, "rotation-value");
  updateTransform("scale", randomScale, "scale-value");
  updateTransform("opacity", randomOpacity, "opacity-value");

  document.getElementById("rotation-slider").value = randomRotation;
  document.getElementById("scale-slider").value = randomScale;
  document.getElementById("opacity-slider").value = randomOpacity;
}

function updateActiveButton(event) {
  if (event && event.target) {
    document
      .querySelectorAll(".interactive-btn")
      .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
  }
}

// Drag and Drop Functionality
function setupDragAndDrop() {
  const draggableElements = document.querySelectorAll(
    ".interactive-element, .z-layer, .float-element"
  );

  draggableElements.forEach((element) => {
    element.addEventListener("dragstart", handleDragStart);
    element.addEventListener("dragend", handleDragEnd);
  });

  // Make containers drop zones
  const containers = document.querySelectorAll(
    ".z-index-demo, .float-demo, #interactive-demo"
  );
  containers.forEach((container) => {
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("drop", handleDrop);
  });
}

function handleDragStart(e) {
  draggedElement = e.target;
  const rect = e.target.getBoundingClientRect();
  offset.x = e.clientX - rect.left;
  offset.y = e.clientY - rect.top;
  e.target.style.opacity = "0.7";
}

function handleDragEnd(e) {
  e.target.style.opacity = "1";
  draggedElement = null;
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  if (draggedElement) {
    const containerRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - containerRect.left - offset.x;
    const y = e.clientY - containerRect.top - offset.y;

    draggedElement.style.position = "absolute";
    draggedElement.style.left = x + "px";
    draggedElement.style.top = y + "px";
  }
}

// Initialize drag and drop when page loads
document.addEventListener("DOMContentLoaded", function () {
  setupDragAndDrop();

  // Add interactive hover effects
  document.querySelectorAll(".box-layer").forEach((layer) => {
    layer.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.2s";
    });

    layer.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Add click-to-focus effects for interactive elements
  document.querySelectorAll(".interactive-element").forEach((element) => {
    element.addEventListener("click", function () {
      // Remove focus from other elements
      document.querySelectorAll(".interactive-element").forEach((el) => {
        el.style.boxShadow = "";
      });
      // Add focus to clicked element
      this.style.boxShadow = "0 0 20px rgba(102, 126, 234, 0.6)";
    });
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey) {
      switch (e.key) {
        case "r":
          e.preventDefault();
          resetElement();
          break;
        case "z":
          e.preventDefault();
          randomizeZIndex();
          break;
        case "f":
          e.preventDefault();
          resetFloat();
          break;
      }
    }
  });

  // Add live CSS value display
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        updateLiveDisplay(mutation.target);
      }
    });
  });

  // Observe demo element for style changes
  observer.observe(demoElement, {
    attributes: true,
    attributeFilter: ["style"],
  });
});

function updateLiveDisplay(element) {
  if (element.id === "demo-element") {
    const styles = window.getComputedStyle(element);
    const liveDisplay = document.getElementById("live-display");
    if (liveDisplay) {
      liveDisplay.innerHTML = `
                        <strong>Live CSS Values:</strong><br>
                        Position: ${styles.position}<br>
                        Display: ${styles.display}<br>
                        Z-Index: ${styles.zIndex}<br>
                        Transform: ${
                          styles.transform !== "none"
                            ? styles.transform
                            : "none"
                        }<br>
                        Opacity: ${styles.opacity}
                    `;
    }
  }
}

// Color picker functionality
function changeColor(property, color) {
  if (property === "background") {
    demoElement.style.backgroundColor = color;
  } else if (property === "text") {
    demoElement.style.color = color;
  } else if (property === "border") {
    demoElement.style.borderColor = color;
    demoElement.style.border = `3px solid ${color}`;
  }
}

// Animation presets
function applyAnimation(animationType) {
  demoElement.style.transition = "all 1s ease-in-out";

  switch (animationType) {
    case "bounce":
      demoElement.style.transform = "translateY(-20px)";
      setTimeout(() => {
        demoElement.style.transform = "translateY(0)";
      }, 500);
      break;
    case "spin":
      demoElement.style.transform = "rotate(360deg)";
      setTimeout(() => {
        demoElement.style.transform = "rotate(0deg)";
      }, 1000);
      break;
    case "pulse":
      demoElement.style.transform = "scale(1.2)";
      setTimeout(() => {
        demoElement.style.transform = "scale(1)";
      }, 500);
      break;
    case "fade":
      demoElement.style.opacity = "0.3";
      setTimeout(() => {
        demoElement.style.opacity = "1";
      }, 500);
      break;
  }
}

function changePosition(pos) {
  demoElement.style.position = pos;
  if (pos === "relative") {
    demoElement.style.top = "20px";
    demoElement.style.left = "20px";
  } else if (pos === "absolute") {
    demoElement.style.top = "10px";
    demoElement.style.right = "10px";
  } else {
    demoElement.style.top = "auto";
    demoElement.style.left = "auto";
    demoElement.style.right = "auto";
  }
  demoElement.textContent = `Position: ${pos}`;
}

function changeDisplay(display) {
  demoElement.style.display = display;
  demoElement.textContent = `Display: ${display}`;
}

function resetElement() {
  demoElement.style.position = "static";
  demoElement.style.display = "block";
  demoElement.style.top = "auto";
  demoElement.style.left = "auto";
  demoElement.style.right = "auto";
  demoElement.textContent = "Demo Element";
}

// Add some interactive hover effects
document.querySelectorAll(".box-layer").forEach((layer) => {
  layer.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.transition = "transform 0.2s";
  });

  layer.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

let selectedItem = null;
let soundEnabled = true;
let audioContext = null;
let currentProperties = {
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  alignContent: "stretch",
  gap: "0px",
};

const container = document.getElementById("flexContainer");
const currentValuesDiv = document.getElementById("currentValues");

// Initialize Web Audio API
function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Sound generation functions
function playSound(frequency, duration = 0.2, type = "sine") {
  if (!soundEnabled) return;

  initAudio();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

function playButtonSound() {
  playSound(800, 0.1, "square");
}

function playSelectSound() {
  playSound(1200, 0.15, "sine");
}

function playSliderSound() {
  playSound(600, 0.08, "triangle");
}

function playSuccessSound() {
  playSound(523.25, 0.1, "sine"); // C5
  setTimeout(() => playSound(659.25, 0.1, "sine"), 100); // E5
  setTimeout(() => playSound(783.99, 0.2, "sine"), 200); // G5
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const toggle = document.getElementById("soundToggle");
  toggle.textContent = soundEnabled ? "🔊" : "🔇";
  toggle.classList.toggle("muted", !soundEnabled);

  if (soundEnabled) {
    playSuccessSound();
  }
}

// Particle system
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 15 + "s";
  particle.style.animationDuration = Math.random() * 10 + 10 + "s";

  const colors = [
    "#667eea",
    "#764ba2",
    "#f093fb",
    "#f5576c",
    "#4facfe",
    "#00f2fe",
  ];
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];

  document.getElementById("particles").appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 25000);
}

// Create particles periodically
setInterval(createParticle, 1000);

// Animation utilities
function animateItems() {
  const items = document.querySelectorAll(".flex-item");
  items.forEach((item, index) => {
    item.classList.add("updating");
    setTimeout(() => {
      item.classList.remove("updating");
    }, 500);
  });
}

function updateCurrentValues() {
  currentValuesDiv.innerHTML = `
                flex-direction: ${currentProperties.flexDirection};<br>
                flex-wrap: ${currentProperties.flexWrap};<br>
                flex-flow: ${currentProperties.flexDirection} ${currentProperties.flexWrap};<br>
                justify-content: ${currentProperties.justifyContent};<br>
                align-items: ${currentProperties.alignItems};<br>
                align-content: ${currentProperties.alignContent};<br>
                gap: ${currentProperties.gap};
            `;
}

function setActiveButton(group, value) {
  const buttons = document.querySelectorAll(`button[onclick*="${group}"]`);
  buttons.forEach((btn) => btn.classList.remove("active"));

  const activeButton = Array.from(buttons).find((btn) =>
    btn.onclick.toString().includes(`'${value}'`)
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

function setFlexDirection(value) {
  playButtonSound();
  currentProperties.flexDirection = value;
  container.style.flexDirection = value;
  setActiveButton("setFlexDirection", value);
  updateCurrentValues();
  animateItems();
}

function setFlexWrap(value) {
  playButtonSound();
  currentProperties.flexWrap = value;
  container.style.flexWrap = value;
  setActiveButton("setFlexWrap", value);
  updateCurrentValues();
  animateItems();
}

function setJustifyContent(value) {
  playButtonSound();
  currentProperties.justifyContent = value;
  container.style.justifyContent = value;
  setActiveButton("setJustifyContent", value);
  updateCurrentValues();
  animateItems();
}

function setAlignItems(value) {
  playButtonSound();
  currentProperties.alignItems = value;
  container.style.alignItems = value;
  setActiveButton("setAlignItems", value);
  updateCurrentValues();
  animateItems();
}

function setAlignContent(value) {
  playButtonSound();
  currentProperties.alignContent = value;
  container.style.alignContent = value;
  setActiveButton("setAlignContent", value);
  updateCurrentValues();
  animateItems();
}

function setGap(value) {
  playButtonSound();
  currentProperties.gap = value;
  container.style.gap = value;
  setActiveButton("setGap", value);
  updateCurrentValues();
  animateItems();
}

function selectItem(item) {
  playSelectSound();

  // Remove previous selection
  if (selectedItem) {
    selectedItem.classList.remove("selected");
  }

  // Select new item
  selectedItem = item;
  item.classList.add("selected");

  // Update controls to reflect current item's properties
  const computedStyle = window.getComputedStyle(item);

  // Update flex-grow
  const flexGrow = computedStyle.flexGrow || "0";
  document.getElementById("growRange").value = flexGrow;
  document.getElementById("growValue").textContent = flexGrow;

  // Update flex-shrink
  const flexShrink = computedStyle.flexShrink || "1";
  document.getElementById("shrinkRange").value = flexShrink;
  document.getElementById("shrinkValue").textContent = flexShrink;

  // Update flex-basis
  const flexBasis = computedStyle.flexBasis;
  if (flexBasis === "auto" || flexBasis === "0px") {
    document.getElementById("basisRange").value = "0";
    document.getElementById("basisValue").textContent = "auto";
  } else {
    const basisValue = parseInt(flexBasis);
    document.getElementById("basisRange").value = basisValue;
    document.getElementById("basisValue").textContent = flexBasis;
  }

  // Update align-self buttons
  const alignSelf = computedStyle.alignSelf || "auto";
  document
    .querySelectorAll(".align-self-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const alignSelfBtn = Array.from(
    document.querySelectorAll(".align-self-btn")
  ).find((btn) => btn.onclick.toString().includes(`'${alignSelf}'`));
  if (alignSelfBtn) {
    alignSelfBtn.classList.add("active");
  }

  // Update order buttons
  const order = computedStyle.order || "0";
  document
    .querySelectorAll(".order-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const orderBtn = Array.from(document.querySelectorAll(".order-btn")).find(
    (btn) => btn.onclick.toString().includes(`(${order})`)
  );
  if (orderBtn) {
    orderBtn.classList.add("active");
  }
}

function setFlexGrow(value) {
  if (selectedItem) {
    playSliderSound();
    selectedItem.style.flexGrow = value;
    selectedItem.classList.add("updating");
    document.getElementById("growValue").textContent = value;
    setTimeout(() => {
      selectedItem.classList.remove("updating");
    }, 300);
  }
}

function setFlexShrink(value) {
  if (selectedItem) {
    playSliderSound();
    selectedItem.style.flexShrink = value;
    selectedItem.classList.add("updating");
    document.getElementById("shrinkValue").textContent = value;
    setTimeout(() => {
      selectedItem.classList.remove("updating");
    }, 300);
  }
}

function setFlexBasis(value) {
  if (selectedItem) {
    playSliderSound();
    selectedItem.classList.add("updating");
    if (value === "0") {
      selectedItem.style.flexBasis = "auto";
      document.getElementById("basisValue").textContent = "auto";
    } else {
      selectedItem.style.flexBasis = value + "px";
      document.getElementById("basisValue").textContent = value + "px";
    }
    setTimeout(() => {
      selectedItem.classList.remove("updating");
    }, 300);
  }
}

function setAlignSelf(value) {
  if (selectedItem) {
    playButtonSound();
    selectedItem.style.alignSelf = value;
    selectedItem.classList.add("updating");
    document
      .querySelectorAll(".align-self-btn")
      .forEach((btn) => btn.classList.remove("active"));
    const activeButton = Array.from(
      document.querySelectorAll(".align-self-btn")
    ).find((btn) => btn.onclick.toString().includes(`'${value}'`));
    if (activeButton) {
      activeButton.classList.add("active");
    }
    setTimeout(() => {
      selectedItem.classList.remove("updating");
    }, 300);
  }
}

function setOrder(value) {
  if (selectedItem) {
    playButtonSound();
    selectedItem.style.order = value;
    selectedItem.classList.add("updating");
    document
      .querySelectorAll(".order-btn")
      .forEach((btn) => btn.classList.remove("active"));
    const activeButton = Array.from(
      document.querySelectorAll(".order-btn")
    ).find((btn) => btn.onclick.toString().includes(`(${value})`));
    if (activeButton) {
      activeButton.classList.add("active");
    }
    setTimeout(() => {
      selectedItem.classList.remove("updating");
    }, 500);
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (selectedItem) {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        const growSlider = document.getElementById("growRange");
        growSlider.value = Math.min(5, parseInt(growSlider.value) + 1);
        setFlexGrow(growSlider.value);
        break;
      case "ArrowDown":
        e.preventDefault();
        const growSlider2 = document.getElementById("growRange");
        growSlider2.value = Math.max(0, parseInt(growSlider2.value) - 1);
        setFlexGrow(growSlider2.value);
        break;
      case "ArrowLeft":
        e.preventDefault();
        const currentOrder = parseInt(selectedItem.style.order || 0);
        setOrder(Math.max(-2, currentOrder - 1));
        break;
      case "ArrowRight":
        e.preventDefault();
        const currentOrder2 = parseInt(selectedItem.style.order || 0);
        setOrder(Math.min(3, currentOrder2 + 1));
        break;
    }
  }
});

// Initialize particles on load
window.addEventListener("load", function () {
  // Create initial particles
  for (let i = 0; i < 10; i++) {
    setTimeout(createParticle, i * 200);
  }
  playSuccessSound();
});

// Initialize
updateCurrentValues();

// Auto-select first item for demonstration
setTimeout(() => {
  selectItem(document.querySelector(".flex-item"));
}, 1000);

// Add hover sound effects to all buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    if (soundEnabled) {
      playSound(400, 0.05, "sine");
    }
  });
});

// Add click animations to all buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 100);
  });
});

// Range slider sound effects
document.querySelectorAll('input[type="range"]').forEach((slider) => {
  slider.addEventListener("input", () => {
    if (soundEnabled) {
      playSliderSound();
    }
  });
});

const gridDemo = document.getElementById("gridDemo");
const codeDisplay = document.getElementById("codeDisplay");
let showLines = false;

// Current grid properties
let currentProps = {
  columns: "repeat(3, 1fr)",
  rows: "repeat(3, 100px)",
  gap: "10px",
  justifyContent: "stretch",
  alignContent: "stretch",
};

function updateCodeDisplay() {
  let code = `<span class="highlight">display:</span> grid;<br>`;
  code += `<span class="highlight">grid-template-columns:</span> ${currentProps.columns};<br>`;
  code += `<span class="highlight">grid-template-rows:</span> ${currentProps.rows};<br>`;
  code += `<span class="highlight">gap:</span> ${currentProps.gap};`;

  if (currentProps.justifyContent !== "stretch") {
    code += `<br><span class="highlight">justify-content:</span> ${currentProps.justifyContent};`;
  }
  if (currentProps.alignContent !== "stretch") {
    code += `<br><span class="highlight">align-content:</span> ${currentProps.alignContent};`;
  }

  codeDisplay.innerHTML = code;
}

function applyGridStyles() {
  gridDemo.style.gridTemplateColumns = currentProps.columns;
  gridDemo.style.gridTemplateRows = currentProps.rows;
  gridDemo.style.gap = currentProps.gap;
  gridDemo.style.justifyContent = currentProps.justifyContent;
  gridDemo.style.alignContent = currentProps.alignContent;
  updateCodeDisplay();
}

function setActiveButton(group, activeBtn) {
  const buttons = group.querySelectorAll(".btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

function setGridColumns(value) {
  currentProps.columns = value;
  applyGridStyles();
  setActiveButton(event.target.parentElement, event.target);
}

function setGridRows(value) {
  currentProps.rows = value;
  applyGridStyles();
  setActiveButton(event.target.parentElement, event.target);
}

function setGap(value) {
  currentProps.gap = value;
  applyGridStyles();
  setActiveButton(event.target.parentElement, event.target);
}

function setJustifyContent(value) {
  currentProps.justifyContent = value;
  applyGridStyles();
  setActiveButton(event.target.parentElement, event.target);
}

function setAlignContent(value) {
  currentProps.alignContent = value;
  applyGridStyles();
  setActiveButton(event.target.parentElement, event.target);
}

function resetGrid() {
  currentProps = {
    columns: "repeat(3, 1fr)",
    rows: "repeat(3, 100px)",
    gap: "10px",
    justifyContent: "stretch",
    alignContent: "stretch",
  };
  applyGridStyles();

  // Reset all active buttons
  document
    .querySelectorAll(".btn.active")
    .forEach((btn) => btn.classList.remove("active"));
  document.querySelectorAll(".control-group").forEach((group, index) => {
    if (index < 3) {
      // First 3 groups have default active buttons
      group.querySelector(".btn").classList.add("active");
    }
  });
}

function showGridLines() {
  showLines = !showLines;
  const existingLines = gridDemo.querySelector(".grid-lines");

  if (existingLines) {
    existingLines.remove();
  }

  if (showLines) {
    const linesContainer = document.createElement("div");
    linesContainer.className = "grid-lines";

    // Add vertical lines
    for (let i = 1; i < 4; i++) {
      const line = document.createElement("div");
      line.className = "grid-line-vertical";
      line.style.left = `${i * 33.33 - 1}%`;
      linesContainer.appendChild(line);
    }

    // Add horizontal lines
    for (let i = 1; i < 4; i++) {
      const line = document.createElement("div");
      line.className = "grid-line-horizontal";
      line.style.top = `${20 + i * 120}px`;
      linesContainer.appendChild(line);
    }

    gridDemo.appendChild(linesContainer);
  }
}

function createComplexLayout() {
  currentProps = {
    columns: "200px 1fr 100px 1fr",
    rows: "100px 200px auto",
    gap: "15px",
    justifyContent: "center",
    alignContent: "start",
  };
  applyGridStyles();

  // Update grid items for complex layout
  const items = gridDemo.querySelectorAll(".grid-item");
  items[0].style.gridColumn = "1 / 3";
  items[0].textContent = "Header (span 2 cols)";
  items[1].style.gridRow = "2 / 4";
  items[1].textContent = "Sidebar (span 2 rows)";
  items[2].textContent = "Content";
  items[3].style.gridColumn = "3 / 5";
  items[3].textContent = "Top Banner (span 2 cols)";

  setTimeout(() => {
    items.forEach((item, index) => {
      if (index === 0) {
        item.style.gridColumn = "";
        item.textContent = "Item 1";
      }
      if (index === 1) {
        item.style.gridRow = "";
        item.textContent = "Item 2";
      }
      if (index === 3) {
        item.style.gridColumn = "";
        item.textContent = "Item 4";
      }
    });
  }, 5000);
}

// Add hover effects to grid items
const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((item, index) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05) rotate(2deg)";
    this.style.zIndex = "10";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "";
    this.style.zIndex = "";
  });
});

// Initialize
updateCodeDisplay();
