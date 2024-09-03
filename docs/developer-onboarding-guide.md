# Onboarding Guide for New Developers to the dora.dev codebase
Welcome to the dora.dev codebase! This guide will help you get started contributing to the project.

## 1. Understanding the Project

Purpose: dora.dev is the public-facing knowledge site of DORA. It serves as a central hub for sharing research findings, best practices, and resources related to DevOps.

### Technology Stack:
* [**Hugo:**](https://gohugo.io) A static site generator used to transform content from markdown files into HTML, CSS, and JavaScript.
* [**Svelte:**](https://svelte.dev/) A JavaScript framework used to build interactive components like the Quick Check tool and Core Model
diagram. 
* [**Firebase:**](https://firebase.google.com/) A suite of Google Cloud services used for hosting, data storage (Firestore), serverless functions, and deployment.

## 2. Setting Up Your Development Environment

### Prerequisites:
* *Git*: For version control (https://git-scm.com/).
* *Node.js*: For running JavaScript (https://nodejs.org/).
* *Hugo* (extended): For static site generation (https://gohugo.io/). Install the "extended" version, which includes additional functionality required for this project.
* *Firebase CLI*: For interacting with Firebase ([https://firebase.google.com/docs/cli](https://firebase.google.com/docs/cli)).

### Steps:
* Clone the repository: `git clone https://github.com/dora-team/dora.dev.git`
* Navigate to the project directory: `cd dora.dev`

**Install Node.js dependencies:**
* For the Quick Check (Svelte): `cd svelte/quick-check-2023 && npm install`
* For the Core Model (Svelte): `cd svelte/core-v2 && npm install`
* For the contact form functions (Node.js): `cd functions/inquiry-monitor && npm install`
* Review `/ci/README.md` for CI/CD pipeline setup.
* Optionally review `/docs/README.md` for instructions on using Firebase emulators to preview certain features locally.

## 3. Project Structure

* `/hugo`: Contains the main Hugo site structure.
    * `/content`: Markdown files for content, organized by category (e.g. guides, capabilities, research).
    * `/data`: Data files used by Hugo, such as the capability prioritization questions.
    * `/layouts`: Hugo templates for rendering different page types.
    * `/static`: Static assets like images, JavaScript, and CSS.
* `/svelte`: Contains the Svelte applications.
    * `/quick-check-2023`: Source code for the Quick Check tool.
    * `/core-v2`: Source code for the DORA Core Model interactive diagram.
* `/functions`: Contains serverless functions written in Node.js, e.g. for processing contact form submissions.
* `/docs`: Contains technical documentation for the project.

## 4. Workflow

**Content changes**:
1. Create a new branch for your work.
1. Edit the relevant markdown files in `/hugo/content`.
1. Use `hugo serve -s hugo -D --disableFastRender --debug --watch` to preview your changes locally.
1. Commit your changes and open a pull request.
1. The CI/CD pipeline will automatically build and deploy a preview environment.
1. Once reviewed and approved, merge your changes to `main` for publishing.

**Code changes (Svelte, functions):**
1. Create a new branch for your work.
2. Develop your changes in the relevant Svelte or Node.js directory.
3. Build the component:
    * For Quick Check: `cd svelte/quick-check-2023 && npm run build`
    * For Core Model: `cd svelte/core-v2 && npm run build`.
4. Copy the built artifacts to the appropriate directory within `hugo` (see build scripts in svelte directories).
5. Preview the changes in a local Hugo server.
6. Commit your changes and open a pull request.
7. The CI/CD pipeline will build and deploy a preview environment.
8. Once reviewed and approved, merge your changes to `main` for publishing.

## 5. Contribution Guidelines:

* Familiarize yourself with Hugo, Svelte, and Firebase basics.
* Follow the [Contributor Covenant Code of Conduct](https://github.com/dora-team/dora.dev/blob/main/CODE_OF_CONDUCT.md).
* Create clear and concise commit messages.
* Open a pull request for each change, describing the purpose and impact.
* We encourage your contributions!

## 6. Getting Help

[DORA Community](https://dora.community): Join the DORA Community for discussions, questions, and knowledge sharing.

[GitHub Issues](https://github.com/dora-team/dora.dev/issues): Report bugs or suggest improvements using the project's issue tracker.
