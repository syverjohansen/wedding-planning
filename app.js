const STORAGE_KEY = "wedding-planner-state-v4";
const LEGACY_KEYS = ["wedding-planner-state-v3", "wedding-planner-state-v2", "wedding-planner-state-v1"];
const FIREBASE_VERSION = "11.7.3";

const EVENT_ORDER = ["Civil Ceremony", "Welcome Reception", "Gusaba", "Wedding"];
const CHECKLIST_EVENT_ORDER = [...EVENT_ORDER, "Admin"];
const PAGE_ORDER = ["checklist", "communications", "operations", "supply", "logistics"];

const CHECKLIST_TEMPLATE = {
  "Civil Ceremony": ["Form", "Groom attire", "Bride attire"],
  "Welcome Reception": ["Venue", "Food", "Drinks", "Transportation", "Groom Attire", "Bride attire", "Photographer", "Order of events"],
  Gusaba: ["Venue", "Decor", "MC", "Dancers", "Cow poets", "Food", "Drinks", "Sound/Lighting", "Service team", "Hair/makeup", "Mishanana", "Gifts", "Transportation", "Order of events"],
  Wedding: ["Venue", "Decor", "MC", "Food", "Drinks", "Service team", "Cake", "DJ", "Violin", "Sound/Lighting", "Transportation", "Printing", "Bouquet/Flowers", "Groom attire", "Bride attire", "Misc supplies"],
  Admin: [],
};

const CHECKLIST_STATUS_OPTIONS = ["None", "Inquired", "Partial", "Full"];

const SEED_PROCUREMENTS = [
  { id: "proc-civil-filing", event: "Civil Ceremony", item: "Marriage filing and ceremony paperwork", category: "Admin", vendor: "DC Courts", totalPrice: 45, amountPaid: 0, currency: "USD", status: "not-started", notes: "Weekly update references the filing process and required IDs.", attachments: [] },
  { id: "proc-welcome-venue", event: "Welcome Reception", item: "Venue", category: "Venue", vendor: "Atelier Du Vin", totalPrice: 3571000, amountPaid: 1000000, currency: "RWF", status: "in-progress", notes: "Welcome notes mention confirmed venue, 1M RWF deposit, and consumption minimum.", attachments: [] },
  { id: "proc-welcome-food", event: "Welcome Reception", item: "Food", category: "Food", vendor: "TBD", totalPrice: 800000, amountPaid: 0, currency: "RWF", status: "not-started", notes: "Spreadsheet has light food budgeted.", attachments: [] },
  { id: "proc-welcome-drinks", event: "Welcome Reception", item: "Drinks", category: "Drinks", vendor: "TBD", totalPrice: 800000, amountPaid: 0, currency: "RWF", status: "not-started", notes: "Spreadsheet has drinks budgeted separately.", attachments: [] },
  { id: "proc-gusaba-venue", event: "Gusaba", item: "Venue", category: "Venue", vendor: "Jade Green", totalPrice: 2800000, amountPaid: 2800000, currency: "RWF", status: "paid", notes: "Marked acquired in spreadsheet.", attachments: [] },
  { id: "proc-gusaba-decor", event: "Gusaba", item: "Decor", category: "Decor", vendor: "TBD", totalPrice: 2800000, amountPaid: 0, currency: "RWF", status: "in-progress", notes: "Centerpiece design still active.", attachments: [] },
  { id: "proc-gusaba-dancers", event: "Gusaba", item: "Dance troupe", category: "Entertainment", vendor: "Imyamibwa", totalPrice: 1500000, amountPaid: 750000, currency: "RWF", status: "in-progress", notes: "Weekly update notes a 750k deposit paid and 750k still owed.", attachments: [] },
  { id: "proc-gusaba-rugaba", event: "Gusaba", item: "Cow poets", category: "Entertainment", vendor: "Rugaba", totalPrice: 150000, amountPaid: 75000, currency: "RWF", status: "in-progress", notes: "Weekly update notes half paid.", attachments: [] },
  { id: "proc-wedding-venue", event: "Wedding", item: "Venue and decor", category: "Venue", vendor: "Jalia", totalPrice: 9500000, amountPaid: 9500000, currency: "RWF", status: "paid", notes: "Spreadsheet says venue includes decor.", attachments: [] },
  { id: "proc-wedding-dinner", event: "Wedding", item: "Dinner", category: "Food", vendor: "TBD", totalPrice: 6000000, amountPaid: 0, currency: "RWF", status: "in-progress", notes: "Still in progress in spreadsheet.", attachments: [] },
  { id: "proc-wedding-photographer", event: "Wedding", item: "Photographer", category: "Photo", vendor: "TBD", totalPrice: 2800000, amountPaid: 2800000, currency: "RWF", status: "paid", notes: "Covers all three days per spreadsheet.", attachments: [] },
  { id: "proc-wedding-dj", event: "Wedding", item: "DJ", category: "Music", vendor: "TBD", totalPrice: 980000, amountPaid: 0, currency: "RWF", status: "not-started", notes: "Still open in spreadsheet.", attachments: [] },
];

const SEED_SCHEDULE = [
  { id: "sched-civil-1", event: "Civil Ceremony", time: "Morning", title: "Marriage bureau paperwork checkpoint", location: "Washington, DC", owner: "Both", notes: "Confirm IDs and all required documents before the appointment." },
  { id: "sched-welcome-1", event: "Welcome Reception", time: "Afternoon", title: "Venue setup and menu confirmation", location: "Atelier Du Vin", owner: "Both", notes: "Confirm final food and drink order one day before." },
  { id: "sched-welcome-2", event: "Welcome Reception", time: "Evening", title: "Guest welcome reception", location: "Atelier Du Vin", owner: "Both", notes: "Coordinate arrival flow from hotels if buses are used." },
  { id: "sched-gusaba-1", event: "Gusaba", time: "Morning", title: "Decor and AV setup", location: "Jade Green", owner: "Planner", notes: "Needs vendor confirmation and load-in timing." },
  { id: "sched-gusaba-2", event: "Gusaba", time: "Midday", title: "Guest transportation arrivals", location: "Jade Green", owner: "Syver", notes: "Coordinate buses and arrival windows." },
  { id: "sched-wedding-1", event: "Wedding", time: "Morning", title: "Venue and reception setup", location: "Jalia", owner: "Planner", notes: "Cover dinner setup, AV, dance floor, and vendor check-ins." },
  { id: "sched-wedding-2", event: "Wedding", time: "Evening", title: "Reception", location: "Jalia", owner: "Both", notes: "Includes dinner, music, and guest transport back to hotels." },
];

const SEED_COMMUNICATIONS = [
  { id: "comm-1", date: "", title: "Travel brief for guests", audience: "All guests", channel: "Email", status: "drafting", notes: "Should include arrival guidance, hotel info, and transport expectations." },
];

const SEED_OPERATIONS = [
  { id: "op-1", title: "Close remaining vendor decisions", dueDate: "", owner: "Both", status: "in-progress", notes: "Use this list for planning work that is not itself a procurement or a guest communication." },
];

const REFERENCE_NOTES = [
  "The spreadsheet gives strong starting procurement lines for welcome reception, gusaba, and wedding day.",
  "The weekly update deck has the best detail for deposits, attire, entertainment, and unresolved vendor items.",
  "The CONOP draft is still useful for day-of logistics, contingencies, and ownership.",
  "The guest list size makes transportation and venue flow worth keeping inside the day-by-day schedule.",
];

function cloneSeed(items) {
  return items.map((item) => ({ ...item, attachments: Array.isArray(item.attachments) ? [...item.attachments] : undefined }));
}

function checklistKey(eventName, itemName) {
  return `${eventName}::${itemName}`;
}

function defaultChecklistItems() {
  return Object.fromEntries(CHECKLIST_EVENT_ORDER.map((eventName) => [eventName, [...(CHECKLIST_TEMPLATE[eventName] || [])]]));
}

function defaultChecklistStatuses() {
  const statuses = {};
  Object.entries(defaultChecklistItems()).forEach(([eventName, items]) => {
    items.forEach((itemName) => {
      statuses[checklistKey(eventName, itemName)] = "None";
    });
  });
  return statuses;
}

function normalizeChecklistItems(source) {
  const items = defaultChecklistItems();
  if (!source || typeof source !== "object") return items;
  CHECKLIST_EVENT_ORDER.forEach((eventName) => {
    const extras = Array.isArray(source[eventName]) ? source[eventName].map((item) => String(item || "").trim()).filter(Boolean) : [];
    const defaults = CHECKLIST_TEMPLATE[eventName] || [];
    const merged = [...defaults];
    extras.forEach((item) => {
      if (!merged.includes(item)) merged.push(item);
    });
    items[eventName] = merged;
  });
  return items;
}

function normalizeChecklistStatuses(source, itemsByEvent) {
  const statuses = {};
  CHECKLIST_EVENT_ORDER.forEach((eventName) => {
    itemsByEvent[eventName].forEach((itemName) => {
      const value = source && CHECKLIST_STATUS_OPTIONS.includes(source[checklistKey(eventName, itemName)])
        ? source[checklistKey(eventName, itemName)]
        : "None";
      statuses[checklistKey(eventName, itemName)] = value;
    });
  });
  return statuses;
}

function normalizeAttachments(items) {
  return Array.isArray(items)
    ? items.map((attachment) => ({
        name: String(attachment.name || "Attachment"),
        url: String(attachment.url || ""),
        path: String(attachment.path || ""),
        size: Number(attachment.size || 0),
        contentType: String(attachment.contentType || ""),
        uploadedAt: String(attachment.uploadedAt || ""),
      })).filter((attachment) => attachment.url)
    : [];
}

function normalizeProcurements(items) {
  return (Array.isArray(items) ? items : []).map((item) => ({
    id: String(item.id || `proc-${Date.now()}-${Math.random()}`),
    event: EVENT_ORDER.includes(item.event) ? item.event : EVENT_ORDER[0],
    item: String(item.item || "").trim(),
    category: String(item.category || "").trim(),
    vendor: String(item.vendor || "").trim(),
    totalPrice: Number(item.totalPrice || 0),
    amountPaid: Math.min(Number(item.amountPaid || 0), Number(item.totalPrice || 0)),
    currency: item.currency === "USD" ? "USD" : "RWF",
    status: String(item.status || "not-started"),
    notes: String(item.notes || "").trim(),
    attachments: normalizeAttachments(item.attachments),
  })).filter((item) => item.item);
}

function normalizeSchedules(items) {
  return (Array.isArray(items) ? items : []).map((item) => ({
    id: String(item.id || `sched-${Date.now()}-${Math.random()}`),
    event: EVENT_ORDER.includes(item.event) ? item.event : EVENT_ORDER[0],
    time: String(item.time || "").trim(),
    title: String(item.title || "").trim(),
    location: String(item.location || "").trim(),
    owner: String(item.owner || "").trim(),
    notes: String(item.notes || "").trim(),
  })).filter((item) => item.time && item.title);
}

function normalizeCommunications(items) {
  return (Array.isArray(items) ? items : []).map((item) => ({
    id: String(item.id || `comm-${Date.now()}-${Math.random()}`),
    date: String(item.date || ""),
    title: String(item.title || "").trim(),
    audience: String(item.audience || "").trim(),
    channel: String(item.channel || "").trim(),
    status: String(item.status || "drafting"),
    notes: String(item.notes || "").trim(),
  })).filter((item) => item.title);
}

function normalizeOperations(items) {
  return (Array.isArray(items) ? items : []).map((item) => ({
    id: String(item.id || `op-${Date.now()}-${Math.random()}`),
    title: String(item.title || "").trim(),
    dueDate: String(item.dueDate || ""),
    owner: String(item.owner || "").trim(),
    status: String(item.status || "not-started"),
    notes: String(item.notes || "").trim(),
  })).filter((item) => item.title);
}

function migrateState(parsed) {
  const checklistItems = normalizeChecklistItems(parsed.checklistItems);
  return {
    checklistItems,
    checklist: normalizeChecklistStatuses(parsed.checklist || {}, checklistItems),
    procurements: normalizeProcurements(parsed.procurements).length ? normalizeProcurements(parsed.procurements) : cloneSeed(SEED_PROCUREMENTS),
    schedules: normalizeSchedules(parsed.schedules).length ? normalizeSchedules(parsed.schedules) : cloneSeed(SEED_SCHEDULE),
    communications: normalizeCommunications(parsed.communications).length ? normalizeCommunications(parsed.communications) : cloneSeed(SEED_COMMUNICATIONS),
    operations: normalizeOperations(parsed.operations).length ? normalizeOperations(parsed.operations) : cloneSeed(SEED_OPERATIONS),
    sharedNotes: typeof parsed.sharedNotes === "string" ? parsed.sharedNotes : "",
  };
}

function defaultState() {
  const checklistItems = defaultChecklistItems();
  return {
    checklistItems,
    checklist: normalizeChecklistStatuses({}, checklistItems),
    procurements: cloneSeed(SEED_PROCUREMENTS),
    schedules: cloneSeed(SEED_SCHEDULE),
    communications: cloneSeed(SEED_COMMUNICATIONS),
    operations: cloneSeed(SEED_OPERATIONS),
    sharedNotes: "",
  };
}

function loadLocalState() {
  const keys = [STORAGE_KEY, ...LEGACY_KEYS];
  for (const key of keys) {
    const raw = window.localStorage.getItem(key);
    if (!raw) continue;
    try {
      return migrateState(JSON.parse(raw));
    } catch (error) {
      console.warn(`Could not read local state from ${key}`, error);
    }
  }
  return defaultState();
}

const state = loadLocalState();
state.activePage = "checklist";
let remoteStore = null;
let suppressRemoteSave = false;
let attachmentService = null;
const uploadState = {};

function persistLocalState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

async function persistEverywhere() {
  persistLocalState();
  if (remoteStore && !suppressRemoteSave) {
    await remoteStore.save(state);
  }
}

function setSyncStatus(message, className = "") {
  const status = document.querySelector("#sync-status");
  status.textContent = message;
  status.classList.remove("is-live", "is-error");
  if (className) status.classList.add(className);
}

async function createRemoteStore() {
  const config = window.WEDDING_FIREBASE_CONFIG || {};
  const hasConfig = config.apiKey && config.projectId && config.appId;
  if (!hasConfig) {
    setSyncStatus("Local-only mode. Add Firebase config in firebase-config.js to turn on live shared sync.");
    return null;
  }

  try {
    const appModule = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`);
    const firestoreModule = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`);
    const storageModule = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-storage.js`);
    const { initializeApp } = appModule;
    const { doc, getDoc, getFirestore, onSnapshot, serverTimestamp, setDoc } = firestoreModule;
    const { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } = storageModule;

    const app = initializeApp(config);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const path = (window.WEDDING_SYNC_OPTIONS && window.WEDDING_SYNC_OPTIONS.documentPath) || "wedding-planning/main";
    const [collectionName, documentName] = path.split("/");
    const documentRef = doc(db, collectionName, documentName || "main");

    attachmentService = {
      async upload(procurementId, file) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const storagePath = `procurements/${procurementId}/${Date.now()}-${safeName}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, file, { contentType: file.type || "application/octet-stream" });
        const url = await getDownloadURL(storageRef);
        return {
          name: file.name,
          url,
          path: storagePath,
          size: file.size,
          contentType: file.type || "application/octet-stream",
          uploadedAt: new Date().toISOString(),
        };
      },
      async remove(storagePath) {
        await deleteObject(ref(storage, storagePath));
      },
    };

    return {
      async hydrateLocalState(localState) {
        const snapshot = await getDoc(documentRef);
        if (snapshot.exists()) {
          const remote = snapshot.data();
          return remote && remote.payload ? migrateState(remote.payload) : localState;
        }
        await setDoc(documentRef, { payload: localState, updatedAt: serverTimestamp() });
        return localState;
      },
      subscribe(onRemoteChange) {
        return onSnapshot(
          documentRef,
          (snapshot) => {
            if (!snapshot.exists()) return;
            const remote = snapshot.data();
            if (!remote || !remote.payload) return;
            onRemoteChange(migrateState(remote.payload));
          },
          (error) => {
            console.warn("Realtime sync listener failed", error);
            setSyncStatus("Firebase is configured, but the live listener failed. Check Firestore rules and config.", "is-error");
          }
        );
      },
      async save(nextState) {
        await setDoc(documentRef, { payload: nextState, updatedAt: serverTimestamp() });
      },
    };
  } catch (error) {
    console.warn("Could not initialize Firebase sync", error);
    setSyncStatus("Firebase setup failed. The site is still usable locally, but live sync is not active.", "is-error");
    return null;
  }
}

function applyIncomingState(nextState) {
  state.checklistItems = normalizeChecklistItems(nextState.checklistItems);
  state.checklist = normalizeChecklistStatuses(nextState.checklist, state.checklistItems);
  state.procurements = normalizeProcurements(nextState.procurements).length ? normalizeProcurements(nextState.procurements) : cloneSeed(SEED_PROCUREMENTS);
  state.schedules = normalizeSchedules(nextState.schedules).length ? normalizeSchedules(nextState.schedules) : cloneSeed(SEED_SCHEDULE);
  state.communications = normalizeCommunications(nextState.communications).length ? normalizeCommunications(nextState.communications) : cloneSeed(SEED_COMMUNICATIONS);
  state.operations = normalizeOperations(nextState.operations).length ? normalizeOperations(nextState.operations) : cloneSeed(SEED_OPERATIONS);
  state.sharedNotes = typeof nextState.sharedNotes === "string" ? nextState.sharedNotes : "";
  persistLocalState();
  syncPageTabs();
  document.querySelector("#shared-notes").value = state.sharedNotes;
  resetChecklistAddInputs();
  resetProcurementForm();
  resetScheduleForm();
  resetCommunicationsForm();
  resetOperationsForm();
  renderAll();
}

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (typeof text === "string") el.textContent = text;
  return el;
}

function formatMoney(amount, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "RWF" ? 0 : 2,
  }).format(amount || 0);
}

function remainingAmount(item) {
  return Math.max(Number(item.totalPrice || 0) - Number(item.amountPaid || 0), 0);
}

function getProcurementTotals() {
  return state.procurements.reduce(
    (totals, item) => {
      const total = Number(item.totalPrice || 0);
      const paid = Number(item.amountPaid || 0);
      const remaining = remainingAmount(item);
      if (item.currency === "RWF") {
        totals.totalRwf += total;
        totals.paidRwf += paid;
        totals.remainingRwf += remaining;
      } else {
        totals.totalUsd += total;
        totals.paidUsd += paid;
        totals.remainingUsd += remaining;
      }
      return totals;
    },
    { totalRwf: 0, paidRwf: 0, remainingRwf: 0, totalUsd: 0, paidUsd: 0, remainingUsd: 0 }
  );
}

function summarizeEventTotals(items) {
  const totals = items.reduce((acc, item) => {
    if (item.currency === "USD") acc.usd += Number(item.totalPrice || 0);
    else acc.rwf += Number(item.totalPrice || 0);
    return acc;
  }, { rwf: 0, usd: 0 });

  const parts = [];
  if (totals.rwf) parts.push(formatMoney(totals.rwf, "RWF"));
  if (totals.usd) parts.push(formatMoney(totals.usd, "USD"));
  return parts.join(" + ") || "No budget yet";
}

function formatFileSize(size) {
  if (!size) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function renderOverview() {
  const container = document.querySelector("#overview-cards");
  container.innerHTML = "";
  const totals = getProcurementTotals();
  const cards = [
    { label: "Guests in list", value: "127", caption: "Imported from the current guest CSV in ~/admin/wedding." },
    { label: "Budget tracked", value: formatMoney(totals.totalRwf, "RWF"), caption: "Total RWF procurement value currently entered." },
    { label: "Still to pay", value: formatMoney(totals.remainingRwf, "RWF"), caption: "Outstanding RWF balance across all procurement lines." },
    { label: "USD tracked", value: formatMoney(totals.totalUsd, "USD"), caption: "Separate USD spending captured without mixing currencies." },
  ];

  cards.forEach((card) => {
    const article = createEl("article", "overview-card");
    article.appendChild(createEl("div", "section-kicker", card.label));
    article.appendChild(createEl("span", "overview-value", card.value));
    article.appendChild(createEl("p", "overview-caption", card.caption));
    container.appendChild(article);
  });
}

function populateEventSelects() {
  ["proc-event", "schedule-event"].forEach((id) => {
    const select = document.querySelector(`#${id}`);
    select.innerHTML = "";
    EVENT_ORDER.forEach((eventName) => select.add(new Option(eventName, eventName)));
  });
}

function createTag(className, text) {
  return createEl("span", `tag ${className}`, text);
}

function humanizeStatus(status) {
  const labels = {
    "not-started": "Not acquired",
    "in-progress": "In progress",
    booked: "Booked",
    paid: "Paid in full",
    drafting: "Drafting",
    ready: "Ready",
    sent: "Sent",
    blocked: "Blocked",
    done: "Done",
  };
  return labels[status] || status;
}

function renderNoteBlock(text) {
  const wrapper = createEl("div", "record-note");
  if (text.length <= 220) {
    wrapper.textContent = text;
    return wrapper;
  }
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = `${text.slice(0, 180)}...`;
  details.appendChild(summary);
  details.appendChild(createEl("div", "", text));
  wrapper.appendChild(details);
  return wrapper;
}

function resetChecklistAddInputs() {
  CHECKLIST_EVENT_ORDER.forEach((eventName) => {
    const input = document.querySelector(`[data-checklist-input="${eventName}"]`);
    if (input) input.value = "";
  });
}

async function setChecklistStatus(eventName, itemName, value) {
  state.checklist[checklistKey(eventName, itemName)] = value;
  await persistEverywhere();
  renderChecklist();
}

async function addChecklistItem(eventName) {
  const input = document.querySelector(`[data-checklist-input="${eventName}"]`);
  if (!input) return;
  const value = input.value.trim();
  if (!value) return;
  if (!state.checklistItems[eventName].includes(value)) {
    state.checklistItems[eventName].push(value);
    state.checklist[checklistKey(eventName, value)] = "None";
    await persistEverywhere();
    renderChecklist();
  }
  input.value = "";
}

async function deleteChecklistItem(eventName, itemName) {
  if ((CHECKLIST_TEMPLATE[eventName] || []).includes(itemName)) return;
  state.checklistItems[eventName] = state.checklistItems[eventName].filter((entry) => entry !== itemName);
  delete state.checklist[checklistKey(eventName, itemName)];
  await persistEverywhere();
  renderChecklist();
}

function renderChecklist() {
  const container = document.querySelector("#checklist-groups");
  container.innerHTML = "";

  CHECKLIST_EVENT_ORDER.forEach((eventName) => {
    const card = createEl("section", "checklist-card");
    const header = createEl("div", "event-group-header");
    const titleWrap = createEl("div");
    titleWrap.appendChild(createEl("div", "section-kicker", eventName));
    titleWrap.appendChild(createEl("h3", "", eventName));
    header.appendChild(titleWrap);

    const items = state.checklistItems[eventName] || [];
    const fullCount = items.filter((itemName) => state.checklist[checklistKey(eventName, itemName)] === "Full").length;
    header.appendChild(createEl("div", "group-meta", `${fullCount}/${items.length} full`));
    card.appendChild(header);

    const grid = createEl("div", "checklist-grid");
    if (!items.length) {
      grid.appendChild(createEl("div", "empty-state", "No checklist items here yet. Add one below."));
    }

    items.forEach((itemName) => {
      const row = createEl("div", "checklist-row");
      const itemWrap = createEl("div");
      itemWrap.appendChild(createEl("div", "checklist-item", itemName));
      if (!(CHECKLIST_TEMPLATE[eventName] || []).includes(itemName)) {
        const removeButton = createEl("button", "ghost-button", "Remove");
        removeButton.type = "button";
        removeButton.addEventListener("click", () => deleteChecklistItem(eventName, itemName));
        itemWrap.appendChild(removeButton);
      }
      row.appendChild(itemWrap);

      const select = createEl("select", "checklist-select");
      CHECKLIST_STATUS_OPTIONS.forEach((optionValue) => {
        const option = new Option(optionValue, optionValue);
        if (state.checklist[checklistKey(eventName, itemName)] === optionValue) option.selected = true;
        select.add(option);
      });
      select.addEventListener("change", (event) => setChecklistStatus(eventName, itemName, event.target.value));
      row.appendChild(select);
      grid.appendChild(row);
    });

    const addRow = createEl("div", "checklist-add-row");
    const addInput = document.createElement("input");
    addInput.type = "text";
    addInput.placeholder = `Add a checklist item to ${eventName}`;
    addInput.setAttribute("data-checklist-input", eventName);
    addInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addChecklistItem(eventName);
      }
    });
    addRow.appendChild(addInput);
    const addButton = createEl("button", "button button-primary", "Add item");
    addButton.type = "button";
    addButton.addEventListener("click", () => addChecklistItem(eventName));
    addRow.appendChild(addButton);
    grid.appendChild(addRow);

    card.appendChild(grid);
    container.appendChild(card);
  });
}

function renderProcurements() {
  const container = document.querySelector("#procurement-groups");
  container.innerHTML = "";

  EVENT_ORDER.forEach((eventName) => {
    const items = state.procurements.filter((item) => item.event === eventName);
    const group = createEl("section", "event-group");
    const header = createEl("div", "event-group-header");
    const titleWrap = createEl("div");
    titleWrap.appendChild(createEl("div", "section-kicker", eventName));
    titleWrap.appendChild(createEl("h3", "", eventName));
    header.appendChild(titleWrap);
    header.appendChild(createEl("div", "group-meta", `${items.length} items · ${summarizeEventTotals(items)}`));
    group.appendChild(header);

    if (!items.length) {
      group.appendChild(createEl("div", "empty-state", "No procurements added for this day yet."));
      container.appendChild(group);
      return;
    }

    const list = createEl("div", "card-list");
    items.forEach((item) => {
      const card = createEl("article", "record-card");
      const main = createEl("div");
      const titleRow = createEl("div", "record-title-row");
      titleRow.appendChild(createEl("div", "record-title", item.item));
      titleRow.appendChild(createEl("div", "record-money", formatMoney(Number(item.totalPrice || 0), item.currency)));
      main.appendChild(titleRow);

      const subtitle = [];
      if (item.vendor) subtitle.push(item.vendor);
      if (item.category) subtitle.push(item.category);
      if (subtitle.length) main.appendChild(createEl("p", "record-subtitle", subtitle.join(" · ")));

      const tags = createEl("div", "record-tags");
      tags.appendChild(createTag("status-tag", humanizeStatus(item.status)));
      tags.appendChild(createTag("money-tag", `Paid ${formatMoney(Number(item.amountPaid || 0), item.currency)}`));
      tags.appendChild(createTag("money-tag", `Left ${formatMoney(remainingAmount(item), item.currency)}`));
      main.appendChild(tags);

      if (item.notes) main.appendChild(renderNoteBlock(item.notes));

      const attachmentsWrap = createEl("div", "attachments-wrap");
      const uploadRow = createEl("div", "upload-row");
      const uploadLabel = createEl("label", "button button-secondary file-button", "Upload receipt / invoice");
      const uploadInput = document.createElement("input");
      uploadInput.type = "file";
      uploadInput.hidden = true;
      uploadInput.accept = ".pdf,.png,.jpg,.jpeg,.webp,.heic,.doc,.docx,.xls,.xlsx";
      uploadInput.addEventListener("change", async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        await uploadAttachment(item.id, file);
        event.target.value = "";
      });
      uploadLabel.appendChild(uploadInput);
      uploadRow.appendChild(uploadLabel);
      if (uploadState[item.id]) uploadRow.appendChild(createEl("div", "upload-status", uploadState[item.id]));
      attachmentsWrap.appendChild(uploadRow);

      if (item.attachments.length) {
        const attachmentList = createEl("ul", "attachment-list");
        item.attachments.forEach((attachment) => {
          const attachmentItem = createEl("li", "attachment-item");
          const attachmentMeta = createEl("div", "attachment-meta");
          const link = createEl("a", "attachment-name", attachment.name);
          link.href = attachment.url;
          link.target = "_blank";
          link.rel = "noreferrer";
          attachmentMeta.appendChild(link);
          const bits = [];
          if (attachment.uploadedAt) bits.push(new Date(attachment.uploadedAt).toLocaleString());
          if (attachment.size) bits.push(formatFileSize(attachment.size));
          if (attachment.contentType) bits.push(attachment.contentType);
          if (bits.length) attachmentMeta.appendChild(createEl("div", "attachment-sub", bits.join(" · ")));
          attachmentItem.appendChild(attachmentMeta);
          const removeButton = createEl("button", "ghost-button", "Remove");
          removeButton.type = "button";
          removeButton.addEventListener("click", () => removeAttachment(item.id, attachment.path));
          attachmentItem.appendChild(removeButton);
          attachmentList.appendChild(attachmentItem);
        });
        attachmentsWrap.appendChild(attachmentList);
      }

      main.appendChild(attachmentsWrap);
      card.appendChild(main);

      const actions = createEl("div", "card-actions");
      const editButton = createEl("button", "ghost-button", "Edit");
      editButton.type = "button";
      editButton.addEventListener("click", () => startProcurementEdit(item.id));
      actions.appendChild(editButton);
      const deleteButton = createEl("button", "ghost-button", "Delete");
      deleteButton.type = "button";
      deleteButton.addEventListener("click", () => deleteProcurement(item.id));
      actions.appendChild(deleteButton);
      card.appendChild(actions);
      list.appendChild(card);
    });

    group.appendChild(list);
    container.appendChild(group);
  });
}

function renderSchedules() {
  const container = document.querySelector("#schedule-groups");
  container.innerHTML = "";

  EVENT_ORDER.forEach((eventName) => {
    const items = state.schedules.filter((item) => item.event === eventName);
    const group = createEl("section", "event-group");
    const header = createEl("div", "event-group-header");
    const titleWrap = createEl("div");
    titleWrap.appendChild(createEl("div", "section-kicker", eventName));
    titleWrap.appendChild(createEl("h3", "", eventName));
    header.appendChild(titleWrap);
    header.appendChild(createEl("div", "group-meta", `${items.length} timeline items`));
    group.appendChild(header);

    if (!items.length) {
      group.appendChild(createEl("div", "empty-state", "No logistics items added for this day yet."));
      container.appendChild(group);
      return;
    }

    const list = createEl("div", "card-list");
    items.forEach((item) => {
      const card = createEl("article", "record-card");
      const main = createEl("div");
      const titleRow = createEl("div", "record-title-row");
      titleRow.appendChild(createEl("div", "record-title", item.title));
      titleRow.appendChild(createEl("div", "record-time", item.time));
      main.appendChild(titleRow);
      const meta = [];
      if (item.location) meta.push(item.location);
      if (item.owner) meta.push(`Lead: ${item.owner}`);
      if (meta.length) main.appendChild(createEl("p", "record-subtitle", meta.join(" · ")));
      if (item.notes) main.appendChild(renderNoteBlock(item.notes));
      card.appendChild(main);

      const actions = createEl("div", "card-actions");
      const editButton = createEl("button", "ghost-button", "Edit");
      editButton.type = "button";
      editButton.addEventListener("click", () => startScheduleEdit(item.id));
      actions.appendChild(editButton);
      const deleteButton = createEl("button", "ghost-button", "Delete");
      deleteButton.type = "button";
      deleteButton.addEventListener("click", () => deleteSchedule(item.id));
      actions.appendChild(deleteButton);
      card.appendChild(actions);
      list.appendChild(card);
    });

    group.appendChild(list);
    container.appendChild(group);
  });
}

function renderCommunications() {
  const container = document.querySelector("#communications-list");
  container.innerHTML = "";

  const items = [...state.communications].sort((a, b) => (a.date || "9999-12-31").localeCompare(b.date || "9999-12-31"));
  if (!items.length) {
    container.appendChild(createEl("div", "empty-state", "No guest communications recorded yet."));
    return;
  }

  const group = createEl("section", "event-group");
  const header = createEl("div", "event-group-header");
  const titleWrap = createEl("div");
  titleWrap.appendChild(createEl("div", "section-kicker", "Communications"));
  titleWrap.appendChild(createEl("h3", "", "Communications plan"));
  header.appendChild(titleWrap);
  header.appendChild(createEl("div", "group-meta", `${items.length} items`));
  group.appendChild(header);

  const list = createEl("div", "card-list");
  items.forEach((item) => {
    const card = createEl("article", "record-card");
    const main = createEl("div");
    const titleRow = createEl("div", "record-title-row");
    titleRow.appendChild(createEl("div", "record-title", item.title));
    titleRow.appendChild(createEl("div", "record-time", item.date || "No date"));
    main.appendChild(titleRow);
    const meta = [];
    if (item.audience) meta.push(item.audience);
    if (item.channel) meta.push(item.channel);
    if (item.status) meta.push(humanizeStatus(item.status));
    if (meta.length) main.appendChild(createEl("p", "record-subtitle", meta.join(" · ")));
    if (item.notes) main.appendChild(renderNoteBlock(item.notes));
    card.appendChild(main);

    const actions = createEl("div", "card-actions");
    const editButton = createEl("button", "ghost-button", "Edit");
    editButton.type = "button";
    editButton.addEventListener("click", () => startCommunicationsEdit(item.id));
    actions.appendChild(editButton);
    const deleteButton = createEl("button", "ghost-button", "Delete");
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => deleteCommunication(item.id));
    actions.appendChild(deleteButton);
    card.appendChild(actions);
    list.appendChild(card);
  });

  group.appendChild(list);
  container.appendChild(group);
}

function renderOperations() {
  const container = document.querySelector("#operations-list");
  container.innerHTML = "";

  const items = [...state.operations].sort((a, b) => (a.dueDate || "9999-12-31").localeCompare(b.dueDate || "9999-12-31"));
  if (!items.length) {
    container.appendChild(createEl("div", "empty-state", "No operations items recorded yet."));
    return;
  }

  const group = createEl("section", "event-group");
  const header = createEl("div", "event-group-header");
  const titleWrap = createEl("div");
  titleWrap.appendChild(createEl("div", "section-kicker", "Operations"));
  titleWrap.appendChild(createEl("h3", "", "Operations workboard"));
  header.appendChild(titleWrap);
  header.appendChild(createEl("div", "group-meta", `${items.length} tasks`));
  group.appendChild(header);

  const list = createEl("div", "card-list");
  items.forEach((item) => {
    const card = createEl("article", "record-card");
    const main = createEl("div");
    const titleRow = createEl("div", "record-title-row");
    titleRow.appendChild(createEl("div", "record-title", item.title));
    titleRow.appendChild(createEl("div", "record-time", item.dueDate || "No due date"));
    main.appendChild(titleRow);
    const meta = [];
    if (item.owner) meta.push(item.owner);
    if (item.status) meta.push(humanizeStatus(item.status));
    if (meta.length) main.appendChild(createEl("p", "record-subtitle", meta.join(" · ")));
    if (item.notes) main.appendChild(renderNoteBlock(item.notes));
    card.appendChild(main);

    const actions = createEl("div", "card-actions");
    const editButton = createEl("button", "ghost-button", "Edit");
    editButton.type = "button";
    editButton.addEventListener("click", () => startOperationsEdit(item.id));
    actions.appendChild(editButton);
    const deleteButton = createEl("button", "ghost-button", "Delete");
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => deleteOperation(item.id));
    actions.appendChild(deleteButton);
    card.appendChild(actions);
    list.appendChild(card);
  });

  group.appendChild(list);
  container.appendChild(group);
}

function renderReferenceNotes() {
  const container = document.querySelector("#reference-notes");
  container.innerHTML = "";
  container.appendChild(createEl("h3", "", "From the current planning docs"));
  const list = createEl("ul");
  REFERENCE_NOTES.forEach((item) => list.appendChild(createEl("li", "", item)));
  container.appendChild(list);
}

function syncPageTabs() {
  document.querySelectorAll(".page-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.pageTarget === state.activePage);
  });
  document.querySelectorAll(".page-view").forEach((view) => {
    view.classList.toggle("is-active", view.dataset.page === state.activePage);
  });
}

async function setActivePage(pageName) {
  if (!PAGE_ORDER.includes(pageName)) return;
  state.activePage = pageName;
  syncPageTabs();
  persistLocalState();
}

function resetProcurementForm() {
  const form = document.querySelector("#procurement-form");
  form.reset();
  document.querySelector("#procurement-id").value = "";
  document.querySelector("#proc-currency").value = "RWF";
  document.querySelector("#proc-status").value = "not-started";
  document.querySelector("#procurement-cancel").hidden = true;
}

function resetScheduleForm() {
  const form = document.querySelector("#schedule-form");
  form.reset();
  document.querySelector("#schedule-id").value = "";
  document.querySelector("#schedule-cancel").hidden = true;
}

function resetCommunicationsForm() {
  const form = document.querySelector("#communications-form");
  form.reset();
  document.querySelector("#communications-id").value = "";
  document.querySelector("#comm-status").value = "drafting";
  document.querySelector("#communications-cancel").hidden = true;
}

function resetOperationsForm() {
  const form = document.querySelector("#operations-form");
  form.reset();
  document.querySelector("#operations-id").value = "";
  document.querySelector("#op-status").value = "not-started";
  document.querySelector("#operations-cancel").hidden = true;
}

function startProcurementEdit(id) {
  const item = state.procurements.find((entry) => entry.id === id);
  if (!item) return;
  state.activePage = "supply";
  syncPageTabs();
  document.querySelector("#procurement-id").value = item.id;
  document.querySelector("#proc-item").value = item.item;
  document.querySelector("#proc-event").value = item.event;
  document.querySelector("#proc-category").value = item.category || "";
  document.querySelector("#proc-vendor").value = item.vendor || "";
  document.querySelector("#proc-total").value = item.totalPrice;
  document.querySelector("#proc-paid").value = item.amountPaid;
  document.querySelector("#proc-status").value = item.status;
  document.querySelector("#proc-currency").value = item.currency;
  document.querySelector("#proc-notes").value = item.notes || "";
  document.querySelector("#procurement-cancel").hidden = false;
  document.querySelector("#proc-item").focus();
}

function startScheduleEdit(id) {
  const item = state.schedules.find((entry) => entry.id === id);
  if (!item) return;
  state.activePage = "logistics";
  syncPageTabs();
  document.querySelector("#schedule-id").value = item.id;
  document.querySelector("#schedule-event").value = item.event;
  document.querySelector("#schedule-time").value = item.time;
  document.querySelector("#schedule-title").value = item.title;
  document.querySelector("#schedule-location").value = item.location || "";
  document.querySelector("#schedule-owner").value = item.owner || "";
  document.querySelector("#schedule-notes").value = item.notes || "";
  document.querySelector("#schedule-cancel").hidden = false;
  document.querySelector("#schedule-title").focus();
}

function startCommunicationsEdit(id) {
  const item = state.communications.find((entry) => entry.id === id);
  if (!item) return;
  state.activePage = "communications";
  syncPageTabs();
  document.querySelector("#communications-id").value = item.id;
  document.querySelector("#comm-date").value = item.date;
  document.querySelector("#comm-title").value = item.title;
  document.querySelector("#comm-audience").value = item.audience || "";
  document.querySelector("#comm-channel").value = item.channel || "";
  document.querySelector("#comm-status").value = item.status;
  document.querySelector("#comm-notes").value = item.notes || "";
  document.querySelector("#communications-cancel").hidden = false;
  document.querySelector("#comm-title").focus();
}

function startOperationsEdit(id) {
  const item = state.operations.find((entry) => entry.id === id);
  if (!item) return;
  state.activePage = "operations";
  syncPageTabs();
  document.querySelector("#operations-id").value = item.id;
  document.querySelector("#op-title").value = item.title;
  document.querySelector("#op-due-date").value = item.dueDate;
  document.querySelector("#op-owner").value = item.owner || "";
  document.querySelector("#op-status").value = item.status;
  document.querySelector("#op-notes").value = item.notes || "";
  document.querySelector("#operations-cancel").hidden = false;
  document.querySelector("#op-title").focus();
}

async function saveProcurement(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const id = String(formData.get("id") || "").trim();
  const item = {
    id: id || `proc-${Date.now()}`,
    event: String(formData.get("event") || EVENT_ORDER[0]),
    item: String(formData.get("item") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    vendor: String(formData.get("vendor") || "").trim(),
    totalPrice: Number(formData.get("totalPrice") || 0),
    amountPaid: Number(formData.get("amountPaid") || 0),
    status: String(formData.get("status") || "not-started"),
    currency: String(formData.get("currency") || "RWF"),
    notes: String(formData.get("notes") || "").trim(),
    attachments: [],
  };
  if (!item.item) return;
  if (item.amountPaid > item.totalPrice) item.amountPaid = item.totalPrice;

  const index = state.procurements.findIndex((entry) => entry.id === item.id);
  if (index >= 0) item.attachments = state.procurements[index].attachments || [];
  if (index >= 0) state.procurements[index] = item;
  else state.procurements.push(item);

  await persistEverywhere();
  resetProcurementForm();
  renderAll();
}

async function saveSchedule(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const id = String(formData.get("id") || "").trim();
  const item = {
    id: id || `sched-${Date.now()}`,
    event: String(formData.get("event") || EVENT_ORDER[0]),
    time: String(formData.get("time") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    owner: String(formData.get("owner") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  };
  if (!item.time || !item.title) return;

  const index = state.schedules.findIndex((entry) => entry.id === item.id);
  if (index >= 0) state.schedules[index] = item;
  else state.schedules.push(item);

  await persistEverywhere();
  resetScheduleForm();
  renderAll();
}

async function saveCommunication(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const id = String(formData.get("id") || "").trim();
  const item = {
    id: id || `comm-${Date.now()}`,
    date: String(formData.get("date") || ""),
    title: String(formData.get("title") || "").trim(),
    audience: String(formData.get("audience") || "").trim(),
    channel: String(formData.get("channel") || "").trim(),
    status: String(formData.get("status") || "drafting"),
    notes: String(formData.get("notes") || "").trim(),
  };
  if (!item.title) return;
  const index = state.communications.findIndex((entry) => entry.id === item.id);
  if (index >= 0) state.communications[index] = item;
  else state.communications.push(item);
  await persistEverywhere();
  resetCommunicationsForm();
  renderAll();
}

async function saveOperation(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const id = String(formData.get("id") || "").trim();
  const item = {
    id: id || `op-${Date.now()}`,
    title: String(formData.get("title") || "").trim(),
    dueDate: String(formData.get("dueDate") || ""),
    owner: String(formData.get("owner") || "").trim(),
    status: String(formData.get("status") || "not-started"),
    notes: String(formData.get("notes") || "").trim(),
  };
  if (!item.title) return;
  const index = state.operations.findIndex((entry) => entry.id === item.id);
  if (index >= 0) state.operations[index] = item;
  else state.operations.push(item);
  await persistEverywhere();
  resetOperationsForm();
  renderAll();
}

async function deleteProcurement(id) {
  state.procurements = state.procurements.filter((entry) => entry.id !== id);
  await persistEverywhere();
  renderAll();
}

async function deleteSchedule(id) {
  state.schedules = state.schedules.filter((entry) => entry.id !== id);
  await persistEverywhere();
  renderAll();
}

async function deleteCommunication(id) {
  state.communications = state.communications.filter((entry) => entry.id !== id);
  await persistEverywhere();
  renderAll();
}

async function deleteOperation(id) {
  state.operations = state.operations.filter((entry) => entry.id !== id);
  await persistEverywhere();
  renderAll();
}

function exportState() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wedding-planner-state-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importState(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      applyIncomingState(migrateState(JSON.parse(String(reader.result))));
      await persistEverywhere();
    } catch (error) {
      window.alert("That file is not a valid planner export.");
      console.warn(error);
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

async function handleNotes(event) {
  state.sharedNotes = event.target.value;
  await persistEverywhere();
}

async function uploadAttachment(procurementId, file) {
  if (!attachmentService) {
    window.alert("Uploads need Firebase Storage. If this keeps failing, enable Storage in Firebase.");
    return;
  }
  uploadState[procurementId] = `Uploading ${file.name}...`;
  renderProcurements();

  try {
    const uploaded = await attachmentService.upload(procurementId, file);
    const item = state.procurements.find((entry) => entry.id === procurementId);
    if (!item) return;
    item.attachments = [...(item.attachments || []), uploaded];
    delete uploadState[procurementId];
    await persistEverywhere();
    renderProcurements();
  } catch (error) {
    console.warn("Attachment upload failed", error);
    uploadState[procurementId] = "Upload failed. Check Firebase Storage setup and rules.";
    renderProcurements();
  }
}

async function removeAttachment(procurementId, attachmentPath) {
  const item = state.procurements.find((entry) => entry.id === procurementId);
  if (!item) return;
  try {
    if (attachmentService && attachmentPath) {
      await attachmentService.remove(attachmentPath);
    }
  } catch (error) {
    console.warn("Attachment delete failed", error);
  }
  item.attachments = (item.attachments || []).filter((entry) => entry.path !== attachmentPath);
  await persistEverywhere();
  renderProcurements();
}

function renderAll() {
  renderChecklist();
  renderOverview();
  renderCommunications();
  renderOperations();
  renderProcurements();
  renderSchedules();
}

async function initRealtimeSync() {
  remoteStore = await createRemoteStore();
  if (!remoteStore) return;

  const remoteState = await remoteStore.hydrateLocalState(state);
  applyIncomingState(remoteState);
  setSyncStatus("Live shared sync is active. Changes should appear across devices in near real time.", "is-live");

  remoteStore.subscribe((incomingState) => {
    const incomingJson = JSON.stringify(incomingState);
    const currentJson = JSON.stringify({
      checklistItems: state.checklistItems,
      checklist: state.checklist,
      procurements: state.procurements,
      schedules: state.schedules,
      communications: state.communications,
      operations: state.operations,
      sharedNotes: state.sharedNotes,
    });
    if (incomingJson === currentJson) return;
    suppressRemoteSave = true;
    applyIncomingState(incomingState);
    suppressRemoteSave = false;
  });
}

async function init() {
  populateEventSelects();
  syncPageTabs();
  renderReferenceNotes();
  renderAll();
  document.querySelector("#shared-notes").value = state.sharedNotes;

  document.querySelectorAll(".page-tab").forEach((button) => {
    button.addEventListener("click", () => setActivePage(button.dataset.pageTarget));
  });

  document.querySelector("#procurement-form").addEventListener("submit", saveProcurement);
  document.querySelector("#schedule-form").addEventListener("submit", saveSchedule);
  document.querySelector("#communications-form").addEventListener("submit", saveCommunication);
  document.querySelector("#operations-form").addEventListener("submit", saveOperation);
  document.querySelector("#procurement-cancel").addEventListener("click", resetProcurementForm);
  document.querySelector("#schedule-cancel").addEventListener("click", resetScheduleForm);
  document.querySelector("#communications-cancel").addEventListener("click", resetCommunicationsForm);
  document.querySelector("#operations-cancel").addEventListener("click", resetOperationsForm);
  document.querySelector("#shared-notes").addEventListener("input", handleNotes);
  document.querySelector("#export-state").addEventListener("click", exportState);
  document.querySelector("#import-state").addEventListener("change", importState);

  resetProcurementForm();
  resetScheduleForm();
  resetCommunicationsForm();
  resetOperationsForm();
  persistLocalState();
  await initRealtimeSync();
}

init();
