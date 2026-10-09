export const profile = {
  name: 'Ahsan Qamar',
  github: 'https://github.com/Ahsan-Qamar-Dev',
  linkedin: 'https://www.linkedin.com/in/ahsan-qamar-/',
  email: 'ahsan.qamar2004@gmail.com',
  location: 'Lahore, Pakistan',
  portrait: '/images/ahsan-portrait.png',
  cv: '/ahsan-qamar-cv.pdf' as string | null,
  role: 'Flutter & AI/ML Intern',
  internshipDates: 'August 2026 — Present',
  educationDates: 'October 2023 — October 2027',
};
export const projects = [
  { title: 'Coffee Shop', category: 'MOBILE EXPERIENCE', description: 'From finding your favorite coffee to a PDF receipt. A thoughtfully connected ordering experience with light and dark themes.', stack: ['Flutter', 'Dart', 'GetX', 'Supabase'], repo: 'Coffee-Shop-Using-Flutter', image: '/images/coffee-home.png', kind: 'coffee', status: 'Backend in private testing' },
  { title: 'StudyFlow', category: 'STUDENT PRODUCTIVITY', description: 'A student planner, exam tracker, and focus companion. An Android-first foundation with an interactive UI preview.', stack: ['Flutter', 'GetX', 'SQLite'], repo: 'StudyFlow', kind: 'study', status: 'Interactive UI preview' },
  { title: 'EDA Pro', category: 'DATA & MACHINE LEARNING', description: 'Turn datasets into clearer insights. Explore, clean, visualize, and export CSV and Excel data in one Streamlit dashboard.', stack: ['Python', 'Streamlit', 'Pandas'], repo: 'eda-pro', kind: 'data', live: 'https://eda-pro-dashboard.streamlit.app/', status: 'Public demo' },
  { title: 'Student Dropout Risk', category: 'APPLIED MACHINE LEARNING', description: 'A Gradio prototype for educational early warning, using an existing Logistic Regression model and validated input preprocessing.', stack: ['Python', 'scikit-learn', 'Gradio'], repo: 'student-dropout-risk-prediction', kind: 'ml', status: 'Prototype · deployment pending' },
  { title: 'Users REST API', category: 'BACKEND DEVELOPMENT', description: 'A Node.js and Express API with request validation, automated HTTP tests, and a Postman collection. Uses in-memory storage.', stack: ['JavaScript', 'Node.js', 'Express'], repo: 'users-api', kind: 'api', status: 'Portfolio project' },
  { title: 'To-do List', category: 'WEB FUNDAMENTALS', description: 'A responsive task manager with add, complete, and delete flows, built to explore DOM manipulation and local storage.', stack: ['HTML', 'CSS', 'JavaScript'], repo: 'todo-list-project', kind: 'todo', status: 'Practice project' },
];
export const explorations = [
  { title: 'ToonScript', detail: 'An AI pipeline for manga panels, combining LLMs and Stable Diffusion.' },
  { title: 'Traffic Sign CNN', detail: 'A TensorFlow/Keras CNN for 43 GTSRB traffic sign classes, with CLAHE preprocessing.', link: 'https://colab.research.google.com/drive/1uxIQqxhymZBiZPSbXJlh6e_Ilrj5tPK6?usp=sharing' },
  { title: 'Gadgets Store', detail: 'A full-stack web application with a Python backend and MySQL.' },
  { title: 'AWS Hosting', detail: 'A web application deployed on Amazon S3.' },
];
export const posts = [
  { title: 'Building a Coffee Shop app', label: 'FLUTTER & DART', description: 'Sharing the journey from a static interface to connected ordering flows.', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7500912781999878144/' },
  { title: 'Student dropout risk prediction', label: 'APPLIED MACHINE LEARNING', description: 'Exploring an educational early-warning workflow with Python and Gradio.', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7506711633944203264/' },
];
export const disciplines = [
  { title: 'Mobile development', detail: 'Flutter interfaces with thoughtful navigation, state management, and responsive layouts.', tools: 'Flutter · Dart · GetX · SQLite · Supabase' },
  { title: 'Machine learning & data', detail: 'From CNN experiments and AI pipelines to interactive tools for exploring data.', tools: 'Python · TensorFlow · Keras · scikit-learn · Streamlit' },
  { title: 'Web & backend', detail: 'Web interfaces, REST APIs, and full-stack projects that connect the pieces.', tools: 'React · JavaScript · Node.js · Express · FastAPI · MySQL' },
];
