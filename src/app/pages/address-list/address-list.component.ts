import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-address-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss',
})

export class AddressListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  editContact(id: number): void {
    // Navigation is handled by the routerLink
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.loadContacts();
      });
    }
  }
}

