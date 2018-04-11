export default class AppMetadata {

  /** @return {string} */
  static get title() {
    return document.title;
  }

  /** @param {string|string[]} title */
  static set title(title) {
    if (!Array.isArray(title)) title = [title];
    title.push('Xyfir');
    document.title = title.join(' - ');
  }

  /** @return {string} */
  static get description() {
    return document.getElementById('description').content;
  }

  /** @param {string} [description] */
  static set description(description) {
    document.getElementById('description').content =
      description ||
      `The Xyfir Network is home to many sites, services, and applications.`;
  }

}