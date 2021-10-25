# Builder Stage
FROM node:alpine as builder
# add `REACT_APP_` to $PATH
ENV PATH /home/jenkins/workspace/Jenkins_Therapist/client/.env.production.local:$PATH
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Run Stage
FROM nginx
EXPOSE 80 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist  /usr/share/nginx/html
