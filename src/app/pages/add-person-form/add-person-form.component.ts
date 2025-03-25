import { Component, type OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-person-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-person-form.component.html',
  styleUrl: './add-person-form.component.scss',
})

export class AddPersonFormComponent implements OnInit {
  contactForm!: FormGroup;
  isEditMode = false;
  contactId?: number;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Check if we're in edit mode
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.contactId = +params['id'];
        this.loadContactData(this.contactId);
      }
    });
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/), // Only letters and spaces
        ],
      ],
      email: ['', [Validators.required, Validators.email]], // Email validation is built-in
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/), // 10-digit number
        ],
      ],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{5,6}$/), // 5 or 6-digit ZIP code
        ],
      ],
      notes: [''],
    });
  }

  loadContactData(id: number): void {
    this.contactService.getContact(id).subscribe((contact) => {
      if (contact) {
        this.contactForm.patchValue(contact);
      } else {
        // Contact not found, redirect to list
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contactData = this.contactForm.value;

    if (this.isEditMode && this.contactId) {
      // Update existing contact
      const updatedContact: Contact = {
        ...contactData,
        id: this.contactId,
      };

      this.contactService.updateContact(updatedContact).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      // Add new contact
      this.contactService.addContact(contactData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  resetForm(): void {
    if (this.isEditMode && this.contactId) {
      this.loadContactData(this.contactId);
    } else {
      this.contactForm.reset();
    }
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
