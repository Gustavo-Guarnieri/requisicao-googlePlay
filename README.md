# 🤖 Automated Google Play Reviews Monitoring


## 🧠 Overview
This project automates the monitoring and processing of new reviews from Google Play.

It eliminates the need for manual access to the Google Play Console by automatically:

* Fetching the latest reviews via Google Play Developer API
* Identifying which reviews are new
* Logging them into a structured spreadsheet
* Sending formatted WhatsApp notifications with sentiment classification

The automation ensures continuous monitoring, structured documentation, and real-time visibility of user feedback.


## 🎯 Project Objective
The main goal was to create a reliable and automated review monitoring system.

Impact:

* Eliminates manual review checking in Google Play Console
* Ensures no new review goes unnoticed
* Automatically documents reviews in a centralized spreadsheet
* Provides instant WhatsApp alerts for new feedback
* Classifies reviews as positive or negative for faster response prioritization


## 🧱 High-Level Architecture
1. Trigger initialization
* A Cron-triggered in n8n HTTPS request starts the pipeline hosted on Vercel

2. Authentication
* The serverless function generates a JWT (JSON Web Token)
* The JWT is used to authenticate with the Google Play Developer API

3. Data ingestion
* Google Play API returns the latest app reviews
* The reviews are sent back to n8n via Webhook

4. Deduplication process
* n8n retrieves already documented review IDs from Google Sheets
* Compares existing IDs with the new API response
* Identifies only new reviews

5. Data persistence
* New reviews are inserted into Google Sheets
* Each review is stored with:
  * Rating
  * Timestamp
  * Review content
  * Sentiment classification (positive/negative)

6. Notification system
* New reviews are formatted into structured WhatsApp messages
* WhatsApp notification is triggered with review details


## 🔐 Security Considerations
* JWT authentication is used for secure API access
* Service account credentials are stored via environment variables
* Stateless serverless architecture
* Secure HTTPS communication between systems


## 🛠 Technologies & Tools
* Language: JavaScript (JS)
* Authentication: JWT (JSON Web Token)
* Integrations: Google Play Developer API
* Automation: n8n (Webhook + workflow logic)
* Infrastructure: Serverless deployment (Vercel)
* Data storage: Google Sheets
* Notification: WhatsApp API (W-API Tool)
* Data format: JSON
* Version control: Git


## 📚 Key Learnings
* Implementing JWT authentication for machine-to-machine communication
* Integrating with Google Play Developer API
* Handling API responses and structured JSON data
* Designing deduplication logic to prevent duplicate records
* Building event-driven workflows with external orchestration (n8n)
* Structuring automated notification pipelines
