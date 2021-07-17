export default function tecnologyComponent(tecnologyName) {
  return `
    <div id="${tecnologyName}" class="filter">
        <p>${tecnologyName}</p>
        <a class="clear-filter">X</a>
    </div>
    `;
}
