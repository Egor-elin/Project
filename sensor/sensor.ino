#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#define RST_PIN 5     
#define SDA_PIN 23
MFRC522 rfid(SDA_PIN, RST_PIN);   
const char* ssid = "GalaxyA7171A8";
const char* password = "123456789";
String serverUrl = "http://4444/sensor"; 

struct SensorData {
  String number;
  int UID;
};

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("RFID Ready!");
  Serial.println("");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
}

void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    Serial.print("Card UID:");
    String uid = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      Serial.print(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
      Serial.print(rfid.uid.uidByte[i], DEC);
      uid.concat(String(rfid.uid.uidByte[i] < 0x10 ? "0" : ""));
      uid.concat(String(rfid.uid.uidByte[i], DEC));
      SensorData sensorData;
      sensorData.number = "Ж101";
      sensorData.UID = uid.concat(String(rfid.uid.uidByte[i], DEC));
      const size_t capacity = JSON_OBJECT_SIZE(2);
      DynamicJsonDocument doc(capacity);
      doc["number"] = sensorData.number;
      doc["UID"] = sensorData.UID;
      String jsonStr;
      serializeJson(doc, jsonStr);
      HTTPClient http;
      http.begin(serverUrl);
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(jsonStr);
      if(httpResponseCode > 0){
        String response = http.getString();
        Serial.println("HTTP Response code: " + String(httpResponseCode));
        Serial.println("Response: " + response);
      }else {
        Serial.println("Error on sending POST request");
      }
    }
    Serial.println("");
}
}
