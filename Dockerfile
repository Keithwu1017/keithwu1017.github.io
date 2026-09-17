FROM nginx:1.27-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js
COPY avatar.svg /usr/share/nginx/html/avatar.svg
COPY profile-photo.jpg /usr/share/nginx/html/profile-photo.jpg
COPY Ta-I_Wu_Resume.pdf /usr/share/nginx/html/Ta-I_Wu_Resume.pdf

EXPOSE 80
