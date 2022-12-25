FROM openjdk:17-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ADD bootstrap /bootstrap
ADD spring-boot-docker.jar /spring-boot-docker.jar
EXPOSE 8080
EXPOSE 5432
ENTRYPOINT ["java", "-jar", "/spring-boot-docker.jar"]

