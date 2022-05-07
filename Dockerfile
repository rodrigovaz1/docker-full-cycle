#Stage 1 - Use golang:1.18 as base image for building the application
FROM golang:1.18-alpine as builder
WORKDIR /usr/src/app
COPY ./app ./
RUN go build -o application

#Stage 2 - Optimize 
FROM scratch
WORKDIR /app
COPY --from=builder /usr/src/app .

CMD ["./application"]