const STORAGE_KEY = "wedding-planner-state-v3";
const LEGACY_KEYS = ["wedding-planner-state-v2", "wedding-planner-state-v1"];
const FIREBASE_VERSION = "11.7.3";

const EVENT_ORDER = [
  "Civil Ceremony",
  "Welcome Reception",
  "Gusaba",
  "Wedding",
];

const SEED_PROCUREMENTS = [
  {
    id: "proc-civil-filing",
    event: "Civil Ceremony",
    item: "Marriage filing and ceremony paperwork",
    category: "Admin",
    vendor: "DC Courts",
    totalPrice: 45,
    amountPaid: 0,
    currency: "USD",
    status: "not-started",
    notes: "Weekly update references the filing process and required IDs.",
  },
  {
    id: "proc-welcome-venue",
    event: "Welcome Reception",
    item: "Venue",
    category: "Venue",
    vendor: "Atelier Du Vin",
    totalPrice: 3571000,
    amountPaid: 1000000,
    currency: "RWF",
    status: "in-progress",
    notes: "Welcome notes mention confirmed venue, 1M RWF deposit, and consumption minimum.",
  },
  {
    id: "proc-welcome-food",
    event: "Welcome Reception",
    item: "Food",
    category: "Food",
    vendor: "TBD",
    totalPrice: 800000,
    amountPaid: 0,
    currency: "RWF",
    status: "not-started",
    notes: "Spreadsheet has light food budgeted.",
  },
  {
    id: "proc-welcome-drinks",
    event: "Welcome Reception",
    item: "Drinks",
    category: "Drinks",
    vendor: "TBD",
    totalPrice: 800000,
    amountPaid: 0,
    currency: "RWF",
    status: "not-started",
    notes: "Spreadsheet has drinks budgeted separately.",
  },
  {
    id: "proc-gusaba-venue",
    event: "Gusaba",
    item: "Venue",
    category: "Venue",
    vendor: "Jade Green",
    totalPrice: 2800000,
    amountPaid: 2800000,
    currency: "RWF",
    status: "paid",
    notes: "Marked acquired in spreadsheet.",
  },
  {
    id: "proc-gusaba-decor",
    event: "Gusaba",
    item: "Decor",
    category: "Decor",
    vendor: "TBD",
    totalPrice: 2800000,
    amountPaid: 0,
    currency: "RWF",
    status: "in-progress",
    notes: "Centerpiece design still active.",
  },
  {
    id: "proc-gusaba-dancers",
    event: "Gusaba",
    item: "Dance troupe",
    category: "Entertainment",
    vendor: "Imyamibwa",
    totalPrice: 1500000,
    amountPaid: 750000,
    currency: "RWF",
    status: "in-progress",
    notes: "Weekly update notes a 750k deposit paid and 750k still owed.",
  },
  {
    id: "proc-gusaba-rugaba",
    event: "Gusaba",
    item: "Cow poets",
    category: "Entertainment",
    vendor: "Rugaba",
    totalPrice: 150000,
    amountPaid: 75000,
    currency: "RWF",
    status: "in-progress",
    notes: "Weekly update notes half paid.",
  },
  {
    id: "proc-wedding-venue",
    event: "Wedding",
    item: "Venue and decor",
    category: "Venue",
    vendor: "Jalia",
    totalPrice: 9500000,
    amountPaid: 9500000,
    currency: "RWF",
    status: "paid",
    notes: "Spreadsheet says venue includes decor.",
  },
  {
    id: "proc-wedding-dinner",
    event: "Wedding",
    item: "Dinner",
    category: "Food",
    vendor: "TBD",
    totalPrice: 6000000,
    amountPaid: 0,
    currency: "RWF",
    status: "in-progress",
    notes: "Still in progress in spreadsheet.",
  },
  {
    id: "proc-wedding-photographer",
    event: "Wedding",
    item: "Photographer",
    category: "Photo",
    vendor: "TBD",
    totalPrice: 2800000,
    amountPaid: 2800000,
    currency: "RWF",
    status: "paid",
    notes: "Covers all three days per spreadsheet.",
  },
  {
    id: "proc-wedding-dj",
    event: "Wedding",
    item: "DJ",
    category: "Music",
    vendor: "TBD",
    totalPrice: 980000,
    amountPaid: 0,
    currency: "RWF",
    status: "not-started",
    notes: "Still open in spreadsheet.",
  },
];

const SEED_SCHEDULE = [
  {
    id: "sched-civil-1",
    event: "Civil Ceremony",
    time: "Morning",
    title: "Marriage bureau paperwork checkpoint",
    location: "Washington, DC",
    owner: "Both",
    notes: "Confirm IDs and all required documents before the appointment.",
  },
  {
    id: "sched-welcome-1",
    event: "Welcome Reception",
    time: "Afternoon",
    title: "Venue setup and menu confirmation",
    location: "Atelier Du Vin",
    owner: "Both",
    notes: "Confirm final food and drink order one day before.",
  },
  {
    id: "sched-welcome-2",
    event: "Welcome Reception",
    time: "Evening",
    title: "Guest welcome reception",
    location: "Atelier Du Vin",
    owner: "Both",
    notes: "Coordinate arrival flow from hotels if buses are used.",
  },
  {
    id: "sched-gusaba-1",
    event: "Gusaba",
    time: "Morning",
    title: "Decor and AV setup",
    location: "Jade Green",
    owner: "Planner",
    notes: "Needs vendor confirmation and load-in timing.",
  },
  {
    id: "sched-gusaba-2",
    event: "Gusaba",
    time: "Midday",
    title: "Guest transportation arrivals",
    location: "Jade Green",
    owner: "Syver",
    notes: "Coordinate buses and arrival windows.",
  },
  {
    id: "sched-wedding-1",
    event: "Wedding",
    time: "Morning",
    title: "Venue and reception setup",
    location: "Jalia",
    owner: "Planner",
    notes: "Cover dinner setup, AV, dance floor, and vendor check-ins.",
  },
  {
    id: "sched-wedding-2",
    event: "Wedding",
    time: "Evening",
    title: "Reception",
    location: "Jalia",
    owner: "Both",
    notes: "Includes dinner, music, and guest transport back to hotels.",
  },
];

const REFERENCE_NOTES = [
  "The spreadsheet gives strong starting procurement lines for welcome reception, gusaba, and wedding day.",
  "The weekly update deck has the best detail for deposits, attire, entertainment, and unresolved vendor items.",
  "The CONOP draft is still useful for day-of logistics, contingencies, and ownership.",
  "The guest list size makes transportation and venue flow worth keeping inside the day-by-day schedule.",
];

function cloneSeed(items) {
  return items.map((item) => ({ ...item }));
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

function migrateState(parsed) {
  return {
    procurements: normalizeProcurements(parsed.procurements).length
      ? normalizeProcurements(parsed.procurements)
      : cloneSeed(SEED_PROCUREMENTS),
    schedules: normalizeSchedules(parsed.schedules).length
      ? normalizeSchedules(parsed.schedules)
      : cloneSeed(SEED_SCHEDULE),
    sharedNotes: typeof parsed.sharedNotes === "string" ? parsed.sharedNotes : "",
  };
}

function defaultState() {
  return {
    procurements: cloneSeed(SEED_PROCUREMENTS),
    schedules: cloneSeed(SEED_SCHEDULE),
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
let remoteStore = null;
let suppressRemoteSave = false;

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
    const { initializeApp } = appModule;
    const {
      doc,
      getDoc,
      getFirestore,
      onSnapshot,
      serverTimestamp,
      setDoc,
    } = firestoreModule;

    const app = initializeApp(config);
    const db = getFirestore(app);
    const path = (window.WEDDING_SYNC_OPTIONS && window.WEDDING_SYNC_OPTIONS.documentPath) || "wedding-planning/main";
    const [collectionName, documentName] = path.split("/");
    const documentRef = doc(db, collectionName, documentName || "main");

    return {
      async hydrateLocalState(localState) {
        const snapshot = await getDoc(documentRef);
        if (snapshot.exists()) {
          const remote = snapshot.data();
          return remote && remote.payload ? migrateState(remote.payload) : localState;
        }

        await setDoc(documentRef, {
          payload: localState,
          updatedAt: serverTimestamp(),
        });
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
        await setDoc(documentRef, {
          payload: nextState,
          updatedAt: serverTimestamp(),
        });
      },
    };
  } catch (error) {
    console.warn("Could not initialize Firebase sync", error);
    setSyncStatus("Firebase setup failed. The site is still usable locally, but live sync is not active.", "is-error");
    return null;
  }
}

function applyIncomingState(nextState) {
  state.procurements = normalizeProcurements(nextState.procurements).length
    ? normalizeProcurements(nextState.procurements)
    : cloneSeed(SEED_PROCUREMENTS);
  state.schedules = normalizeSchedules(nextState.schedules).length
    ? normalizeSchedules(nextState.schedules)
    : cloneSeed(SEED_SCHEDULE);
  state.sharedNotes = typeof nextState.sharedNotes === "string" ? nextState.sharedNotes : "";
  persistLocalState();
  document.querySelector("#shared-notes").value = state.sharedNotes;
  resetProcurementForm();
  resetScheduleForm();
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
  const totals = items.reduce(
    (acc, item) => {
      if (item.currency === "USD") acc.usd += Number(item.totalPrice || 0);
      else acc.rwf += Number(item.totalPrice || 0);
      return acc;
    },
    { rwf: 0, usd: 0 }
  );

  const parts = [];
  if (totals.rwf) parts.push(formatMoney(totals.rwf, "RWF"));
  if (totals.usd) parts.push(formatMoney(totals.usd, "USD"));
  return parts.join(" + ") || "No budget yet";
}

function renderOverview() {
  const container = document.querySelector("#overview-cards");
  container.innerHTML = "";
  const totals = getProcurementTotals();
  const cards = [
    {
      label: "Guests in list",
      value: "127",
      caption: "Imported from the current guest CSV in ~/admin/wedding.",
    },
    {
      label: "Budget tracked",
      value: formatMoney(totals.totalRwf, "RWF"),
      caption: "Total RWF procurement value currently entered.",
    },
    {
      label: "Still to pay",
      value: formatMoney(totals.remainingRwf, "RWF"),
      caption: "Outstanding RWF balance across all procurement lines.",
    },
    {
      label: "USD tracked",
      value: formatMoney(totals.totalUsd, "USD"),
      caption: "Separate USD spending captured without mixing currencies.",
    },
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
    EVENT_ORDER.forEach((eventName) => {
      select.add(new Option(eventName, eventName));
    });
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
  };
  return labels[status] || status;
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

      if (item.notes) main.appendChild(createEl("p", "record-note", item.notes));
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
      group.appendChild(createEl("div", "empty-state", "No schedule items added for this day yet."));
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
      if (item.notes) main.appendChild(createEl("p", "record-note", item.notes));
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

function renderReferenceNotes() {
  const container = document.querySelector("#reference-notes");
  container.innerHTML = "";
  container.appendChild(createEl("h3", "", "From the current planning docs"));
  const list = createEl("ul");
  REFERENCE_NOTES.forEach((item) => list.appendChild(createEl("li", "", item)));
  container.appendChild(list);
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

function startProcurementEdit(id) {
  const item = state.procurements.find((entry) => entry.id === id);
  if (!item) return;
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
  };
  if (!item.item) return;
  if (item.amountPaid > item.totalPrice) item.amountPaid = item.totalPrice;

  const index = state.procurements.findIndex((entry) => entry.id === item.id);
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

function renderAll() {
  renderOverview();
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
      procurements: state.procurements,
      schedules: state.schedules,
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
  renderReferenceNotes();
  renderAll();
  document.querySelector("#shared-notes").value = state.sharedNotes;

  document.querySelector("#procurement-form").addEventListener("submit", saveProcurement);
  document.querySelector("#schedule-form").addEventListener("submit", saveSchedule);
  document.querySelector("#procurement-cancel").addEventListener("click", resetProcurementForm);
  document.querySelector("#schedule-cancel").addEventListener("click", resetScheduleForm);
  document.querySelector("#shared-notes").addEventListener("input", handleNotes);
  document.querySelector("#export-state").addEventListener("click", exportState);
  document.querySelector("#import-state").addEventListener("change", importState);

  resetProcurementForm();
  resetScheduleForm();
  persistLocalState();
  await initRealtimeSync();
}

init();
