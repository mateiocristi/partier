FROM adoptopenjdk:14-jre-hotspot as build
# Set the current working directory inside the image
WORKDIR /app

# Copy maven executable to the image
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java", "-jar", "application.jar"]
