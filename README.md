# Encrypted Journal

A user-encrypted, customizable, journal website (only the user can access the plaintext) with OAuth authentication and encrypted cloud backup for access from multiple devices.

- [User-Encrypted](#user-encrypted)
- [Customizable](#customizable)

## User-Encrypted

Only the user can access their plaintext entires. This is done with in-browser AES encryption based on a password chosen by the user. This password is not recorded anywhere or stored on any cloud platform.

So accounting for possible security threats such as keylogging, brute-forcing, AES vulnerabilities, etc. these entries can only be viewed by the creator. This is to prevent database admins or cloud hosting services from viewing these potentially personal and private documents.

## Customizable

Journals can be for many different topics which would require different fields. For example, a daily check-in journal might just require a date and a body of text, whereas a workout journal might need a date, effort rating, description, etc.
Each user will be able to create multiple journals with different topics to cover a whole variety of needs.

## OAuth

To allow access from multiple devices, OAuth is used to let the user reach their encrypted journal entries stored in the cloud. The user still has to enter their secure password to decrypt the entries in-browser and read the material.
