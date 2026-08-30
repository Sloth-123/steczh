async function loadTeam() {
  const grid = document.querySelector("#team-grid");

  if (!grid) return;

  try {
    const response = await fetch("data/team.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const team = await response.json();

    if (!Array.isArray(team)) {
      throw new Error("team.json must contain an array");
    }

    grid.replaceChildren();

    for (const member of team) {
      grid.appendChild(createTeamCard(member));
    }

    if (team.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "Keine Teammitglieder gefunden.";
      grid.appendChild(empty);
    }
  } catch (error) {
    console.error("Could not load team:", error);

    grid.replaceChildren();

    const message = document.createElement("p");
    message.textContent =
      "Das Team konnte leider nicht geladen werden.";

    grid.appendChild(message);
  }
}


function createTeamCard(member) {
  const article = document.createElement("article");
  article.className = "team-card";

  const portrait = document.createElement("img");
  portrait.className = "team-portrait";
  portrait.src = member.portrait;
  portrait.alt = `Portrait von ${member.name}`;
  portrait.loading = "lazy";
  portrait.decoding = "async";

  const content = document.createElement("div");
  content.className = "team-content";

  const role = document.createElement("p");
  role.className = "team-role";
  role.textContent = member.role;

  const name = document.createElement("h3");
  name.className = "team-name";
  name.textContent = member.name;

  const details = document.createElement("dl");
  details.className = "team-details";

  addTeamDetail(details, "Studium", member.study);
  addTeamDetail(
    details,
    "Lieblingsinsekt",
    member.favouriteInsect
  );

  content.append(role, name, details);

  if (member.contact) {
    const contact = document.createElement("a");
    contact.className = "team-contact";
    contact.href = `mailto:${member.contact}`;
    contact.textContent = "Kontakt";
    contact.setAttribute(
      "aria-label",
      `Kontakt mit ${member.name}`
    );

    content.appendChild(contact);
  }

  article.append(portrait, content);

  return article;
}


function addTeamDetail(list, label, value) {
  const term = document.createElement("dt");
  term.textContent = label;

  const description = document.createElement("dd");
  description.textContent = value;

  list.append(term, description);
}


loadTeam();