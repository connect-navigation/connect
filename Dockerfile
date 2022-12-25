FROM openjdk:17-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --chown=spring:spring target /target
ADD bootstrap /bootstrap
ADD spring-boot-docker.jar /spring-boot-docker.jar
EXPOSE 8080
EXPOSE 5432
EXPOSE 443
ENTRYPOINT ["java", "-jar", "/spring-boot-docker.jar"]

