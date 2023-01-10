# Design Plan

This document is just a collection of design decisions and plans written down before the building of the website and cloud resources. The final software may or may not follow the choices laid out in this document.

## Frameworks, Libraries, and Tools

The software used to build this application have been chosen after some considerable thought along with my personal comfort-level and bias. One main requirement was not needing any sort of continuously running server that would charge a rate based on time. Therefore serverless offerings and NoSQL databases were given more priority.

- [Vue.js](https://vuejs.org/) - at first Svelte was considered over Vue.js, and more specifically SvelteKit with its file routing system and performance. But Vue.js has much larger community support and better UI kits so it was chosen instead.

- [Vue Router](https://router.vuejs.org/) - since this app will need multiple pages, Vue Router is the recommended option to handle this.

- [Pinia](https://pinia.vuejs.org/) - some state management might be needed, even though URL query parameters will be used to hold as much state as possible.

- [Google Firestore](https://cloud.google.com/firestore) - this is the option that allows serverless storage without requiring a backend thanks to in-built security management. The NoSQL structure also allows easy storing of journals with different fields.

- [Quasar](https://quasar.dev/) - the component library allows creating quick and beautiful UIs without spending any time on design work.
