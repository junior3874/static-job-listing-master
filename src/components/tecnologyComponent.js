export default function tecnologyComponent(tecnologyName) {
  return `
    <div id="${tecnologyName}"class="filter">
        <p>${tecnologyName}</p>
        <button class="clear-filter">X</button>
    </div>
    `;
}
