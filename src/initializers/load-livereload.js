import config from "../config";

if (config.livereload) {
  const script = document.createElement("script");
  script.src = "/livereload.js?port=80";
  script.async = true;
  document.body.appendChild(script);
}
