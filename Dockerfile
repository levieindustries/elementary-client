FROM node:9.0.0-alpine

RUN apk --update add \
      nginx \
      curl

RUN mkdir -p /run/nginx

WORKDIR /code

COPY package*.json /code/
RUN npm install

ENV CONTAINERPILOT=/code/etc/containerpilot.json5
ENV CONTAINERPILOT_VERSION 3.5.0
RUN curl -Lso /tmp/containerpilot.tar.gz \
      "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
    && tar -xz -f /tmp/containerpilot.tar.gz \
    && mv containerpilot /bin/ \
    && rm /tmp/containerpilot.tar.gz

COPY .eslintrc /code/.eslintrc
COPY .stylelintrc /code/.stylelintrc
COPY src /code/src
COPY etc/nginx.conf /etc/nginx/nginx.conf
COPY etc /code/etc
RUN npm run build

COPY . /code

ENV CONSUL_URL consul
EXPOSE 80

CMD ["/bin/containerpilot"]
