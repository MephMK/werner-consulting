const siteFields = [
  ["heroHeadline", "Hero Headline"],
  ["heroSubheadline", "Hero Subheadline"],
  ["aboutTeaser", "About Teaser"],
  ["legalIntro", "Legal Intro"],
  ["consultingIntro", "Consulting Intro"],
  ["ctaText", "CTA Text"]
];

const state = {
  siteContent: {},
  testimonials: []
};

function setStatus(message, isError = false) {
  const status = document.getElementById("admin-status");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("status-box--error", isError);
}

function createTextField(form, key, label, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "admin-field";

  const fieldLabel = document.createElement("label");
  fieldLabel.setAttribute("for", key);
  fieldLabel.textContent = label;

  const textarea = document.createElement("textarea");
  textarea.id = key;
  textarea.name = key;
  textarea.rows = 4;
  textarea.value = value || "";
  textarea.addEventListener("input", () => {
    state.siteContent[key] = textarea.value;
  });

  wrapper.append(fieldLabel, textarea);
  form.appendChild(wrapper);
}

function renderSiteContentForm() {
  const form = document.getElementById("site-content-form");
  if (!form) return;
  form.innerHTML = "";
  siteFields.forEach(([key, label]) => createTextField(form, key, label, state.siteContent[key]));
}

function renderTestimonialsForm() {
  const form = document.getElementById("testimonials-form");
  if (!form) return;
  form.innerHTML = "";

  state.testimonials.forEach((item, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "admin-fieldset";

    const legend = document.createElement("legend");
    legend.textContent = `Testimonial ${index + 1}`;
    fieldset.appendChild(legend);

    [["quote", "Quote"], ["name", "Name"], ["role", "Role"]].forEach(([key, label]) => {
      const wrapper = document.createElement("div");
      wrapper.className = "admin-field";

      const fieldLabel = document.createElement("label");
      fieldLabel.setAttribute("for", `${key}-${index}`);
      fieldLabel.textContent = label;

      const textarea = document.createElement("textarea");
      textarea.id = `${key}-${index}`;
      textarea.rows = key === "quote" ? 5 : 2;
      textarea.value = item[key] || "";
      textarea.addEventListener("input", () => {
        state.testimonials[index][key] = textarea.value;
      });

      wrapper.append(fieldLabel, textarea);
      fieldset.appendChild(wrapper);
    });

    form.appendChild(fieldset);
  });
}

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load ${url}`);
  }
  return response.json();
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function bindExportButtons() {
  document.getElementById("export-site-content")?.addEventListener("click", () => {
    downloadJson("site-content.json", state.siteContent);
    setStatus("Exported site-content.json");
  });

  document.getElementById("export-testimonials")?.addEventListener("click", () => {
    downloadJson("testimonials.json", state.testimonials);
    setStatus("Exported testimonials.json");
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  bindExportButtons();

  try {
    const [siteContent, testimonials] = await Promise.all([
      loadJson("assets/data/site-content.json"),
      loadJson("assets/data/testimonials.json")
    ]);
    state.siteContent = siteContent;
    state.testimonials = testimonials;
    renderSiteContentForm();
    renderTestimonialsForm();
    setStatus("Content loaded. Edit fields and export JSON when ready.");
  } catch (error) {
    console.error(error);
    setStatus("JSON could not be loaded. Open this page through GitHub Pages or another static HTTP environment.", true);
  }
});
