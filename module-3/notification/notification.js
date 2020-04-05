export default class NotificationMessage {
  element;

  constructor(message = '', {
                duration = 1000,
                type = ''
              } = {}
  ) {
    this.duration = duration;
    this.type = type;
    this.message = message;

    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }

  getTemplate() {
    return `
            <div class="notification ${this.type}" style="--value:${this.duration}ms">
                <div class="timer"></div>
                <div class="inner-wrapper">
                  <div class="notification-header">${this.type}</div>
                  <div class="notification-body">
                    ${this.message}
                  </div>
                </div>
              </div>
            `;
  }

  destroy() {
    this.element.remove();
  }

  show(targetElement = null) {
    this.remove();

    if (null === targetElement) {
      document.body.append(this.element);
    } else {
      targetElement.append(this.element);
    }

    const timeout = setTimeout(() => this.destroy(), this.duration);
  }

  remove() {
    const prevElementList = document.getElementsByClassName('notification');
    for (let element of prevElementList) {
      element.remove();
    }
  }
}
