export const ROUTES = {
  // main static pages
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",

  // main dynamic pages
  base: (extension = "") => (extension ? `/${extension}` : "/"),
  publications: (extension = "") =>
    extension ? `/publications/${extension}` : "/publications",
  people: (extension = "") => (extension ? `/people/${extension}` : "/people"),
  researchProjects: (extension = "") =>
    extension ? `/projects/${extension}` : "/projects",
  events: (extension = "") => (extension ? `/events/${extension}` : "/events"),
  news: (extension = "") => (extension ? `/news/${extension}` : "/news"),

  // admin
  LOGIN: "/admin/auth",
  SIGNUP: "/admin/auth?mode=register",
  admin: (extension = "") => (extension ? `/admin/${extension}` : "/admin"),
};
