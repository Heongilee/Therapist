# Builder Stage
FROM node:alpine as builder

# 환경변수 설정
ARG REACT_APP_KAKAO_LOGIN_APP_KEY
ENV REACT_APP_KAKAO_LOGIN_APP_KEY=$REACT_APP_KAKAO_LOGIN_APP_KEY
ARG REACT_APP_OPENVIDU_ID
ENV REACT_APP_OPENVIDU_ID=$REACT_APP_OPENVIDU_ID
ARG REACT_APP_OPENVIDU_PASSWORD
ENV REACT_APP_OPENVIDU_PASSWORD=$REACT_APP_OPENVIDU_PASSWORD

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
