import { Injectable } from '@angular/core';
import { BehaviorSubject, type Observable, of } from 'rxjs';
import type { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

 private contacts: Contact[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      notes: "Work contact",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave",
      city: "Somewhere",
      state: "NY",
      zip: "67890",
      notes: "Friend from college",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "(555) 555-5555",
      address: "789 Pine Rd",
      city: "Elsewhere",
      state: "TX",
      zip: "54321",
      notes: "Family doctor",
    },
  ]

  private contactsSubject = new BehaviorSubject<Contact[]>(this.contacts)

  constructor() {}

  // Get all contacts
  getContacts(): Observable<Contact[]> {
    // In a real app, this would be an HTTP call
    return this.contactsSubject.asObservable()
  }

  // Get a single contact by ID
  getContact(id: number): Observable<Contact | undefined> {
    // In a real app, this would be an HTTP call
    const contact = this.contacts.find((c) => c.id === id)
    return of(contact)
  }

  // Add a new contact
  addContact(contact: Omit<Contact, "id">): Observable<Contact> {
    // In a real app, this would be an HTTP call
    const newId = Math.max(...this.contacts.map((c) => c.id), 0) + 1
    const newContact = { ...contact, id: newId }
    this.contacts = [...this.contacts, newContact]
    this.contactsSubject.next(this.contacts)
    return of(newContact)
  }

  // Update an existing contact
  updateContact(contact: Contact): Observable<Contact> {
    // In a real app, this would be an HTTP call
    this.contacts = this.contacts.map((c) => (c.id === contact.id ? contact : c))
    this.contactsSubject.next(this.contacts)
    return of(contact)
  }

  // Delete a contact
  deleteContact(id: number): Observable<void> {
    // In a real app, this would be an HTTP call
    this.contacts = this.contacts.filter((c) => c.id !== id)
    this.contactsSubject.next(this.contacts)
    return of(undefined)
  }
}